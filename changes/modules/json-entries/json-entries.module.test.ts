import { expect, test } from "bun:test"
import ts from "typescript"
import {
  entriesGoingIn,
  keysGoingIn,
  objectAt,
  objectOf,
  textAt,
} from "./json-entries.module.code.ts"

const AT = "held/package.json"

const BODY = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./one": "./one/one.module.code.ts",',
  '    "./two": "./two/two.module.code.ts",',
  '    "./three": "./three/three.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

const FLAT = ['{ "exports": "./one.ts" }', ""].join("\n")

const WITHOUT_TWO = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./one": "./one/one.module.code.ts",',
  '    "./three": "./three/three.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

const WITHOUT_THREE = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./one": "./one/one.module.code.ts",',
  '    "./two": "./two/two.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

const LAST_LEFT = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./three": "./three/three.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

const FIRST_LEFT = [
  "{",
  '  "name": "@akasha/held",',
  '  "exports": {',
  '    "./one": "./one/one.module.code.ts"',
  "  }",
  "}",
  "",
].join("\n")

function droppedFrom(text: string, holding: string, dropping: readonly string[]): string {
  const spans = entriesGoingIn(AT, text, holding, new Set(dropping))
  let said = text
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }
  return said
}

test("the object answered is the one the named key holds", () => {
  expect(objectAt(ts.parseJsonText(AT, BODY), "exports")?.properties.length).toBe(3)
})

test("a key holding anything but an object answers no object", () => {
  expect(objectAt(ts.parseJsonText(AT, BODY), "name")).toBeNull()
})

test("a key the body states nothing under answers no object", () => {
  expect(objectAt(ts.parseJsonText(AT, BODY), "nothing")).toBeNull()
})

test("a body whose top level is no object answers no object", () => {
  expect(objectAt(ts.parseJsonText(AT, "[1, 2]\n"), "exports")).toBeNull()
})

test("an entry with a comma after it goes with that comma", () => {
  expect(droppedFrom(BODY, "exports", ["./two"])).toBe(WITHOUT_TWO)
})

test("an entry with no comma after it goes back to take the comma before it", () => {
  expect(droppedFrom(BODY, "exports", ["./three"])).toBe(WITHOUT_THREE)
})

test("no comma is taken twice where neighbours go together", () => {
  const spans = entriesGoingIn(AT, BODY, "exports", new Set(["./two", "./three"]))
  const first = spans[0]
  const second = spans[1]

  expect(spans.length).toBe(2)
  expect(second !== undefined && first !== undefined && second.from >= first.to).toBe(true)
})

test("a run going out of the front leaves a body reading as JSON", () => {
  expect(droppedFrom(BODY, "exports", ["./one", "./two"])).toBe(LAST_LEFT)
  expect(JSON.parse(LAST_LEFT)).toEqual({
    name: "@akasha/held",
    exports: { "./three": "./three/three.module.code.ts" },
  })
})

test("a run going out of the end takes the comma before that run", () => {
  expect(droppedFrom(BODY, "exports", ["./two", "./three"])).toBe(FIRST_LEFT)
})

test("a body a run went out of reads as JSON", () => {
  expect(JSON.parse(droppedFrom(BODY, "exports", ["./two", "./three"]))).toEqual({
    name: "@akasha/held",
    exports: { "./one": "./one/one.module.code.ts" },
  })
})

test("every entry going leaves an object holding none", () => {
  expect(JSON.parse(droppedFrom(BODY, "exports", ["./one", "./two", "./three"]))).toEqual({
    name: "@akasha/held",
    exports: {},
  })
})

test("an entry the caller does not name is left where that entry is", () => {
  expect(droppedFrom(BODY, "exports", ["./nothing"])).toBe(BODY)
})

test("a key holding no object is dropped from nowhere", () => {
  expect(entriesGoingIn(AT, FLAT, "exports", new Set(["./one"]))).toEqual([])
})

test("the text answered is the one the named key holds", () => {
  expect(textAt(ts.parseJsonText(AT, FLAT), "exports")).toBe("./one.ts")
  expect(textAt(ts.parseJsonText(AT, BODY), "name")).toBe("@akasha/held")
})

test("a key holding anything but a string answers no text", () => {
  expect(textAt(ts.parseJsonText(AT, BODY), "exports")).toBeNull()
  expect(textAt(ts.parseJsonText(AT, BODY), "nothing")).toBeNull()
  expect(textAt(ts.parseJsonText(AT, "[1, 2]\n"), "exports")).toBeNull()
})

test("the body's own top-level object is answered apart from any key it holds", () => {
  expect(objectOf(ts.parseJsonText(AT, BODY))?.properties.length).toBe(2)
  expect(objectOf(ts.parseJsonText(AT, "[1, 2]\n"))).toBeNull()
})

test("a key of the top-level object is dropped the way an entry under a key is", () => {
  const spans = keysGoingIn(AT, BODY, new Set(["exports"]))
  let said = BODY
  for (const one of [...spans].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }

  expect(JSON.parse(said)).toEqual({ name: "@akasha/held" })
})

test("a key the top-level object does not hold is dropped from nowhere", () => {
  expect(keysGoingIn(AT, BODY, new Set(["nothing"]))).toEqual([])
  expect(keysGoingIn(AT, "[1, 2]\n", new Set(["exports"]))).toEqual([])
})
