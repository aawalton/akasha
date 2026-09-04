import { describe, expect, test } from "bun:test"
import { stripFrontmatter } from "./framework.module.code.ts"

describe("stripFrontmatter", () => {
  test("takes a leading frontmatter block off", () => {
    expect(stripFrontmatter("---\na: 1\n---\n\nBody here.")).toBe("Body here.")
  })

  test("answers a body opening with no fence unchanged", () => {
    expect(stripFrontmatter("Body here.")).toBe("Body here.")
  })

  test("answers a body whose fence never closes unchanged", () => {
    expect(stripFrontmatter("---\na: 1\nno end")).toBe("---\na: 1\nno end")
  })

  test("drops the blank lines left where the block stood", () => {
    expect(stripFrontmatter("---\na: 1\n---\n\n\n\nBody.")).toBe("Body.")
  })
})
