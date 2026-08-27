import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema"
import { GM_DOCTRINE_POLICY_ID_PREFIX, withDoctrinePack } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("withDoctrinePack — seed (create path)", () => {
  test("an absent context seeds a pure-doctrine context stamped with the pack version", () => {
    const seeded = withDoctrinePack(undefined, FIXTURE_PACK)
    expect(seeded.policies).toEqual(FIXTURE_PACK.policies)
    expect(seeded.doctrineVersion).toBe(FIXTURE_PACK.doctrineVersion)
    expect(seeded.turnContract).toBeUndefined()
  })

  test("per-game policies + turnContract + role are preserved, doctrine prepended", () => {
    const existing: GmContext = {
      policies: [{ id: "house-linter", title: "a per-game policy", bands: ["a", "b"] }],
      turnContract: { obligations: [{ id: "o1", requirement: "do the thing" }] },
      role: "the impartial arbiter",
    }
    const seeded = withDoctrinePack(existing, FIXTURE_PACK)
    expect(seeded.policies.slice(0, FIXTURE_PACK.policies.length)).toEqual(FIXTURE_PACK.policies)
    expect(seeded.policies.at(-1)).toEqual({
      id: "house-linter",
      title: "a per-game policy",
      bands: ["a", "b"],
    })
    expect(seeded.turnContract).toEqual(existing.turnContract)
    expect(seeded.role).toBe("the impartial arbiter")
    expect(seeded.doctrineVersion).toBe(FIXTURE_PACK.doctrineVersion)
  })
})

describe("withDoctrinePack — refresh (update path)", () => {
  test("a STALE pack policy (prefix-keyed) is stripped and the current pack re-added", () => {
    const stale: GmContext = {
      policies: [
        { id: "doctrine:retired-area", title: "an area removed in a later version", bands: [] },
        { id: "house-linter", title: "per-game", bands: [] },
      ],
      doctrineVersion: 0,
    }
    const refreshed = withDoctrinePack(stale, FIXTURE_PACK)
    const ids = refreshed.policies.map((p) => p.id)
    expect(ids).not.toContain("doctrine:retired-area")
    expect(ids.slice(0, FIXTURE_PACK.policies.length)).toEqual(
      FIXTURE_PACK.policies.map((p) => p.id)
    )
    expect(ids).toContain("house-linter")
    expect(refreshed.doctrineVersion).toBe(FIXTURE_PACK.doctrineVersion)
  })

  test("every merged pack policy id carries the namespace prefix", () => {
    const seeded = withDoctrinePack(undefined, FIXTURE_PACK)
    for (const p of seeded.policies) {
      expect(p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX)).toBe(true)
    }
  })
})
