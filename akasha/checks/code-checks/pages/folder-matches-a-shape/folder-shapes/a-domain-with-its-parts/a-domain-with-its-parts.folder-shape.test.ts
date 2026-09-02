import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import { aDomainWithItsParts } from "./a-domain-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/models"

const PAGE_TYPES = new Set<string>(["domain", "page-type", "module", "seat"])

const DOMAINS = new Set<string>(["domain", "page-type", "module"])

const DECLARED = new Set<string>(["page-type/model-family", "module/model-asking"])

function holdsAt(at: string): string | null {
  if (at.endsWith("/families")) return "page-type/model-family"
  if (at.endsWith("/stray")) return "domain/other"
  return null
}

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
  expect(judged(["families/model-family.page-type.ts"], ["models.domain.ts"])).toEqual([])
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
  expect(judged(["scripts/build-sim/build-sim.shell-script.ts"], ["models.domain.ts"])).toEqual([])
})

test("a folder holding two pages is refused", () => {
  const said = judged([], ["models.domain.ts", "other.domain.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})
