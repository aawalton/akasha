import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  declaredIn,
  loadedFrom,
  parsedIn,
  valueAt,
  valueIn,
} from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugsIn,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const A = "01a04b79-0000-7000-8000-00000000000a"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a body exporting one object is answered with that object", () => {
  expect(valueIn(`export const it = { id: "${A}", slug: "a" } as const\n`)).toEqual({
    id: A,
    slug: "a",
  })
})

test("a body is answered with what that body exports rather than another body's names", () => {
  expect(Object.keys(declaredIn(`export const it = { id: "${A}" } as const\n`))).toEqual(["it"])
})

test("a body of the shape every page has is read off its text rather than run", () => {
  expect(
    parsedIn(
      `import type { M } from "m"\n\nexport const it = {\n  id: "${A}",\n  slug: "a",\n} as const satisfies M\n`
    )
  ).toEqual({ id: A, slug: "a" })
})

test("what a page body holds is text, a number, true, false, null, a list or an object", () => {
  expect(
    parsedIn(
      'export const it = { a: "x", b: 12, c: 1.5, d: -40, e: true, f: false, g: null, h: [1, "two"], i: { j: [] } }\n'
    )
  ).toEqual({
    a: "x",
    b: 12,
    c: 1.5,
    d: -40,
    e: true,
    f: false,
    g: null,
    h: [1, "two"],
    i: { j: [] },
  })
})

test("a key spelled bare and a key spelled as text are one key", () => {
  expect(parsedIn('export const it = { "slug": "a" } as const\n')).toEqual({ slug: "a" })
})

test("text a body spells as text added to text is answered joined", () => {
  expect(parsedIn('export const it = { why: "one " +\n    "two" } as const\n')).toEqual({
    why: "one two",
  })
})

test("an escape in text is answered as the character that escape names", () => {
  expect(
    parsedIn('export const it = { a: "one\\ntwo", b: "\\\\", c: "\\u0041" } as const\n')
  ).toEqual({
    a: "one\ntwo",
    b: "\\",
    c: "A",
  })
})

test("text spelled in single quotes is read as text", () => {
  expect(parsedIn(`export const it = { a: 'say "so"' } as const\n`)).toEqual({ a: 'say "so"' })
})

test("an export of a type declares no value and is not counted as a second one", () => {
  expect(parsedIn('export type Held = string\n\nexport const it = { a: "x" } as const\n')).toEqual({
    a: "x",
  })
})

test("a body the reading refuses is run instead, so what it declares is still answered", () => {
  expect(parsedIn('export const it = {\n  // held\n  a: "x",\n} as const\n')).toBe(null)
  expect(valueIn('export const it = {\n  // held\n  a: "x",\n} as const\n')).toEqual({ a: "x" })
})

test("a body that would run code to make a value is refused by the reading", () => {
  expect(parsedIn('export const it = { id: oidOf("x") } as const\n')).toBe(null)
})

test("a body exporting a second value is refused by the reading rather than read", () => {
  expect(
    parsedIn('export const it = { a: "x" } as const\nexport const two = { b: "y" } as const\n')
  ).toBe(null)
})

test("a body whose object is part of a larger expression is refused by the reading", () => {
  expect(parsedIn('export const it = { a: "x" }.a\n')).toBe(null)
})

test("a body whose object never closes is refused rather than answered part-read", () => {
  expect(parsedIn('export const it = { a: "x",\n')).toBe(null)
})

test("a body exporting nothing is refused by the reading", () => {
  expect(parsedIn("the new body")).toBe(null)
  expect(parsedIn('const it = { a: "x" }\n')).toBe(null)
})

test("a body that will not load is answered with why rather than by throwing", () => {
  const loaded = loadedFrom("the new body")
  expect(loaded.value).toBe(null)
  expect(typeof loaded.failed).toBe("string")
})

test("a body that will not load answers with no value rather than throwing", () => {
  expect(
    valueIn(
      `import { oidOf } from "./reading.module.code.ts"\nexport const it = { id: oidOf("x") }\n`
    )
  ).toBe(null)
  expect(valueIn("the new body")).toBe(null)
})

test("a body loaded once is answered from what was loaded rather than loaded again", () => {
  const body = `export const it = { id: "${A}", slug: "held" } as const\n`

  expect(loadedFrom(body)).toBe(loadedFrom(body))
})

test("a path that is a folder holds no page, and is not read as though it were a file", () => {
  const repo = scratch.rootFor("akasha-entries-folder-")
  mkdirSync(join(repo, "held"), { recursive: true })

  expect(valueAt("held", repo)).toBe(null)
})

test("a path that is nothing holds no page", () => {
  const repo = scratch.rootFor("akasha-entries-gone-")

  expect(valueAt("gone.module.ts", repo)).toBe(null)
})

test("a path that is a file is read for the page it holds", () => {
  const repo = scratch.rootFor("akasha-entries-file-")
  writeFileSync(join(repo, "held.module.ts"), 'export const held = { slug: "held" }\n', "utf8")

  expect(valueAt("held.module.ts", repo)?.["slug"]).toBe("held")
})

test("a key holding a list of text is answered as that list", () => {
  expect(textsAt({ binds: ["127.0.0.1", "one.example"] }, "binds")).toEqual([
    "127.0.0.1",
    "one.example",
  ])
})

test("a key holding no list, or a list holding what is not text, is answered as nothing", () => {
  expect(textsAt({ binds: "127.0.0.1" }, "binds")).toBe(null)
  expect(textsAt({ binds: [8787] }, "binds")).toBe(null)
  expect(textsAt({}, "binds")).toBe(null)
})

test("one page name alone is answered as nothing, a list being the shape", () => {
  expect(slugsIn("page-type/module")).toEqual([])
})

test("a list of page names is answered as their slugs, in the order named", () => {
  expect(slugsIn(["page-type/module", "page-type/page-property"])).toEqual([
    "module",
    "page-property",
  ])
})

test("a key naming no page is answered as an empty list rather than as nothing", () => {
  expect(slugsIn(null)).toEqual([])
  expect(slugsIn(undefined)).toEqual([])
  expect(slugsIn("")).toEqual([])
  expect(slugsIn([])).toEqual([])
})

test("what is no page name is left out of the list rather than refusing the rest", () => {
  expect(slugsIn(["page-type/module", 8787, "", "page-type/page"])).toEqual(["module", "page"])
})
