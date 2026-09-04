import { describe, expect, test } from "bun:test"
import { pointsSourceMayWrite } from "./points-source-availability.module.code.ts"

describe("pointsSourceMayWrite", () => {
  test("lets a persona with a named source write", () => {
    expect(pointsSourceMayWrite({ pointsSourceKind: "windowed" })).toEqual({
      mayWrite: true,
      reason: null,
    })
  })

  test("lets a persona naming no source at all write", () => {
    expect(pointsSourceMayWrite({}).mayWrite).toBe(true)
  })

  test("stops a persona declaring her source unavailable", () => {
    expect(pointsSourceMayWrite({ pointsSourceKind: "unavailable" }).mayWrite).toBe(false)
  })

  test("says her stored total is left as it stands", () => {
    const answer = pointsSourceMayWrite({ pointsSourceKind: "unavailable", title: "Aria" })
    expect(answer.reason).toContain("Aria")
    expect(answer.reason).toContain("left as it stands")
  })

  test("stands in a plain name where she has no title", () => {
    expect(pointsSourceMayWrite({ pointsSourceKind: "unavailable" }).reason).toContain(
      "this persona"
    )
  })
})
