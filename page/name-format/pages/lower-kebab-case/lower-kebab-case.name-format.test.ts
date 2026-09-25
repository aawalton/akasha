import { expect, test } from "bun:test"
import { inLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"
import {
  inLowerKebabCase,
  inLowerKebabCaseAcronymsWhole,
  lowerKebabCase,
} from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"

test("words joined with hyphens and all letters lower are written in it", () => {
  expect(lowerKebabCase("page")).toBe(true)
  expect(lowerKebabCase("lower-kebab-case")).toBe(true)
})

test("a digit sits inside a word", () => {
  expect(lowerKebabCase("id-is-a-uuid-version-7")).toBe(true)
})

test("a capital anywhere is not written in it", () => {
  expect(lowerKebabCase("Lower-kebab-case")).toBe(false)
  expect(lowerKebabCase("lowerKebabCase")).toBe(false)
})

test("another joiner is not a hyphen", () => {
  expect(lowerKebabCase("lower_kebab_case")).toBe(false)
  expect(lowerKebabCase("lower kebab case")).toBe(false)
})

test("an empty word is no word", () => {
  expect(lowerKebabCase("")).toBe(false)
  expect(lowerKebabCase("-page")).toBe(false)
  expect(lowerKebabCase("page-")).toBe(false)
  expect(lowerKebabCase("page--type")).toBe(false)
})

test("a lower camel case name is written in it with a hyphen before each capital, lowered", () => {
  expect(inLowerKebabCase("pagePropertySlug")).toBe("page-property-slug")
  expect(inLowerKebabCase("page")).toBe("page")
  expect(lowerKebabCase(inLowerKebabCase("runsOnPatch"))).toBe(true)
})

test("every capital opens a word, so a one-letter word and a run of capitals part letter by letter", () => {
  expect(inLowerKebabCase("domainIsNamedByAParent")).toBe("domain-is-named-by-a-parent")
  expect(inLowerKebabCase("pageUUID")).toBe("page-u-u-i-d")
})

test("a capital opening the name takes a hyphen before it as any other capital does", () => {
  expect(inLowerKebabCase("PageType")).toBe("-page-type")
})

test("a digit takes no hyphen before it", () => {
  expect(inLowerKebabCase("uuidVersion7")).toBe("uuid-version7")
})

test("a lower camel case name written in it and back again is itself", () => {
  for (const one of ["pageTypeSlug", "byAParent", "id", "partSlugs", "runsOnAudit"]) {
    expect(inLowerCamelCase(inLowerKebabCase(one))).toBe(one)
  }
})

test("with acronyms whole, a hyphen goes only where a capital follows a lowercase letter or a digit", () => {
  expect(inLowerKebabCaseAcronymsWhole("pagePropertySlug")).toBe("page-property-slug")
  expect(inLowerKebabCaseAcronymsWhole("pageUUID")).toBe("page-uuid")
  expect(inLowerKebabCaseAcronymsWhole("v7Name")).toBe("v7-name")
})

test("with acronyms whole, a capital opening the name is only lowered", () => {
  expect(inLowerKebabCaseAcronymsWhole("PageType")).toBe("page-type")
})

test("with acronyms whole, every letter is lowered whatever joins the words", () => {
  expect(inLowerKebabCaseAcronymsWhole("last_Synced")).toBe("last_synced")
})

test("with acronyms whole, a one-letter word runs into the word after it", () => {
  expect(inLowerKebabCaseAcronymsWhole("domainIsNamedByAParent")).toBe("domain-is-named-by-aparent")
})
