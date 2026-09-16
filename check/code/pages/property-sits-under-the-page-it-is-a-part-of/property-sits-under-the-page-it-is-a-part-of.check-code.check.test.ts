import { afterAll, expect, test } from "bun:test"
import { propertySitsUnderThePageItIsAPartOf } from "akasha/check/code/pages/property-sits-under-the-page-it-is-a-part-of/property-sits-under-the-page-it-is-a-part-of.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  claiming,
  edging,
  founded,
  landing,
  NO_BYTES,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const HELD = "01a0a7b2-0000-7001-8000-000000000001"

const OWNER = "01a0a7b2-0000-7002-8000-000000000002"

const OWNER_AT = "akasha/one/one.domain.ts"

const BESIDE = "akasha/one/properties/held.text-property.ts"

const APART = "akasha/two/properties/held.text-property.ts"

const PARTS = "parts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function bodyOf(said: Readonly<Record<string, unknown>>): Uint8Array {
  return new TextEncoder().encode(`export const held = ${JSON.stringify(said)}\n`)
}

function propertyBody(): Uint8Array {
  return bodyOf({ id: HELD, type: "text-property", slug: "held" })
}

function ownerBody(parts?: readonly string[]): Uint8Array {
  const said = { id: OWNER, type: "domain", slug: "one" }
  return bodyOf(parts === undefined ? said : { ...said, parts })
}

function rooted(at: string): string {
  const root = scratch.rootFor("akasha-property-beside-check-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  claiming(root, OWNER_AT, OWNER)
  claiming(root, at, HELD)
  edging(root, HELD, PARTS, OWNER, OWNER_AT)
  return root
}

function judged(over: Change): readonly Judged[] {
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  return propertySitsUnderThePageItIsAPartOf(over, cast.shadow)
}

test("the check refuses a property page the change carries outside its page's folder", () => {
  const root = rooted(APART)
  const said = judged(landing(root, { [APART]: propertyBody() }))

  expect(said.map((one) => one.path)).toEqual([APART])
  expect(said[0]?.reason).toContain("`akasha/one/properties`")
})

test("the check lets through a property page the change carries beside the page naming it", () => {
  const root = rooted(BESIDE)

  expect(judged(landing(root, { [BESIDE]: propertyBody() }))).toEqual([])
})

test("a page taking a property into its parts has that property judged where it sits", () => {
  const root = rooted(APART)
  const said = judged(landing(root, { [OWNER_AT]: ownerBody(["text-property/held"]) }))

  expect(said.map((one) => one.path)).toEqual([APART])
})

test("a file that is no page's shape is passed over", () => {
  const root = rooted(BESIDE)

  expect(judged(landing(root, { "akasha/notes.txt": NO_BYTES }))).toEqual([])
})

test("the check takes a page under domain as its input and no other file", () => {
  const shadow = shadowAt(rooted(BESIDE))

  expect(propertySitsUnderThePageItIsAPartOf.isInput(BESIDE, shadow)).toBe(true)
  expect(propertySitsUnderThePageItIsAPartOf.isInput("akasha/notes.txt", shadow)).toBe(false)
})
