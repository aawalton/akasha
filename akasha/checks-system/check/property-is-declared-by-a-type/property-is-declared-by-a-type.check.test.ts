import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  propertyIsDeclaredByAType,
  propertyNamedIn,
} from "./property-is-declared-by-a-type.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const INDEX = join(".git", "data", "index")

const ONE = "01a04ef8-1a07-7001-8000-000000000001"

const TWO = "01a04ef8-1a07-7002-8000-000000000002"

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function typed(root: string, slug: string, above: string): void {
  const dir = join(root, INDEX, "identity", "page-type", "slug")
  mkdirSync(dir, { recursive: true })
  const path = `akasha/types/${slug}.page-type.ts`
  writeFileSync(join(dir, `${slug}.jsonl`), `${JSON.stringify({ path, id: `id-${slug}` })}\n`)
  mkdirSync(join(root, "akasha", "types"), { recursive: true })
  const said = JSON.stringify(`page-type/${above}`)
  writeFileSync(
    join(root, path),
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said} }\n`
  )
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-declared-"))
  held.push(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, "relation-property", "page-property")
  typed(root, "page-type", "domain")
  return root
}

function pathFor(kind: string, slug: string): string {
  return `akasha/${slug}.${kind}.ts`
}

function stands(root: string, kind: string, slug: string, id: string): void {
  const dir = join(root, INDEX, "identity", kind, "slug")
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, `${slug}.jsonl`),
    `${JSON.stringify({ path: pathFor(kind, slug), id })}\n`
  )
}

function identified(root: string, id: string, path: string): void {
  const dir = join(root, INDEX, "identity", "page", "id")
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${id}.jsonl`), `${JSON.stringify({ path, id })}\n`)
}

function edging(root: string, id: string, propertySlug: string, from: string): void {
  const dir = join(root, INDEX, "relation", "page", "id", id, propertySlug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, `${from}.jsonl`),
    `${JSON.stringify({ path: "akasha/up.page-type.ts" })}\n`
  )
}

function body(kind: string, slug: string, id: string, declares?: readonly string[]): Uint8Array {
  const said =
    declares === undefined
      ? ""
      : `, properties: ${JSON.stringify(declares.map((one) => ({ pagePropertySlug: one })))}`
  return new TextEncoder().encode(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
      `slug: ${JSON.stringify(slug)}${said} }\n`
  )
}

const NO_BYTES = new Uint8Array(0)

function landing(
  root: string,
  files: Record<string, Uint8Array | null>,
  before: Record<string, Uint8Array> = {}
) {
  return {
    root,
    changed: Object.keys(files),
    at: (path: string) => files[path] ?? null,
    was: (path: string) => before[path] ?? NO_BYTES,
  }
}

test("a property the index says some page type declares is let through", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  edging(root, ONE, "page-property-slug", TWO)
  identified(root, TWO, "akasha/up.page-type.ts")
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
    })
  )
  expect(said).toEqual([])
})

test("a property no page type declares is refused, and the refusal names the address", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`relation-property/held`")
})

test("a property and the page type declaring it landing together is let through", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
      [pathFor("page-type", "over")]: body("page-type", "over", TWO, ["held"]),
    })
  )
  expect(said).toEqual([])
})

test("a page type that stops declaring a property leaves that property refused", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  edging(root, ONE, "page-property-slug", TWO)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
      [pathFor("page-type", "over")]: body("page-type", "over", TWO),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("relation-property", "held"))
})

test("a page type dropping a property leaves it refused, though the property did not change", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  stands(root, "page-type", "over", TWO)
  identified(root, ONE, pathFor("relation-property", "held"))
  edging(root, ONE, "page-property-slug", TWO)
  const at = pathFor("page-type", "over")
  const said = propertyIsDeclaredByAType(
    landing(
      root,
      { [at]: body("page-type", "over", TWO) },
      { [at]: body("page-type", "over", TWO, ["held"]) }
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("relation-property", "held"))
})

test("a record property declaring a field declares it as a page type would", () => {
  const root = rooted()
  typed(root, "record-property", "page-property")
  stands(root, "relation-property", "held", ONE)
  stands(root, "record-property", "over", TWO)
  const said = propertyIsDeclaredByAType(
    landing(root, {
      [pathFor("relation-property", "held")]: body("relation-property", "held", ONE),
      [pathFor("record-property", "over")]: body("record-property", "over", TWO, ["held"]),
    })
  )
  expect(said.map((one) => one.path)).not.toContain(pathFor("relation-property", "held"))
})

test("a property the change takes away is passed over", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  const at = pathFor("relation-property", "held")
  expect(propertyIsDeclaredByAType(landing(root, { [at]: null }))).toEqual([])
})

test("a page whose page type stands outside page-property is not judged", () => {
  const root = rooted()
  stands(root, "domain", "held", ONE)
  const said = propertyIsDeclaredByAType(
    landing(root, { [pathFor("domain", "held")]: body("domain", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const root = rooted()
  const said = propertyIsDeclaredByAType(
    landing(root, { "pages/property/held.relation-property.ts": NO_BYTES })
  )
  expect(said).toEqual([])
})

test("a property whose body carries no identity is thrown on rather than passed", () => {
  const root = rooted()
  stands(root, "relation-property", "held", ONE)
  const bare = new TextEncoder().encode('export const held = { slug: "held" }\n')
  expect(() =>
    propertyIsDeclaredByAType(landing(root, { [pathFor("relation-property", "held")]: bare }))
  ).toThrow("answers 0 pages")
})

test("the slug is the file's stem and the page type its suffix", () => {
  const root = rooted()
  expect(propertyNamedIn(root, "akasha/a/b/name-format-slug.relation-property.ts")).toEqual({
    pageTypeSlug: "relation-property",
    slug: "name-format-slug",
  })
  expect(propertyNamedIn(root, "akasha/held.module.code.ts")).toBeNull()
  expect(propertyNamedIn(root, "held.relation-property.ts")).toBeNull()
})
