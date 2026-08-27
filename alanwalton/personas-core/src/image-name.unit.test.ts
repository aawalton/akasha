import { describe, expect, test } from "bun:test"
import { buildImageName, parseImageName, parseImageTimestamp, toPersonaSlug } from "./image-name"

describe("toPersonaSlug", () => {
  test("lowercases a single-token title", () => {
    expect(toPersonaSlug("Abby")).toBe("abby")
  })

  test("collapses internal whitespace to hyphens", () => {
    expect(toPersonaSlug("Erin Solstice")).toBe("erin-solstice")
    expect(toPersonaSlug("  Euphemia   Fontaine  ")).toBe("euphemia-fontaine")
  })
})

describe("buildImageName", () => {
  const DATE = new Date(Date.UTC(2026, 5, 7, 14, 31, 0))

  test("composes slug + zero-padded level + basic-ISO UTC timestamp", () => {
    expect(buildImageName({ slug: "abby", level: 1, date: DATE })).toBe(
      "abby-L01-20260607T143100Z.png"
    )
  })

  test("defaults extension to png and honors an override", () => {
    expect(buildImageName({ slug: "abby", level: 1, date: DATE, ext: "jpg" })).toBe(
      "abby-L01-20260607T143100Z.jpg"
    )
  })

  test("pads levels below 10 to two digits and leaves larger levels intact", () => {
    expect(buildImageName({ slug: "aura", level: 9, date: DATE })).toBe(
      "aura-L09-20260607T143100Z.png"
    )
    expect(buildImageName({ slug: "aura", level: 12, date: DATE })).toBe(
      "aura-L12-20260607T143100Z.png"
    )
  })

  test("round-trips through parseImageName", () => {
    const name = buildImageName({ slug: "erin-solstice", level: 3, date: DATE })
    expect(parseImageName(name)).toEqual({
      slug: "erin-solstice",
      level: 3,
      timestamp: "20260607T143100Z",
      ext: "png",
    })
  })
})

describe("parseImageName", () => {
  test("parses a conforming single-token slug", () => {
    expect(parseImageName("abby-L01-20260607T143100Z.png")).toEqual({
      slug: "abby",
      level: 1,
      timestamp: "20260607T143100Z",
      ext: "png",
    })
  })

  test("parses a hyphenated slug greedily up to the level marker", () => {
    expect(parseImageName("erin-solstice-L10-20260101T000000Z.png")).toEqual({
      slug: "erin-solstice",
      level: 10,
      timestamp: "20260101T000000Z",
      ext: "png",
    })
  })

  test("returns null for a non-conforming legacy semantic name", () => {
    expect(parseImageName("abby-wallpaper-right-centered-seedvr2-3440x1440.png")).toBeNull()
  })

  test("returns null when the timestamp shape is wrong", () => {
    expect(parseImageName("abby-L01-2026-06-07.png")).toBeNull()
  })

  test("returns null for an unrelated filename", () => {
    expect(parseImageName("vacation.png")).toBeNull()
  })
})

describe("parseImageTimestamp", () => {
  test("inverts the convention timestamp to a UTC Date", () => {
    expect(parseImageTimestamp("20260607T143100Z")?.toISOString()).toBe("2026-06-07T14:31:00.000Z")
  })

  test("round-trips a built name's timestamp", () => {
    const date = new Date(Date.UTC(2026, 0, 1, 0, 0, 0))
    const name = buildImageName({ slug: "aine", level: 2, date })
    const parsed = parseImageName(name)
    expect(parsed).not.toBeNull()
    expect(parseImageTimestamp(parsed?.timestamp ?? "")?.toISOString()).toBe(date.toISOString())
  })

  test("returns null for a malformed timestamp", () => {
    expect(parseImageTimestamp("2026-06-07")).toBeNull()
    expect(parseImageTimestamp("notatimestamp")).toBeNull()
  })
})
