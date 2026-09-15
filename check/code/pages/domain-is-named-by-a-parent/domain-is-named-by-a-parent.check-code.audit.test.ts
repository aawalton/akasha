import { afterAll, expect, test } from "bun:test"
import { domainIsNamedByAParent } from "akasha/check/code/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.check-code.audit.code.ts"
import {
  claiming,
  declaring,
  edging,
  filing,
  founded,
  pathFor,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const ONE = "01a04d5f-c731-7001-8000-000000000001"

const TWO = "01a04d5f-c731-7002-8000-000000000002"

const UP_AT = "akasha/up.domain.ts"

const TYPE_AT = "akasha/domain.page-type.ts"

const HELD_AT = pathFor("domain", "held")

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-parented-audit-")
  founded(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  claiming(root, TYPE_AT, "id-domain")
  declaring(root, "part-slugs", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  return root
}

function bodyFor(kind: string, slug: string, id: string): string {
  const said = { id, type: kind, slug }
  return `export const held = ${JSON.stringify(said)}\n`
}

function holding(root: string, kind: string, slug: string, id: string): string {
  const at = pathFor(kind, slug)
  filing(root, kind, slug, id)
  claiming(root, at, id)
  wrote(root, { [at]: bodyFor(kind, slug, id) })
  return at
}

test("an audit reads every path the index files rather than a change", () => {
  const root = rooted()
  holding(root, "domain", "held", ONE)
  const said = domainIsNamedByAParent(root)
  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("no page names `domain/held`")
})

test("an audit lets a page some page names among its parts through", () => {
  const root = rooted()
  holding(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, UP_AT)
  expect(domainIsNamedByAParent(root)).toEqual([])
})

test("an audit passes the whole over", () => {
  const root = rooted()
  holding(root, "domain", "akasha", ONE)
  expect(domainIsNamedByAParent(root)).toEqual([])
})

test("an audit passes over a page whose page type is outside domain", () => {
  const root = rooted()
  typed(root, "finding", "page")
  holding(root, "finding", "held", ONE)
  expect(domainIsNamedByAParent(root)).toEqual([])
})

test("an audit judges no file the index does not file a path for", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  expect(domainIsNamedByAParent(root)).toEqual([])
})
