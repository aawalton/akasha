import { expect, test } from "bun:test"
import { placedIn, specifiersIn, spelledIn } from "./code-specifier.module.code.ts"

const AT = "akasha/held.ts"

test("an import and an export naming a module are both read", () => {
  const body = 'import { one } from "./one.ts"\nexport { two } from "./two.ts"\n'
  expect(specifiersIn(AT, body)).toEqual(["./one.ts", "./two.ts"])
})

test("a dynamic import and a require call are read", () => {
  const body = 'const one = await import("./one.ts")\nconst two = require("./two.ts")\n'
  expect(specifiersIn(AT, body)).toEqual(["./one.ts", "./two.ts"])
})

test("an import assignment naming a module is read", () => {
  expect(specifiersIn(AT, 'import one = require("./one.ts")\n')).toEqual(["./one.ts"])
})

test("an import type node is read", () => {
  const body = 'export type One = import("./one.ts").One\n'
  expect(specifiersIn(AT, body)).toEqual(["./one.ts"])
})

test("a string that names no module is passed over", () => {
  expect(specifiersIn(AT, 'const one = "./one.ts"\n')).toEqual([])
})

test("what is read stands in the order it is written, however deep it sits", () => {
  const body =
    'import { one } from "./one.ts"\n' +
    "async function two(): Promise<unknown> {\n" +
    '  return import("./two.ts")\n' +
    "}\n" +
    'export { three } from "./three.ts"\n'
  expect(specifiersIn(AT, body)).toEqual(["./one.ts", "./two.ts", "./three.ts"])
})

test("a specifier carries where it stands, so it can be written over in place", () => {
  const body = 'import { one } from "./one.ts"\n'
  const found = placedIn(AT, body)
  expect(found).toHaveLength(1)
  const held = found[0]
  if (held === undefined) throw new Error("nothing was read out of the body")
  expect(body.slice(held.start, held.end)).toBe('"./one.ts"')
  expect(held.text).toBe("./one.ts")
})

test("the text of a specifier is what the placed one carries", () => {
  const body = 'import { one } from "./one.ts"\nimport { two } from "./two.ts"\n'
  expect(specifiersIn(AT, body)).toEqual(placedIn(AT, body).map((one) => one.text))
})

test("a body naming no module is read as naming none", () => {
  expect(placedIn(AT, "export const one = 1\n")).toEqual([])
})

test("every string a body holds is spelled, whether or not it names a module", () => {
  const body = 'import { one } from "./one.ts"\nconst two = "../two/three.module.code.ts"\n'
  expect(spelledIn(AT, body).map((one) => one.text)).toEqual([
    "./one.ts",
    "../two/three.module.code.ts",
  ])
  expect(specifiersIn(AT, body)).toEqual(["./one.ts"])
})

test("what a body spells carries where it stands, so it can be written over in place", () => {
  const body = 'const one = "akasha/one/held.module.code.ts"\n'
  const held = spelledIn(AT, body)[0]
  if (held === undefined) throw new Error("nothing was read out of the body")
  expect(body.slice(held.start, held.end)).toBe('"akasha/one/held.module.code.ts"')
})

test("a template is no string here, because what fills it is not read", () => {
  expect(spelledIn(AT, "const one = `./one.ts`\n")).toEqual([])
})
