import { copyFileSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { basename, join } from "node:path"
import { parse, stringify } from "yaml"
import { z } from "zod"

const RULES_FILENAME = "alerts.yml"

export const HISTORICAL_DEFECT_RULES = `groups:
  - name: historical-defect-15577
    rules:
      - alert: MacbookInferencePoolUnreachable
        expr: (macbook_inference_pool_serving == 0) and (time() >= 1784966400)
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "the #15577 pre-fix defect — scalar comparison missing bool modifier"
`

export function resolvePromtool(): string | null {
  return Bun.which("promtool")
}

export interface RulesValidationResult {
  readonly ok: boolean
  readonly output: string
}

export async function validateRulesYaml(
  yamlText: string,
  promtoolPath: string
): Promise<RulesValidationResult> {
  const dir = mkdtempSync(join(tmpdir(), "promtool-rules-"))
  const rulesPath = join(dir, "rules.yml")
  try {
    writeFileSync(rulesPath, yamlText)
    const proc = Bun.spawn([promtoolPath, "check", "rules", rulesPath], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    const output = `${stdout}${stderr}`.trim()
    return { ok: exitCode === 0, output }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export const FIRE_PATH_PROOF_RULES = `groups:
  - name: promtool-test-rules-self-proof
    rules:
      - alert: PromtoolSelfProofAlert
        expr: promtool_self_proof_metric > 100
        labels:
          severity: warning
        annotations:
          summary: "self-proof alert"
`

export const FIRE_PATH_PROOF_FIXTURE = `rule_files:
  - ${RULES_FILENAME}

evaluation_interval: 1m

tests:
  - name: asserts the proof alert fires while its condition is provably false
    interval: 1m
    input_series:
      - series: 'promtool_self_proof_metric'
        values: 0+0x10
    alert_rule_test:
      - eval_time: 5m
        alertname: PromtoolSelfProofAlert
        exp_alerts:
          - exp_labels:
              severity: warning
            exp_annotations:
              summary: "self-proof alert"
`

export const FIRE_PATH_PROOF_WIRING_FIXTURE = `rule_files:
  - ${RULES_FILENAME}

evaluation_interval: 1m

tests:
  - name: the proof alert fires when its condition holds
    interval: 1m
    input_series:
      - series: 'promtool_self_proof_metric'
        values: 200+0x10
    alert_rule_test:
      - eval_time: 5m
        alertname: PromtoolSelfProofAlert
        exp_alerts:
          - exp_labels:
              severity: warning
            exp_annotations:
              summary: "self-proof alert"
`

const RuleGroups = z.object({
  groups: z
    .array(z.object({ rules: z.array(z.record(z.string(), z.unknown())) }).loose())
    .optional(),
})

export function withoutAnnotations(rulesYaml: string): string {
  const doc = RuleGroups.parse(parse(rulesYaml))
  for (const group of doc.groups ?? []) {
    for (const rule of group.rules) delete rule.annotations
  }
  return stringify(doc)
}

export async function runRuleUnitTests(
  rulesYaml: string,
  fixturePaths: readonly string[],
  promtoolPath: string
): Promise<RulesValidationResult> {
  const names = fixturePaths.map((p) => basename(p))
  if (new Set(names).size !== names.length) {
    throw new Error(
      `runRuleUnitTests: fixture basenames must be unique (they are staged into one ` +
        `directory); got: ${names.join(", ")}`
    )
  }
  const dir = mkdtempSync(join(tmpdir(), "promtool-test-rules-"))
  try {
    writeFileSync(join(dir, RULES_FILENAME), rulesYaml)
    const staged = fixturePaths.map((src) => {
      const dest = join(dir, basename(src))
      copyFileSync(src, dest)
      return dest
    })
    const proc = Bun.spawn([promtoolPath, "test", "rules", ...staged], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    const output = `${stdout}${stderr}`.trim()
    return { ok: exitCode === 0, output }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export async function runInlineRuleUnitTest(
  rulesYaml: string,
  fixtureYaml: string,
  promtoolPath: string
): Promise<RulesValidationResult> {
  const dir = mkdtempSync(join(tmpdir(), "promtool-inline-fixture-"))
  try {
    const fixturePath = join(dir, "self-proof.test.yml")
    writeFileSync(fixturePath, fixtureYaml)
    return await runRuleUnitTests(rulesYaml, [fixturePath], promtoolPath)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}
