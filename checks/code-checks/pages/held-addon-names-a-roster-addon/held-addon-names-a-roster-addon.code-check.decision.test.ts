import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import {
  type Asking,
  heldIn,
  refusalsOver,
  rosterIn,
} from "./held-addon-names-a-roster-addon.code-check.decision.code.ts"

const ADDON_PAGE = "temper/temper-lib-async/temper-lib-async.eso-addon.ts"

const MANIFEST_AT = "temper/temper-lib-async/temper-lib-async.eso-addon.addon-manifest.json"

const ELSEWHERE_PAGE = "temper/temper-lib-late/temper-lib-late.eso-addon.ts"

const ELSEWHERE_AT = "temper/temper-lib-late/temper-lib-late.eso-addon.addon-manifest.json"

const HELD_PAGE = "code-system/held-addons/pages/lib-async.held-addon.ts"

const ADDON_VALUE: Value = { slug: "temper-lib-async", addonManifest: "json" }

const HELD_VALUE: Value = { addonName: "LibAsync", esoAddon: "temper-lib-async" }

function asking(
  paths: Readonly<Record<string, readonly string[]>>,
  values: Readonly<Record<string, Value>>,
  texts: Readonly<Record<string, string>>,
  folders: Readonly<Record<string, string>> = {}
): Asking {
  return {
    pathsOfType: (pageTypeSlug) => paths[pageTypeSlug] ?? [],
    valueAt: (path) => values[path] ?? null,
    folderOf: (pageTypeSlug, slug) => folders[`${pageTypeSlug}/${slug}`] ?? null,
    textAt: (path) => texts[path] ?? null,
  }
}

const ADDONS = { "eso-addon": [ADDON_PAGE] }

const PAGES = { "eso-addon": [ADDON_PAGE], "held-addon": [HELD_PAGE] }

const VALUES = { [ADDON_PAGE]: ADDON_VALUE, [HELD_PAGE]: HELD_VALUE }

const TEXTS = { [MANIFEST_AT]: '{ "name": "LibAsync" }' }

const WHERE = { "eso-addon/temper-lib-async": "temper/temper-lib-async" }

test("the roster is the name each addon manifest states, at the folder its page sits in", () => {
  const said = rosterIn(asking(ADDONS, VALUES, TEXTS))
  expect([...said]).toEqual([["LibAsync", ["temper/temper-lib-async"]]])
})

test("an addon page stating no manifest is no addon in the roster", () => {
  const values = { [ADDON_PAGE]: { slug: "temper-lib-async" } }
  expect(rosterIn(asking(ADDONS, values, TEXTS)).size).toBe(0)
})

test("a manifest that is not there leaves that addon out of the roster", () => {
  expect(rosterIn(asking(ADDONS, VALUES, {})).size).toBe(0)
})

test("a manifest calling its addon nothing leaves that addon out of the roster", () => {
  expect(rosterIn(asking(ADDONS, VALUES, { [MANIFEST_AT]: "{}" })).size).toBe(0)
})

test("two folders manifesting one name are both reached under that name", () => {
  const paths = { "eso-addon": [ADDON_PAGE, ELSEWHERE_PAGE] }
  const values = {
    [ADDON_PAGE]: ADDON_VALUE,
    [ELSEWHERE_PAGE]: { slug: "temper-lib-late", addonManifest: "json" },
  }
  const texts = {
    [MANIFEST_AT]: '{ "name": "LibAsync" }',
    [ELSEWHERE_AT]: '{ "name": "LibAsync" }',
  }
  expect(rosterIn(asking(paths, values, texts)).get("LibAsync")).toEqual([
    "temper/temper-lib-async",
    "temper/temper-lib-late",
  ])
})

test("a held addon page is read for the name it states and the folder its addon page sits in", () => {
  expect(heldIn(asking(PAGES, VALUES, TEXTS, WHERE))).toEqual([
    { path: HELD_PAGE, named: "LibAsync", folder: "temper/temper-lib-async" },
  ])
})

test("a page whose addon page sits where that addon is manifested is let through", () => {
  expect(refusalsOver(asking(PAGES, VALUES, TEXTS, WHERE))).toEqual([])
})

test("a page naming an addon no manifest calls is refused as stale", () => {
  const values = {
    [ADDON_PAGE]: ADDON_VALUE,
    [HELD_PAGE]: { addonName: "LibGone", esoAddon: "temper-lib-async" },
  }
  const said = refusalsOver(asking(PAGES, values, TEXTS, WHERE))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(HELD_PAGE)
  expect(said[0]?.reason).toContain("`LibGone`")
  expect(said[0]?.reason).toContain("stale")
})

test("a page whose addon page sits elsewhere is refused, and the reason names both folders", () => {
  const where = { "eso-addon/temper-lib-async": "temper/temper-lib-late" }
  const said = refusalsOver(asking(PAGES, VALUES, TEXTS, where))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("temper/temper-lib-async")
  expect(said[0]?.reason).toContain("temper/temper-lib-late")
  expect(said[0]?.reason).toContain("repoint")
})

test("a page whose addon page the index files nothing for is passed over", () => {
  expect(refusalsOver(asking(PAGES, VALUES, TEXTS))).toEqual([])
})

test("an index naming held addon pages and no manifest refuses rather than judging each stale", () => {
  expect(() => refusalsOver(asking(PAGES, VALUES, {}, WHERE))).toThrow("addon manifest")
})

test("an index naming no held addon page judges clean", () => {
  expect(refusalsOver(asking(ADDONS, VALUES, {}))).toEqual([])
})
