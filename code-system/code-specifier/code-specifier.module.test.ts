import { expect, test } from "bun:test"
import {
  landingOf,
  placedIn,
  specifierFor,
  specifiersIn,
  spelledIn,
} from "./code-specifier.module.code.ts"

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

test("what is read is answered in the order it is written, however deep it sits", () => {
  const body =
    'import { one } from "./one.ts"\n' +
    "async function two(): Promise<unknown> {\n" +
    '  return import("./two.ts")\n' +
    "}\n" +
    'export { three } from "./three.ts"\n'
  expect(specifiersIn(AT, body)).toEqual(["./one.ts", "./two.ts", "./three.ts"])
})

test("a specifier carries where it is, so it can be written over in place", () => {
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

test("what a body spells carries where it is, so it can be written over in place", () => {
  const body = 'const one = "akasha/one/held.module.code.ts"\n'
  const held = spelledIn(AT, body)[0]
  if (held === undefined) throw new Error("nothing was read out of the body")
  expect(body.slice(held.start, held.end)).toBe('"akasha/one/held.module.code.ts"')
})

test("a template is no string here, because what fills it is not read", () => {
  expect(spelledIn(AT, "const one = `./one.ts`\n")).toEqual([])
})

test("a relative specifier lands under the file holding it", () => {
  expect(landingOf("akasha/a/b/one.ts", "../two.ts")).toBe("akasha/a/two.ts")
  expect(landingOf("akasha/a/b/one.ts", "./two.ts")).toBe("akasha/a/b/two.ts")
})

test("a specifier naming no path relative to the file lands nowhere", () => {
  expect(landingOf(AT, "typescript")).toBeNull()
  expect(landingOf(AT, "node:path")).toBeNull()
  expect(landingOf(AT, "/etc/passwd")).toBeNull()
})

test("a specifier naming a package lands where the naming handed in says", () => {
  const naming = new Map([["@akasha/indexes", "akasha/pages-system/indexes/one.ts"]])
  expect(landingOf(AT, "@akasha/indexes", naming)).toBe("akasha/pages-system/indexes/one.ts")
})

test("a specifier the naming does not name lands nowhere", () => {
  const naming = new Map([["@akasha/indexes", "akasha/pages-system/indexes/one.ts"]])
  expect(landingOf(AT, "@akasha/pages", naming)).toBeNull()
  expect(landingOf(AT, "node:path", naming)).toBeNull()
})

test("a specifier matching a way in spelt with a star lands where that star says", () => {
  const naming = new Map([["akasha/*", "*"]])
  expect(landingOf(AT, "akasha/pages/page.page-type.types.ts", naming)).toBe(
    "pages/page.page-type.types.ts"
  )
  expect(landingOf(AT, "akasha/one.ts", naming)).toBe("one.ts")
})

test("a way in spelt with a star carries the star's part onto that way in's target", () => {
  const naming = new Map([["@akasha/indexes/*", "akasha/indexes/*"]])
  expect(landingOf(AT, "@akasha/indexes/a/b/one.ts", naming)).toBe("akasha/indexes/a/b/one.ts")
})

test("a way in with no star names one specifier and nothing beneath that specifier", () => {
  const naming = new Map([["@akasha/indexes", "akasha/pages-system/indexes/one.ts"]])
  expect(landingOf(AT, "@akasha/indexes", naming)).toBe("akasha/pages-system/indexes/one.ts")
  expect(landingOf(AT, "@akasha/indexes/shape", naming)).toBeNull()
})

test("a way in the naming names exactly is answered before any star is tried", () => {
  const naming = new Map([
    ["akasha/*", "*"],
    ["akasha/one.ts", "elsewhere/two.ts"],
  ])
  expect(landingOf(AT, "akasha/one.ts", naming)).toBe("elsewhere/two.ts")
})

test("a way in spelt with a star whose target has no star lands nowhere", () => {
  const naming = new Map([["akasha/*", "one.ts"]])
  expect(landingOf(AT, "akasha/two.ts", naming)).toBeNull()
})

test("a relative specifier lands under the file holding it whatever the naming says", () => {
  const naming = new Map([["./two.ts", "akasha/elsewhere.ts"]])
  expect(landingOf("akasha/a/b/one.ts", "./two.ts", naming)).toBe("akasha/a/b/two.ts")
})

test("a landing climbing out of the folder is answered as it falls, and not judged here", () => {
  expect(landingOf("akasha/b.ts", "../../outside.ts")).toBe("../outside.ts")
})

test("a specifier spelled for a path under the folder opens with a dot and a slash", () => {
  expect(specifierFor("akasha/a/b", "akasha/a/b/two.ts")).toBe("./two.ts")
})

test("a specifier spelled for a path outside the folder climbs to reach that path", () => {
  expect(specifierFor("akasha/a/b", "akasha/a/two.ts")).toBe("../two.ts")
})

test("a path spelled as a specifier lands back on that path", () => {
  const said = specifierFor("akasha/a/b", "akasha/a/two.ts")

  expect(landingOf("akasha/a/b/one.ts", said)).toBe("akasha/a/two.ts")
})

test("a path under the folder whose first part opens with a dot opens with a dot and a slash", () => {
  const said = specifierFor("akasha/a/b", "akasha/a/b/.server/two.ts")

  expect(said).toBe("./.server/two.ts")
  expect(landingOf("akasha/a/b/one.ts", said)).toBe("akasha/a/b/.server/two.ts")
})
