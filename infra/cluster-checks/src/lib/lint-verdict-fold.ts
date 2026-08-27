import type { VerdictFinding } from "../../../../../instructions/tools/lib/verdict-channel"
import type { ErrorsByCategory, LintEvidence, LintVerdict } from "./lint-verdict-core.ts"

const AGGREGATE_UNIT = "named paths"

function memberFinding(member: LintVerdict): VerdictFinding {
  return { detail: member.reason, at: member.evidence.target }
}

function sumOrNull(values: readonly (number | null)[]): number | null {
  let total = 0
  for (const value of values) {
    if (value === null) return null
    total += value
  }
  return total
}

function sumBy(members: readonly LintVerdict[], pick: (member: LintVerdict) => number): number {
  return members.reduce((total, member) => total + pick(member), 0)
}

function aggregateEvidence(members: readonly LintVerdict[], target: string): LintEvidence {
  const errorsByCategory: ErrorsByCategory = {
    format: sumBy(members, (m) => m.evidence.errorsByCategory.format),
    rule: sumBy(members, (m) => m.evidence.errorsByCategory.rule),
    other: sumBy(members, (m) => m.evidence.errorsByCategory.other),
  }
  const filesOpened = sumBy(members, (m) => m.evidence.filesOpened)
  const trackedLintable = sumOrNull(members.map((m) => m.evidence.trackedLintable))
  return {
    target,
    errors: sumBy(members, (m) => m.evidence.errors),
    warnings: sumBy(members, (m) => m.evidence.warnings),
    infos: sumBy(members, (m) => m.evidence.infos),
    errorsByCategory,
    filesOpened,
    trackedLintable,
    filesNotOpened: trackedLintable === null ? null : trackedLintable - filesOpened,
    biomeExitCode: null,
    measured: members.every((m) => m.evidence.measured),
  }
}

export function foldLintVerdicts(
  members: readonly [LintVerdict, ...(readonly LintVerdict[])]
): LintVerdict {
  const [only, ...rest] = members
  if (rest.length === 0) return only

  const target = members.map((member) => member.evidence.target).join(" ")
  const evidence = aggregateEvidence(members, target)
  const measured = members.filter((member) => member.evidence.measured)
  const unmeasured = members.filter((member) => !member.evidence.measured)
  const failures = members.filter((member) => member.kind === "fail" && member.evidence.measured)
  const base = {
    subject: only.subject,
    observedAtMs: Math.max(...members.map((member) => member.observedAtMs)),
    coverage: { observed: measured.length, declared: members.length, unit: AGGREGATE_UNIT },
    evidence,
  } as const

  const { errors, warnings, infos, filesOpened, filesNotOpened } = evidence
  const nonBlocking = `${warnings} warnings, ${infos} infos non-blocking`
  const shortfall =
    filesNotOpened === null || filesNotOpened === 0
      ? ""
      : `; ${filesNotOpened.toLocaleString()} tracked lintable file(s) under ${target} were NOT opened (biome config / ignore exclusions)`

  const [firstFailure, ...restFailures] = failures
  if (firstFailure !== undefined) {
    return {
      ...base,
      kind: "fail",
      reason: `${target}: ${errors} error(s) (${nonBlocking}) over ${measured.length} of ${members.length} named path(s), ${filesOpened} files${shortfall}`,
      findings: [
        memberFinding(firstFailure),
        ...restFailures.map(memberFinding),
        ...unmeasured.map(memberFinding),
      ],
    }
  }

  const [firstUnmeasured, ...restUnmeasured] = unmeasured
  if (firstUnmeasured !== undefined) {
    return {
      ...base,
      kind: "fail",
      reason: `${target}: ${unmeasured.length} of ${members.length} named path(s) could not be measured, so this request has no clean answer for them`,
      findings: [memberFinding(firstUnmeasured), ...restUnmeasured.map(memberFinding)],
    }
  }

  return {
    ...base,
    kind: "pass",
    reason: `${target}: 0 errors (${nonBlocking}) over ${members.length} named path(s), ${filesOpened} files${shortfall}`,
  }
}
