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
