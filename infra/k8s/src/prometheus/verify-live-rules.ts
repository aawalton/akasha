#!/usr/bin/env bun

import { optionalEnv } from "../../../../shared/utils-narrow/src/require-env"
import { type AnyVerdict, verdictFindingLines, verdictHeadline } from "@shared/verdict"
import { z } from "zod"
import {
  decideLiveRulesDrift,
  type LiveRulesVerdict,
  type PrometheusRuleRef,
  parseCommittedRules,
  refLabel,
} from "./decide-live-rules-drift"
import {
  driftReport,
  gateIntegrityReport,
  type LiveRulesReport,
  unreachableReport,
} from "./live-rules-report"
import { ALERT_RULES } from "./synth-alerts"

const VERDICT_ANCHOR = "VERDICT: "

const FOLD_LINE_BREAKS = /\s*[\r\n]+\s*/g

function emitVerdict(verdict: AnyVerdict): undefined {
  for (const finding of verdictFindingLines(verdict)) process.stderr.write(`${finding}\n`)
  process.stdout.write(
    `${VERDICT_ANCHOR}${verdictHeadline(verdict).replace(FOLD_LINE_BREAKS, " ")}\n`
  )
}

const PREFIX = "[prometheus-live-rules]"

const DEFAULT_PROMETHEUS_URL = "http://prometheus.prometheus.svc.cluster.local:9090"

const RETRY_INTERVAL_MS = 5_000
const RETRY_BUDGET_MS = 60_000

const HELP = `Diff the committed alert-rule set (the composed \`alerts.yml\`) against the rules the RUNNING Prometheus reports at /api/v1/rules; exit nonzero on drift.

\`alerts.yml\` reaches the pod through a subPath mount, which Kubernetes never hot-updates — the file is frozen at pod start and the only delivery is the \`kubectl rollout restart\` in the prometheus foundation workflow. Every other rung stops at 'the file is valid' or 'the workflow was triggered'; nothing else observes the running process, so a rule that never loaded is indistinguishable from a rule that is simply quiet.

Fail-closed: an unreachable Prometheus, a non-200, or an unparseable body exits 2, never 0 — an absent observation must never read as success. Rule health is deliberately not gated on (rules read health: "unknown" until their first evaluation after a restart).

Before the first network call the decider is self-proved on a fixed pair: identical sets must read clean, and a live set missing one rule must read drift naming exactly that rule. A gate degraded to a no-op reds instead of green-lighting everything.

Transport errors, non-200s and drift are retried for a short settle window (the pipeline step runs immediately after the rollout restart); the run returns as soon as the verdict is clean.

Default stdout is one anchored line and nothing else, whatever the outcome, so \`head -1\`, \`tail -1\` and \`2>/dev/null | tail\` all return the same claim:
  VERDICT: PASS|FAIL — the-live-prometheus-rule-set: <answer> [over <n> of <n> rules]
Which rules diverged, and the rollout restart that delivers them, go to stderr.

usage: bun infra/k8s/src/prometheus/verify-live-rules.ts [--json]

  --json   Emit the verdict as JSON instead of the human summary.

env:
  PROMETHEUS_URL   Base URL of the Prometheus HTTP API to query.
                   default: ${DEFAULT_PROMETHEUS_URL}

exits:
  0   clean — the running process serves exactly the committed rule set
  1   drift — the committed and live rule sets differ
  2   tool error, bad invocation, or gate-integrity failure
`

const LiveRulesResponseZ = z.looseObject({
  status: z.literal("success"),
  data: z.looseObject({
    groups: z.array(
      z.looseObject({
        name: z.string(),
        rules: z.array(
          z.looseObject({ name: z.string(), type: z.enum(["alerting", "recording"]) })
        ),
      })
    ),
  }),
})

const SELF_PROOF_DROPPED: PrometheusRuleRef = {
  group: "gate-self-proof",
  type: "alerting",
  name: "SelfProofAlert",
}
const SELF_PROOF_KEPT: PrometheusRuleRef = {
  group: "gate-self-proof",
  type: "recording",
  name: "self_proof_record",
}
const SELF_PROOF_COMMITTED: readonly PrometheusRuleRef[] = [SELF_PROOF_DROPPED, SELF_PROOF_KEPT]

const errorText = (err: unknown): string => (err instanceof Error ? err.message : String(err))

