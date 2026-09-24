import { expect, test } from "bun:test"
import { toolSubject } from "akasha/agent/claude-code/tool/modules/tool-subject/tool-subject.computed-property-module.code.ts"

test("a known tool is named by the field it acts on", () => {
  expect(toolSubject("Bash", { description: "Read", command: "akasha read" })).toBe("akasha read")
  expect(toolSubject("Read", { file_path: "/a/b.ts" })).toBe("/a/b.ts")
})

test("another tool is named by the first text in its input", () => {
  expect(toolSubject("ToolSearch", { query: "select:SendMessage", max_results: 1 })).toBe(
    "select:SendMessage"
  )
})

test("an input with no text is named by its first number", () => {
  expect(toolSubject("Wait", { seconds: 5 })).toBe("seconds=5")
})

test("a subject is one line of at most 200 characters", () => {
  const long = toolSubject("Bash", { command: `one\n${"x".repeat(300)}` })
  expect(long).not.toContain("\n")
  expect(long).toHaveLength(200)
})

test("an input that is no record has no subject", () => {
  expect(toolSubject("Bash", "akasha read")).toBe("")
  expect(toolSubject("Bash", null)).toBe("")
})
