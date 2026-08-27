import { describe, expect, test } from "bun:test"
import { parse } from "yaml"
import { z } from "zod"
import {
  CEILING_EMIT_FLOOR_SECONDS,
  CEILING_EXCLUDED_ROLES,
  QUERY_KEY_CEILING,
  QUERY_KEY_HEARTBEAT,
} from "./query-perf-constants"
import { QUERY_PERF_QUERIES_YAML } from "./synth-exporters-query-perf"

const queryBlockSchema = z.object({
  query: z.string(),
  metrics: z.array(
    z.record(z.string(), z.object({ usage: z.string(), description: z.string() }).passthrough())
  ),
  cache_seconds: z.number().optional(),
})
const yamlSchema = z.record(z.string(), queryBlockSchema)

function blocks(): Record<string, z.infer<typeof queryBlockSchema>> {
  return yamlSchema.parse(parse(QUERY_PERF_QUERIES_YAML))
}

describe("query-perf exporter YAML (#14351)", () => {
  test("declares the two live query-perf blocks", () => {
    const b = blocks()
    expect(Object.keys(b).sort()).toEqual([QUERY_KEY_CEILING, QUERY_KEY_HEARTBEAT].sort())
  })

  test("no block reads a table the retired stats bridger used to write", () => {
    for (const block of Object.values(blocks())) {
      expect(block.query).not.toContain("db_query_stats")
      expect(block.query).not.toContain("db_query_fingerprints")
    }
  })

  test("ceiling block: live pg_stat_activity, excludes admin/system roles, emit floor", () => {
    const q = blocks()[QUERY_KEY_CEILING]?.query ?? ""
    expect(q).toContain("pg_stat_activity")
    expect(q).toContain("query_id")
    expect(q).toContain("seconds")
    for (const role of CEILING_EXCLUDED_ROLES) {
      expect(q).toContain(role)
    }
    expect(q).toContain(String(CEILING_EMIT_FLOOR_SECONDS))
    expect(blocks()[QUERY_KEY_CEILING]?.cache_seconds).toBeUndefined()
  })

  test("heartbeat block: always-present liveness gauge", () => {
    const q = blocks()[QUERY_KEY_HEARTBEAT]?.query ?? ""
    expect(q).toContain("1")
    expect(blocks()[QUERY_KEY_HEARTBEAT]?.metrics?.length).toBeGreaterThan(0)
  })
})
