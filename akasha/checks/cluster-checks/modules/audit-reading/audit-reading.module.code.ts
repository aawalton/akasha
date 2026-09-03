const SCAN_COVERAGES = ["complete", "truncated"] as const
type ScanCoverage = (typeof SCAN_COVERAGES)[number]

export type AuditReading =
  | { readonly kind: "no-population" }
  | {
      readonly kind: "measured"
      readonly scanned: number
      readonly compared: number
      readonly findings: number
      readonly coverage: ScanCoverage
    }

interface AuditMeasurement {
  readonly scanned: number
  readonly compared: number
  readonly findings: number
  readonly coverage: ScanCoverage
}

export function summarizeAudit(input: AuditMeasurement): AuditReading {
  if (input.scanned === 0) return { kind: "no-population" }
  return {
    kind: "measured",
    scanned: input.scanned,
    compared: input.compared,
    findings: input.findings,
    coverage: input.coverage,
  }
}

// What a zero means is the whole point of this rendering. A count of nothing found is worth
// reading only where something was looked at and weighed, so the two ways of reaching zero
// without measuring anything say so in words rather than printing a bare 0 that reads clean.
const NOT_A_ZERO = "this is not a zero"

export function renderAuditReading(subject: string, reading: AuditReading): readonly string[] {
  if (reading.kind === "no-population") {
    return [
      `${subject}\tno-population`,
      `  Nothing was scanned, so nothing is known — ${NOT_A_ZERO}.`,
    ]
  }
  const head =
    `${subject}\tmeasured\tscanned=${reading.scanned}\t` +
    `compared=${reading.compared}\tfindings=${reading.findings}\t` +
    `coverage=${reading.coverage}`
  return [head, secondLine(reading), ...truncationLines(reading.coverage)]
}

function secondLine(reading: Extract<AuditReading, { kind: "measured" }>): string {
  if (reading.compared === 0) {
    return `  ${reading.scanned} scanned and none could be weighed — ${NOT_A_ZERO}.`
  }
  if (reading.findings === 0) {
    return `  ${reading.compared} weighed and none is the class — a zero from a comparison that ran.`
  }
  return `  ${reading.findings} of ${reading.compared} weighed are the class.`
}

function truncationLines(coverage: ScanCoverage): readonly string[] {
  if (coverage === "complete") return []
  // "came back full", which this said before it carried, reads as easily as *complete* — the
  // opposite of the branch it stands on. What is meant is that the scan hit its own ceiling.
  return ["  The scan stopped at its limit, so every count above is a FLOOR rather than a census."]
}
