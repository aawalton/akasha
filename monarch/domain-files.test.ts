
import { describe, expect, test } from "bun:test"
import { slugify, withFrontmatter } from "./domain-files.ts"

const PAGE = [
  "---",
  "page-type-slug: monarch-account",
  'title: "Checking"',
  "slug: checking-4042",
  "domain-parent-slug: monarch-account",
  'monarch-id: "1234"',
  "current-balance: 12.5",
  "type-name: depository",
  "active: true",
  "---",
  "",
  "# Definition",
  "",
  "- **Checking** — money the family holds.",
  "",
].join("\n")

describe("writing a measured value into a page that already stands", () => {
  test("replaces a key in place and leaves the body alone", () => {
    const after = withFrontmatter(PAGE, { "current-balance": 88.25 })
    expect(after).toContain("current-balance: 88.25")
    expect(after).toContain("- **Checking** — money the family holds.")
    expect(after).toContain("type-name: depository")
    expect(after.split("\n").filter((line) => line.startsWith("current-balance:"))).toHaveLength(1)
  })

  test("adds a key nothing declared at the end of the frontmatter", () => {
    const after = withFrontmatter(PAGE, { hidden: false })
    const lines = after.split("\n")
    expect(lines.indexOf("hidden: false")).toBeGreaterThan(lines.indexOf("active: true"))
    expect(lines.indexOf("hidden: false")).toBeLessThan(lines.lastIndexOf("---"))
  })

  test("leaves a plain word, a number and a flag bare, and quotes the rest", () => {
    const after = withFrontmatter(PAGE, {
      "type-name": "credit",
      "display-name": "Checking (...4042)",
      active: false,
      "current-balance": 0,
    })
    expect(after).toContain("type-name: credit")
    expect(after).toContain('display-name: "Checking (...4042)"')
    expect(after).toContain("active: false")
    expect(after).toContain("current-balance: 0")
  })

  test("refuses a body carrying no frontmatter rather than inventing one", () => {
    expect(() => withFrontmatter("# Definition\n", { active: true })).toThrow()
  })
})

describe("the slug a new page takes from what Monarch calls it", () => {
  test("reads the last four digits out of Monarch's masking", () => {
    expect(slugify("***0981 (...0981)")).toBe("0981")
    expect(slugify("CREDIT CARD (...7882)")).toBe("credit-card-7882")
  })

  test("spells an ampersand as the word", () => {
    expect(slugify("Alan & Jenny Travel")).toBe("alan-and-jenny-travel")
  })

  test("drops an apostrophe rather than breaking the word on it", () => {
    expect(slugify("Sam's Club® Mastercard® (...6666)")).toBe("sams-club-mastercard-6666")
  })
})
