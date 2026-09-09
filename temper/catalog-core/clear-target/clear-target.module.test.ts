import { describe, expect, test } from "bun:test"
import { CATALOG_DOMAIN_KEYS } from "../domain-keys/domain-keys.module.code.ts"
import { decideClearTarget } from "./clear-target.module.code.ts"

const KEYS = CATALOG_DOMAIN_KEYS

describe("decideClearTarget", () => {
  test("an explicit 'all' is the only input that wipes every domain", () => {
    expect(decideClearTarget("all", KEYS)).toEqual({ kind: "all" })
  })

  test("a named domain wipes exactly that domain", () => {
    expect(decideClearTarget("traitResearchCatalog", KEYS)).toEqual({
      kind: "one",
      domainKey: "traitResearchCatalog",
    })
  })

  test("no target named resolves to wiping nothing", () => {
    expect(decideClearTarget(undefined, KEYS)).toEqual({ kind: "noTarget" })
    expect(decideClearTarget("", KEYS)).toEqual({ kind: "noTarget" })
  })

  test("an unrecognised word wipes nothing rather than falling back to everything", () => {
    expect(decideClearTarget("traitResearch", KEYS)).toEqual({
      kind: "unknown",
      requested: "traitResearch",
    })
    expect(decideClearTarget("ALL", KEYS)).toEqual({ kind: "unknown", requested: "ALL" })
  })

  test("no input other than the literal 'all' can ever decide 'all'", () => {
    const candidates = [
      undefined,
      "",
      "ALL",
      "All",
      "everything",
      "clear",
      "status",
      "123",
      "all ",
      ...KEYS,
    ]
    const wipeAll = candidates.filter((c) => decideClearTarget(c, KEYS).kind === "all")
    expect(wipeAll).toEqual([])
    expect(decideClearTarget("all", KEYS).kind).toBe("all")
  })

  test("every registered domain key is individually clearable", () => {
    const resolved = KEYS.filter((key) => {
      const decision = decideClearTarget(key, KEYS)
      return decision.kind === "one" && decision.domainKey === key
    })
    expect(resolved.length).toBe(KEYS.length)
    expect(KEYS.length).toBe(19)
  })
})
