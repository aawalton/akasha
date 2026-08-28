import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { HoleMismatch, fill, refusalText } from "./refusal.ts"

describe("filling a body", () => {
  test("puts each value where its hole is marked", () => {
    expect(fill("You wrote to {path}.", { path: "pages/x.md" })).toBe("You wrote to pages/x.md.")
  })

  test("fills a hole inside a code span, a declaring document being a template throughout", () => {
    expect(fill("Declare `{key}: {stem}`.", { key: "slug", stem: "x" })).toBe("Declare `slug: x`.")
  })

  test("fills every mark of one hole, not the first", () => {
    expect(fill("{a} and {a}", { a: "x" })).toBe("x and x")
  })

  test("refuses a hole it was handed no value for", () => {
    expect(() => fill("You wrote to {path}.", {})).toThrow(HoleMismatch)
  })

  test("refuses a value the body marks nowhere, which would render clean and say less", () => {
    expect(() => fill("You wrote somewhere.", { path: "pages/x.md" })).toThrow(HoleMismatch)
  })

  test("leaves a body carrying no hole alone", () => {
    expect(fill("Nothing to fill.", {})).toBe("Nothing to fill.")
  })
})

let root = ""

beforeAll(() => {
  root = mkdtempSync(`${tmpdir()}/refusal-`)
  mkdirSync(`${root}/pages/refusal`, { recursive: true })
})

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

function standing(slug: string, body: string): string {
  writeFileSync(`${root}/pages/refusal/${slug}.refusal.md`, body)
  return slug
}

describe("a refusal document", () => {
  test("arrives as its prose, with the frontmatter and the heading off", () => {
    const slug = standing("framed", "---\nholes:\n  - path\n---\n\n# Refusal\n\nYou wrote to {path}.\n")
    expect(refusalText(slug, { path: "a/b.md" }, root)).toBe("You wrote to a/b.md.")
  })

  test("keeps the blank line between its paragraphs, which is what makes it two", () => {
    const slug = standing("paired", "# Refusal\n\nFirst, at {path}.\n\nSecond.\n")
    expect(refusalText(slug, { path: "a" }, root)).toBe("First, at a.\n\nSecond.")
  })

  test("refuses a slug naming no document rather than printing nothing", () => {
    expect(() => refusalText("absent", {}, root)).toThrow()
  })

  test("names the typed path it looked in, a bare `.md` being a name the corpus never holds", () => {
    expect(() => refusalText("absent", {}, root)).toThrow(/absent\.refusal\.md/)
  })
})
