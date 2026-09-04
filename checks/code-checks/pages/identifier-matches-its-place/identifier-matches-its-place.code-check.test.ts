import { expect, test } from "bun:test"
import { lowerCamelCase } from "@akasha/pages-system/name-format/lower-camel-case"
import { upperCamelCase } from "@akasha/pages-system/name-format/upper-camel-case"
import { upperSnakeCase } from "@akasha/pages-system/name-format/upper-snake-case"
import { componentIdentifier } from "@akasha/pages-system/name-place/component-identifier"
import { constantIdentifier } from "@akasha/pages-system/name-place/constant-identifier"
import { derivedIdentifier } from "@akasha/pages-system/name-place/derived-identifier"
import { functionIdentifier } from "@akasha/pages-system/name-place/function-identifier"
import { typeIdentifier } from "@akasha/pages-system/name-place/type-identifier"
import { type Places, refusedIn } from "./identifier-matches-its-place.code-check.code.ts"

const PLACES: Places = {
  typeIdentifier: {
    nameFormatSlug: typeIdentifier.nameFormatSlug,
    matching: upperCamelCase,
  },
  functionIdentifier: {
    nameFormatSlug: functionIdentifier.nameFormatSlug,
    matching: lowerCamelCase,
  },
  componentIdentifier: {
    nameFormatSlug: componentIdentifier.nameFormatSlug,
    matching: upperCamelCase,
  },
  constantIdentifier: {
    nameFormatSlug: constantIdentifier.nameFormatSlug,
    matching: upperSnakeCase,
  },
  derivedIdentifier: {
    nameFormatSlug: derivedIdentifier.nameFormatSlug,
    matching: lowerCamelCase,
  },
}

const AT = "akasha/held.ts"

const DRAWN_AT = "akasha/held.tsx"

const PAGE_AT = "akasha/held-over.module.ts"

const BESIDE_AT = "akasha/held-over.module.code.ts"

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

