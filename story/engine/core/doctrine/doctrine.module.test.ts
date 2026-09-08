import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema/gm-context-schema.module.code.ts"
import {
  buildDoctrineUpdate,
  DOCTRINE_POLICY_ID_PREFIX,
  dropsStampedDoctrineVersion,
  parseDoctrine,
  preserveDoctrineOnReplace,
  withDoctrine,
} from "./doctrine.module.code.ts"
import { FIXTURE_DOCTRINE } from "./doctrine.module.test-fixtures.ts"

const PER_GAME_POLICY = { id: "house:no-dice", title: "No dice", bands: [] }

describe("the policies a pack owns", () => {
  test("a policy the pack owns is known by its id prefix", () => {
    expect(FIXTURE_DOCTRINE.policies.every((p) => p.id.startsWith(DOCTRINE_POLICY_ID_PREFIX))).toBe(
      true
    )
  })
})

describe("parseDoctrine", () => {
  test("the fixture pack parses", () => {
    expect(parseDoctrine(FIXTURE_DOCTRINE).doctrineVersion).toBe(6)
  })

  test("a pack with no sheet template is refused", () => {
    expect(() => parseDoctrine({ doctrineVersion: 1, policies: [] })).toThrow()
  })
})

describe("withDoctrine", () => {
  test("the pack's policies lead and the game's own follow", () => {
    const merged = withDoctrine({ policies: [PER_GAME_POLICY] }, FIXTURE_DOCTRINE)
    expect(merged.policies.map((p) => p.id)).toEqual([
      "doctrine:alpha",
      "doctrine:beta",
      "house:no-dice",
    ])
  })

  test("a stale doctrine policy on the game is dropped for the pack's", () => {
    const stale = { id: "doctrine:alpha", title: "Stale", bands: [] }
    const merged = withDoctrine({ policies: [stale, PER_GAME_POLICY] }, FIXTURE_DOCTRINE)
    expect(merged.policies.filter((p) => p.id === "doctrine:alpha")).toHaveLength(1)
    expect(merged.policies[0]?.title).toBe("Alpha")
  })

  test("the pack stamps its version and its gate dimensions on the context", () => {
    const merged = withDoctrine(undefined, FIXTURE_DOCTRINE)
    expect(merged.doctrineVersion).toBe(6)
    expect(merged.gateDimensions?.map((d) => d.id)).toEqual(["window-pane-prose", "system-voice"])
  })

  test("a pack carrying no tally catalog leaves none behind", () => {
    expect(withDoctrine(undefined, FIXTURE_DOCTRINE).tallyCatalog).toBe(undefined)
  })
})

describe("preserveDoctrineOnReplace", () => {
  const current: GmContext = withDoctrine({ policies: [PER_GAME_POLICY] }, FIXTURE_DOCTRINE)

  test("replacing a context leaves the doctrine the pack owns in place", () => {
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

  test("with nothing current the incoming context is alone", () => {
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

describe("buildDoctrineUpdate", () => {
  test("a patch changing nothing needs no version bump", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, {})
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.contentChanged).toBe(false)
    expect(built.pack.doctrineVersion).toBe(6)
  })

  test("changing content with a raised version lands", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, {
      doctrineVersion: 7,
      policies: [{ id: "doctrine:alpha", title: "Alpha", description: "a", bands: ["a1"] }],
    })
    expect(built.ok).toBe(true)
    if (!built.ok) return
    expect(built.contentChanged).toBe(true)
    expect(built.pack.doctrineVersion).toBe(7)
  })

  test("changing content without raising the version is refused", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, { policies: [] })
    expect(built.ok).toBe(false)
    if (built.ok) return
    expect(built.error).toContain("doctrineVersion")
  })

  test("an equal version is not a bump", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, { doctrineVersion: 6, policies: [] })
    expect(built.ok).toBe(false)
  })

  test("a patch the schema refuses comes back as a fault", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, { doctrineVersion: -1 })
    expect(built.ok).toBe(false)
    if (built.ok) return
    expect(built.error).toContain("invalid patch")
  })

  test("what the patch leaves out is taken from the pack already there", () => {
    const built = buildDoctrineUpdate(FIXTURE_DOCTRINE, { doctrineVersion: 9 })
    if (!built.ok) throw new Error(built.error)
    expect(built.pack.policies).toEqual(FIXTURE_DOCTRINE.policies)
    expect(built.pack.sheetTemplate).toEqual(FIXTURE_DOCTRINE.sheetTemplate)
  })
})
