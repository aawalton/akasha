import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema"
import {
  GM_DOCTRINE_POLICY_ID_PREFIX,
  preserveDoctrineOnReplace,
  withDoctrinePack,
} from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("preserveDoctrineOnReplace — the --gm-context REPLACE symmetry (#15233)", () => {
  const SEEDED = withDoctrinePack(undefined, FIXTURE_PACK)

  test("a pack-free payload preserves the doctrine:* policies, doctrineVersion, and gate census; per-game rides on top", () => {
    const payload: GmContext = {
      policies: [{ id: "house-rule", title: "House rule", bands: ["x"] }],
      turnContract: { obligations: [{ id: "o1", requirement: "publish cleanly" }] },
    }
    const preserved = preserveDoctrineOnReplace(payload, SEEDED)
    expect(preserved.policies.slice(0, FIXTURE_PACK.policies.length)).toEqual(FIXTURE_PACK.policies)
    expect(preserved.policies.at(-1)).toEqual({
      id: "house-rule",
      title: "House rule",
      bands: ["x"],
    })
    expect(preserved.doctrineVersion).toBe(FIXTURE_PACK.doctrineVersion)
    expect(preserved.gateDimensions).toEqual(FIXTURE_PACK.gateDimensions)
    expect(preserved.turnContract).toEqual(payload.turnContract)
  })

  test("a doctrine:* policy smuggled into the payload is DROPPED — a game never authors pack doctrine", () => {
    const payload: GmContext = {
      policies: [
        { id: "doctrine:alpha", title: "a stale hand-rolled pack policy", bands: [] },
        { id: "house-rule", title: "House rule", bands: [] },
      ],
    }
    const preserved = preserveDoctrineOnReplace(payload, SEEDED)
    expect(preserved.policies.filter((p) => p.id.startsWith(GM_DOCTRINE_POLICY_ID_PREFIX))).toEqual(
      FIXTURE_PACK.policies
    )
    expect(preserved.policies.filter((p) => p.id === "house-rule").length).toBe(1)
  })

  test("a caller cannot downgrade the doctrineVersion via a --gm-context payload", () => {
    const payload: GmContext = { policies: [], doctrineVersion: 2 }
    const preserved = preserveDoctrineOnReplace(payload, SEEDED)
    expect(preserved.doctrineVersion).toBe(FIXTURE_PACK.doctrineVersion)
  })

  test("a caller cannot swap the gate census via a --gm-context payload", () => {
    const payload: GmContext = {
      policies: [],
      gateDimensions: [{ id: "forged-dim", title: "Forged" }],
    }
    const preserved = preserveDoctrineOnReplace(payload, SEEDED)
    expect(preserved.gateDimensions).toEqual(FIXTURE_PACK.gateDimensions)
  })

  test("a pre-pack current (no doctrineVersion) rides the payload through structurally unchanged", () => {
    const payload: GmContext = {
      policies: [{ id: "house-rule", title: "House rule", bands: [] }],
      turnContract: { obligations: [] },
    }
    const preserved = preserveDoctrineOnReplace(payload, { policies: [] })
    expect(preserved.policies).toEqual(payload.policies)
    expect(preserved.doctrineVersion).toBeUndefined()
    expect(preserved.gateDimensions).toBeUndefined()
    expect(preserved.turnContract).toEqual(payload.turnContract)
  })

  test("an absent current also rides the payload through", () => {
    const payload: GmContext = { policies: [{ id: "p", title: "P", bands: [] }] }
    expect(preserveDoctrineOnReplace(payload, undefined)).toEqual(payload)
  })
})
