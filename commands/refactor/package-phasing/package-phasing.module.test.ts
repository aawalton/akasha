import { expect, test } from "bun:test"
import {
  aliasAddedIn,
  aliasDroppedIn,
  aliasedIn,
  aliasFor,
  batchIn,
  namesIn,
  phaseOf,
} from "./package-phasing.module.code.ts"

const WAS = "@akasha/pages-system"

const NOW = "@akasha/pages"

const ALIASED = `{ "dependencies": { "${WAS}": "workspace:${NOW}@*" } }`

const PLAIN = `{ "dependencies": { "@akasha/other": "workspace:*" } }`

function named(pairs: readonly (readonly [string, string])[]): ReadonlyMap<string, string> {
  return new Map(pairs)
}

test("a manifest calling the old name is expand", () => {
  const said = phaseOf(named([["pages/package.json", WAS]]), PLAIN, WAS, NOW)
  expect(said).toEqual({ phase: "expand", at: "pages/package.json" })
})

test("the new name with the old one aliased at the root is migrate", () => {
  const said = phaseOf(named([["pages/package.json", NOW]]), ALIASED, WAS, NOW)
  expect(said).toEqual({ phase: "migrate", at: "pages/package.json" })
})

test("the new name with no alias left is done", () => {
  const said = phaseOf(named([["pages/package.json", NOW]]), PLAIN, WAS, NOW)
  expect(said).toEqual({ phase: "done", at: "pages/package.json" })
})

test("a name that is already the name it becomes is refused", () => {
  expect(phaseOf(named([["pages/package.json", WAS]]), PLAIN, WAS, WAS)).toEqual({
    refused: "`@akasha/pages-system` is the name it already carries",
  })
})

test("a manifest carrying each name is refused", () => {
  const said = phaseOf(
    named([
      ["pages/package.json", WAS],
      ["other/package.json", NOW],
    ]),
    PLAIN,
    WAS,
    NOW
  )
  expect(said).toEqual({
    refused: "`@akasha/pages` is the name other/package.json already carries",
  })
})

test("no manifest calling either name is refused", () => {
  expect(phaseOf(named([["other/package.json", "@akasha/other"]]), PLAIN, WAS, NOW)).toEqual({
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

test("a manifest that will not parse answers with no name", () => {
  expect([...namesIn(named([["pages/package.json", "{"]]))]).toEqual([])
})

test("the alias points the old name at the renamed package", () => {
  expect(aliasFor(NOW)).toBe("workspace:@akasha/pages@*")
})

test("a root naming the old name among its dependencies carries the alias", () => {
  expect(aliasedIn(ALIASED, WAS)).toBe(true)
})

test("a root naming the old name nowhere carries no alias", () => {
  expect(aliasedIn(PLAIN, WAS)).toBe(false)
})

test("a root that will not parse carries no alias", () => {
  expect(aliasedIn("{", WAS)).toBe(false)
})

test("an alias is added among the root's dependencies", () => {
  const text = `{\n  "dependencies": {\n    "@akasha/other": "workspace:*"\n  }\n}\n`
  const said = aliasAddedIn(text, WAS, NOW)
  expect(said).not.toBeNull()
  expect(aliasedIn(String(said), WAS)).toBe(true)
  expect(JSON.parse(String(said))).toEqual({
    dependencies: { [WAS]: "workspace:@akasha/pages@*", "@akasha/other": "workspace:*" },
  })
})

test("a root already carrying the alias is left as that root is", () => {
  expect(aliasAddedIn(ALIASED, WAS, NOW)).toBe(ALIASED)
})

test("a root naming no dependencies takes no alias", () => {
  expect(aliasAddedIn(`{ "name": "root" }`, WAS, NOW)).toBeNull()
})

test("an alias is dropped and the rest is left alone", () => {
  const text = `{\n  "dependencies": {\n    "${WAS}": "workspace:${NOW}@*",\n    "@akasha/other": "workspace:*"\n  }\n}\n`
  const said = aliasDroppedIn(text, WAS)
  expect(said).not.toBeNull()
  expect(JSON.parse(String(said))).toEqual({ dependencies: { "@akasha/other": "workspace:*" } })
})

test("a root carrying no alias drops none", () => {
  expect(aliasDroppedIn(`{ "dependencies": {} }`, WAS)).toBeNull()
})

test("a batch is no wider than the width asked for", () => {
  expect(batchIn(["c", "a", "b"], 2)).toEqual(["a", "b"])
})

test("a width of none takes every path", () => {
  expect(batchIn(["c", "a"], 0)).toEqual(["c", "a"])
})
