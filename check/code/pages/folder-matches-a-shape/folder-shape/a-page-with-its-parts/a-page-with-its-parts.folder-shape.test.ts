import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { aPageWithItsParts } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/a-page-with-its-parts/a-page-with-its-parts.folder-shape.code.ts"
import type {
  Standing,
  Wanted,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"

const FOLDER = "akasha/code-checks"

const PAGE_TYPES = new Set<string>(["page-type", "domain", "module", "check-code"])

const NAMING = new Map<string, Wanted>([[FOLDER, { name: "code-checks" }]])

function over(deep: readonly string[]): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    naming: (at) => NAMING.get(at) ?? null,
    deep,
  })
}

const folder = over([])

test("one page with the parts it is allowed takes the shape", () => {
  const held = over([
    "pages/one.check-code.ts",
    "properties/two.text-property.ts",
    "modules/m/m.module.ts",
    "sections/one.book-section.ts",
  ])
  expect(aPageWithItsParts(held(["check-code.page-type.ts"]))).toEqual([])
})

test("a subfolder other than modules, pages, properties or sections is refused, however named", () => {
  const forItsPage = over(["hummings/humming.page-type.ts"])
  const said = aPageWithItsParts(forItsPage(["check-code.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("hummings")

  const otherwise = over(["rules/rule.page-type.ts"])
  const held = aPageWithItsParts(otherwise(["check-code.page-type.ts"]))
  expect(held).toHaveLength(1)
  expect(held[0]).toContain("rules")
})

test("a folder named other than what its page calls it is refused, naming both", () => {
  const held = folderFrom({
    folder: "akasha/check-code",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "code-checks" }),
  })
  const said = aPageWithItsParts(held(["code-checks.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`check-code`")
  expect(said[0]).toContain("`code-checks`")
})

test("a folder named its page's slug with every name above it taken off takes the shape", () => {
  const held = folderFrom({
    folder: "akasha/temper/catalog/skill",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "catalog-skill" }),
    holds: holdsFrom({
      "akasha/temper": ["domain/temper"],
      "akasha/temper/catalog": ["page-type/temper-catalog"],
    }),
  })
  expect(aPageWithItsParts(held(["temper-catalog-skill.module.ts"]))).toEqual([])
})

test("a folder named the plural that page's own type gathers its pages under takes the shape", () => {
  const held = folderFrom({
    folder: "akasha/pages",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "first" }),
    gathered: gatheringFrom({ pages: ["check-code"] }),
  })
  expect(aPageWithItsParts(held(["first.check-code.ts"]))).toEqual([])
})

test("a folder named a plural no type of that page gathers under is refused", () => {
  const held = folderFrom({
    folder: "akasha/pages",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "first" }),
    gathered: gatheringFrom({ pages: ["module"] }),
  })
  const said = aPageWithItsParts(held(["first.check-code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`pages`")
})

test("a folder wanting a name no name can be worked out for is refused for wanting one", () => {
  const held = folderFrom({
    folder: "akasha/temper-skills/skills",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: null, gives: "temper-skills" }),
  })
  const said = aPageWithItsParts(held(["temper-skill.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("cannot work out")
  expect(said[0]).toContain("`temper-skills`")
  expect(said[0]).toContain("`temper-skill`")
})

test("a domain is refused, since a domain with its parts is a shape of its own", () => {
  const held = folderFrom({
    folder: "akasha/models",
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "domain" && pageTypeSlug === "domain",
    naming: () => ({ name: "models" }),
  })
  const said = aPageWithItsParts(held(["models.domain.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("is a domain")
})

test("a folder holding no page at all is refused", () => {
  const held = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })
  expect(aPageWithItsParts(held([]))).toEqual(["it holds no page of its own"])
})

test("a second page in the folder is refused, and the reason names it", () => {
  const said = aPageWithItsParts(folder(["check-code.page-type.ts", "one.check-code.ts"]))
  expect(said.some((each) => each.includes("one.check-code.ts"))).toBe(true)
})

test("a file the page states no property for is refused, however it is named", () => {
  const beside = aPageWithItsParts(
    folder(["check-code.page-type.ts", "check-code.page-type.code.ts"])
  )
  expect(beside.some((each) => each.includes("check-code.page-type.code.ts"))).toBe(true)
  const loose = aPageWithItsParts(folder(["check-code.page-type.ts", "notes.txt"]))
  expect(loose.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("a file the page does state a property for is a part rather than a stray", () => {
  const held = folderFrom({
    folder: "akasha/held",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "held" }),
    parts: (page) => [page.path, "akasha/held/held.module.code.ts"],
  })
  expect(aPageWithItsParts(held(["held.module.ts", "held.module.code.ts"]))).toEqual([])
})
