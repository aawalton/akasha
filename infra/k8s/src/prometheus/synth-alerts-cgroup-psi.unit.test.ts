import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import { ALERT_PSI_COLLECTOR_STALE, PSI_PROM_FILE_PATH } from "./cgroup-psi-constants"
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
  groups: z.array(z.object({ name: z.string(), rules: z.array(ruleSchema) })),
})

type Rule = z.infer<typeof ruleSchema>

function rule(name: string): Rule | undefined {
  return alertsSchema
    .parse(parse(ALERT_RULES))
    .groups.flatMap((g) => g.rules)
    .find((r) => r.alert === name)
}

describe("cgroup-PSI collector (#16327)", () => {
  test("the group holds the collector-liveness rule alone, wired into the composed alerts.yml", () => {
    const groups = alertsSchema.parse(parse(ALERT_RULES)).groups
    const g = groups.find((x) => x.name === "cgroup-psi")
    expect(g).toBeDefined()
    expect(g?.rules.map((r) => r.alert)).toEqual([ALERT_PSI_COLLECTOR_STALE])
  })

  test("CgroupPsiCollectorStale watches the textfile mtime by its FULL path, the only unconditional witness", () => {
    const r = rule(ALERT_PSI_COLLECTOR_STALE)
    expect(r).toBeDefined()
    expect(r?.expr).toBe(`time() - node_textfile_mtime_seconds{file="${PSI_PROM_FILE_PATH}"} > 300`)
    expect(r?.for).toBe("0m")
    expect(Object.keys(r?.labels ?? {})).toEqual(["severity"])
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("no rule anywhere orders a fleet-stopping act off worker-supervisor CPU pressure", () => {
    const all = alertsSchema.parse(parse(ALERT_RULES)).groups.flatMap((g) => g.rules)
    expect(all.map((r) => r.alert)).not.toContain("WorkerSupervisorCpuPressureHigh")
    expect(all.map((r) => r.alert)).not.toContain("WorkerSupervisorCpuPressureMetricAbsent")
    expect(all.filter((r) => r.expr?.includes("node_pod_cgroup_pressure_avg300_percent"))).toEqual(
      []
    )
  })
})
