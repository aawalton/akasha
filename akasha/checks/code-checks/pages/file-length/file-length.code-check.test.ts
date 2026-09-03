import { expect, test } from "bun:test"
import { bodiesIn } from "@akasha/testing-system/bodying"
import {
  CEILING,
  ENTRY_CEILING,
  MARKUP_CEILING,
  PROSE_CEILING,
  reasonsIn,
} from "./file-length.code-check.code.ts"

const ROOT = "/repo"

const ENTRY = "akasha/day.wake-day.completed-tasks.jsonl"

const MARKUP = "akasha/panel.eso-interface.markup.xml"

const BINDINGS = "akasha/one.eso-addon.bindings.xml"

const given = bodiesIn(ROOT)

function sized(held: number): Uint8Array {
  return new Uint8Array(held).fill(0x61)
}

test("a body under the ceiling is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING - 1)))).toEqual([])
})

test("a body exactly at the ceiling is let through, so the ceiling is the last size allowed", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(CEILING)))).toEqual([])
})

test("a body over the ceiling is refused, and the reason names the size and the ceiling", () => {
  const said = reasonsIn(given("akasha/held.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes")
  expect(said[0]).toContain("15,000 byte ceiling")
})

test("an empty body is let through", () => {
  expect(reasonsIn(given("akasha/held.ts", sized(0)))).toEqual([])
})

test("the size counted is bytes rather than characters", () => {
  const one = new TextEncoder().encode("é".repeat(CEILING))
  expect(one.byteLength).toBe(CEILING * 2)
  expect(reasonsIn(given("akasha/held.ts", one))).toHaveLength(1)
})

test("a body that is not text is judged by its size the same as one that is", () => {
  const held = sized(CEILING + 8)
  held[0] = 0xff
  held[1] = 0xfe
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("what the file is named decides which ceiling that file is held to", () => {
  const held = sized(CEILING + 1)
  for (const named of ["akasha/held.ts", "akasha/notes.txt", "akasha/notes.md"]) {
    expect(reasonsIn(given(named, held))).toHaveLength(1)
  }
  expect(reasonsIn(given(ENTRY, held))).toEqual([])
  expect(reasonsIn(given(MARKUP, held))).toEqual([])
})

test("an entry file at its own ceiling is let through", () => {
  expect(reasonsIn(given(ENTRY, sized(ENTRY_CEILING)))).toEqual([])
})

test("an entry file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(given(ENTRY, sized(ENTRY_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("8,388,609 bytes")
  expect(said[0]).toContain("8,388,608 byte ceiling")
})

test("a `jsonl` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn(given("akasha/held.jsonl", sized(CEILING + 1)))).toHaveLength(1)
})

test("the markup ceiling sits between the narrow ceiling and the entry ceiling", () => {
  expect(MARKUP_CEILING).toBeGreaterThan(CEILING)
  expect(MARKUP_CEILING).toBeLessThan(ENTRY_CEILING)
})

test("a markup file at its own ceiling is let through", () => {
  expect(reasonsIn(given(MARKUP, sized(MARKUP_CEILING)))).toEqual([])
})

test("a markup file over its own ceiling is refused, and the reason names that ceiling", () => {
  const said = reasonsIn(given(MARKUP, sized(MARKUP_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,073 bytes")
  expect(said[0]).toContain("131,072 byte ceiling")
})

test("a too-long markup file's refusal names the division an addon's manifest admits", () => {
  const said = reasonsIn(given(MARKUP, sized(MARKUP_CEILING + 1)))
  expect(said[0]).toContain("divide this one at a top-level element")
})

test("the bindings an addon holds are markup too, so they are held to the markup ceiling", () => {
  expect(reasonsIn(given(BINDINGS, sized(CEILING + 1)))).toEqual([])
  expect(reasonsIn(given(BINDINGS, sized(MARKUP_CEILING + 1)))).toHaveLength(1)
})

test("an `xml` akasha cannot read a page name in is held to the narrow ceiling", () => {
  expect(reasonsIn(given("akasha/held.xml", sized(CEILING + 1)))).toHaveLength(1)
})

test("an entry file is still held wider than a markup file", () => {
  expect(reasonsIn(given(MARKUP, sized(ENTRY_CEILING)))).toHaveLength(1)
  expect(reasonsIn(given(ENTRY, sized(ENTRY_CEILING)))).toEqual([])
})

test("a body far over the ceiling is refused once rather than once for each line", () => {
  const held = new TextEncoder().encode("one\n".repeat(CEILING))
  expect(reasonsIn(given("akasha/held.ts", held))).toHaveLength(1)
})

test("where the file stands changes nothing, because the size is read from the body alone", () => {
  const held = sized(CEILING + 1)
  const one = reasonsIn({ root: "/repo", path: "akasha/held.ts", bytes: held })
  const two = reasonsIn({ root: "/elsewhere", path: "akasha/deep/down/held.ts", bytes: held })
  expect(one).toEqual(two)
})

test("a too-long test file's refusal names the fixtures standing beside it", () => {
  const said = reasonsIn(given("akasha/held.module.test.ts", sized(CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("15,001 bytes, over the 15,000 byte ceiling")
  expect(said[0]).toContain("`test-fixtures`")
})

test("a too-long file that is no test is refused in the words it was refused in before", () => {
  const said = reasonsIn(given("akasha/held.module.code.ts", sized(CEILING + 1)))
  expect(said).toEqual(["15,001 bytes, over the 15,000 byte ceiling"])
})

test("a test file under the ceiling is let through, so naming the relief refuses nothing new", () => {
  expect(reasonsIn(given("akasha/held.module.test.ts", sized(CEILING)))).toEqual([])
})

test("prose beside a page is held wider than a code file, whatever the page type", () => {
  const held = sized(CEILING + 1)
  expect(reasonsIn(given("akasha/one.book-chapter.chapter-text.md", held))).toEqual([])
  expect(reasonsIn(given("akasha/one.story-chapter-read.prose.txt", held))).toEqual([])
})

test("prose over its own ceiling is refused, and the refusal names what dividing it costs", () => {
  const at = "akasha/one.book-chapter.chapter-text.md"
  const said = reasonsIn(given(at, sized(PROSE_CEILING + 1)))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("131,072 byte ceiling")
  expect(said[0]).toContain("hides all but the first")
})
