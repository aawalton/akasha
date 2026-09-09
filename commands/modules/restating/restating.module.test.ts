import { expect, test } from "bun:test"
import {
  interiorsIn,
  judgedHere,
  movedMoreThanWords,
  spliced,
  unrestatedIn,
} from "./restating.module.code.ts"

const NO_BIOME = "/nowhere/no-such-root-for-restating"

const AT = "one.ts"

function bytes(said: string): Uint8Array {
  return new TextEncoder().encode(said)
}

test("an interior is found for a plain string and for a template's text", () => {
  const body = 'const a = "hi"\nconst b = `q ${a} r`\n'
  const found = interiorsIn(body)
  expect(found.map((one) => body.slice(one.start, one.end))).toEqual(["hi", "q ", " r"])
})

test("a splice puts each run of text back in order", () => {
  const body = 'const a = "one"\nconst b = "two"\n'
  const found = interiorsIn(body)
  expect(spliced(body, found, ["alpha", "beta"])).toBe('const a = "alpha"\nconst b = "beta"\n')
})

test("moving the words inside quotes is a restatement", () => {
  const was = 'export const a = { statement: "it is read" }\n'
  const now = 'export const a = { statement: "the page is read" }\n'
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toBeNull()
})

test("moving what a template holds is a restatement", () => {
  const was = "const a = `it is ${one} read`\n"
  const now = "const a = `the page is ${one} read`\n"
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toBeNull()
})

test("moving an identifier is no restatement", () => {
  const was = 'const one = "held"\n'
  const now = 'const two = "held"\n'
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toContain("more than the words")
})

test("moving what is inside a template's expression is no restatement", () => {
  const was = "const a = `it is ${one} read`\n"
  const now = "const a = `it is ${two} read`\n"
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toContain("more than the words")
})

test("adding a run of text is no restatement", () => {
  const was = 'const a = "one"\n'
  const now = 'const a = "one"\nconst b = "two"\n'
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toContain("adds one or takes one away")
})

test("moving a comment is no restatement", () => {
  const was = '// the page is read\nconst a = "one"\n'
  const now = '// a page is read\nconst a = "one"\n'
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toContain("more than the words")
})

test("a number is no run of stated text, so moving one is no restatement", () => {
  const was = 'const a = { max: 100, said: "held" }\n'
  const now = 'const a = { max: 200, said: "held" }\n'
  expect(movedMoreThanWords(NO_BIOME, AT, was, now)).toContain("more than the words")
})

test("a path taken away is no restatement", () => {
  const said = unrestatedIn(NO_BIOME, [{ path: AT, was: bytes("const a = 1\n"), now: null }])
  expect(said[0]).toContain("taken away is no restatement")
})

test("a path that is not there yet is no restatement", () => {
  const said = unrestatedIn(NO_BIOME, [{ path: AT, was: null, now: bytes("const a = 1\n") }])
  expect(said[0]).toContain("not there yet")
})

test("a body that is no TypeScript is judged no restatement", () => {
  const said = unrestatedIn(NO_BIOME, [
    { path: "one.md", was: bytes("one\n"), now: bytes("two\n") },
  ])
  expect(said[0]).toContain("only a TypeScript body")
})

test("a restatement is answered with nothing to say", () => {
  const said = unrestatedIn(NO_BIOME, [
    { path: AT, was: bytes('const a = "it"\n'), now: bytes('const a = "the page"\n') },
  ])
  expect(said).toEqual([])
})

test("only a TypeScript body is judged here", () => {
  expect(judgedHere("one.ts")).toBe(true)
  expect(judgedHere("one.tsx")).toBe(true)
  expect(judgedHere("one.md")).toBe(false)
})
