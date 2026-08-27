import { describe, expect, test } from "bun:test"
import { primaryNavItems } from "./nav-items"

describe("primaryNavItems", () => {
  test("carries no hardcoded Home entry (Home is a DNI)", () => {
    expect(primaryNavItems.some((item) => item.id === "home")).toBe(false)
  })

  test("is empty — all primary items are dynamic nav pages", () => {
    expect(primaryNavItems).toEqual([])
  })
})