function proveDecider(): string | null {
  const nowMs = Date.now()
  const good = decideLiveRulesDrift({
    committed: SELF_PROOF_COMMITTED,
    live: SELF_PROOF_COMMITTED,
    observedAtMs: nowMs,
  })
  if (good.kind !== "pass") {
    return (
      `decideLiveRulesDrift read two identical rule sets as "${good.kind}", not "pass". ` +
      `The gate cannot certify a real match, so it would red every deploy.`
    )
  }
  if (good.coverage.observed !== SELF_PROOF_COMMITTED.length) {
    return (
      `decideLiveRulesDrift read two identical ${SELF_PROOF_COMMITTED.length}-rule sets as clean ` +
      `over ${good.coverage.observed} rule(s). The count it reports is not the set it compared.`
    )
  }

  const bad = decideLiveRulesDrift({
    committed: SELF_PROOF_COMMITTED,
    live: [SELF_PROOF_KEPT],
    observedAtMs: nowMs,
  })
  if (bad.kind !== "fail") {
    return (
      `decideLiveRulesDrift read a live set missing a committed rule as "${bad.kind}", not ` +
      `"fail". The gate accepts every input and would let an unloaded alert ship silently.`
    )
  }
  const missing = bad.evidence.missing.map(refLabel).join(", ")
  const unexpected = bad.evidence.unexpected.map(refLabel).join(", ")
  if (missing !== refLabel(SELF_PROOF_DROPPED) || unexpected !== "") {
    return (
      `decideLiveRulesDrift reported drift but did not name exactly the removed rule ` +
      `(missing: [${missing}], unexpected: [${unexpected}]). Its lists cannot be trusted to ` +
      `identify which rule failed to load.`
    )
  }
  return null
}

type LiveFetch =
  | { readonly ok: true; readonly rules: readonly PrometheusRuleRef[] }
  | { readonly ok: false; readonly error: string }

async function fetchLiveRules(promUrl: string): Promise<LiveFetch> {
  const url = `${promUrl}/api/v1/rules`
  try {
    const res = await fetch(url)
    if (!res.ok) return { ok: false, error: `HTTP ${res.status} ${res.statusText} from ${url}` }
    const parsed = LiveRulesResponseZ.safeParse(await res.json())
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      const detail =
        first === undefined ? "schema mismatch" : `${first.path.join(".")}: ${first.message}`
      return { ok: false, error: `unparseable body from ${url} (${detail})` }
    }
    const rules = parsed.data.data.groups.flatMap((group) =>
      group.rules.map(
        (rule): PrometheusRuleRef => ({ group: group.name, type: rule.type, name: rule.name })
      )
    )
    return { ok: true, rules }
  } catch (err) {
    return { ok: false, error: `${url} unreachable: ${errorText(err)}` }
  }
}

type LiveObservation =
  | { readonly kind: "verdict"; readonly verdict: LiveRulesVerdict; readonly attempts: number }
  | { readonly kind: "unreachable"; readonly error: string; readonly attempts: number }

async function observeLiveRules(
  promUrl: string,
  committed: readonly PrometheusRuleRef[]
): Promise<LiveObservation> {
  const deadline = Date.now() + RETRY_BUDGET_MS
  let attempts = 0
  let last: LiveObservation = { kind: "unreachable", error: "no attempt made", attempts: 0 }
  for (;;) {
    attempts++
    const fetched = await fetchLiveRules(promUrl)
    if (fetched.ok) {
      const verdict = decideLiveRulesDrift({
        committed,
        live: fetched.rules,
        observedAtMs: Date.now(),
      })
      last = { kind: "verdict", verdict, attempts }
      if (verdict.kind === "pass" || verdict.coverage.declared === 0) return last
    } else {
      last = { kind: "unreachable", error: fetched.error, attempts }
    }
    if (Date.now() + RETRY_INTERVAL_MS >= deadline) return last
    await Bun.sleep(RETRY_INTERVAL_MS)
  }
}

function emit(report: LiveRulesReport, asJson: boolean): number {
  const exitCode = report.exitCode
  if (asJson) {
    process.stdout.write(`${JSON.stringify(report.json, null, 2)}\n`)
    return exitCode
  }
  for (const line of report.detail) process.stderr.write(`${PREFIX} ${line}\n`)
  emitVerdict(report.verdict)
  return exitCode
}

async function prometheusLiveRulesCommand(args: readonly string[]): Promise<void> {
  if (args.includes("--help") || args.includes("-h")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  const asJson = args.includes("--json")

  const integrityError = proveDecider()
  if (integrityError !== null) {
    process.exit(
      emit(gateIntegrityReport({ error: integrityError, observedAtMs: Date.now() }), asJson)
    )
  }

  const promUrl = (optionalEnv("PROMETHEUS_URL") ?? DEFAULT_PROMETHEUS_URL)
    .trim()
    .replace(/\/+$/, "")
  const committed = parseCommittedRules(ALERT_RULES)
  const observed = await observeLiveRules(promUrl, committed)

  if (observed.kind === "unreachable") {
    process.exit(
      emit(
        unreachableReport({
          promUrl,
          error: observed.error,
          committedCount: committed.length,
          attempts: observed.attempts,
          observedAtMs: Date.now(),
        }),
        asJson
      )
    )
  }

  process.exit(emit(driftReport(observed.verdict, promUrl, observed.attempts), asJson))
}

if (import.meta.main) {
  try {
    await prometheusLiveRulesCommand(process.argv.slice(2))
  } catch (err) {
    process.stderr.write(`${PREFIX} fatal: ${errorText(err)}\n`)
    process.exit(2)
  }
}
