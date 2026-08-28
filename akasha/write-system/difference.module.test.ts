import { expect, test } from "bun:test"
import { difference, linesBetween } from "./difference.module.code.ts"

function marks(before: readonly string[], now: readonly string[]): string {
  return linesBetween(before, now)
    .map((one) => one.mark)
    .join("")
}

test("two bodies that are the same differ in nothing", () => {
  expect(difference("one\ntwo\n", "one\ntwo\n")).toEqual([])
})

test("a body that gained a line names the line it gained", () => {
  const said = difference("one\ntwo\n", "one\nmiddle\ntwo\n")
  expect(said[0]).toBe("--- as you last read it")
  expect(said[1]).toBe("+++ as it stands now")
  expect(said).toContain("+middle")
  expect(said.filter((one) => one.startsWith("-"))).toEqual(["--- as you last read it"])
})

test("a body that lost a line names the line it lost", () => {
  const said = difference("one\nmiddle\ntwo\n", "one\ntwo\n")
  expect(said).toContain("-middle")
  expect(said.filter((one) => one.startsWith("+"))).toEqual(["+++ as it stands now"])
})

test("a line that changed reads as the old one taken away and the new one put in", () => {
  const said = difference("one\nwas\ntwo\n", "one\nis\ntwo\n")
  expect(said).toContain("-was")
  expect(said).toContain("+is")
})

test("the longest common run is kept, so an unchanged line is never called changed", () => {
  expect(marks(["a", "b", "c"], ["a", "b", "c"])).toBe("   ")
  expect(marks(["a", "b", "c"], ["a", "x", "c"])).toMatch(/^ [-+]{2} $/)
  expect(marks([], ["a"])).toBe("+")
  expect(marks(["a"], [])).toBe("-")
  expect(marks([], [])).toBe("")
})

test("a change far from another is a hunk of its own", () => {
  const before = ["a", "b", "c", "d", "e", "f", "g", "h", "i"].join("\n")
  const now = ["A", "b", "c", "d", "e", "f", "g", "h", "I"].join("\n")
  const said = difference(before, now)
  expect(said.filter((one) => one.startsWith("@@"))).toHaveLength(2)
})

test("two changes beside each other are one hunk", () => {
  const said = difference(["a", "b", "c"].join("\n"), ["A", "B", "c"].join("\n"))
  expect(said.filter((one) => one.startsWith("@@"))).toHaveLength(1)
})

test("a hunk states the line it starts at in each body", () => {
  const before = ["a", "b", "c", "d", "e"].join("\n")
  const now = ["a", "b", "C", "d", "e"].join("\n")
  const said = difference(before, now)
  expect(said.find((one) => one.startsWith("@@"))).toBe("@@ -2 +2 @@")
})

test("a body written from nothing is all additions", () => {
  const said = difference("", "one\ntwo\n")
  expect(said.filter((one) => one.startsWith("+") && one !== "+++ as it stands now")).toHaveLength(
    2
  )
})

test("what the difference reports is enough to rebuild the body it reports on", () => {
  const before = ["one", "two", "three", "four"].join("\n")
  const now = ["one", "three", "four", "five"].join("\n")
  const rebuilt = linesBetween(before.split("\n"), now.split("\n"))
    .filter((one) => one.mark !== "-")
    .map((one) => one.text)
    .join("\n")
  expect(rebuilt).toBe(now)
})

test("what the difference reports is enough to rebuild the body it came from", () => {
  const before = ["one", "two", "three", "four"].join("\n")
  const now = ["one", "three", "four", "five"].join("\n")
  const rebuilt = linesBetween(before.split("\n"), now.split("\n"))
    .filter((one) => one.mark !== "+")
    .map((one) => one.text)
    .join("\n")
  expect(rebuilt).toBe(before)
})
