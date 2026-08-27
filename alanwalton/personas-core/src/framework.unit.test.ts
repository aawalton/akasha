import { describe, expect, test } from "bun:test"
import { stripFrontmatter } from "./framework"

const FRAMEWORK_DOC = `---
description: test fixture
---

# Framework

The universal half of every persona's operating skeleton.
`

describe("stripFrontmatter", () => {
  test("removes a leading frontmatter block", () => {
    const out = stripFrontmatter(FRAMEWORK_DOC)
    expect(out.startsWith("# Framework")).toBe(true)
    expect(out).not.toContain("description: test fixture")
  })

  test("returns input unchanged when there is no frontmatter", () => {
    const body = "# Framework\n\nBody.\n"
    expect(stripFrontmatter(body)).toBe(body)
  })
})
