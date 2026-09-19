import { expect, test } from "bun:test"
import { modelAsking } from "akasha/agent/model/modules/asking/model-asking.module.ts"
import {
  folderFrom,
  gatheringFrom,
  holdsAt,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { aPageTypeWithItsParts } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/a-page-type-with-its-parts/a-page-type-with-its-parts.folder-shape.code.ts"
import type {
  Declaring,
  Standing,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { temper } from "akasha/temper/temper.domain.ts"

const FOLDER = "akasha/models"

const PAGE_TYPES = new Set<string>(["domain", "page-type", "module", "seat"])

const TYPES = new Set<string>(["page-type"])

const DECLARED = new Set<string>(["page-type/model-humming", `${module.slug}/${modelAsking.slug}`])

const DECLARING: Declaring = { slug: "model", propertySlugs: new Set<string>() }

function judgedBy(
  deep: readonly string[],
  names: readonly string[],
  declaring: Declaring | null
): readonly string[] {
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "page-type" && TYPES.has(pageTypeSlug),
    declared: () => DECLARED,
    declaring: () => declaring,
    holds: holdsAt,
    deep,
  })
  return aPageTypeWithItsParts(made(names))
}

function judged(deep: readonly string[], names: readonly string[]): readonly string[] {
  return judgedBy(deep, names, null)
}

test("a page type with its modules alone takes the shape", () => {
  expect(judged(["modules/model-asking/model-asking.module.ts"], ["model.page-type.ts"])).toEqual(
    []
  )
})

test("a subfolder holding a page the page type declares a part takes the shape", () => {
  expect(judged(["families/model-humming.page-type.ts"], ["model.page-type.ts"])).toEqual([])
})

test("a subfolder holding a page the page type declares nowhere is refused", () => {
  const said = judged(["stray/other.domain.ts"], ["model.page-type.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("no part `model` declares")
  expect(said[0]).toContain("stray")
})

test("a subfolder holding no page of its own is refused", () => {
  const said = judged(["loose/held.module.code.ts"], ["model.page-type.ts"])
  expect(said.some((each) => each.includes("loose"))).toBe(true)
})

test("a page that is no page type is refused, and the reason names its type", () => {
  const said = judged([], ["akasha.seat.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`seat`")
})

test("a folder holding no page is refused", () => {
  expect(judged([], [])).toEqual(["it holds no page of its own"])
})

test("a folder holding two pages is refused", () => {
  const said = judged([], ["model.page-type.ts", "other.page-type.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a subfolder named pages is a part", () => {
  expect(judged(["pages/one.model-humming.ts"], ["model.page-type.ts"])).toEqual([])
})

test("a subfolder named properties is a part", () => {
  expect(judged(["properties/held.text-property.ts"], ["model.page-type.ts"])).toEqual([])
})

test("a domain slugged the page type's slug may sit beside it", () => {
  expect(judgedBy([], ["model.page-type.ts", "model.domain.ts"], DECLARING)).toEqual([])
})

test("a second page that is no domain is refused", () => {
  const said = judgedBy([], ["model.page-type.ts", "models.page-type.ts"], DECLARING)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a domain slugged anything else is a second page and is refused", () => {
  const said = judgedBy([], ["model.page-type.ts", "other.domain.ts"], DECLARING)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a subfolder named scripts is a part", () => {
  expect(
    judged(["scripts/build-humming/build-humming.shell-script.ts"], ["model.page-type.ts"])
  ).toEqual([])
})

const DEEP = "deploy/dockerfile-extensions.json"

test("a subfolder a file the page's own property names sits under is a part", () => {
  const claimed = `${FOLDER}/${DEEP}`
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "page-type" && TYPES.has(pageTypeSlug),
    declared: () => DECLARED,
    holds: holdsAt,
    deep: [DEEP],
    parts: (page) => [page.path, claimed],
  })
  expect(aPageTypeWithItsParts(made(["model.page-type.ts"]))).toEqual([])
  expect(judged([DEEP], ["model.page-type.ts"])).toHaveLength(1)
})

const typing: Standing["extending"] = (pageTypeSlug, wanted) =>
  wanted === "page-type" && TYPES.has(pageTypeSlug)

test("a folder named the page type's slug with every name above it taken off takes the shape", () => {
  const made = folderFrom({
    folder: "akasha/temper/catalog/skill",
    pageTypes: PAGE_TYPES,
    extending: typing,
    naming: () => ({ name: "catalog-skill" }),
    holds: holdsFrom({
      "akasha/temper": [`${domain.slug}/${temper.slug}`],
      "akasha/temper/catalog": ["page-type/temper-catalog"],
    }),
  })
  expect(aPageTypeWithItsParts(made(["temper-catalog-skill.page-type.ts"]))).toEqual([])
})

test("a folder named the plural that page's own type gathers its pages under takes the shape", () => {
  const made = folderFrom({
    folder: "akasha/page-types",
    pageTypes: PAGE_TYPES,
    extending: typing,
    naming: () => ({ name: "model" }),
    gathered: gatheringFrom({ "page-types": ["page-type"] }),
  })
  expect(aPageTypeWithItsParts(made(["model.page-type.ts"]))).toEqual([])
})

test("a folder named a plural no type of that page gathers under is refused", () => {
  const made = folderFrom({
    folder: "akasha/page-types",
    pageTypes: PAGE_TYPES,
    extending: typing,
    naming: () => ({ name: "model" }),
    gathered: gatheringFrom({ "page-types": ["seat"] }),
  })
  const said = aPageTypeWithItsParts(made(["model.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`page-types`")
})

test("a subfolder declared by the domain beside its page type takes the shape", () => {
  const paired = ["page-type/humming", "domain/humming"]
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "page-type" && TYPES.has(pageTypeSlug),
    declared: () => new Set<string>(["domain/humming"]),
    holds: (at) => (at.endsWith("/hummings") ? paired : []),
    deep: ["hummings/humming.page-type.ts", "hummings/humming.domain.ts"],
  })
  expect(aPageTypeWithItsParts(made(["model.page-type.ts"]))).toEqual([])
})
