import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Declaring } from "../folder-shape.page-type.ts"
import { aPageTypeWithItsParts } from "./a-page-type-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/models"

const PAGE_TYPES = new Set<string>(["domain", "page-type", "module", "seat", "workspace-package"])

const TYPES = new Set<string>(["page-type"])

const DECLARED = new Set<string>(["page-type/model-family", "module/model-asking"])

const DECLARING: Declaring = {
  slug: "model",
  pluralSlug: "models",
  propertySlugs: new Set<string>(),
}

function holdsAt(at: string): string | null {
  if (at.endsWith("/families")) return "page-type/model-family"
  if (at.endsWith("/stray")) return "domain/other"
  return null
}

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
  expect(judged(["families/model-family.page-type.ts"], ["model.page-type.ts"])).toEqual([])
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
  expect(judged(["pages/one.model-family.ts"], ["model.page-type.ts"])).toEqual([])
})

test("a subfolder named properties is a part", () => {
  expect(judged(["properties/held.text-property.ts"], ["model.page-type.ts"])).toEqual([])
})

test("a workspace package slugged the page type's plural slug may sit beside it", () => {
  expect(judgedBy([], ["model.page-type.ts", "models.workspace-package.ts"], DECLARING)).toEqual([])
})

test("a workspace package slugged anything else is a second page and is refused", () => {
  const said = judgedBy([], ["model.page-type.ts", "other.workspace-package.ts"], DECLARING)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a second page that is no workspace package is refused beside a page type", () => {
  const said = judgedBy([], ["model.page-type.ts", "models.page-type.ts"], DECLARING)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a subfolder named scripts is a part", () => {
  expect(judged(["scripts/build-sim/build-sim.shell-script.ts"], ["model.page-type.ts"])).toEqual(
    []
  )
})

test("a page type stating no plural slug takes no workspace package beside it", () => {
  const said = judgedBy([], ["model.page-type.ts", "models.workspace-package.ts"], {
    slug: "model",
    pluralSlug: null,
    propertySlugs: new Set<string>(),
  })
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})
