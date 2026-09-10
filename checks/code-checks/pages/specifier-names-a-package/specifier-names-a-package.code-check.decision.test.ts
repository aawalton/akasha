import { expect, test } from "bun:test"
import {
  packageOf,
  scopesOf,
  strandedIn,
  suspectedIn,
} from "./specifier-names-a-package.code-check.decision.code.ts"

const AT = "akasha/held/one/one.module.code.ts"

const NAMES = new Set(["@akasha/held", "@akasha/other", "@vendor/thing"])

const SCOPES = scopesOf(NAMES)

function stranded(text: string): readonly string[] {
  return strandedIn(AT, text, NAMES, SCOPES)
}

test("a specifier naming a package a manifest states is let through", () => {
  expect(stranded('import { one } from "@akasha/other"')).toEqual([])
})

test("a specifier naming a package no manifest states is refused by that name", () => {
  const said = stranded('import { one } from "@akasha/gone"')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("@akasha/gone")
})

test("a way into a package is judged by the package the specifier opens with", () => {
  expect(stranded('import { one } from "@akasha/other/deep/part"')).toEqual([])
  expect(stranded('import { one } from "@akasha/gone/deep/part"')).toHaveLength(1)
})

test("a name spelled by many specifiers in one body is refused once", () => {
  const said = stranded(
    'import { one } from "@akasha/gone"\nimport { two } from "@akasha/gone/part"'
  )
  expect(said).toHaveLength(1)
})

test("a name spelled inside a string rather than an import is passed over", () => {
  expect(stranded('const said = "@akasha/gone"')).toEqual([])
})

test("a specifier naming no scope is passed over", () => {
  expect(stranded('import { one } from "akasha/held/one/one.module.code.ts"')).toEqual([])
  expect(stranded('import ts from "typescript"')).toEqual([])
})

test("a specifier whose scope no package name shares is passed over", () => {
  expect(stranded('import { one } from "@types/bun"')).toEqual([])
})

test("a scope some package name shares is judged though that package is another one", () => {
  expect(stranded('import { one } from "@vendor/gone"')).toHaveLength(1)
})

test("a relative specifier is passed over", () => {
  expect(stranded('import { one } from "../two/two.module.code.ts"')).toEqual([])
})

test("an export reaching by a package name is judged as an import is", () => {
  expect(stranded('export { one } from "@akasha/gone"')).toHaveLength(1)
})

test("a package name is the scope and the one segment after it", () => {
  expect(packageOf("@akasha/held")).toBe("@akasha/held")
  expect(packageOf("@akasha/held/deep/part")).toBe("@akasha/held")
})

test("a specifier that is no scoped name has no package name", () => {
  expect(packageOf("@akasha")).toBeNull()
  expect(packageOf("typescript")).toBeNull()
  expect(packageOf("./one.ts")).toBeNull()
})

test("the scopes are read off the package names rather than stated", () => {
  expect(scopesOf(["@akasha/held", "@vendor/thing", "akasha"])).toEqual(
    new Set(["@akasha", "@vendor"])
  )
})

test("a body spelling only names the manifests state is not parsed", () => {
  expect(suspectedIn('import { one } from "@akasha/held"', SCOPES, NAMES)).toBe(false)
  expect(suspectedIn('import { one } from "@akasha/gone"', SCOPES, NAMES)).toBe(true)
})

test("a body naming no scope at all is not parsed", () => {
  expect(suspectedIn("const said = 1", SCOPES, NAMES)).toBe(false)
})
