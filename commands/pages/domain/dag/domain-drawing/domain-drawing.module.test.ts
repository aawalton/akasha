import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { rootOf } from "../../../../modules/rooting/rooting.module.code.ts"
import {
  answering,
  domainsIn,
  type Entry,
  heldBy,
  kindsUnderDomain,
  treeLines,
} from "./domain-drawing.module.code.ts"

const ROOT = rootOf(import.meta.path)

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a domain page carries its parts as the domains it holds", () => {
  const domains = domainsIn(ROOT, false)
  expect(domains.size).toBeGreaterThan(0)
  const email = domains.get("email")
  expect(email?.path.endsWith("email.domain.ts")).toBe(true)
  expect(email?.parts).toContain("email-action")
})

test("a domain never names itself as one of its own parts", () => {
  for (const one of domainsIn(ROOT, false).values()) expect(one.parts).not.toContain(one.slug)
})

test("the holders of a part are the domains naming it", () => {
  const domains = domainsIn(ROOT, false)
  expect(heldBy(domains).get("email-action")).toContain("email")
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

function entriesOf(said: Readonly<Record<string, readonly string[]>>): ReadonlyMap<string, Entry> {
  return new Map(
    Object.entries(said).map(([slug, parts]) => [slug, { slug, path: `${slug}.domain.ts`, parts }])
  )
}

test("a domain held by two domains is drawn under each of them", () => {
  const domains = entriesOf({ one: ["held"], two: ["held"], held: ["under"], under: [] })

  expect(treeLines(["one", "two"], domains, false)).toEqual([
    "one",
    "  held",
    "    under",
    "two",
    "  held",
    "    under",
  ])
})

test("a domain drawn a second time beside the first is no domain already open", () => {
  const domains = entriesOf({ root: ["one", "two"], one: ["held"], two: ["held"], held: [] })

  expect(treeLines(["root"], domains, false)).toEqual([
    "root",
    "  one",
    "    held",
    "  two",
    "    held",
  ])
})

test("a domain open above the point being drawn is marked rather than drawn again", () => {
  const domains = entriesOf({ root: ["held"], held: ["beside"], beside: ["held"] })

  expect(treeLines(["root"], domains, false)).toEqual([
    "root",
    "  held",
    "    beside",
    "      held  — already open above here",
  ])
})

test("a thrown reason comes back as a refusal carrying that reason", () => {
  const said = answering(() => {
    throw new Error("nothing was there")
  })

  expect(said.code).toBe(3)
  expect(said.refusals.join(" ")).toContain("nothing was there")
})

function typed(root: string, slug: string, above: readonly string[]): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  const named = above.map((one) => `page-type/${one}`)
  listedFiled(root, "page-type", slug, [{ path, id: `id-${slug}` }])
  valueAlsoFiled(root, "page-type", [
    { path, value: { id: `id-${slug}`, pageTypeSlug: "page-type", slug, extends: named } },
  ])
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
