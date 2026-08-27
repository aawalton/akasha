import { describe, expect, test } from "bun:test"
import { parsePageTypeData } from "./pages"

describe("parsePageTypeData title derivation", () => {
  test("empty title is derived from camelCase id (Title Case)", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "arcStructure", title: "", type: "text" }],
    })
    expect(data.propertyDefinitions[0]?.title).toBe("Arc Structure")
  })

  test("present title is preserved verbatim", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "createdAt", title: "Created At", type: "instant" }],
    })
    expect(data.propertyDefinitions[0]?.title).toBe("Created At")
  })

  test("single-word id humanizes to a capitalized word", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "author", title: "", type: "text" }],
    })
    expect(data.propertyDefinitions[0]?.title).toBe("Author")
  })

  test("kebab/snake ids split into Title Case words", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [
        { id: "cover-url", title: "", type: "url" },
        { id: "reader_framing", title: "", type: "markdown" },
      ],
    })
    expect(data.propertyDefinitions[0]?.title).toBe("Cover Url")
    expect(data.propertyDefinitions[1]?.title).toBe("Reader Framing")
  })

  test("no parsed definition carries a blank title", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [
        { id: "arcStructure", title: "", type: "text" },
        { id: "premise", title: "", type: "markdown" },
        { id: "system", title: "System", type: "text" },
      ],
    })
    for (const def of data.propertyDefinitions) {
      expect(def.title.length).toBeGreaterThan(0)
    }
  })
})

describe("parsePageTypeData detailConfig", () => {
  test("parses a reader detailConfig alongside propertyDefinitions", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown" }],
      detailConfig: { display: "reader", bodyPropertyId: "text", showReadingProgress: true },
    })
    expect(data.detailConfig).toEqual({
      display: "reader",
      bodyPropertyId: "text",
      showReadingProgress: true,
    })
  })

  test("parses a collection detailConfig (header + explicit childCollection)", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "title", title: "Title", type: "text" }],
      detailConfig: {
        display: "collection",
        header: { showCover: true, fields: ["author", "status"] },
        childCollection: { childType: "story-chapter", childRelation: "story" },
      },
    })
    expect(data.detailConfig).toEqual({
      display: "collection",
      header: { showCover: true, fields: ["author", "status"] },
      childCollection: { childType: "story-chapter", childRelation: "story" },
    })
  })

  test("absent detailConfig surfaces as undefined", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown" }],
    })
    expect(data.detailConfig).toBeUndefined()
  })

  test("a malformed detailConfig is dropped without crashing the page-type parse", () => {
    const data = parsePageTypeData({
      propertyDefinitions: [{ id: "text", title: "Text", type: "markdown" }],
      detailConfig: { display: "Not A Slug" },
    })
    expect(data.detailConfig).toBeUndefined()
    expect(data.propertyDefinitions[0]?.id).toBe("text")
  })
})
