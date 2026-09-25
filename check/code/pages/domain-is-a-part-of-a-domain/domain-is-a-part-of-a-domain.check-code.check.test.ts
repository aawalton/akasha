import { afterAll, expect, test } from "bun:test"
import { domainIsAPartOfADomain } from "akasha/check/code/pages/domain-is-a-part-of-a-domain/domain-is-a-part-of-a-domain.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  claiming,
  declaring,
  edging,
  filing,
  founded,
  landing,
  pathFor,
  put,
  relating,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { pageFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ONE = "01a0d94a-c731-7001-8000-000000000001"

const TWO = "01a0d94a-c731-7002-8000-000000000002"

const UP = "01a0d94a-c731-7003-8000-000000000003"

const TYPE_AT = "akasha/domain.page-type.ts"

const PARTS = "parts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-part-of-a-domain-")
  founded(root)
  relating(root)
  typed(root, "page-type", "page")
  typed(root, "domain", "page")
  typed(root, "story-read", "page")
  claiming(root, TYPE_AT, "id-domain")
  declaring(root, PARTS, { pageTypeSlug: "multi-relation-property", targetPageTypeSlug: "domain" })
  return root
}

function pageOf(kind: string, slug: string, id: string, parts: readonly string[] = []): Uint8Array {
  const said = { id, type: `page-type/${kind}`, slug, [PARTS]: parts }
  return new TextEncoder().encode(`export const held = ${JSON.stringify(said)}\n`)
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return domainIsAPartOfADomain(change, cast.shadow)
}

test("a domain a domain names among its parts is let through", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  edging(root, ONE, PARTS, TWO, pathFor("domain", "over"))
  const said = judged(landing(root, { [pathFor("domain", "held")]: pageOf("domain", "held", ONE) }))
  expect(said).toEqual([])
})

test("a domain only a page outside domain names is refused, and the refusal names the address", () => {
  const root = rooted()
  filing(root, "domain", "held", ONE)
  edging(root, ONE, PARTS, TWO, pathFor("story-read", "over"))
  const said = judged(landing(root, { [pathFor("domain", "held")]: pageOf("domain", "held", ONE) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("no domain names `domain/held`")
})

test("a domain that drops a part leaves that part refused, though the part did not change", () => {
  const root = rooted()
  filing(root, "domain", "under", ONE)
  filing(root, "domain", "over", TWO)
  pageFiled(root, ONE, pathFor("domain", "under"))
  edging(root, ONE, PARTS, TWO, pathFor("domain", "over"))
  edging(root, TWO, PARTS, UP, "akasha/up.domain.ts")
  const at = pathFor("domain", "over")
  const said = judged(
    landing(
      root,
      { [at]: pageOf("domain", "over", TWO) },
      { [at]: put(root, at, pageOf("domain", "over", TWO, ["domain/under"])) }
    )
  )
  expect(said.map((one) => one.path)).toEqual([pathFor("domain", "under")])
})

test("a page outside domain taking up a domain's part leaves that part refused", () => {
  const root = rooted()
  filing(root, "domain", "under", ONE)
  filing(root, "domain", "over", TWO)
  pageFiled(root, ONE, pathFor("domain", "under"))
  edging(root, ONE, PARTS, UP, pathFor("story-read", "shelf"))
  edging(root, TWO, PARTS, UP, "akasha/up.domain.ts")
  const at = pathFor("domain", "over")
  const said = judged(
    landing(
      root,
      { [at]: pageOf("domain", "over", TWO) },
      { [at]: put(root, at, pageOf("domain", "over", TWO, ["domain/under"])) }
    )
  )
  expect(said.map((one) => one.path)).toEqual([pathFor("domain", "under")])
})

test("akasha is under nothing, so it alone is passed over", () => {
  const root = rooted()
  filing(root, "domain", "akasha", ONE)
  const at = pathFor("domain", "akasha")
  expect(judged(landing(root, { [at]: pageOf("domain", "akasha", ONE) }))).toEqual([])
})

test("a page whose page type is outside domain is not judged", () => {
  const root = rooted()
  filing(root, "story-read", "held", ONE)
  const at = pathFor("story-read", "held")
  expect(judged(landing(root, { [at]: pageOf("story-read", "held", ONE) }))).toEqual([])
})
