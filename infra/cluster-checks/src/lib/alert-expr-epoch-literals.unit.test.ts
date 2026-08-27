import { describe, expect, test } from "bun:test"
import { codeModule } from "../../../../tools/lib/code-import.ts"
import { EPOCH_FLOOR, parseAlertRules, scanAlertEpochLiterals } from "./alert-expr-epoch-literals.ts"
import { HISTORICAL_DEFECT_RULES } from "./promtool-rules.ts"
import { getRepoRoot } from "./repo-root.ts"

const COMPOSED_ALERTS_SITE = "packages/infra/k8s/src/prometheus/synth-alerts.ts"

interface SynthAlerts {
  readonly ALERT_RULES: string
}

async function composedAlertRules(): Promise<string> {
  return (await codeModule<SynthAlerts>(COMPOSED_ALERTS_SITE, getRepoRoot())).ALERT_RULES
}

function ruleDoc(expr: string): string {
  return `groups:
  - name: fixture
    rules:
      - alert: Fixture
        expr: ${expr}
        for: 5m
`
}

describe("scanAlertEpochLiterals — fires on a wall-clock gate", () => {
  test("flags the #15577 historical defect, naming the rule and the literal", () => {
    const v = scanAlertEpochLiterals(HISTORICAL_DEFECT_RULES)
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("alert-expr-epoch-literal")
    expect(v[0]?.rule).toBe("MacbookInferencePoolUnreachable")
    expect(v[0]?.literal).toBe("1784966400")
  })

  test("flags the vector()-wrapped form the named constant expanded to", () => {
    const v = scanAlertEpochLiterals(
      ruleDoc("(macbook_inference_pool_serving == 0) and on() (vector(time()) >= 1784966400)")
    )
    expect(v.map((x) => x.literal)).toEqual(["1784966400"])
  })

  test("flags a scientific-notation epoch", () => {
    expect(scanAlertEpochLiterals(ruleDoc("some_gauge > 1.7e9")).map((x) => x.literal)).toEqual([
      "1.7e9",
    ])
  })

  test("flags a millisecond epoch — no upper bound to slip past", () => {
    expect(
      scanAlertEpochLiterals(ruleDoc("some_gauge > 1784966400000")).map((x) => x.literal)
    ).toEqual(["1784966400000"])
  })

  test("flags an epoch in a recording rule, not just an alert", () => {
    const doc = `groups:
  - name: fixture
    rules:
      - record: job:thing:rate
        expr: sum(rate(x[5m])) and on() (vector(time()) >= 1784966400)
`
    expect(scanAlertEpochLiterals(doc).map((x) => x.rule)).toEqual(["job:thing:rate"])
  })
})

describe("scanAlertEpochLiterals — clean on legitimate expressions", () => {
  test("the composed ALERT_RULES carries no wall-clock cutover", async () => {
    expect(scanAlertEpochLiterals(await composedAlertRules())).toEqual([])
  })

  test("relative time() idioms pass — the nine live uses are all differences", () => {
    const exprs = [
      "time() - kube_cronjob_status_last_successful_time > 86400",
      "certmanager_certificate_expiration_timestamp_seconds - time() < 21 * 24 * 3600",
      "claude_account_token_expiry_seconds - time() < -5400",
      "time() - barman_last_available_backup_timestamp > 26 * 3600",
    ]
    for (const expr of exprs) expect(scanAlertEpochLiterals(ruleDoc(expr))).toEqual([])
  })

  test("the product idiom keeps a large threshold expressible", () => {
    expect(scanAlertEpochLiterals(ruleDoc("some_gauge > 30 * 24 * 3600"))).toEqual([])
  })

  test("digits inside metric and label identifiers are not literals", () => {
    const expr = 'pg_stat_replication{application_name=~"postgres-cnpg-2.*"} > 0.5'
    expect(scanAlertEpochLiterals(ruleDoc(expr))).toEqual([])
  })

  test("a value one below the floor passes; the floor itself fires", () => {
    expect(scanAlertEpochLiterals(ruleDoc(`x > ${EPOCH_FLOOR - 1}`))).toEqual([])
    expect(scanAlertEpochLiterals(ruleDoc(`x > ${EPOCH_FLOOR}`))).toHaveLength(1)
  })
})

describe("scanAlertEpochLiterals — a byte size is not an instant", () => {
  test("mebibyte-aligned sizes above the floor pass, at every multiple", () => {
    const sizes = [1024 * 1024 * 1024, 1536 * 1024 * 1024, 4096 * 1024 * 1024]
    for (const size of sizes) expect(scanAlertEpochLiterals(ruleDoc(`x >= ${size}`))).toEqual([])
  })

  test("a value one off a mebibyte boundary still fires — the test is alignment, not size", () => {
    const oneGib = 1024 * 1024 * 1024
    expect(scanAlertEpochLiterals(ruleDoc(`x >= ${oneGib}`))).toEqual([])
    expect(scanAlertEpochLiterals(ruleDoc(`x >= ${oneGib + 1}`))).toHaveLength(1)
  })

  test("the exemption does not reach the incident, whose epoch is unaligned", () => {
    expect(scanAlertEpochLiterals(HISTORICAL_DEFECT_RULES)).toHaveLength(1)
  })
})

describe("parseAlertRules — the unit the detector judges", () => {
  test("counts every rule the composed corpus carries, across its groups", async () => {
    const rules = parseAlertRules(await composedAlertRules())
    expect(rules.length).toBeGreaterThan(1)
    expect(new Set(rules.map((r) => r.group)).size).toBeGreaterThan(1)
  })

  test("a document carrying no groups yields no members at all", () => {
    expect(parseAlertRules("groups: []")).toEqual([])
  })

  test("a rule with no expr is still a member — it was read, and held nothing to judge", () => {
    const doc = `groups:
  - name: fixture
    rules:
      - alert: NoExpr
        for: 5m
`
    const rules = parseAlertRules(doc)
    expect(rules.map((r) => r.name)).toEqual(["NoExpr"])
    expect(scanAlertEpochLiterals(doc)).toEqual([])
  })
})
