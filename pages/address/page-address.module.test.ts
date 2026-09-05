import { expect, test } from "bun:test"
import { lowerUuid } from "../name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"
import type { Address } from "./page-address.module.code.ts"
import { addressIn, slugIn } from "./page-address.module.code.ts"

const ID = "01a04b14-4355-7352-9c98-ad67e309f5f6"

function qualified(one: Address): readonly [string, string] {
  if (one.kind !== "qualified") throw new Error(`expected a qualified address, got ${one.kind}`)
  return [one.pageTypeSlug, one.slug]
}

test("a uuid names a page by identity", () => {
  const one = addressIn(ID)
  expect(one.kind).toBe("id")
  if (one.kind === "id") expect(one.id).toBe(ID)
})

test("a page type and a slug are cut at the first slash", () => {
  expect(qualified(addressIn("page-type/domain"))).toEqual(["page-type", "domain"])
})

test("a third part names the collection a slug is unique within", () => {
  const one = addressIn("book-section/all-about-alan/notes")
  expect(one.kind).toBe("scoped")
  if (one.kind !== "scoped") return
  expect(one.pageTypeSlug).toBe("book-section")
  expect(one.scope).toBe("all-about-alan")
  expect(one.slug).toBe("notes")
})

test("a fourth part is no address, so the slug it would leave carries a slash", () => {
  const one = addressIn("a/b/c/d")
  expect(one.kind).toBe("scoped")
  if (one.kind !== "scoped") return
  expect(one.scope).toBe("b")
  expect(one.slug).toBe("c/d")
})

test("a slug alone is bare, so what narrows it is the relation rather than the value", () => {
  const one = addressIn("landing")
  expect(one.kind).toBe("bare")
  if (one.kind === "bare") expect(one.slug).toBe("landing")
})

test("a uuid under a page type is read as qualified, so the slash decides before the shape", () => {
  expect(qualified(addressIn(`page/${ID}`))).toEqual(["page", ID])
})

test("a uuid in capitals is no id, so one spelling of identity reaches the store", () => {
  expect(addressIn(ID.toUpperCase()).kind).toBe("bare")
})

test("a value that is nearly a uuid is not one", () => {
  expect(addressIn(ID.slice(0, -1)).kind).toBe("bare")
  expect(addressIn(`${ID}f`).kind).toBe("bare")
})

test("an empty value is a bare slug rather than a form of its own", () => {
  expect(addressIn("").kind).toBe("bare")
})

test("a leading slash names an empty page type rather than no page type", () => {
  expect(qualified(addressIn("/dup"))).toEqual(["", "dup"])
})

test("a slug is taken off a qualified address and an id answers nothing", () => {
  expect(slugIn("page-type/page")).toBe("page")
  expect(slugIn("page")).toBe("page")
  expect(slugIn("book-section/all-about-alan/notes")).toBe("notes")
  expect(slugIn("01a04e92-bfba-7ca8-b12b-37b6a6a4c408")).toBe(null)
})

test("what an id is judged by is the lower uuid format's own shape", () => {
  expect(lowerUuid(ID)).toBe(true)
  expect(addressIn(ID).kind).toBe("id")
  expect(lowerUuid(ID.toUpperCase())).toBe(false)
  expect(addressIn(ID.toUpperCase()).kind).toBe("bare")
})
