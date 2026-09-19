import { expect, test } from "bun:test"
import {
  folderFrom,
  gatheringFrom,
  holdsAt,
  holdsFrom,
  type Shaping,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { aDomainWithItsParts } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/a-domain-with-its-parts/a-domain-with-its-parts.folder-shape.code.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"

const FOLDER = "akasha/models"

const PAGE_TYPES = new Set<string>(["domain", "page-type", "module", "seat"])

const DOMAINS = new Set<string>(["domain", "page-type", "module"])

const DECLARED = new Set<string>(["page-type/model-humming", "module/model-asking"])

function judged(deep: readonly string[], names: readonly string[]): readonly string[] {
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "domain" && DOMAINS.has(pageTypeSlug),
    declared: () => DECLARED,
    holds: holdsAt,
    deep,
  })
  return aDomainWithItsParts(made(names))
}

test("a domain with its modules alone takes the shape", () => {
  expect(judged(["modules/model-asking/model-asking.module.ts"], ["models.domain.ts"])).toEqual([])
})

test("a subfolder holding a page the domain declares a part takes the shape", () => {
  expect(judged(["families/model-humming.page-type.ts"], ["models.domain.ts"])).toEqual([])
})

test("a subfolder holding a page the domain declares nowhere is refused", () => {
  const said = judged(["stray/other.domain.ts"], ["models.domain.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("no part `models` declares")
  expect(said[0]).toContain("stray")
})

test("a subfolder holding no page of its own is refused", () => {
  const said = judged(["loose/held.module.code.ts"], ["models.domain.ts"])
  expect(said.some((each) => each.includes("loose"))).toBe(true)
})

test("a page that is no domain is refused, and the reason names its type", () => {
  const said = judged([], ["akasha.seat.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`seat`")
})

test("a folder holding no page is refused", () => {
  expect(judged([], [])).toEqual(["it holds no page of its own"])
})

test("a subfolder named scripts is a part", () => {
  expect(
    judged(["scripts/build-humming/build-humming.shell-script.ts"], ["models.domain.ts"])
  ).toEqual([])
})

const DEEP = "deploy/dockerfile-extensions.json"

test("a subfolder a file the page's own property names sits under is a part", () => {
  const claimed = `${FOLDER}/${DEEP}`
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "domain" && DOMAINS.has(pageTypeSlug),
    declared: () => DECLARED,
    holds: holdsAt,
    deep: [DEEP],
    parts: (page) => [page.path, claimed],
  })
  expect(aDomainWithItsParts(made(["models.domain.ts"]))).toEqual([])
  expect(judged([DEEP], ["models.domain.ts"])).toHaveLength(1)
})

test("a subfolder this page's own folder property names is a part of that page", () => {
  const claimed = `${FOLDER}/Icons`
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "domain" && DOMAINS.has(pageTypeSlug),
    declared: () => DECLARED,
    holds: holdsAt,
    deep: ["Icons/held.dds"],
    parts: (page) => [page.path, claimed],
  })
  expect(aDomainWithItsParts(made(["models.domain.ts"]))).toEqual([])
  expect(judged(["Icons/held.dds"], ["models.domain.ts"])).toHaveLength(1)
})

test("a page type is refused, since a page type with its parts is a shape of its own", () => {
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) =>
      (wanted === "domain" && DOMAINS.has(pageTypeSlug)) || wanted === pageTypeSlug,
    declared: () => DECLARED,
    holds: holdsAt,
  })
  const said = aDomainWithItsParts(made(["models.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a page type")
})

test("a folder holding two pages is refused", () => {
  const said = judged([], ["models.domain.ts", "other.domain.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

const ROOT = ""

const ROOT_TYPES = new Set<string>(["domain", "workspace", "page-type", "module", "seat"])

const ROOT_HELD: Readonly<Record<string, readonly string[]>> = {
  "": ["domain/akasha", "workspace/akasha-workspace"],
  "/held": ["domain/held"],
}

const ROOT_DECLARED = new Set<string>(["domain/held"])

const ROOT_PAGES = ["akasha-workspace.workspace.ts", "akasha.domain.ts"]

function rootFrom(shaping: Partial<Shaping>): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: ROOT,
    pageTypes: ROOT_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "domain" && DOMAINS.has(pageTypeSlug),
    declared: () => ROOT_DECLARED,
    holds: holdsFrom(ROOT_HELD),
    ...shaping,
  })
}

test("the folder every other folder sits under takes the shape", () => {
  const made = rootFrom({ deep: ["held/held.domain.ts"] })
  expect(aDomainWithItsParts(made(ROOT_PAGES))).toEqual([])
})

test("a third page in that folder is refused", () => {
  const said = aDomainWithItsParts(rootFrom({})([...ROOT_PAGES, "third.domain.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("3 pages rather than one")
})

test("a file the second page states is a part of the folder", () => {
  const made = rootFrom({
    parts: (page) => (page.slug === "akasha" ? [page.path] : [page.path, "/package.json"]),
  })
  expect(aDomainWithItsParts(made([...ROOT_PAGES, "package.json"]))).toEqual([])
})

test("a file neither page states is refused", () => {
  const said = aDomainWithItsParts(rootFrom({})([...ROOT_PAGES, "package.json"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("package.json")
})

const DOMAINING: Standing["extending"] = (pageTypeSlug, wanted) =>
  wanted === "domain" && DOMAINS.has(pageTypeSlug)

test("a folder named its domain's slug with every name above it taken off takes the shape", () => {
  const made = folderFrom({
    folder: "akasha/temper/catalog/skill",
    pageTypes: PAGE_TYPES,
    extending: DOMAINING,
    naming: () => ({ name: "catalog-skill" }),
    holds: holdsFrom({
      "akasha/temper": ["domain/temper"],
      "akasha/temper/catalog": ["page-type/temper-catalog"],
    }),
  })
  expect(aDomainWithItsParts(made(["temper-catalog-skill.domain.ts"]))).toEqual([])
})

test("a folder named the plural that page's own type gathers its pages under takes the shape", () => {
  const made = folderFrom({
    folder: "akasha/domains",
    pageTypes: PAGE_TYPES,
    extending: DOMAINING,
    naming: () => ({ name: "models" }),
    gathered: gatheringFrom({ domains: ["domain"] }),
  })
  expect(aDomainWithItsParts(made(["models.domain.ts"]))).toEqual([])
})

test("a folder named a plural no type of that page gathers under is refused", () => {
  const made = folderFrom({
    folder: "akasha/domains",
    pageTypes: PAGE_TYPES,
    extending: DOMAINING,
    naming: () => ({ name: "models" }),
    gathered: gatheringFrom({ domains: ["seat"] }),
  })
  const said = aDomainWithItsParts(made(["models.domain.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`domains`")
})
