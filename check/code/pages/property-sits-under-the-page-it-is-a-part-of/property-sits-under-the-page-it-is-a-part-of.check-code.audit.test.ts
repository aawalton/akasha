import { afterAll, expect, test } from "bun:test"
import { propertySitsUnderThePageItIsAPartOf } from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.audit.code.ts"
import {
  claiming,
  edging,
  founded,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const HELD = "01a0a7b3-0000-7001-8000-000000000001"

const OWNER = "01a0a7b3-0000-7002-8000-000000000002"

const OWNER_AT = "akasha/one/one.domain.ts"

const BESIDE = "akasha/one/properties/held.text-property.ts"

const APART = "akasha/two/properties/held.text-property.ts"

const PARTS = "parts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function bodyFor(id: string, kind: string, slug: string): string {
  return `export const held = ${JSON.stringify({ id, type: kind, slug })}\n`
}

function rooted(at: string): string {
  const root = scratch.rootFor("akasha-property-beside-audit-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  claiming(root, OWNER_AT, OWNER)
  claiming(root, at, HELD)
  wrote(root, { [OWNER_AT]: bodyFor(OWNER, "domain", "one") })
  wrote(root, { [at]: bodyFor(HELD, "text-property", "held") })
  return root
}

test("an audit refuses every property page the index files outside its page's folder", () => {
  const root = rooted(APART)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)
  const said = propertySitsUnderThePageItIsAPartOf(root)

  expect(said.map((one) => one.path)).toEqual([APART])
  expect(said[0]?.reason).toContain("`akasha/one/properties`")
})

test("an audit lets through a property page beside the page naming it a part", () => {
  const root = rooted(BESIDE)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)

  expect(propertySitsUnderThePageItIsAPartOf(root)).toEqual([])
})

test("an audit passes over a property page no page names a part", () => {
  const root = rooted(APART)

  expect(propertySitsUnderThePageItIsAPartOf(root)).toEqual([])
})
