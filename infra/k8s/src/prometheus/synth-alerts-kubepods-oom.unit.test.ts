import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import {
  ALERT_COLLECTOR_STALE,
  ALERT_SLICE_OOM_KILL,
  ALERT_SLICE_OOM_KILL_ABSENT,
  METRIC_HIER_OOM_KILL,
  METRIC_LOCAL_OOM_KILL,
  PROM_FILE_PATH,
} from "./kubepods-oom-constants"
import { ALERT_RULES } from "./synth-alerts"
import { COLLECTOR_STALE_SECONDS, OOM_WINDOW } from "./synth-alerts-kubepods-oom"

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

describe("kubepods parent-slice OOM tripwire (#16219)", () => {
  test("the rules land in one coarse-identity group", () => {
    const groups = alertsSchema.parse(parse(ALERT_RULES)).groups
    const g = groups.find((x) => x.name === "kubepods-slice-oom")
    expect(g).toBeDefined()
    expect(g?.rules.map((r) => r.alert)).toEqual([
      ALERT_SLICE_OOM_KILL,
      ALERT_SLICE_OOM_KILL_ABSENT,
      ALERT_COLLECTOR_STALE,
    ])
  })

  test("KubepodsSliceOOMKill fires on a rolling window over the .local counter", () => {
    const r = rule(ALERT_SLICE_OOM_KILL)
    expect(r).toBeDefined()
    expect(r?.expr).toBe(`increase(${METRIC_LOCAL_OOM_KILL}[${OOM_WINDOW}]) > 0`)
    expect(r?.expr).not.toContain(METRIC_HIER_OOM_KILL)
    expect(r?.for ?? "0m").toBe("0m")
    expect(r?.keep_firing_for).toBeUndefined()
    expect(r?.labels?.["severity"]).toBe("critical")
    expect(Object.keys(r?.labels ?? {})).toEqual(["severity"])
  })

  test("KubepodsSliceOOMKillMetricAbsent guards the tripwire's own series", () => {
    const r = rule(ALERT_SLICE_OOM_KILL_ABSENT)
    expect(r).toBeDefined()
    expect(r?.expr).toBe(`absent(${METRIC_LOCAL_OOM_KILL})`)
    expect(r?.for).toBe("15m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("KubepodsOomCollectorStale watches the textfile mtime, the only unconditional witness", () => {
    const r = rule(ALERT_COLLECTOR_STALE)
    expect(r).toBeDefined()
    expect(r?.expr).toBe(
      `time() - node_textfile_mtime_seconds{file="${PROM_FILE_PATH}"} > ${COLLECTOR_STALE_SECONDS}`
    )
    expect(r?.for ?? "0m").toBe("0m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })
})
