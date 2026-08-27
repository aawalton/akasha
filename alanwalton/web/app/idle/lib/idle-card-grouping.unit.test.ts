import { describe, expect, test } from "bun:test"
import type { PageRow } from "@shared/pages-ui/view-engine/page-row"
import { bucketPageRowsByGroup } from "./idle-card-grouping"
import { IDLE_CARD_PROPERTY_DEFINITIONS } from "./idle-card-page-type"

function row(id: string, lockState: string): PageRow {
  return { _id: id, lockState }
}

describe("bucketPageRowsByGroup", () => {
  test("groups rows by the lockState select into labeled Locked/Unlocked sections", () => {
    const sections = bucketPageRowsByGroup(
      [row("a", "locked"), row("b", "unlocked"), row("c", "locked")],
      "lockState",
      IDLE_CARD_PROPERTY_DEFINITIONS
    )
    expect(sections).toBeDefined()
    const byKey = new Map((sections ?? []).map((s) => [s.key, s]))
    expect(byKey.get("locked")?.label).toBe("Locked")
    expect(byKey.get("locked")?.items.map((r) => r._id)).toEqual(["a", "c"])
    expect(byKey.get("unlocked")?.label).toBe("Unlocked")
    expect(byKey.get("unlocked")?.items.map((r) => r._id)).toEqual(["b"])
  })

  test("section order follows first-seen key order (deterministic across renders)", () => {
    const sections = bucketPageRowsByGroup(
      [row("a", "unlocked"), row("b", "locked")],
      "lockState",
      IDLE_CARD_PROPERTY_DEFINITIONS
    )
    expect((sections ?? []).map((s) => s.key)).toEqual(["unlocked", "locked"])
  })

  test("unknown / non-groupable property id → undefined (caller renders flat list)", () => {
    expect(
      bucketPageRowsByGroup(
        [row("a", "locked")],
        "boostedRatePerSec",
        IDLE_CARD_PROPERTY_DEFINITIONS
      )
    ).toBeUndefined()
    expect(
      bucketPageRowsByGroup([row("a", "locked")], "nonexistent", IDLE_CARD_PROPERTY_DEFINITIONS)
    ).toBeUndefined()
  })
})
