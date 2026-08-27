import type { VerdictCoverage, VerdictFinding } from "../../../../tools/lib/verdict-channel"
import { z } from "zod"
import { BiomeDiagnosticSchema, lintDiagnosticFindings } from "./lint-verdict-diagnostics.ts"

const BiomeSummarySchema = z
  .object({
    errors: z.number().int().nonnegative(),
    warnings: z.number().int().nonnegative(),
    infos: z.number().int().nonnegative(),
    changed: z.number().int().nonnegative(),
    unchanged: z.number().int().nonnegative(),
  })
  .passthrough()

const BiomeReportSchema = z
  .object({
    summary: BiomeSummarySchema,
    diagnostics: z.array(BiomeDiagnosticSchema).default([]),
  })
  .passthrough()

export type BiomeReport = z.infer<typeof BiomeReportSchema>

export type LintSubject = "the-linted-tree"

export interface ErrorsByCategory {
  readonly format: number
  readonly rule: number
  readonly other: number
}

export interface LintEvidence {
  readonly target: string
  readonly errors: number
  readonly warnings: number
  readonly infos: number
  readonly errorsByCategory: ErrorsByCategory
  readonly filesOpened: number
  readonly trackedLintable: number | null
  readonly filesNotOpened: number | null
  readonly biomeExitCode: number | null
  readonly measured: boolean
}

interface VerdictClaim<Subject extends string> {
  readonly subject: Subject
  readonly reason: string
  readonly observedAtMs: number
}

interface VerdictPass<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "pass"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
}

interface VerdictFail<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "fail"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
  readonly findings: readonly [VerdictFinding, ...(readonly VerdictFinding[])]
}

export type Verdict<Subject extends string, Evidence> =
  | VerdictPass<Subject, Evidence>
  | VerdictFail<Subject, Evidence>

export type LintVerdict = Verdict<LintSubject, LintEvidence>

const SUBJECT: LintSubject = "the-linted-tree"

const NO_EVIDENCE = (target: string, biomeExitCode: number | null): LintEvidence => ({
  target,
  errors: 0,
  warnings: 0,
  infos: 0,
  errorsByCategory: { format: 0, rule: 0, other: 0 },
  filesOpened: 0,
  trackedLintable: null,
  filesNotOpened: null,
  biomeExitCode,
  measured: false,
})

const normalizeTarget = (target: string): string => target.replace(/^\.\//, "").replace(/\/+$/, "")

export function countTrackedLintable(
  files: readonly string[],
  extensions: readonly string[],
  targets: readonly string[]
): number {
  const suffixes = extensions.map((ext) => `.${ext}`)
  const scopes = targets.map(normalizeTarget)
  const wholeTree = scopes.some((s) => s === "" || s === ".")
  let count = 0
  for (const file of files) {
    if (!suffixes.some((suffix) => file.endsWith(suffix))) continue
    if (wholeTree || scopes.some((s) => file === s || file.startsWith(`${s}/`))) count += 1
  }
  return count
}

function classifyCategory(category: string | null | undefined): keyof ErrorsByCategory {
  if (category === "format") return "format"
  if (category?.startsWith("lint/")) return "rule"
  return "other"
}

function attributeErrors(report: BiomeReport): ErrorsByCategory {
  const byCategory: ErrorsByCategory = { format: 0, rule: 0, other: 0 }
  const tally = { ...byCategory }
  for (const diag of report.diagnostics) {
    if (diag.severity !== "error") continue
    tally[classifyCategory(diag.category)] += 1
  }
  return tally
}

function anomalyVerdict(
  anomaly: string,
  biomeExitCode: number | null,
  target: string,
  observedAtMs: number
): LintVerdict {
  return {
    kind: "fail",
    subject: SUBJECT,
    reason: anomaly,
    observedAtMs,
    coverage: { observed: 0, declared: null, unit: "files" },
    evidence: NO_EVIDENCE(target, biomeExitCode),
    findings: [{ detail: anomaly, at: target }],
  }
}

export function deriveLintVerdict(
  biomeStdout: string,
  biomeExitCode: number | null,
  target: string,
  trackedLintable: number | null,
  observedAtMs: number
): LintVerdict {
  let parsed: ReturnType<typeof BiomeReportSchema.safeParse>
  try {
    parsed = BiomeReportSchema.safeParse(JSON.parse(biomeStdout))
  } catch {
    return anomalyVerdict(
      `biome did not emit parseable JSON (target ${target}; exit ${String(biomeExitCode)})`,
      biomeExitCode,
      target,
      observedAtMs
    )
  }

  if (!parsed.success) {
    return anomalyVerdict(
      `biome JSON did not match the expected reporter shape (target ${target})`,
      biomeExitCode,
      target,
      observedAtMs
    )
  }

  const report = parsed.data
  const { errors, warnings, infos } = report.summary
  const errorsByCategory = attributeErrors(report)

  if (biomeExitCode === null) {
    return anomalyVerdict(
      `biome was killed by a signal (target ${target})`,
      biomeExitCode,
      target,
      observedAtMs
    )
  }

  const filesOpened = report.summary.changed + report.summary.unchanged

  if (filesOpened === 0) {
    return anomalyVerdict(
      `biome opened 0 files for target ${target} — a verdict over an empty population is not a verdict ` +
        `(check the path, and biome.json's files.includes exclusions)`,
      biomeExitCode,
      target,
      observedAtMs
    )
  }

  const exitSaysClean = biomeExitCode === 0
  const countSaysClean = errors === 0
  if (exitSaysClean !== countSaysClean) {
    return anomalyVerdict(
      `biome exit code (${String(biomeExitCode)}) disagrees with its error count (${errors}) ` +
        `for target ${target} — verdict cannot be trusted`,
      biomeExitCode,
      target,
      observedAtMs
    )
  }

  const reference =
    trackedLintable !== null && trackedLintable >= filesOpened ? trackedLintable : null
  const filesNotOpened = reference === null ? null : reference - filesOpened
  const nonBlocking = `${warnings} warnings, ${infos} infos non-blocking`
  const evidence: LintEvidence = {
    target,
    errors,
    warnings,
    infos,
    errorsByCategory,
    filesOpened,
    trackedLintable: reference,
    filesNotOpened,
    biomeExitCode,
    measured: true,
  }
  const coverage = { observed: filesOpened, declared: reference, unit: "files" }
  const shortfall =
    filesNotOpened === null || filesNotOpened === 0
      ? ""
      : `; ${filesNotOpened.toLocaleString()} tracked lintable file(s) under ${target} were NOT opened (biome config / ignore exclusions)`

  if (errors === 0) {
    return {
      kind: "pass",
      subject: SUBJECT,
      reason: `${target}: 0 errors (${nonBlocking})${shortfall}`,
      observedAtMs,
      coverage,
      evidence,
    }
  }

  const { format, rule, other } = errorsByCategory
  const tally: VerdictFinding = {
    detail:
      `${errors} error-severity diagnostic(s) ` +
      `[${format} format, ${rule} rule, ${other} other]`,
    at: null,
  }
  return {
    kind: "fail",
    subject: SUBJECT,
    reason: `${target}: ${errors} error(s) (${nonBlocking})${shortfall}`,
    observedAtMs,
    coverage,
    evidence,
    findings: [tally, ...lintDiagnosticFindings(report.diagnostics)],
  }
}

export function decideLintExit(verdict: LintVerdict): 0 | 1 | 2 {
  if (verdict.kind === "pass") return 0
  return verdict.evidence.measured ? 1 : 2
}
