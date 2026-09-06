import { expect, test } from "bun:test"
import { readingIn } from "./argument-reading.module.code.ts"

function given(text: string): Readonly<Record<string, string>> {
  const said = readingIn(text)
  if ("refused" in said) throw new Error(said.refused)
  return said.given
}

function refusal(text: string): string {
  const said = readingIn(text)
  if (!("refused" in said)) throw new Error("this was read rather than refused")
  return said.refused
}

test("a scalar argument is the rest of the line after the colon", () => {
  expect(given("at: changes/foo/bar.ts")).toEqual({ at: "changes/foo/bar.ts" })
})

test("a scalar argument keeps every colon after the first", () => {
  expect(given("said: a: b: c")).toEqual({ said: "a: b: c" })
})

test("a body holds each line up to the fence, and each line keeps its newline", () => {
  expect(given("body ~~~\nexport const a = 1\nexport const b = 2\n~~~")).toEqual({
    body: "export const a = 1\nexport const b = 2\n",
  })
})

test("a body closing at once holds nothing", () => {
  expect(given("body ~~~\n~~~")).toEqual({ body: "" })
})

test("nothing in a body is escaped", () => {
  expect(given('body END\n\\n "\\" \t $x `y`\nEND')).toEqual({ body: '\\n "\\" \t $x `y`\n' })
})

test("a fence is the word the caller picks", () => {
  expect(given("body @@\na\n@@")).toEqual({ body: "a\n" })
})

test("a body may hold a line that only starts with the fence", () => {
  expect(given("body ~~\n~~~\n~~")).toEqual({ body: "~~~\n" })
})

test("a scalar and a body sit in one reading", () => {
  expect(given("at: a/b.ts\nbody ~\nx\n~\nto: c")).toEqual({ at: "a/b.ts", body: "x\n", to: "c" })
})

test("a blank line between arguments is passed over", () => {
  expect(given("at: a\n\nto: b")).toEqual({ at: "a", to: "b" })
})

test("a body no fence closes refuses the whole reading", () => {
  expect(refusal("body ~~~\nexport const a = 1")).toContain("no later line is `~~~` alone")
})

test("a key written twice refuses the whole reading", () => {
  expect(refusal("at: a\nat: b")).toContain("written twice")
})

test("a body key written after that key's scalar refuses the whole reading", () => {
  expect(refusal("at: a\nat ~\nx\n~")).toContain("written twice")
})

test("a line of neither form refuses the whole reading", () => {
  expect(refusal("at: a\nthis is neither one nor the other")).toContain("line 2 is neither")
})

test("a body running past its fence refuses at the first line that is neither form", () => {
  expect(refusal("body ~~~\na\n~~~\nb c d e")).toContain("line 4 is neither")
})
