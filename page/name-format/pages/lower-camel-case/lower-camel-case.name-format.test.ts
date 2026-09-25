import { expect, test } from "bun:test"
import {
  foldedInLowerCamelCase,
  inLowerCamelCase,
  lowerCamelCase,
} from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"

test("words run together with every one but the first starting capital", () => {
  expect(lowerCamelCase("page")).toBe(true)
  expect(lowerCamelCase("pagePropertySlug")).toBe(true)
  expect(lowerCamelCase("runsOnPatch")).toBe(true)
})

test("a digit sits inside a word", () => {
  expect(lowerCamelCase("uuidVersion7")).toBe(true)
})

test("a first word opening capital is upper camel case, not this", () => {
  expect(lowerCamelCase("PagePropertySlug")).toBe(false)
})

test("a word may be one letter, so an acronym is let through either way it is written", () => {
  expect(lowerCamelCase("pageUuid")).toBe(true)
  expect(lowerCamelCase("pageUUID")).toBe(true)
})

test("anything between the words is not written in it", () => {
  expect(lowerCamelCase("")).toBe(false)
  expect(lowerCamelCase("page-property-slug")).toBe(false)
  expect(lowerCamelCase("page_property_slug")).toBe(false)
  expect(lowerCamelCase("page Property")).toBe(false)
})

test("a lower kebab case name is written in it by dropping each hyphen and raising what follows", () => {
  expect(inLowerCamelCase("page-property-slug")).toBe("pagePropertySlug")
  expect(inLowerCamelCase("page")).toBe("page")
  expect(lowerCamelCase(inLowerCamelCase("runs-on-patch"))).toBe(true)
})

test("a digit after a hyphen is raised to itself, so only the hyphen goes", () => {
  expect(inLowerCamelCase("id-is-a-uuid-version-7")).toBe("idIsAUuidVersion7")
})

test("a one-letter word is raised like any other", () => {
  expect(inLowerCamelCase("domain-is-named-by-a-parent")).toBe("domainIsNamedByAParent")
})

test("a hyphen no lowercase letter or digit follows stays where it is", () => {
  expect(inLowerCamelCase("page-")).toBe("page-")
  expect(inLowerCamelCase("two--hyphens")).toBe("two-Hyphens")
  expect(inLowerCamelCase("page-Type")).toBe("page-Type")
  expect(inLowerCamelCase("")).toBe("")
})

test("a letter outside ascii is kept as the name spells it", () => {
  expect(inLowerCamelCase("über-alles")).toBe("überAlles")
})

test("a key from outside akasha is folded in, any run of other characters parting two words", () => {
  expect(foldedInLowerCamelCase("last-synced-at")).toBe("lastSyncedAt")
  expect(foldedInLowerCamelCase("last_synced_at")).toBe("lastSyncedAt")
  expect(foldedInLowerCamelCase("last synced  at")).toBe("lastSyncedAt")
  expect(foldedInLowerCamelCase("lastSyncedAt")).toBe("lastSyncedAt")
  expect(foldedInLowerCamelCase("hour-2026-04-29-14")).toBe("hour2026042914")
})

test("a folded key keeps no empty word, so a stray hyphen leaves nothing", () => {
  expect(foldedInLowerCamelCase("a--b")).toBe("aB")
  expect(foldedInLowerCamelCase("-lead")).toBe("lead")
  expect(foldedInLowerCamelCase("trail-")).toBe("trail")
})

test("a folded key raises the first letter of every word after the first", () => {
  expect(foldedInLowerCamelCase("page_Type-slug")).toBe("pageTypeSlug")
})

test("a folded key's first word has its own capital lowered", () => {
  expect(foldedInLowerCamelCase("Last Synced")).toBe("lastSynced")
})

test("a letter outside ascii parts words in a folded key and is dropped", () => {
  expect(foldedInLowerCamelCase("über-alles")).toBe("berAlles")
})

test("a key with no ascii letter and no ascii digit is folded to nothing", () => {
  expect(foldedInLowerCamelCase("")).toBe("")
  expect(foldedInLowerCamelCase("--")).toBe("")
})
