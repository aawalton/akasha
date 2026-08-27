import { describe, expect, test } from "bun:test"
import type { GmContext } from "../gm-context-schema"
import { withDoctrinePack } from "../gm-doctrine-pack"
import { FIXTURE_PACK } from "./fixtures"

describe("withDoctrinePack — idempotence", () => {
  test("applying twice deep-equals applying once", () => {
    const existing: GmContext = {
      policies: [{ id: "house-linter", title: "per-game", bands: ["x"] }],
      role: "arbiter",
    }
    const once = withDoctrinePack(existing, FIXTURE_PACK)
    const twice = withDoctrinePack(once, FIXTURE_PACK)
    expect(twice).toEqual(once)
  })
})
