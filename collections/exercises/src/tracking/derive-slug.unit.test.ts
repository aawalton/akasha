import { describe, expect, test } from "bun:test"
import { freeSlug, scheduleDaySlug, sessionSlugStem, setLogSlug, slugStem } from "./derive"

describe("sessionSlugStem", () => {
  test("names the day, the focus and the date, in the shape the migrated sessions carry", () => {
    expect(sessionSlugStem("friday", "pull", "2026-06-19")).toBe("friday-pull-2026-06-19")
  })

  test("a day with no focus is named by day and date alone", () => {
    expect(sessionSlugStem("sunday", undefined, "2026-06-21")).toBe("sunday-2026-06-21")
    expect(sessionSlugStem("sunday", "", "2026-06-21")).toBe("sunday-2026-06-21")
  })
})

describe("setLogSlug", () => {
  test("a set is named by its session, its movement and its number", () => {
    expect(setLogSlug("friday-pull-2026-06-19", "bent-over-two-dumbbell-row", 1)).toBe(
      "friday-pull-2026-06-19-bent-over-two-dumbbell-row-set-1"
    )
  })
})

describe("freeSlug", () => {
  test("an unclaimed stem is the slug", () => {
    expect(freeSlug("friday-pull-2026-06-19", new Set())).toBe("friday-pull-2026-06-19")
  })

  test("a claimed stem counts up rather than overwriting what stands", () => {
    expect(freeSlug("x", new Set(["x"]))).toBe("x-2")
    expect(freeSlug("x", new Set(["x", "x-2", "x-3"]))).toBe("x-4")
  })
})

describe("slugStem", () => {
  test("a title becomes the stem the migrated schedule carries", () => {
    expect(slugStem("Push/Pull/Legs")).toBe("push-pull-legs")
  })
})

describe("scheduleDaySlug", () => {
  test("a day is named beneath its schedule", () => {
    expect(scheduleDaySlug("push-pull-legs-3beb3d9a", "friday")).toBe(
      "push-pull-legs-3beb3d9a-friday"
    )
  })
})