test("a constant written out at the top of a file is judged, whatever the literal is", () => {
  const body =
    'const HELD = "one"\nconst OVER = { one: 1 }\nconst EVERY = [1]\nconst SHAPE = /one/\n' +
    "const SAID = `one`\nconst ON = true\nconst OFF = false\nconst COUNT = 2\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a constant not in upper snake case is refused, naming the line and the format", () => {
  const said = refusedIn(AT, '\nconst heldAt = "akasha/"\n', PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("the constant `heldAt`")
  expect(said[0]).toContain("`name-format/upper-snake-case`")
})

test("a literal is a literal through `as` and `satisfies`", () => {
  const said = refusedIn(AT, "const held = { one: 1 } as const satisfies object\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the constant `held`")
})

test("a name the file can bind again is no constant, whatever the literal is", () => {
  expect(refusedIn(AT, "let initialized = false\n", PLACES)).toEqual([])
  expect(refusedIn(AT, 'var heldAt = "akasha/"\n', PLACES)).toEqual([])
})

test("a constant beside a name the file can bind again is judged still", () => {
  const said = refusedIn(AT, 'let initialized = false\nconst heldAt = "akasha/"\n', PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the constant `heldAt`")
})

test("a name bound to a resource is no constant", () => {
  expect(refusedIn(AT, "using heldAt = { [Symbol.dispose]() {} }\n", PLACES)).toEqual([])
})

test("a value worked out at the top of a file is passed over", () => {
  const body =
    'const held = new Set(["one"])\nconst over = oneIn()\nconst said = `${held}`\n' +
    "const every = held\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a name inside a function is judged against the place a derived identifier stands in", () => {
  const body = 'export function one() {\n  const HELD_AT = "two"\n  return HELD_AT\n}\n'
  const said = refusedIn(AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("the name `HELD_AT`")
  expect(said[0]).toContain("`name-format/lower-camel-case`")
})

test("a name inside a function written in lower camel case is let through", () => {
  const body = 'export function one() {\n  const held = "two"\n  return held\n}\n'
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a name a pattern binds is judged, and the key it is bound from is not", () => {
  const body =
    "export function one(held: { Some_Key: number }) {\n" +
    "  const { Some_Key: Bound } = held\n  return Bound\n}\n"
  const said = refusedIn(AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the name `Bound`")
})

test("every name a list pattern binds is judged", () => {
  const body =
    "export function one(held: number[]) {\n" +
    "  const [First, second] = held\n  return [First, second]\n}\n"
  const said = refusedIn(AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the name `First`")
})

test("a catch binding is judged where it stands", () => {
  const body =
    "export function one() {\n  try {\n    one()\n" +
    "  } catch (Thrown) {\n    return Thrown\n  }\n}\n"
  const said = refusedIn(AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the name `Thrown`")
})

test("a parameter of a function carrying a body is judged", () => {
  const said = refusedIn(AT, "export function one(BadArg: number) {\n  return BadArg\n}\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the parameter `BadArg`")
  expect(said[0]).toContain("`name-format/lower-camel-case`")
})

test("a parameter of a function type or a method signature is not judged", () => {
  const body =
    "export type One = (BadArg: number) => void\n" +
    "export type Two = { m(BadArg: number): void }\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a parameter the body does not read opens with an underscore and is let through", () => {
  const body = "export const one = (_whole: string, held: string) => held\n"
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a parameter the body reads is judged though it opens with an underscore", () => {
  const said = refusedIn(AT, "export const one = (_whole: string) => _whole\n", PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the parameter `_whole`")
})

test("a page's own value is passed over, and a name standing beside it is not", () => {
  const body = 'export const heldOver = { slug: "held-over" } as const\nconst other = "one"\n'
  const said = refusedIn(PAGE_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the constant `other`")
})

test("a property file's stem makes no identifier, so nothing there is passed over", () => {
  const said = refusedIn(BESIDE_AT, 'const heldOver = "one"\n', PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the constant `heldOver`")
})

test("a name that is read rather than declared is left to the file declaring it", () => {
  const body = 'import { BadName } from "./one.ts"\nexport const two = () => BadName\n'
  expect(refusedIn(AT, body, PLACES)).toEqual([])
})

test("a property key and a type parameter are each left alone", () => {
  const body = "export function one<T>(held: T) {\n  return { BadKey: held }\n}\n"
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

test("a function drawing a JSX element is a component, so upper camel case is let through", () => {
  const body = "export function ReadoutRing() {\n  return <p>one</p>\n}\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)).toEqual([])
})

test("a component not in upper camel case is refused, naming it a component", () => {
  const body = "export function readoutRing() {\n  return <p>one</p>\n}\n"
  const said = refusedIn(DRAWN_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the component `readoutRing`")
  expect(said[0]).toContain("`name-format/upper-camel-case`")
})

test("a function beside a component that draws nothing is still a function", () => {
  const body = "export function RungOf() {\n  return 1\n}\n"
  const said = refusedIn(DRAWN_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the function `RungOf`")
  expect(said[0]).toContain("`name-format/lower-camel-case`")
})

test("a component bound to a name is judged as one, arrow and declaration alike", () => {
  const body = "export const readoutRing = () => <p>one</p>\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)[0]).toContain("the component `readoutRing`")
})

test("a self-closing element and a fragment each make a component", () => {
  expect(refusedIn(DRAWN_AT, "const one = () => <br />\n", PLACES)).toHaveLength(1)
  expect(refusedIn(DRAWN_AT, "const one = () => <>held</>\n", PLACES)).toHaveLength(1)
})

test("a name a JSX element opens with is a component, so upper camel case is let through", () => {
  const body = "export function One() {\n  const Icon = held.icon\n  return <Icon />\n}\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)).toEqual([])
})

test("a parameter a JSX element opens with is judged as a component too", () => {
  const body = "export const One = ({ Icon }: { Icon: () => null }) => <Icon />\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)).toEqual([])
})

test("a function holding no JSX is a component where an element in the file opens with it", () => {
  const body =
    "export function Held(): null {\n  return null\n}\n" +
    "export function One() {\n  return <Held />\n}\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)).toEqual([])
})

test("a name no JSX element opens with is refused where it was refused before", () => {
  const body = "export function one() {\n  const Icon = held.icon\n  return Icon\n}\n"
  const said = refusedIn(DRAWN_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the name `Icon`")
  expect(said[0]).toContain("`name-format/lower-camel-case`")
})

test("a name a JSX element opens with is still refused where it is not upper camel case", () => {
  const body = "export function One() {\n  const ICON_ONE = held.icon\n  return <ICON_ONE />\n}\n"
  const said = refusedIn(DRAWN_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the component `ICON_ONE`")
  expect(said[0]).toContain("`name-format/upper-camel-case`")
})

test("a tag opening lower names a browser element, so the name bound is judged where bound", () => {
  const body =
    "export function One() {\n  const button = held.button\n" +
    "  return <button>{button}</button>\n}\n"
  expect(refusedIn(DRAWN_AT, body, PLACES)).toEqual([])
})

test("a name is a component only where the element opening with it is in the same body", () => {
  const body =
    "export function one() {\n  const Icon = held.icon\n  return Icon\n}\n" +
    "export function Two() {\n  return <Icon />\n}\n"
  const said = refusedIn(DRAWN_AT, body, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the name `Icon`")
})

test("a declaration file states names another writer chose, so none of them is judged", () => {
  const body =
    "declare function GetItemLink(id: number): string\ndeclare const BAG_BACKPACK: number\n"
  expect(refusedIn("akasha/eso-writ.type-declaration.d.ts", body, PLACES)).toEqual([])
  expect(refusedIn(AT, body, PLACES)).toHaveLength(1)
})

test("a function answering with an object holding an element draws nothing", () => {
  const held = "export function heldOver() {\n  return { slot: <p>one</p> }\n}\n"
  const over = "export function HeldOver() {\n  return { slot: <p>one</p> }\n}\n"
  expect(refusedIn(DRAWN_AT, held, PLACES)).toEqual([])
  const said = refusedIn(DRAWN_AT, over, PLACES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the function `HeldOver`")
})

test("an element a nested function answers with belongs to the nested function", () => {
  const held =
    "export function heldOver() {\n  const DrawOne = () => <p>one</p>\n  return DrawOne\n}\n"
  expect(refusedIn(DRAWN_AT, held, PLACES)).toEqual([])
})

test("a list, a call and a condition each carry what a function answers with", () => {
  const list = 'export function HeldOver() {\n  return [<p key="one">one</p>]\n}\n'
  const call = "export function HeldOver() {\n  return holding(<p>one</p>, at)\n}\n"
  const held = "export function HeldOver(one: boolean) {\n  return one ? <p>one</p> : null\n}\n"
  expect(refusedIn(DRAWN_AT, list, PLACES)).toEqual([])
  expect(refusedIn(DRAWN_AT, call, PLACES)).toEqual([])
  expect(refusedIn(DRAWN_AT, held, PLACES)).toEqual([])
})

test("the formats judged are the ones the place pages state", () => {
  expect(typeIdentifier.nameFormatSlug).toBe("name-format/upper-camel-case")
  expect(functionIdentifier.nameFormatSlug).toBe("name-format/lower-camel-case")
  expect(componentIdentifier.nameFormatSlug).toBe("name-format/upper-camel-case")
  expect(constantIdentifier.nameFormatSlug).toBe("name-format/upper-snake-case")
  expect(derivedIdentifier.nameFormatSlug).toBe("name-format/lower-camel-case")
})
