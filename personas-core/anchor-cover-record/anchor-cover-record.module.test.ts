import { describe, expect, test } from "bun:test"
import { buildAnchorImageRecord, buildCoverImageRecord } from "./anchor-cover-record.module.code.ts"

describe("buildAnchorImageRecord", () => {
  test("matches the anchor by the persona alone", () => {
    const record = buildAnchorImageRecord({
      personaSlug: "aria",
      personaTitle: "Aria",
      imagePath: "aria/anchor.png",
    })
    expect(record.where).toEqual([{ key: "personaSlug", eq: "aria" }])
  })

  test("titles the anchor after the persona", () => {
    const record = buildAnchorImageRecord({
      personaSlug: "aria",
      personaTitle: "Aria",
      imagePath: "aria/anchor.png",
    })
    expect(record.set.title).toBe("Aria — anchor")
  })

  test("leaves a root out of the record where none is stated", () => {
    const record = buildAnchorImageRecord({
      personaSlug: "aria",
      personaTitle: "Aria",
      imagePath: "aria/anchor.png",
    })
    expect(Object.hasOwn(record.set, "imageRoot")).toBe(false)
  })

  test("carries a root that is stated", () => {
    const record = buildAnchorImageRecord({
      personaSlug: "aria",
      personaTitle: "Aria",
      imagePath: "aria/anchor.png",
      imageRoot: "personas",
    })
    expect(record.set.imageRoot).toBe("personas")
  })
})

describe("buildCoverImageRecord", () => {
  test("matches the cover by the persona and the level together", () => {
    const record = buildCoverImageRecord({ personaSlug: "aria", personaTitle: "Aria", level: 3 })
    expect(record.where.length).toBe(2)
    expect(record.where[0]).toEqual({ key: "personaSlug", eq: "aria" })
  })

  test("spells a single-digit level with two digits in the title", () => {
    const record = buildCoverImageRecord({ personaSlug: "aria", personaTitle: "Aria", level: 3 })
    expect(record.set.title).toBe("Aria — cover L03")
  })

  test("leaves both the path and the root out where neither is stated", () => {
    const record = buildCoverImageRecord({ personaSlug: "aria", personaTitle: "Aria", level: 12 })
    expect(Object.hasOwn(record.set, "imagePath")).toBe(false)
    expect(Object.hasOwn(record.set, "imageRoot")).toBe(false)
    expect(record.set.title).toBe("Aria — cover L12")
  })
})
