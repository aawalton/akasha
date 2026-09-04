import { type AuditReading, summarizeAudit } from "../audit-reading/audit-reading.module.code.ts"

export const RULE_KINDS = ["syntax-scanner", "ast-grep-rule"] as const
export type RuleKind = (typeof RULE_KINDS)[number]

export interface RuleReading {
  readonly rule: string
  readonly kind: RuleKind
  readonly source: string
  readonly reading: AuditReading
}

export function ruleReading(args: {
  readonly rule: string
  readonly kind: RuleKind
  readonly source: string
  readonly scanned: number
  readonly compared: number
  readonly findings: number
}): RuleReading {
  return {
    rule: args.rule,
    kind: args.kind,
    source: args.source,
    reading: summarizeAudit({
      scanned: args.scanned,
      compared: args.compared,
      findings: args.findings,
      coverage: "complete",
    }),
  }
}

export function ruleCertifies(reading: RuleReading): boolean {
  if (reading.reading.kind === "no-population") return false
  return reading.reading.compared > 0
}

export function emptyRules(readings: readonly RuleReading[]): readonly RuleReading[] {
  return readings.filter((r) => !ruleCertifies(r))
}

export function summarizeRuleCorpus(readings: readonly RuleReading[]): AuditReading {
  return summarizeAudit({
    scanned: readings.length,
    compared: readings.length,
    findings: emptyRules(readings).length,
    coverage: "complete",
  })
}

export function renderRuleReading(reading: RuleReading): string {
  const head = `  ${reading.rule}\t${reading.kind}\t${reading.source}`
  if (reading.reading.kind === "no-population") {
    return `${head}\tno-population — nothing was offered to it, so it certifies nothing`
  }
  const { scanned, compared, findings } = reading.reading
  if (compared === 0) {
    return `${head}\tEMPTY POPULATION — ${scanned.toLocaleString()} offered and it weighed none, so it certifies nothing`
  }
  return `${head}\tweighed=${compared.toLocaleString()} of ${scanned.toLocaleString()}\tfindings=${findings.toLocaleString()}`
}
