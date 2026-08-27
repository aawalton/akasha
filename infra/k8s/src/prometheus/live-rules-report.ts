import { assertNever } from "../../../../shared/utils-narrow/src/assert-never"
import type { AnyVerdict } from "@shared/verdict"
import type { LiveRulesSubject, LiveRulesVerdict } from "./decide-live-rules-drift"

const SUBJECT: LiveRulesSubject = "the-live-prometheus-rule-set"

const DELIVERY =
  "alerts.yml is a subPath mount, frozen at pod start — deliver with: kubectl rollout restart deployment/prometheus -n prometheus"

export interface LiveRulesReport {
  readonly verdict: AnyVerdict
  readonly exitCode: 0 | 1 | 2
  readonly detail: readonly string[]
  readonly json: Readonly<Record<string, unknown>>
}

export function driftReport(
  verdict: LiveRulesVerdict,
  promUrl: string,
  attempts: number
): LiveRulesReport {
  const base = { prometheusUrl: promUrl, kind: verdict.kind, attempts }
  switch (verdict.kind) {
    case "pass":
      return {
        verdict: qualify(verdict, `${promUrl} is serving exactly the committed set`),
        exitCode: 0,
        detail: [],
        json: { ...base, ruleCount: verdict.coverage.observed },
      }
    case "fail":
      return {
        verdict: qualify(verdict, `${promUrl} ${verdict.reason}, after ${attempts} attempt(s)`),
        exitCode: verdict.coverage.declared === 0 ? 2 : 1,
        detail: [DELIVERY],
        json: { ...base, ...verdict.evidence, findings: verdict.findings },
      }
    default:
      return assertNever(verdict)
  }
}

function qualify(verdict: LiveRulesVerdict, reason: string): AnyVerdict {
  return { ...verdict, reason }
}

export function unreachableReport(args: {
  readonly promUrl: string
  readonly error: string
  readonly committedCount: number
  readonly attempts: number
  readonly observedAtMs: number
}): LiveRulesReport {
  const { promUrl, error, committedCount, attempts, observedAtMs } = args
  return {
    exitCode: 2,
    verdict: {
      kind: "fail",
      subject: SUBJECT,
      reason:
        `cannot read ${promUrl} after ${attempts} attempt(s) — ${committedCount} committed rule(s) ` +
        "went unverified, and an unobserved Prometheus is not a passing one",
      observedAtMs,
      coverage: { observed: 0, declared: committedCount, unit: "rules" },
      evidence: { error },
      findings: [{ detail: error, at: promUrl }],
    },
    detail: [DELIVERY],
    json: {
      prometheusUrl: promUrl,
      verdict: "unreachable",
      error,
      committedCount,
      attempts,
    },
  }
}

export function gateIntegrityReport(args: {
  readonly error: string
  readonly observedAtMs: number
}): LiveRulesReport {
  return {
    exitCode: 2,
    verdict: {
      kind: "fail",
      subject: SUBJECT,
      reason: `gate-integrity failure, so no reading was attempted: ${args.error}`,
      observedAtMs: args.observedAtMs,
      coverage: { observed: 0, declared: null, unit: "rules" },
      evidence: { error: args.error },
      findings: [{ detail: args.error, at: null }],
    },
    detail: [],
    json: { verdict: "gate-integrity", error: args.error },
  }
}
