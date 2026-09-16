import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  domainsIn,
  type Entry,
  entriesByPath,
  kindsUnderDomain,
  relatedIn,
  treeLines,
} from "akasha/command/pages/domain/modules/drawing/domain-drawing.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { relationFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const ROOT = rootOf(import.meta.path)

const scratch = scratchWorld()

afterAll(scratch.sweep)

const DOMAINS = domainsIn(ROOT, false)

const HELD = entriesByPath(DOMAINS)

const OUTWARD = relatedIn(ROOT, HELD, [...HELD.keys()], false)

function pathAt(slug: string): string {
  return DOMAINS.get(slug)?.path ?? slug
}

test("a domain page carries its parts as the domains it holds", () => {
  expect(DOMAINS.size).toBeGreaterThan(0)
  expect(pathAt("email").endsWith("email.domain.ts")).toBe(true)
  expect(OUTWARD.under.get(pathAt("email"))).toContain(pathAt("email-action"))
})

test("a domain never names itself as one of its own parts", () => {
  for (const path of HELD.keys()) expect(OUTWARD.under.get(path) ?? []).not.toContain(path)
})

test("the holders of a part are the domains naming it", () => {
  const over = relatedIn(ROOT, HELD, [pathAt("email-action")], true).over
  expect(over.get(pathAt("email-action"))).toContain(pathAt("email"))
})

test("`domain` itself is under `domain`, and `module` and `command` are too", () => {
  const kinds = kindsUnderDomain(ROOT)
  expect(kinds.has("domain")).toBe(true)
  expect(kinds.has("module")).toBe(true)
  expect(kinds.has("command")).toBe(true)
  expect(kinds.has("page")).toBe(false)
})

test("the descent reading holds strictly more than the domain pages alone", () => {
  expect(domainsIn(ROOT, true).size).toBeGreaterThan(domainsIn(ROOT, false).size)
})

function fileOf(slug: string): string {
  return `${slug}.domain.ts`
}

interface Held {
  readonly held: ReadonlyMap<string, Entry>
  readonly under: ReadonlyMap<string, readonly string[]>
}

function drawnOf(said: Readonly<Record<string, readonly string[]>>): Held {
  const held = new Map<string, Entry>(
    Object.keys(said).map((slug) => [fileOf(slug), { slug, path: fileOf(slug) }])
  )
  const under = new Map<string, readonly string[]>(
    Object.entries(said).map(([slug, parts]) => [fileOf(slug), parts.map(fileOf)])
  )
  return { held, under }
}

test("a domain held by two domains is drawn under each of them", () => {
  const drawn = drawnOf({ one: ["held"], two: ["held"], held: ["under"], under: [] })

  const lines = treeLines([fileOf("one"), fileOf("two")], drawn.held, drawn.under, false)

  expect(lines).toEqual(["one", "  held", "    under", "two", "  held", "    under"])
})

test("a domain drawn a second time beside the first is no domain already open", () => {
  const drawn = drawnOf({ root: ["one", "two"], one: ["held"], two: ["held"], held: [] })

  const lines = treeLines([fileOf("root")], drawn.held, drawn.under, false)

  expect(lines).toEqual(["root", "  one", "    held", "  two", "    held"])
})

test("a domain open above the point being drawn is marked rather than drawn again", () => {
  const drawn = drawnOf({ root: ["held"], held: ["beside"], beside: ["held"] })

  const lines = treeLines([fileOf("root")], drawn.held, drawn.under, false)

  expect(lines).toEqual(["root", "  held", "    beside", "      held  — already open above here"])
})

function typed(root: string, slug: string, above: readonly string[]): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  const named = above.map((one) => `page-type/${one}`)
  const id = `id-${slug}`
  listedFiled(root, "page-type", slug, [{ path, id }])
  idFiled(root, id, [{ path, id }])
  valueAlsoFiled(root, "page-type", [
    { path, value: { id, pageTypeSlug: "page-type", slug, extends: named } },
  ])
  for (const one of above) relationFiled(root, `id-${one}`, "extends-type", id, [{ path }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  writeFileSync(
    page,
    `export const held = { slug: ${JSON.stringify(slug)}, extends: ${JSON.stringify(named)} }\n`
  )
  return undefined
}

test("a page type naming one type above it is a kind of domain as it always was", () => {
  const root = scratch.rootFor("akasha-domain-")
  typed(root, "domain", [])
  typed(root, "page", [])
  typed(root, "module", ["domain"])

  const kinds = kindsUnderDomain(root)

  expect([...kinds].sort()).toEqual(["domain", "module"])
})

test("a page type naming two types above it is a kind of domain where either of them is", () => {
  const root = scratch.rootFor("akasha-domain-")
  typed(root, "domain", [])
  typed(root, "page", [])
  typed(root, "module", ["domain"])
  typed(root, "page-property", ["page"])
  typed(root, "computed-property", ["page-property", "module"])
  typed(root, "faith-points", ["computed-property"])

  const kinds = kindsUnderDomain(root)

  expect([...kinds].sort()).toEqual(["computed-property", "domain", "faith-points", "module"])
})
