import { expect, test } from "bun:test"
import {
  batchIn,
  bodyPathFor,
  compatBodyFor,
  compatFilesFor,
  compatManifestFor,
  namesIn,
  phaseOf,
  subpathsIn,
} from "./package-phasing.module.code.ts"

const WAS = "@akasha/pages-system"

const NOW = "@akasha/pages"

function named(pairs: readonly (readonly [string, string])[]): ReadonlyMap<string, string> {
  return new Map(pairs)
}

test("a manifest calling the old name and none calling the new is expand", () => {
  const said = phaseOf(named([["pages/package.json", WAS]]), WAS, NOW)
  expect(said).toEqual({ phase: "expand", at: "pages/package.json" })
})

test("one manifest calling each name is migrate", () => {
  const said = phaseOf(
    named([
      ["pages/package.json", NOW],
      ["pages-compat/package.json", WAS],
    ]),
    WAS,
    NOW
  )
  expect(said).toEqual({ phase: "migrate", at: "pages/package.json" })
})

test("no manifest calling the old name is done", () => {
  const said = phaseOf(named([["pages/package.json", NOW]]), WAS, NOW)
  expect(said).toEqual({ phase: "done", at: "pages/package.json" })
})

test("a name that is already the name it becomes is refused", () => {
  expect(phaseOf(named([["pages/package.json", WAS]]), WAS, WAS)).toEqual({
    refused: "`@akasha/pages-system` is the name it already carries",
  })
})

test("no manifest calling either name is refused", () => {
  expect(phaseOf(named([["other/package.json", "@akasha/other"]]), WAS, NOW)).toEqual({
    refused: "no manifest calls its package `@akasha/pages-system`",
  })
})

test("a manifest answers with the name it calls its package", () => {
  const said = namesIn(named([["pages/package.json", `{ "name": "${WAS}" }`]]))
  expect([...said]).toEqual([["pages/package.json", WAS]])
})

test("a file that is no manifest answers with no name", () => {
  expect([...namesIn(named([["pages/one.ts", `{ "name": "${WAS}" }`]]))]).toEqual([])
})

test("the subpaths are the export keys", () => {
  const text = `{ "exports": { "./page": "./p.ts", "./page/slug": "./s.ts" } }`
  expect(subpathsIn(text)).toEqual(["./page", "./page/slug"])
})

test("a manifest naming no exports answers with none", () => {
  expect(subpathsIn(`{ "name": "one" }`)).toEqual([])
})

test("a subpath becomes a body path under the compat folder", () => {
  expect(bodyPathFor("./page/slug")).toBe("page/slug.ts")
})

test("a compat body re-exports the same subpath of the new name", () => {
  expect(compatBodyFor(NOW, "./page/slug")).toBe(`export * from "@akasha/pages/page/slug"\n`)
})

test("a compat manifest carries the old name and points at its own bodies", () => {
  const said = JSON.parse(compatManifestFor(WAS, ["./page"])) as Record<string, unknown>
  expect(said.name).toBe(WAS)
  expect(said.exports).toEqual({ "./page": "./page.ts" })
})

test("the compat files are the manifest and one body for each subpath", () => {
  const said = compatFilesFor("pages-compat", WAS, NOW, ["./page", "./page/slug"])
  expect([...said.keys()].sort()).toEqual([
    "pages-compat/package.json",
    "pages-compat/page.ts",
    "pages-compat/page/slug.ts",
  ])
})

test("a batch is no wider than the width asked for", () => {
  expect(batchIn(["c", "a", "b"], 2)).toEqual(["a", "b"])
})

test("a width of none takes every path", () => {
  expect(batchIn(["c", "a"], 0)).toEqual(["c", "a"])
})
