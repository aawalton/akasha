import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytesOf } from "../../../testing-system/bodying/bodying.module.code.ts"
import { landing, NO_BYTES, pathFor } from "../../check-scratch/check-scratch.module.code.ts"
import { identifierNamesOnePage } from "./identifier-names-one-page.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const INDEX = join(".git", "data", "index")

const ONE = "01a04f76-7430-7001-8000-000000000001"

const TWO = "01a04f76-7430-7002-8000-000000000002"

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function schemad(root: string, propertySlug: string, unique: string | null): void {
  const dir = join(root, INDEX, "schema", "page-property", "slug")
  mkdirSync(dir, { recursive: true })
  const said = { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique }
  writeFileSync(join(dir, `${propertySlug}.jsonl`), `${JSON.stringify(said)}\n`)
}

function typed(root: string, pageTypeSlug: string): void {
  const dir = join(root, INDEX, "identity", "page-type", "slug")
  mkdirSync(dir, { recursive: true })
  const said = { path: `akasha/${pageTypeSlug}.page-type.ts`, id: `id-${pageTypeSlug}` }
  writeFileSync(join(dir, `${pageTypeSlug}.jsonl`), `${JSON.stringify(said)}\n`)
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-identifier-"))
  held.push(root)
  schemad(root, "id", "always")
  schemad(root, "slug", "page-type")
  typed(root, "check")
  typed(root, "module")
  typed(root, "text-property")
  return root
}

function filed(
  root: string,
  scope: string,
  propertySlug: string,
  said: string,
  path: string
): void {
  const dir = join(root, INDEX, "identity", scope, propertySlug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${said}.jsonl`), `${JSON.stringify({ path, id: ONE })}\n`)
}

function body(kind: string, slug: string, id: string): Uint8Array {
  return bytesOf(
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
      `slug: ${JSON.stringify(slug)} }\n`
  )
}

test("a slug another page of its type already carries is refused", () => {
  const root = rooted()
  filed(root, "check", "slug", "held", pathFor("check", "other"))
  const said = identifierNamesOnePage(
    landing(root, { [pathFor("check", "held")]: body("check", "held", ONE) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("check", "held"))
  expect(said[0]?.reason).toContain(pathFor("check", "other"))
  expect(said[0]?.reason).toContain("check/slug/held")
})

test("two pages in one change carrying one slug are refused against each other", () => {
  const root = rooted()
  const said = identifierNamesOnePage(
    landing(root, {
      [pathFor("check", "one")]: body("check", "held", ONE),
      [pathFor("check", "two")]: body("check", "held", TWO),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("check", "two"))
  expect(said[0]?.reason).toContain(pathFor("check", "one"))
})

test("a page taking the slug a page the same change renames away is let through", () => {
  const root = rooted()
  filed(root, "check", "slug", "held", pathFor("check", "one"))
  const said = identifierNamesOnePage(
    landing(root, {
      [pathFor("check", "one")]: body("check", "freed", ONE),
      [pathFor("check", "two")]: body("check", "held", TWO),
    })
  )
  expect(said).toEqual([])
})

test("a page whose identifiers no other page carries is let through", () => {
  const root = rooted()
  const said = identifierNamesOnePage(
    landing(root, { [pathFor("check", "held")]: body("check", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("a page rewritten where it already stands is let through", () => {
  const root = rooted()
  filed(root, "check", "slug", "held", pathFor("check", "held"))
  filed(root, "page", "id", ONE, pathFor("check", "held"))
  const said = identifierNamesOnePage(
    landing(root, { [pathFor("check", "held")]: body("check", "held", ONE) })
  )
  expect(said).toEqual([])
})

test("an id another page carries is refused though the pages are of different types", () => {
  const root = rooted()
  filed(root, "page", "id", ONE, pathFor("module", "other"))
  const said = identifierNamesOnePage(
    landing(root, { [pathFor("check", "held")]: body("check", "held", ONE) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(`page/id/${ONE}`)
})

test("two pages of different page types carrying one slug are let through", () => {
  const root = rooted()
  const said = identifierNamesOnePage(
    landing(root, {
      [pathFor("check", "held")]: body("check", "held", ONE),
      [pathFor("module", "held")]: body("module", "held", TWO),
    })
  )
  expect(said).toEqual([])
})

test("a property page the change carries makes its property an identifier at once", () => {
  const root = rooted()
  const property = bytesOf(
    'export const held = { id: "01a04f76-7430-7003-8000-000000000003", ' +
      'pageTypeSlug: "text-property", slug: "name", unique: "always" }\n'
  )
  const naming = (slug: string, id: string): Uint8Array =>
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "check", ` +
        `slug: ${JSON.stringify(slug)}, name: "shared" }\n`
    )
  const said = identifierNamesOnePage(
    landing(root, {
      [pathFor("text-property", "name")]: property,
      [pathFor("check", "one")]: naming("one", ONE),
      [pathFor("check", "two")]: naming("two", TWO),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("page/name/shared")
})

test("a change carrying no page is passed over", () => {
  const root = rooted()
  expect(identifierNamesOnePage(landing(root, { "akasha/notes.txt": NO_BYTES }))).toEqual([])
})

test("a page the change takes away frees what it carried", () => {
  const root = rooted()
  filed(root, "check", "slug", "held", pathFor("check", "one"))
  const said = identifierNamesOnePage(
    landing(root, {
      [pathFor("check", "one")]: null,
      [pathFor("check", "two")]: body("check", "held", TWO),
    })
  )
  expect(said).toEqual([])
})
