import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import {
  ALERT_CEILING,
  ALERT_HEARTBEAT_ABSENT,
  CEILING_SECONDS,
  EPISODIC_KEEP_FIRING_FOR,
  METRIC_CEILING,
  METRIC_HEARTBEAT,
} from "./query-perf-constants"
import { ALERT_RULES } from "./synth-alerts"

const ruleSchema = z.object({
  alert: z.string().optional(),
  expr: z.string().optional(),
  for: z.string().optional(),
  keep_firing_for: z.string().optional(),
  labels: z.record(z.string(), z.string()).optional(),
  annotations: z.record(z.string(), z.string()).optional(),
})
const alertsSchema = z.object({
  groups: z.array(z.object({ rules: z.array(ruleSchema) })),
})

type Rule = z.infer<typeof ruleSchema>

function alertRules(): readonly Rule[] {
  return alertsSchema.parse(parse(ALERT_RULES)).groups.flatMap((g) => g.rules)
}

function rule(name: string): Rule | undefined {
  return alertRules().find((r) => r.alert === name)
}

describe("synth-alerts query-performance rules (#14351)", () => {
  test("hard-ceiling alert fires immediately above the ceiling, per (queryid, role)", () => {
    const r = rule(ALERT_CEILING)
    expect(r).toBeDefined()
    expect(r?.expr).toContain(METRIC_CEILING)
    expect(r?.expr).toContain(`> ${CEILING_SECONDS}`)
    expect(r?.expr).toContain("max by (queryid, role)")
    expect(r?.for ?? "0m").toBe("0m")
    expect(r?.labels?.["severity"]).toBe("critical")
    expect(r?.keep_firing_for).toBe(EPISODIC_KEEP_FIRING_FOR)
  })

  test("evaluator absent-guard fires when the query-perf metric path goes dark", () => {
    const r = rule(ALERT_HEARTBEAT_ABSENT)
    expect(r).toBeDefined()
    expect(r?.expr).toContain(`absent(${METRIC_HEARTBEAT})`)
    expect(r?.labels?.["severity"]).toBe("warning")
  })
})

describe("annotation clauses system-wide (#16099)", () => {
  test("no annotation carries the unfounded remediation directive", () => {
    const offenders = alertRules()
      .filter((r) =>
        r.annotations?.["description"]?.includes("Fix with a follow-up performance project")
      )
      .map((r) => r.alert)
    expect(offenders).toEqual([])
  })
})
