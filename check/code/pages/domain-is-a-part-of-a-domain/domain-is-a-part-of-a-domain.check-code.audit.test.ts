import { afterAll, expect, test } from "bun:test"
import { domainIsAPartOfADomain } from "akasha/check/code/pages/domain-is-a-part-of-a-domain/domain-is-a-part-of-a-domain.check-code.audit.code.ts"
import {
  claiming,
  declaring,
  edging,
  filing,
  founded,
  pathFor,
  relating,
  tracked,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const ONE = "01a0d94a-c731-7001-8000-000000000001"

const TWO = "01a0d94a-c731-7002-8000-000000000002"

const TYPE_AT = "akasha/domain.page-type.ts"

const HELD_AT = pathFor("domain", "held")

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-part-of-a-domain-audit-")
  founded(root)
  relating(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  typed(root, "story-read", "page")
  claiming(root, TYPE_AT, "id-domain")
  declaring(root, "part-slugs", { pageTypeSlug: "relation-property", targetPageTypeSlug: "domain" })
  return root
}

function holding(root: string, kind: string, slug: string, id: string): string {
  const at = pathFor(kind, slug)
  filing(root, kind, slug, id)
  claiming(root, at, id)
  wrote(root, { [at]: `export const held = ${JSON.stringify({ id, type: kind, slug })}\n` })
  return at
}

test("an audit refuses a domain only a page outside domain names", () => {
  const root = rooted()
  holding(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, pathFor("story-read", "over"))
  const said = domainIsAPartOfADomain(tracked(root))
  expect(said.map((one) => one.path)).toEqual([HELD_AT])
  expect(said[0]?.reason).toContain("no domain names `domain/held`")
})

test("an audit lets a domain a domain names through", () => {
  const root = rooted()
  holding(root, "domain", "held", ONE)
  edging(root, ONE, "part-slugs", TWO, pathFor("domain", "over"))
  expect(domainIsAPartOfADomain(tracked(root))).toEqual([])
})

test("an audit passes the whole over", () => {
  const root = rooted()
  holding(root, "domain", "akasha", ONE)
  expect(domainIsAPartOfADomain(tracked(root))).toEqual([])
})
