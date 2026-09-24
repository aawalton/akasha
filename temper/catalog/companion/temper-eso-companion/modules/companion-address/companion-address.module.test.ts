import { expect, test } from "bun:test"
import {
  companionAddressOf,
  companionIdIn,
  companionValuesOf,
} from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { bastian } from "akasha/temper/catalog/companion/temper-eso-companion/pages/bastian/bastian.temper-eso-companion.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"

const ADDRESS = `${temperEsoCompanion.slug}/${bastian.slug}`

test("a companion's address is its page type and its slug", () => {
  expect(companionAddressOf(bastian.slug)).toBe(ADDRESS)
})

test("an address reads back as the companion id it names", () => {
  expect(companionIdIn(ADDRESS)).toBe(bastian.slug)
  expect(companionIdIn(companionAddressOf(bastian.key))).toBe(bastian.key)
})

test("a bare companion id reads back as that same id", () => {
  expect(companionIdIn(bastian.slug)).toBe(bastian.slug)
})

test("an address naming no companion the catalogue knows reads back as no companion id", () => {
  expect(companionIdIn(bastian.id)).toBeUndefined()
  expect(companionIdIn(`${temperEsoCompanion.slug}/nobody`)).toBeUndefined()
})

test("a page about a companion takes its id as slug, its name as title, and its address", () => {
  expect(companionValuesOf(bastian.slug)).toEqual({
    slug: bastian.slug,
    title: bastian.title,
    companionId: ADDRESS,
  })
})

test("a companion the catalogue does not know takes its id as its title", () => {
  expect(companionValuesOf("nobody").title).toBe("nobody")
})
