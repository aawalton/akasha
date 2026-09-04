import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema/gm-context-schema.module.code.ts"
import {
  buildDoctrinePackUpdate,
  dropsStampedDoctrineVersion,
  GM_DOCTRINE_PACK_EXTERNAL_ID,
  GM_DOCTRINE_POLICY_ID_PREFIX,
  parseDoctrinePack,
  preserveDoctrineOnReplace,
  withDoctrinePack,
} from "./gm-doctrine-pack.module.code.ts"
import { FIXTURE_PACK } from "./gm-doctrine-pack.module.test-fixtures.ts"

const PER_GAME_POLICY = { id: "house:no-dice", title: "No dice", bands: [] }

describe("the pack's names", () => {
  test("a policy the pack owns is known by its id prefix", () => {
    expect(GM_DOCTRINE_POLICY_ID_PREFIX).toBe("doctrine:")
    expect(FIXTURE_PACK.policies.every((p) => p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX))).toBe(
      true
    )
  })

  test("the pack is stored under one external id", () => {
    expect(GM_DOCTRINE_PACK_EXTERNAL_ID).toBe("gm-doctrine-pack")
  })
})

describe("parseDoctrinePack", () => {
  test("the fixture pack parses", () => {
    expect(parseDoctrinePack(FIXTURE_PACK).doctrineVersion).toBe(6)
  })

  test("a pack with no sheet template is refused", () => {
    expect(() => parseDoctrinePack({ doctrineVersion: 1, policies: [] })).toThrow()
  })
})

describe("withDoctrinePack", () => {
  test("the pack's policies lead and the game's own follow", () => {
    const merged = withDoctrinePack({ policies: [PER_GAME_POLICY] }, FIXTURE_PACK)
    expect(merged.policies.map((p) => p.id)).toEqual([
      "doctrine:alpha",
      "doctrine:beta",
      "house:no-dice",
    ])
  })

  test("a stale doctrine policy on the game is dropped for the pack's", () => {
    const stale = { id: "doctrine:alpha", title: "Stale", bands: [] }
    const merged = withDoctrinePack({ policies: [stale, PER_GAME_POLICY] }, FIXTURE_PACK)
    expect(merged.policies.filter((p) => p.id === "doctrine:alpha")).toHaveLength(1)
    expect(merged.policies[0]?.title).toBe("Alpha")
  })

  test("the pack stamps its version and its gate dimensions on the context", () => {
    const merged = withDoctrinePack(undefined, FIXTURE_PACK)
    expect(merged.doctrineVersion).toBe(6)
    expect(merged.gateDimensions?.map((d) => d.id)).toEqual(["window-pane-prose", "system-voice"])
  })

  test("a pack carrying no tally catalog leaves none behind", () => {
    expect(withDoctrinePack(undefined, FIXTURE_PACK).tallyCatalog).toBe(undefined)
  })
})

describe("preserveDoctrineOnReplace", () => {
  const current: GmContext = withDoctrinePack({ policies: [PER_GAME_POLICY] }, FIXTURE_PACK)

  test("replacing a context leaves the doctrine the pack owns standing", () => {
    const replaced = preserveDoctrineOnReplace({ policies: [PER_GAME_POLICY] }, current)
    expect(replaced.policies.map((p) => p.id)).toEqual([
      "doctrine:alpha",
      "doctrine:beta",
      "house:no-dice",
    ])
  })

  test("a doctrine policy the incoming context invents is dropped", () => {
    const replaced = preserveDoctrineOnReplace(
      { policies: [{ id: "doctrine:forged", title: "Forged", bands: [] }] },
      current
    )
    expect(replaced.policies.map((p) => p.id)).toEqual(["doctrine:alpha", "doctrine:beta"])
  })

  test("the stamped version and gate dimensions survive the replace", () => {
    const replaced = preserveDoctrineOnReplace({ policies: [] }, current)
    expect(replaced.doctrineVersion).toBe(6)
    expect(replaced.gateDimensions).toHaveLength(2)
  })

  test("with nothing current the incoming context stands alone", () => {
    const replaced = preserveDoctrineOnReplace({ policies: [PER_GAME_POLICY] }, null)
    expect(replaced.policies).toEqual([PER_GAME_POLICY])
    expect(replaced.doctrineVersion).toBe(undefined)
  })
})

describe("dropsStampedDoctrineVersion", () => {
  test("losing a stamped version is caught", () => {
    expect(
      dropsStampedDoctrineVersion({ policies: [], doctrineVersion: 6 }, { policies: [] })
    ).toBe(true)
  })

  test("keeping the version is no drop", () => {
    expect(
      dropsStampedDoctrineVersion(
        { policies: [], doctrineVersion: 6 },
        { policies: [], doctrineVersion: 6 }
      )
    ).toBe(false)
  })

  test("never having had one is no drop", () => {
    expect(dropsStampedDoctrineVersion({ policies: [] }, { policies: [] })).toBe(false)
    expect(dropsStampedDoctrineVersion(null, null)).toBe(false)
  })
})

describe("buildDoctrinePackUpdate", () => {
  test("a patch changing nothing needs no version bump", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, {})
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.contentChanged).toBe(false)
    expect(built.pack.doctrineVersion).toBe(6)
  })

  test("changing content with a raised version lands", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, {
      doctrineVersion: 7,
      policies: [{ id: "doctrine:alpha", title: "Alpha", description: "a", bands: ["a1"] }],
    })
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.contentChanged).toBe(true)
    expect(built.pack.doctrineVersion).toBe(7)
  })

  test("changing content without raising the version is refused", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, { policies: [] })
    expect(built.ok).toBe(false)
    if (built.ok) return
    expect(built.error).toContain("doctrineVersion")
  })

  test("an equal version is not a bump", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, { doctrineVersion: 6, policies: [] })
    expect(built.ok).toBe(false)
  })

  test("a patch the schema refuses comes back as a fault", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, { doctrineVersion: -1 })
    expect(built.ok).toBe(false)
    if (built.ok) return
    expect(built.error).toContain("invalid patch")
  })

  test("what the patch leaves out is taken from the pack standing", () => {
    const built = buildDoctrinePackUpdate(FIXTURE_PACK, { doctrineVersion: 9 })
    if (!built.ok) throw new Error(built.error)
    expect(built.pack.policies).toEqual(FIXTURE_PACK.policies)
    expect(built.pack.sheetTemplate).toEqual(FIXTURE_PACK.sheetTemplate)
  })
})
