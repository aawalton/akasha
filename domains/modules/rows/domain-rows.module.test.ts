import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import {
  relationFiled,
  valueAlsoFiled,
} from "../../../pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { domainsDrawn, kindsUnderDomain } from "./domain-rows.module.code.ts"

const ONE = "01a04e9f-1111-7000-8000-00000000000a"

const TWO = "01a04e9f-1111-7000-8000-00000000000b"

const THREE = "01a04e9f-1111-7000-8000-00000000000c"

const KIND = "01a04e9f-1111-7000-8000-00000000000d"

const HER = "01a04e9f-1111-7000-8000-00000000000e"

const CHAMPIONED = "championed-domain"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function pageAt(root: string, path: string, body: string): undefined {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
}

function filing(
  root: string,
  kind: string,
  slug: string,
  id: string,
  value: Readonly<Record<string, unknown>> = {}
): undefined {
  const path = `akasha/held/${slug}.${kind}.ts`
  valueAlsoFiled(root, kind, [{ path, value: { id, slug, ...value } }])
}

function typing(root: string, slug: string, id: string, above: string): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  valueAlsoFiled(root, "page-type", [{ path, value: { id, slug } }])
  pageAt(
    root,
    path,
    `export const held = { slug: ${JSON.stringify(slug)}, extends: ["${above}"] }\n`
  )
}

function champions(root: string, id: string, her: string): undefined {
  relationFiled(root, id, CHAMPIONED, her, [{ path: `personas/${her}.persona.ts`, id: her }])
}

test("a page type under domain is a kind that is drawn", () => {
  const root = scratch.rootFor("akasha-domains-")
  typing(root, "module", KIND, "page-type/domain")
  const kinds = kindsUnderDomain(root)
  expect(kinds.has("domain")).toBe(true)
  expect(kinds.has("module")).toBe(true)
})

test("a page type under one that sits under domain is drawn too", () => {
  const root = scratch.rootFor("akasha-domains-")
  typing(root, "module", KIND, "page-type/domain")
  typing(root, "check", TWO, "page-type/module")
  expect(kindsUnderDomain(root).has("check")).toBe(true)
})

test("a page type outside domain is no kind of this panel", () => {
  const root = scratch.rootFor("akasha-domains-")
  typing(root, "finding", KIND, "page-type/page")
  expect(kindsUnderDomain(root).has("finding")).toBe(false)
})

test("a page is answered under its address", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "one", ONE)
  expect(domainsDrawn(root).map((held) => held.slug)).toEqual(["domain/one"])
})

test("the part edge is read off the page naming the part", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "over", ONE, { parts: ["domain/under"] })
  filing(root, "domain", "under", TWO)
  const drawn = domainsDrawn(root)
  expect(drawn.find((held) => held.slug === "domain/under")?.parent).toBe("domain/over")
  expect(drawn.find((held) => held.slug === "domain/over")?.parent).toBe(null)
})

test("an order is read off the page holding the parts", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "over", ONE, { parts: ["domain/second", "domain/first"] })
  filing(root, "domain", "first", TWO)
  filing(root, "domain", "second", THREE)
  const over = domainsDrawn(root).find((held) => held.slug === "domain/over")
  expect(over?.sequence).toEqual(["domain/second", "domain/first"])
})

test("a page whose every part names nothing listed is answered with no order", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "one", ONE, { parts: ["domain/absent"] })
  expect(domainsDrawn(root)[0]?.sequence).toEqual([])
})

test("a page under two parents sits under none", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "over", ONE, { parts: ["domain/under"] })
  filing(root, "domain", "also", TWO, { parts: ["domain/under"] })
  filing(root, "domain", "under", THREE)
  expect(domainsDrawn(root).find((held) => held.slug === "domain/under")?.parent).toBe(null)
})

test("a domain a persona names by address answers with that persona", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "one", ONE)
  filing(root, "persona", "athena", HER, { championedDomain: "domain/one" })
  champions(root, ONE, HER)
  expect(domainsDrawn(root).find((held) => held.slug === "domain/one")?.persona).toBe("athena")
})

test("a domain a persona names by a bare slug answers with that persona", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "one", ONE)
  filing(root, "persona", "athena", HER, { championedDomain: "one" })
  champions(root, ONE, HER)
  expect(domainsDrawn(root).find((held) => held.slug === "domain/one")?.persona).toBe("athena")
})

test("a domain no persona names answers with no champion", () => {
  const root = scratch.rootFor("akasha-domains-")
  filing(root, "domain", "one", ONE)
  filing(root, "domain", "two", TWO)
  filing(root, "persona", "athena", HER, { championedDomain: "domain/one" })
  champions(root, ONE, HER)
  expect(domainsDrawn(root).find((held) => held.slug === "domain/two")?.persona).toBe(null)
})
