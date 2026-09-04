import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { shadowFor } from "@akasha/pages-system/shadow"
import { bytesOf } from "@akasha/testing-system/bodying"
import {
  declaring,
  founded,
  landing,
  NO_BYTES,
  pathFor,
  typed,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { phoneNumberIsE164, reasonFor, reasonsIn } from "./phone-number-is-e164.code-check.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "01a058ff-c2b0-7001-8000-000000000001"

const MOBILE = "01a058ff-c2b0-7002-8000-000000000002"

const AT = pathFor("person", "held")

const MOBILE_AT = "akasha/mobile-number-property.page-type.ts"

const KEYED = new Map([["phone", "phone"]])

function rooted(): string {
  const root = scratch.rootFor("akasha-e164-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-type", "domain")
  typed(root, "page-property", "domain")
  typed(root, "text-property", "page-property")
  typed(root, "phone-number-property", "page-property")
  typed(root, "person", "domain", ["phone", "note", "mobile"])
  declaring(root, "phone", { pageTypeSlug: "phone-number-property" })
  declaring(root, "note", { pageTypeSlug: "text-property" })
  declaring(root, "mobile", { pageTypeSlug: "mobile-number-property" })
  return root
}

function person(stated: string): Uint8Array {
  return bytesOf(
    `export const held = { id: ${JSON.stringify(HELD)}, pageTypeSlug: "person", ` +
      `slug: "held", ${stated} }\n`
  )
}

function judged(
  root: string,
  files: Readonly<Record<string, Uint8Array | null>>
): readonly Judged[] {
  const change = landing(root, files)
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return phoneNumberIsE164(change, cast.shadow)
}

function over(stated: string): readonly string[] {
  return judged(rooted(), { [AT]: person(stated) }).map((one) => one.reason)
}

test("a number written in E.164 raises nothing", () => {
  expect(reasonFor("phone", "+16085122510")).toBeNull()
})

test("a number of fifteen digits is the longest let through", () => {
  expect(reasonFor("phone", "+123456789012345")).toBeNull()
  expect(reasonFor("phone", "+1234567890123456")).toContain("runs to 16 digits")
})

test("a number that does not open with a plus is refused for its shape", () => {
  expect(reasonFor("phone", "16085122510")).toContain("opens with `+`")
})

test("a number holding anything but digits is refused for its shape", () => {
  expect(reasonFor("phone", "+1 608 512 2510")).toContain("holds digits alone")
  expect(reasonFor("phone", "+")).toContain("holds digits alone")
})

test("a number opening its country calling code with a zero is refused", () => {
  expect(reasonFor("phone", "+06085122510")).toContain("country calling code")
})

test("a number holding one digit alone is refused", () => {
  expect(reasonFor("phone", "+1")).toContain("one digit alone")
})

test("a refusal names the key the number stands under and the number itself", () => {
  const said = reasonFor("phone", "16085122510")
  expect(said).toContain("`phone`")
  expect(said).toContain('"16085122510"')
})

test("a value that is not text is refused for that rather than for its shape", () => {
  expect(reasonFor("phone", 16085122510)).toContain("as a number rather than as text")
  expect(reasonFor("phone", null)).toContain("as nothing rather than as text")
})

test("a key the page does not state raises nothing", () => {
  expect(reasonsIn({ slug: "held" }, KEYED)).toEqual([])
})

test("a value stated as a list has each of its entries judged", () => {
  expect(reasonsIn({ phone: ["+16085122510", "6085122510", "+0"] }, KEYED)).toHaveLength(2)
})

test("a page carrying a number written in E.164 is let through", () => {
  expect(over('phone: "+16085122510"')).toEqual([])
})

test("a page carrying a number off E.164 is refused", () => {
  expect(over('phone: "6085122510"')).toHaveLength(1)
})

test("a property that is no phone number is not judged", () => {
  expect(over('note: "6085122510"')).toEqual([])
})

test("a page of a type declaring no phone number is passed over", () => {
  const root = rooted()
  const at = pathFor("domain", "held")
  const body = bytesOf(
    `export const held = { id: ${JSON.stringify(HELD)}, pageTypeSlug: "domain", slug: "held" }\n`
  )
  expect(judged(root, { [at]: body })).toEqual([])
})

test("a file the index does not name as a page is passed over", () => {
  expect(judged(rooted(), { "akasha/held.ts": person('phone: "6085122510"') })).toEqual([])
})

test("a path outside the akasha folder is passed over", () => {
  expect(judged(rooted(), { "shared/held.person.ts": NO_BYTES })).toEqual([])
})

test("a page whose body will not load is passed over rather than thrown on", () => {
  expect(judged(rooted(), { [AT]: bytesOf("export const held = (\n") })).toEqual([])
})

test("a page the change takes away is passed over", () => {
  expect(judged(rooted(), { [AT]: null })).toEqual([])
})

test("a page type the change itself puts under `phone-number-property` is judged", () => {
  const root = rooted()
  const above = bytesOf(
    `export const held = { id: ${JSON.stringify(MOBILE)}, pageTypeSlug: "page-type", ` +
      `slug: "mobile-number-property", extendsSlug: ["page-type/phone-number-property"] }\n`
  )
  const said = judged(root, { [MOBILE_AT]: above, [AT]: person('mobile: "6085122510"') })
  expect(said.map((one) => one.path)).toEqual([AT])
})

test("a page type standing outside `phone-number-property` leaves its values unjudged", () => {
  expect(over('mobile: "6085122510"')).toEqual([])
})
