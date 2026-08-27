export interface VerdictCoverage {
  readonly observed: number
  readonly declared: number | null
  readonly unit: string
}

export interface VerdictReach {
  readonly examined: number
  readonly unexaminable: number
}

export const UNMEASURED = "UNMEASURED"

export const UNCOVERED = "UNCOVERED"

export function renderReach(reach: VerdictReach): string {
  const declared = reach.examined + reach.unexaminable
  if (declared === 0) return UNMEASURED
  if (reach.unexaminable === 0) return String(reach.examined)
  return `${reach.examined} of ${declared}`
}

export interface VerdictFinding {
  readonly detail: string
  readonly at: string | null
}

interface VerdictClaim<Subject extends string> {
  readonly subject: Subject
  readonly reason: string
  readonly observedAtMs: number
}

export interface VerdictPass<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "pass"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
}

export interface VerdictFail<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "fail"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
  readonly findings: readonly [VerdictFinding, ...(readonly VerdictFinding[])]
}

export type Verdict<Subject extends string, Evidence> =
  | VerdictPass<Subject, Evidence>
  | VerdictFail<Subject, Evidence>

export type AnyVerdict = Verdict<string, unknown>

const EXIT_CODE: Record<AnyVerdict["kind"], 0 | 1> = {
  pass: 0,
  fail: 1,
}

const EXIT_CODE_BY_ANY_KIND: Readonly<Record<string, 0 | 1 | undefined>> = EXIT_CODE

export function verdictExitCode(verdict: AnyVerdict): 0 | 1 | 2 {
  return EXIT_CODE_BY_ANY_KIND[verdict.kind] ?? 2
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
