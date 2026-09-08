import { describe, expect, test } from "bun:test"
import {
  freeSlug,
  nextSetNumber,
  scheduleDaySlug,
  sessionSlugStem,
  setLogSlug,
} from "./session-derive.module.code.ts"

describe("the number the next set takes", () => {
  test("starts at one where nothing is logged", () => {
    expect(nextSetNumber([])).toBe(1)
  })

  test("is one past the highest rather than one past the last", () => {
    expect(nextSetNumber([1, 2, 3])).toBe(4)
    expect(nextSetNumber([3, 1, 2])).toBe(4)
    expect(nextSetNumber([5])).toBe(6)
  })

  test("passes over a gap rather than filling it", () => {
    expect(nextSetNumber([1, 4])).toBe(5)
  })
})

describe("the stem a session's slug is built on", () => {
  test("says the day of the week, the focus and the day", () => {
    expect(sessionSlugStem("monday", "push", "2026-09-07")).toBe("monday-push-2026-09-07")
  })

  test("drops the focus where none is stated", () => {
    expect(sessionSlugStem("sunday", undefined, "2026-09-06")).toBe("sunday-2026-09-06")
  })

  test("drops the focus where it is stated empty", () => {
    expect(sessionSlugStem("sunday", "", "2026-09-06")).toBe("sunday-2026-09-06")
  })
})

describe("the slug one logged set takes", () => {
  test("says its session, its exercise and its number", () => {
    expect(setLogSlug("monday-push-2026-09-07", "bench-press", 3)).toBe(
      "monday-push-2026-09-07-bench-press-set-3"
    )
  })
})

describe("the slug a schedule's day takes", () => {
  test("says its schedule and its day of the week", () => {
    expect(scheduleDaySlug("push-pull-legs-3beb3d9a", "wednesday")).toBe(
      "push-pull-legs-3beb3d9a-wednesday"
    )
  })
})

describe("a slug free of the slugs already taken", () => {
  test("hands back the stem where the stem is free", () => {
    expect(freeSlug("monday-push-2026-09-07", new Set())).toBe("monday-push-2026-09-07")
  })

  test("numbers from two rather than from one", () => {
    expect(freeSlug("stem", new Set(["stem"]))).toBe("stem-2")
  })

  test("counts past every number already taken", () => {
    expect(freeSlug("stem", new Set(["stem", "stem-2", "stem-3"]))).toBe("stem-4")
  })

  test("passes over a gap rather than filling it", () => {
    expect(freeSlug("stem", new Set(["stem", "stem-3"]))).toBe("stem-2")
  })
})
