import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { indexIn } from "../../pages-system/index/index-reading.module.code.ts"
import { domainsDrawn, kindsUnderDomain } from "./panel-domains.module.code.ts"

const ONE = "01a04e9f-1111-7000-8000-00000000000a"

const TWO = "01a04e9f-1111-7000-8000-00000000000b"

const THREE = "01a04e9f-1111-7000-8000-00000000000c"

const KIND = "01a04e9f-1111-7000-8000-00000000000d"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function filed(root: string, at: string, lines: readonly string[]): void {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}

function pageAt(root: string, path: string, body: string): void {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
}

function standing(root: string, kind: string, slug: string, id: string, body?: string): void {
  const path = `akasha/held/${slug}.${kind}.ts`
  filed(root, `identity/${kind}/slug/${slug}.jsonl`, [JSON.stringify({ path, id })])
  if (body !== undefined) pageAt(root, path, body)
}

function under(root: string, child: string, parent: string): void {
  filed(root, `relation/page/id/${child}/part-slugs/${parent}.jsonl`, [
    JSON.stringify({ path: "akasha/held/naming.domain.ts", id: parent }),
  ])
}

function parts(slug: string, held: readonly string[]): string {
  return `export const held = { slug: ${JSON.stringify(slug)}, partSlugs: ${JSON.stringify(held)} }\n`
}

test("a page type standing under domain is a kind that is drawn", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(
    root,
    "page-type",
    "module",
    KIND,
    'export const held = { slug: "module", extendsSlug: "page-type/domain" }\n'
  )
  const kinds = kindsUnderDomain(root)
  expect(kinds.has("domain")).toBe(true)
  expect(kinds.has("module")).toBe(true)
})

test("a page type standing under one that stands under domain is drawn too", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(
    root,
    "page-type",
    "module",
    KIND,
    'export const held = { slug: "module", extendsSlug: "page-type/domain" }\n'
  )
  standing(
    root,
    "page-type",
    "check",
    TWO,
    'export const held = { slug: "check", extendsSlug: "page-type/module" }\n'
  )
  expect(kindsUnderDomain(root).has("check")).toBe(true)
})

test("a page type standing outside domain is no kind of this panel", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(
    root,
    "page-type",
    "finding",
    KIND,
    'export const held = { slug: "finding", extendsSlug: "page-type/page" }\n'
  )
  expect(kindsUnderDomain(root).has("finding")).toBe(false)
})

test("a page is answered under its address", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(root, "domain", "one", ONE)
  expect(domainsDrawn(root).map((held) => held.slug)).toEqual(["domain/one"])
})

test("the part edge is filed under the part, so the part is the one standing under", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(root, "domain", "over", ONE, parts("over", ["domain/under"]))
  standing(root, "domain", "under", TWO)
  under(root, TWO, ONE)
  const drawn = domainsDrawn(root)
  expect(drawn.find((held) => held.slug === "domain/under")?.parent).toBe("domain/over")
  expect(drawn.find((held) => held.slug === "domain/over")?.parent).toBe(null)
})

test("an order is read off the page holding the parts", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(root, "domain", "over", ONE, parts("over", ["domain/second", "domain/first"]))
  standing(root, "domain", "first", TWO)
  standing(root, "domain", "second", THREE)
  under(root, TWO, ONE)
  under(root, THREE, ONE)
  const over = domainsDrawn(root).find((held) => held.slug === "domain/over")
  expect(over?.sequence).toEqual(["domain/second", "domain/first"])
})

test("a page the index says holds no part is answered with no order", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(root, "domain", "one", ONE, parts("one", ["domain/absent"]))
  expect(domainsDrawn(root)[0]?.sequence).toEqual([])
})

test("a page standing under two parents stands under none", () => {
  const root = scratch.rootFor("akasha-domains-")
  standing(root, "domain", "over", ONE, parts("over", ["domain/under"]))
  standing(root, "domain", "also", TWO, parts("also", ["domain/under"]))
  standing(root, "domain", "under", THREE)
  under(root, THREE, ONE)
  under(root, THREE, TWO)
  expect(domainsDrawn(root).find((held) => held.slug === "domain/under")?.parent).toBe(null)
})
