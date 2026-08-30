import { expect, test } from "bun:test"
import { lowerCamelCase } from "../../../pages-system/name-format/lower-camel-case/lower-camel-case.name-format.code.ts"
import { upperCamelCase } from "../../../pages-system/name-format/upper-camel-case/upper-camel-case.name-format.code.ts"
import { functionIdentifier } from "../../../pages-system/name-place/name-places/function-identifier.name-place.ts"
import { typeIdentifier } from "../../../pages-system/name-place/name-places/type-identifier.name-place.ts"
import { type Places, refusedIn } from "./identifier-matches-its-place.check.code.ts"

const PLACES: Places = {
  typeIdentifier: {
    nameFormatSlug: typeIdentifier.nameFormatSlug,
    matching: upperCamelCase,
  },
  functionIdentifier: {
    nameFormatSlug: functionIdentifier.nameFormatSlug,
    matching: lowerCamelCase,
  },
}

const AT = "akasha/held.ts"

test("a type in upper camel case and a function in lower camel case are let through", () => {
  const body = "export type PageEdge = { one: string }\nexport function pageEdgeIn() {}\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a type not in upper camel case is refused, naming the line and the format", () => {
  const said = refusedIn(AT, "\nexport type pageEdge = string\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("the type `pageEdge`")
  expect(said[0]).toContain("`name-format/upper-camel-case`")
})

test("an interface names a type, and takes the type's format", () => {
  const said = refusedIn(AT, "interface page_edge {\n  one: string\n}\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the interface `page_edge`")
})

test("a function not in lower camel case is refused, naming the format it wanted", () => {
  const said = refusedIn(AT, "function PageEdge() {}\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the function `PageEdge`")
  expect(said[0]).toContain("`name-format/lower-camel-case`")
})

test("a function bound to a name is a function, arrow or expression alike", () => {
  const arrow = refusedIn(AT, "const PageEdge = () => 1\n", PLACES)
  expect(arrow).toHaveLength(1)
  expect(arrow[0]).toContain("the function `PageEdge`")
  expect(refusedIn(AT, "const PageEdge = function () {\n  return 1\n}\n", PLACES)).toHaveLength(1)
})

test("a function bound inside another function is judged as well", () => {
  const body = "export function one() {\n  const TwoOf = () => 2\n  return TwoOf()\n}\n"
  const said = refusedIn(AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the function `TwoOf`")
})

test("a constant is passed over, whether it is written where it stands or worked out", () => {
  const body = 'const INSIDE = "akasha/"\nconst held = new Set([INSIDE])\nexport { held }\n'
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a name that is read rather than declared is left to the file declaring it", () => {
  const body = 'import { BadName } from "./one.ts"\nexport const two = () => BadName\n'
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a property key, a parameter and a type parameter are each left alone", () => {
  const body = "export function one<T>(BadArg: T) {\n  return { BadKey: BadArg }\n}\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("code standing inside a string is not read as code", () => {
  const body = "export const one = () => `\\nfunction BadName() {}\\n`\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("every name a file declares is reported, not only the first", () => {
  const body = "type one = string\ntype two = number\nfunction Three() {}\n"
  expect(refusedIn(AT, body, PLACES)).toHaveLength(3)
})

test("the formats judged are the ones the place pages state", () => {
  expect(typeIdentifier.nameFormatSlug).toBe("name-format/upper-camel-case")
  expect(functionIdentifier.nameFormatSlug).toBe("name-format/lower-camel-case")
})
