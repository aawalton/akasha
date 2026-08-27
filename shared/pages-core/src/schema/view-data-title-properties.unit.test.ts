import { describe, expect, test } from "bun:test"
import { parseViewDataJSON } from "./view-data"

describe("parseViewDataJSON round-trips the title_properties facet", () => {
  test("title_properties survives the parser (string input, order preserved)", () => {
    const input = JSON.stringify({
      version: 1,
      title_properties: ["moments", "draw"],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties).toEqual(["moments", "draw"])
    }
  })

  test("title_properties round-trips through native object input", () => {
    const result = parseViewDataJSON({ version: 1, title_properties: ["total"] })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties).toEqual(["total"])
    }
  })

  test("absent title_properties facet back-compats to undefined (renders nothing)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, layout: "gallery" }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties).toBeUndefined()
    }
  })

  test("an empty title_properties array survives (no ids to render)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, title_properties: [] }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties).toEqual([])
    }
  })
})

describe("parseViewDataJSON applies the title_properties_align default at the parse boundary", () => {
  test("absent title_properties_align defaults to 'start' (no existing view changes)", () => {
    const result = parseViewDataJSON(JSON.stringify({ version: 1, layout: "gallery" }))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties_align).toBe("start")
    }
  })

  test("title_properties_align: 'end' round-trips (the roster's opt-in to right alignment)", () => {
    const result = parseViewDataJSON({ version: 1, title_properties_align: "end" })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.title_properties_align).toBe("end")
    }
  })

  test("an invalid title_properties_align value fails validation (enum-guarded)", () => {
    const result = parseViewDataJSON(
      JSON.stringify({ version: 1, title_properties_align: "center" })
    )
    expect(result.ok).toBe(false)
  })
})
