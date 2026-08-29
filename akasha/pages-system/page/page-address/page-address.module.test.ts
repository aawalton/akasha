import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import type { Address } from "./page-address.module.code.ts"
import { addressIn } from "./page-address.module.code.ts"

const CODE = `${import.meta.dir}/page-address.module.code.ts`

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

test("a slug carrying a later slash keeps it, because only the first cut names a page type", () => {
  expect(qualified(addressIn("domain/readout-group/personas"))).toEqual([
    "domain",
    "readout-group/personas",
  ])
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

test("this module imports nothing, so everything that resolves an address can reach it", () => {
  expect(readFileSync(CODE, "utf8")).not.toMatch(/^\s*import\s/m)
})
