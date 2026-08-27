import { describe, expect, test } from "bun:test"
import { decideBackNavigation } from "./back-navigation"

describe("decideBackNavigation", () => {
  test("goes back when there is a prior history entry", () => {
    expect(decideBackNavigation({ canGoBack: true })).toBe("back")
  })

  test("goes home on a fresh entry (no prior history)", () => {
    expect(decideBackNavigation({ canGoBack: false })).toBe("home")
  })
})
