import { type AuditReading, summarizeAudit } from "./audit-reading"

export interface WorkerShapeRuleReading {
  readonly rule: string
  readonly unit: string
  readonly successMessage: string
  readonly reading: AuditReading
}

export function workerShapeRuleReading(args: {
  readonly rule: string
  readonly unit: string
  readonly successMessage: string
  readonly scanned: number
  readonly compared: number
  readonly findings: number
}): WorkerShapeRuleReading {
  return {
    rule: args.rule,
    unit: args.unit,
    successMessage: args.successMessage,
    reading: summarizeAudit({
      scanned: args.scanned,
      compared: args.compared,
      findings: args.findings,
      coverage: "complete",
    }),
  }
}

function pluralize(unit: string, count: number): string {
  return count === 1 ? unit : `${unit}s`
}

export function renderWorkerShapeRuleReading(
  prefix: string,
  entry: WorkerShapeRuleReading
): string {
  const head = `${prefix} [${entry.rule}]`
  if (entry.reading.kind === "no-population") {
    return `${head} NO POPULATION — nothing was offered to this rule, so it certifies nothing.`
  }
  const { scanned, compared, findings } = entry.reading
  if (compared === 0) {
    return `${head} EMPTY POPULATION — offered ${scanned.toLocaleString()} ${pluralize(entry.unit, scanned)} and weighed none, so it certifies nothing.`
  }
  const verdict = findings === 0 ? entry.successMessage : `${findings.toLocaleString()} finding(s).`
  return `${head} ${verdict} [over ${compared.toLocaleString()} of ${scanned.toLocaleString()} ${pluralize(entry.unit, scanned)}]`
}
