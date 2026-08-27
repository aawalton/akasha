import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema"
import {
  buildDoctrinePackUpdate,
  GmDoctrinePackSchema,
  withDoctrinePack,
} from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("withDoctrinePack — gate census (#15091)", () => {
  test("the pack's gateDimensions are copied wholesale into the seeded context", () => {
    const seeded = withDoctrinePack(undefined, FIXTURE_PACK)
    expect(seeded.gateDimensions).toEqual(FIXTURE_PACK.gateDimensions)
  })

  test("refresh REPLACES the adopted census with the current pack's (no per-game merge)", () => {
    const stale: GmContext = {
      policies: [],
      gateDimensions: [{ id: "retired-dimension", title: "removed in a later version" }],
    }
    const refreshed = withDoctrinePack(stale, FIXTURE_PACK)
    expect(refreshed.gateDimensions).toEqual(FIXTURE_PACK.gateDimensions)
  })

  test("a pack with no census (pre-#15091 default) adopts an empty census — the opt-in skip state", () => {
    const packNoCensus = { ...FIXTURE_PACK, gateDimensions: [] }
    expect(withDoctrinePack(undefined, packNoCensus).gateDimensions).toEqual([])
  })
})

describe("GmDoctrinePackSchema — gateDimensions (#15091)", () => {
  test("an absent gateDimensions key parses to [] (additive, live-row-safe)", () => {
    const { gateDimensions, ...withoutCensus } = FIXTURE_PACK
    const parsed = GmDoctrinePackSchema.parse(withoutCensus)
    expect(parsed.gateDimensions).toEqual([])
  })

  test("a gateDimension with an unknown key is rejected (strict)", () => {
    expect(
      GmDoctrinePackSchema.safeParse({
        ...FIXTURE_PACK,
        gateDimensions: [{ id: "x", title: "X", foo: 1 }],
      }).success
    ).toBe(false)
  })

  test("a gateDimensions change WITHOUT a version bump is rejected by the gate", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      gateDimensions: [{ id: "new-dim", title: "New" }],
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toContain("doctrineVersion")
  })

  test("a gateDimensions change WITH a version bump is accepted and flags contentChanged", () => {
    const r = buildDoctrinePackUpdate(FIXTURE_PACK, {
      doctrineVersion: 7,
      gateDimensions: [{ id: "new-dim", title: "New" }],
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.contentChanged).toBe(true)
      expect(r.pack.gateDimensions).toEqual([{ id: "new-dim", title: "New" }])
    }
  })
})
