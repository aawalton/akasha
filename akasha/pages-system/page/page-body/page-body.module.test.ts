import { expect, test } from "bun:test"
import { bodyOf, importedFrom, saidAs, unnamedIn } from "./page-body.module.code.ts"

const AT = "akasha/person-system/device-tokens/pages/one.device-token.ts"

const TYPE_AT = "akasha/person-system/device-tokens/device-token.page-type.ts"

test("a page beneath its type reaches it by going up", () => {
  expect(importedFrom(AT, TYPE_AT)).toBe("../device-token.page-type.ts")
})

test("a page beside its type reaches it here", () => {
  expect(importedFrom("akasha/a/one.thing.ts", "akasha/a/thing.page-type.ts")).toBe(
    "./thing.page-type.ts"
  )
})

test("a body names the type its page answers to and satisfies it", () => {
  const said = bodyOf({
    pageTypeSlug: "device-token",
    slug: "one",
    importFrom: "../device-token.page-type.ts",
    keys: ["id", "pageTypeSlug", "slug"],
    values: { id: "an-id", pageTypeSlug: "device-token", slug: "one" },
  })
  expect(said).toContain('import type { DeviceToken } from "../device-token.page-type.ts"')
  expect(said).toContain("as const satisfies DeviceToken")
})

test("a body is exported under the name its slug becomes", () => {
  const said = bodyOf({
    pageTypeSlug: "device-token",
    slug: "alan-alanwalton-one",
    importFrom: "../device-token.page-type.ts",
    keys: ["slug"],
    values: { slug: "alan-alanwalton-one" },
  })
  expect(said).toContain("export const alanAlanwaltonOne = {")
})

test("the keys are written in the order the caller names them", () => {
  const said = bodyOf({
    pageTypeSlug: "thing",
    slug: "one",
    importFrom: "./thing.page-type.ts",
    keys: ["id", "slug", "token"],
    values: { token: "T", slug: "one", id: "an-id" },
  })
  const lines = said.split("\n").filter((one) => one.startsWith("  "))
  expect(lines).toEqual(['  id: "an-id",', '  slug: "one",', '  token: "T",'])
})

test("a key the caller names and the values do not carry is left out", () => {
  const said = bodyOf({
    pageTypeSlug: "thing",
    slug: "one",
    importFrom: "./thing.page-type.ts",
    keys: ["slug", "cover"],
    values: { slug: "one" },
  })
  expect(said).not.toContain("cover")
})

test("a key the values carry and the caller does not name is answered", () => {
  expect(unnamedIn(["slug"], { slug: "one", wandering: 1 })).toEqual(["wandering"])
})

test("values the caller names are answered as none unnamed", () => {
  expect(unnamedIn(["slug", "token"], { slug: "one" })).toEqual([])
})

test("a value that is a list is written as JSON", () => {
  const said = bodyOf({
    pageTypeSlug: "thing",
    slug: "one",
    importFrom: "./thing.page-type.ts",
    keys: ["partSlugs"],
    values: { partSlugs: ["a", "b"] },
  })
  expect(said).toContain('  partSlugs: ["a","b"],')
})

test("a body closes with one newline", () => {
  const said = bodyOf({
    pageTypeSlug: "thing",
    slug: "one",
    importFrom: "./thing.page-type.ts",
    keys: ["slug"],
    values: { slug: "one" },
  })
  expect(said.endsWith("\n")).toBe(true)
  expect(said.endsWith("\n\n")).toBe(false)
})

test("a key inside a value is written bare where TypeScript reads it bare", () => {
  const said = bodyOf({
    pageTypeSlug: "thing",
    slug: "one",
    importFrom: "./thing.page-type.ts",
    keys: ["invariants"],
    values: { invariants: [{ invariantKind: "gap", statement: "one" }] },
  })
  expect(said).toContain('  invariants: [{invariantKind:"gap",statement:"one"}],')
})

test("a key TypeScript does not read bare is written quoted", () => {
  expect(saidAs({ "a-key": 1 })).toBe('{"a-key":1}')
})

test("a value that is not an object is written as JSON", () => {
  expect(saidAs(null)).toBe("null")
  expect(saidAs(false)).toBe("false")
  expect(saidAs(7)).toBe("7")
})
