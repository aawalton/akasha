#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { codeModule } from "../../../../../instructions/tools/lib/code-import.ts"
import {
  type AlertEpochLiteralViolation,
  type AlertRule,
  parseAlertRules,
  scanAlertEpochLiterals,
  scanAlertRule,
} from "../lib/alert-expr-epoch-literals.ts"
import { parseArgs } from "../lib/cli-args.ts"
import { examinePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { HISTORICAL_DEFECT_RULES } from "../lib/promtool-rules.ts"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[alert-expr-epoch-literals]"

const COMPOSED_ALERTS_SITE = "packages/infra/k8s/src/prometheus/synth-alerts.ts"

interface SynthAlerts {
  readonly ALERT_RULES: string
}

async function composedAlertRules(): Promise<string> {
  return (await codeModule<SynthAlerts>(COMPOSED_ALERTS_SITE, getRepoRoot())).ALERT_RULES
}

async function main(): Promise<never> {
  const { flags } = parseArgs(process.argv.slice(2), {
    rulesFile: { kind: "string" },
  })

  if (scanAlertEpochLiterals(HISTORICAL_DEFECT_RULES).length === 0) {
    exitOnToolError({
      error: new Error(
        "gate-integrity failure: the detector did NOT flag the known #15577 " +
          "wall-clock gate. It has degraded into a no-op and would let a date-gated rule " +
          "ship — the exact failure this gate exists to prevent."
      ),
      prefix: PREFIX,
    })
  }

  const rulesFile = flags.rulesFile
  const label = rulesFile ?? "composed alerts.yml"

  const rules = parseAlertRules(
    rulesFile !== undefined ? readFileSync(rulesFile, "utf8") : await composedAlertRules()
  )

  const { population, violations } = examinePopulation<AlertRule, AlertEpochLiteralViolation>({
    members: rules,
    unit: "alert rules",
    membership: {
      kind: "enumerated",
      because:
        "the members are the rules the parse above yielded from a document composed in memory, so nothing acquired them and there is no arrival between the module and this walk that could come back shorter",
    },
    labelOf: (rule) => (rule.group === undefined ? rule.name : `${rule.group}/${rule.name}`),
    siteOf: () => rulesFile ?? COMPOSED_ALERTS_SITE,
    examine: (rule) => scanAlertRule(rule),
  })

  return exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header:
        "Absolute unix-timestamp literal in an alert expr — a time-scoped suppression silences the recovery as well as the failure (#15930: an 18.7-hour unobserved recovery)",
      successMessage: `OK — no wall-clock cutover in ${label}.`,
      groupBy: (v) => v.rule,
      formatViolation: (v) => v.message,
    },
  })
}

if (import.meta.main) {
  main().catch((err: unknown) => {
    exitOnToolError({ error: err, prefix: PREFIX })
  })
}
