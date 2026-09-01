import { describe, expect, test } from "bun:test"
import {
  buildImageName,
  parseImageName,
  parseImageTimestamp,
  toPersonaSlug,
} from "./image-name.module.code.ts"

const moment = new Date(Date.UTC(2026, 0, 15, 10, 30, 0))

describe("toPersonaSlug", () => {
  test("lowercases and spaces a title with dashes", () => {
    expect(toPersonaSlug("  Aria   Blue ")).toBe("aria-blue")
  })
})

describe("buildImageName", () => {
  test("spells a single-digit level with two digits", () => {
    expect(buildImageName({ slug: "aria", level: 3, date: moment })).toBe(
      "aria-L03-20260115T103000Z.png"
    )
  })

  test("leaves a two-digit level as it is", () => {
    expect(buildImageName({ slug: "aria", level: 12, date: moment })).toBe(
      "aria-L12-20260115T103000Z.png"
    )
  })

  test("takes the extension it is given", () => {
    expect(buildImageName({ slug: "aria", level: 1, date: moment, ext: "webp" })).toBe(
      "aria-L01-20260115T103000Z.webp"
    )
  })
})

describe("parseImageName", () => {
  test("reads back what was built", () => {
    expect(parseImageName(buildImageName({ slug: "aria", level: 3, date: moment }))).toEqual({
      slug: "aria",
      level: 3,
      timestamp: "20260115T103000Z",
      ext: "png",
    })
  })

  test("keeps a slug holding dashes whole", () => {
    expect(parseImageName("aria-blue-L07-20260115T103000Z.png")?.slug).toBe("aria-blue")
  })

  test("answers nothing for a name the shape does not fit", () => {
    expect(parseImageName("holiday.png")).toBeNull()
  })

  test("answers nothing where the level is one digit", () => {
    expect(parseImageName("aria-L3-20260115T103000Z.png")).toBeNull()
  })
})

describe("parseImageTimestamp", () => {
  test("reads a stamp back as the moment it names", () => {
    expect(parseImageTimestamp("20260115T103000Z")?.toISOString()).toBe("2026-01-15T10:30:00.000Z")
  })

  test("answers nothing for a stamp the shape does not fit", () => {
    expect(parseImageTimestamp("2026-01-15")).toBeNull()
  })
})
