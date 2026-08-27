import { describe, expect, test } from "bun:test"
import { parseViewDataJSON } from "./view-data"

describe("parseViewDataJSON round-trips the reorder facet", () => {
  test("reorder:{verbId} survives the parser (string input)", () => {
    const input = JSON.stringify({ version: 1, reorder: { verbId: "idle-lineup" } })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.reorder).toEqual({ verbId: "idle-lineup" })
    }
  })

  test("reorder:{verbId} round-trips through native object input", () => {
    const result = parseViewDataJSON({ version: 1, reorder: { verbId: "roster" } })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.reorder?.verbId).toBe("roster")
    }
  })

  test("absent reorder facet back-compats to undefined (no affordance)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, layout: "gallery" }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.reorder).toBeUndefined()
    }
  })

  test("a reorder facet missing verbId is rejected (verbId required)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, reorder: {} }))
    expect(result.ok).toBe(false)
  })
})
