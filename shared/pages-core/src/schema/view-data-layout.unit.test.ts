import { describe, expect, test } from "bun:test"
import { defaultViewData, parseViewDataJSON } from "./view-data"

describe("view-data layout field", () => {
  test("accepts the cards layout (the surfaced Layout option)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, layout: "cards" }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.layout).toBe("cards")
    }
  })

  test("defaultViewData defaults the layout to cards", () => {
    expect(defaultViewData().layout).toBe("cards")
  })
})
