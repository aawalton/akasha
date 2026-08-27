import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
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

function lokiGroup() {
  return alertsSchema.parse(parse(ALERT_RULES)).groups.find((g) => g.name === "loki-health")
}

function rule(name: string): Rule | undefined {
  return lokiGroup()?.rules.find((r) => r.alert === name)
}

describe("synth-alerts loki-health group (#16370)", () => {
  test("the group carries exactly the four rules, in order", () => {
    const g = lokiGroup()
    expect(g).toBeDefined()
    expect(g?.rules.map((r) => r.alert)).toEqual([
      "LokiScrapeJobAbsent",
      "LokiIngesterStreamsHigh",
      "LokiRequestErrorRateHigh",
      "LokiPushLatencyHigh",
    ])
  })

  test("LokiScrapeJobAbsent guards the gap TargetDown structurally cannot see", () => {
    const r = rule("LokiScrapeJobAbsent")
    expect(r).toBeDefined()
    expect(r?.expr).toBe('absent(up{job="loki"})')
    expect(r?.for).toBe("30m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("LokiIngesterStreamsHigh clears the measured peak and aggregates away churning labels", () => {
    const r = rule("LokiIngesterStreamsHigh")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("loki_ingester_memory_streams")
    expect(r?.expr).toContain("> 10000")
    expect(r?.expr).toContain("max by (tenant)")
    expect(r?.for).toBe("30m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("LokiRequestErrorRateHigh is a ratio with an absolute floor and excludes startup probes", () => {
    const r = rule("LokiRequestErrorRateHigh")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("> 0.05")
    expect(r?.expr).toContain("and on()")
    expect(r?.expr).toContain('route!="ready"')
    expect(r?.expr).toContain('status_code=~"5.."')
    expect(r?.for).toBe("10m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("LokiPushLatencyHigh scopes to the push path, not ad-hoc queries", () => {
    const r = rule("LokiPushLatencyHigh")
    expect(r).toBeDefined()
    expect(r?.expr).toContain("histogram_quantile(0.99")
    expect(r?.expr).toContain("loki_api_v1_push")
    expect(r?.expr).not.toContain("query_range")
    expect(r?.expr).toContain("> 1")
    expect(r?.for).toBe("15m")
    expect(r?.labels?.["severity"]).toBe("warning")
  })

  test("no duplicate of a rule another subsystem already owns", () => {
    expect(lokiGroup()).toBeDefined()
    const names = lokiGroup()?.rules.map((r) => r.alert) ?? []
    expect(names.some((n) => n?.includes("Memory"))).toBe(false)
    expect(names).not.toContain("LokiDown")
    expect(names.some((n) => n?.includes("IngestRate"))).toBe(false)
  })
})
