import { describe, expect, test } from "bun:test"
import type { DiscoveredEndpoint } from "./harness"
import { parseOnlyFilter, selectEndpoints } from "./harness"

function endpoint(name: string): DiscoveredEndpoint {
  return { file: `${name}.ts`, descriptor: { name, scopes: [], probes: [] } }
}

const DISCOVERED: DiscoveredEndpoint[] = [
  endpoint("users"),
  endpoint("follow"),
  endpoint("library"),
  endpoint("player"),
]

describe("parseOnlyFilter", () => {
  test("returns null when --only is absent (⇒ run every family)", () => {
    expect(parseOnlyFilter(["exercise", "--include-manual"])).toBeNull()
  })

  test("splits a csv value and trims whitespace", () => {
    const only = parseOnlyFilter(["--only", "users, follow ,library"])
    expect(only).not.toBeNull()
    expect([...(only ?? [])].sort()).toEqual(["follow", "library", "users"])
  })

  test("a missing value after --only yields an empty set (matches nothing, loudly)", () => {
    expect(parseOnlyFilter(["--only"])).toEqual(new Set())
  })

  test("ignores empty segments from stray commas", () => {
    expect(parseOnlyFilter(["--only", "users,,follow,"])).toEqual(new Set(["users", "follow"]))
  })
})

describe("selectEndpoints", () => {
  test("null filter passes every family through unchanged", () => {
    expect(selectEndpoints(DISCOVERED, null)).toHaveLength(DISCOVERED.length)
  })

  test("keeps only families whose name is in the requested set", () => {
    const selected = selectEndpoints(DISCOVERED, new Set(["users", "library"]))
    expect(selected.map((e) => e.descriptor.name).sort()).toEqual(["library", "users"])
  })

  test("an unmatched name simply selects nothing for it (caller reports unmatched)", () => {
    const selected = selectEndpoints(DISCOVERED, new Set(["nope"]))
    expect(selected).toHaveLength(0)
  })
})
