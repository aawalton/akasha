import type { AnyVerdict, VerdictFinding } from "../../../../tools/lib/verdict-channel"
import { EXIT_TOOL_ERROR } from "../../../../tools/lib/check-workflow/violation-reporter"

export type LocalCheckStatus = "pass" | "fail" | "skip"

export function localStatusForCheckExit(exitCode: number | null): LocalCheckStatus {
  if (exitCode === 0) return "pass"
  if (exitCode === null || exitCode === EXIT_TOOL_ERROR) return "skip"
  return "fail"
}

export interface LocalCheckResult {
  readonly name: string
  readonly status: LocalCheckStatus
  readonly detail: string
}

export type LocalCheckSubject = "the-local-validation-set"

export interface LocalCheckEvidence {
  readonly declared: number
  readonly passed: number
  readonly failed: number
  readonly skipped: number
}

export interface LocalCheckVerdict extends AnyVerdict {
  readonly kind: "pass" | "fail"
  readonly subject: LocalCheckSubject
  readonly observedAtMs: number
  readonly evidence: LocalCheckEvidence
}

const SUBJECT: LocalCheckSubject = "the-local-validation-set"

const finding = (label: string, result: LocalCheckResult): VerdictFinding => ({
  detail: `${label} — ${result.detail}`,
  at: result.name,
})

export function decideLocalCheckVerdict(
  results: readonly LocalCheckResult[],
  observedAtMs: number
): LocalCheckVerdict {
  const declared = results.length
  const failed = results.filter((r) => r.status === "fail")
  const skipped = results.filter((r) => r.status === "skip")
  const passed = results.filter((r) => r.status === "pass")
  const ran = passed.length + failed.length
  const evidence: LocalCheckEvidence = {
    declared,
    passed: passed.length,
    failed: failed.length,
    skipped: skipped.length,
  }
  const coverage = { observed: ran, declared, unit: "validations" }

  if (declared === 0) {
    return {
      kind: "fail",
      subject: SUBJECT,
      reason: "0 validations declared — an aggregate over an empty set is not a verdict",
      observedAtMs,
      coverage,
      evidence,
      findings: [
        {
          detail:
            "the validation set came back empty, so nothing was run and nothing can be certified",
          at: null,
        },
      ],
    }
  }

  const shortfall: readonly VerdictFinding[] = [
    ...failed.map((r) => finding("FAILED", r)),
    ...skipped.map((r) => finding("DID NOT RUN", r)),
  ]

  const [first, ...rest] = shortfall
  if (first !== undefined && failed.length > 0) {
    return {
      kind: "fail",
      subject: SUBJECT,
      reason:
        `${ran} of ${declared} validations ran (${passed.length} passed, ${failed.length} failed)` +
        `${skipped.length > 0 ? `; ${skipped.length} did NOT run` : ""}`,
      observedAtMs,
      coverage,
      evidence,
      findings: [first, ...rest],
    }
  }

  const [firstSkipped, ...restSkipped] = shortfall
  if (firstSkipped !== undefined) {
    return {
      kind: "fail",
      subject: SUBJECT,
      reason:
        `INCOMPLETE — ${ran} of ${declared} validations ran and passed; ${skipped.length} did ` +
        "NOT run. A validation that did not run is not a validation that passed",
      observedAtMs,
      coverage,
      evidence,
      findings: [firstSkipped, ...restSkipped],
    }
  }

  return {
    kind: "pass",
    subject: SUBJECT,
    reason: `all ${declared} declared validations ran and passed`,
    observedAtMs,
    coverage,
    evidence,
  }
}

export function decideLocalCheckExit(verdict: LocalCheckVerdict): 0 | 1 | 2 {
  if (verdict.kind === "pass") return 0
  return verdict.evidence.failed > 0 ? 1 : 2
}
