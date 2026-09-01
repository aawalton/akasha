import type {
  AnyVerdict,
  VerdictCoverage,
  VerdictReach,
} from "../verdict-shape/verdict-shape.module.code.ts"

export const UNMEASURED = "UNMEASURED"

export const UNCOVERED = "UNCOVERED"

export function renderReach(reach: VerdictReach): string {
  const declared = reach.examined + reach.unexaminable
  if (declared === 0) return UNMEASURED
  if (reach.unexaminable === 0) return String(reach.examined)
  return `${reach.examined} of ${declared}`
}

export function renderCoverage(coverage: VerdictCoverage): string {
  const { observed, declared, unit } = coverage
  if (declared === null) return `${observed} ${unit} (denominator not computed)`
  return `${observed} of ${declared} ${unit}`
}

const HEADLINE: Record<AnyVerdict["kind"], string> = {
  pass: "PASS",
  fail: "FAIL",
}

const HEADLINE_BY_ANY_KIND: Readonly<Record<string, string | undefined>> = HEADLINE

export function verdictHeadline(verdict: AnyVerdict): string {
  const headline = HEADLINE_BY_ANY_KIND[verdict.kind]
  if (headline === undefined) {
    return `UNREADABLE VERDICT — ${verdict.subject}: this build cannot interpret kind "${verdict.kind}"`
  }
  return `${headline} — ${verdict.subject}: ${verdict.reason} [over ${renderCoverage(verdict.coverage)}]`
}

export function verdictFindingLines(verdict: AnyVerdict): readonly string[] {
  if (HEADLINE_BY_ANY_KIND[verdict.kind] === undefined) return []
  if (verdict.kind === "pass") return []
  return verdict.findings.map((finding) => `  [${finding.at ?? "unattributed"}] ${finding.detail}`)
}

export function renderVerdict(verdict: AnyVerdict): string {
  return [verdictHeadline(verdict), ...verdictFindingLines(verdict)].join("\n")
}
