import { describe, expect, test } from "bun:test"
import { pointsSourceMayWrite, UNAVAILABLE_POINTS_SOURCE_KIND } from "./points-source-availability"

describe("pointsSourceMayWrite", () => {
  test("an unavailable declaration refuses the write and says why", () => {
    const { mayWrite, reason } = pointsSourceMayWrite({
      pointsSourceKind: UNAVAILABLE_POINTS_SOURCE_KIND,
      title: "Eppie",
    })
    expect(mayWrite).toBe(false)
    expect(reason).toContain("Eppie")
  })

  test.each([
    "windowed",
    "delta",
    "external",
    "manual",
    "direct",
    "seed",
    undefined,
    null,
  ])("%p is allowed to write", (kind) => {
    expect(pointsSourceMayWrite({ pointsSourceKind: kind }).mayWrite).toBe(true)
  })

  test("a refusal always carries a reason, and a permission never does", () => {
    expect(
      pointsSourceMayWrite({ pointsSourceKind: UNAVAILABLE_POINTS_SOURCE_KIND }).reason
    ).not.toBeNull()
    expect(pointsSourceMayWrite({ pointsSourceKind: "windowed" }).reason).toBeNull()
  })

  test("a row with no title still names who is refusing", () => {
    expect(
      pointsSourceMayWrite({ pointsSourceKind: UNAVAILABLE_POINTS_SOURCE_KIND }).reason
    ).toContain("persona")
  })
})
