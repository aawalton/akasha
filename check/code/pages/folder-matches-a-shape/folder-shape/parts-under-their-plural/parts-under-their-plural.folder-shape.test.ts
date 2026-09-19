import { expect, test } from "bun:test"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import {
  folderFrom,
  gatheringFrom,
  holdsFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { partsUnderTheirPlural } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/parts-under-their-plural/parts-under-their-plural.folder-shape.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const FOLDER = "akasha/checks/modules"

const PROPERTIES = "akasha/seat/properties"

const PAGE_TYPES = new Set<string>(["module", "domain", "boolean-property"])

const HELD: Record<string, readonly string[]> = {
  "akasha/checks": ["domain/checks"],
  "akasha/checks/modules/one": ["module/one"],
  "akasha/checks/modules/two": ["module/two"],
}

const holds = holdsFrom(HELD)

const TAKES: Record<string, readonly string[]> = {
  module: ["module"],
  domain: ["domain"],
  "boolean-property": ["boolean-property", "page-property"],
}

const extending: Standing["extending"] = (pageTypeSlug, wanted) =>
  (TAKES[pageTypeSlug] ?? []).includes(wanted)

const gathered = gatheringFrom({ modules: ["module"], properties: ["page-property"] })

const DEEP = ["one/one.module.ts", "two/two.module.ts"]

const declared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  gathered,
  declared: () => new Set<string>(["module/one", "module/two"]),
})

const undeclared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  gathered,
  declared: () => new Set<string>(["module/one"]),
})

const foreign = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: ["three/three.domain.ts"],
  holds: (at) => (at === `${FOLDER}/three` ? ["domain/three"] : (HELD[at] ?? [])),
  extending,
  gathered,
  declared: () => new Set<string>(["domain/three"]),
})

const nowhere = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds: (at) => (at === "akasha/checks" ? [] : (HELD[at] ?? [])),
  extending,
  gathered,
  declared: () => new Set<string>(),
})

const unnamed = folderFrom({
  folder: "akasha/checks/widgets",
  pageTypes: PAGE_TYPES,
  gathered,
})

const BESIDE = `${PROPERTIES}/on-call.boolean-property.types.ts`

function propertied(parts: (page: { readonly path: string }) => readonly string[]): Standing {
  return folderFrom({
    folder: PROPERTIES,
    pageTypes: PAGE_TYPES,
    fileProperties: new Set<string>(["types"]),
    holds: holdsFrom({ "akasha/seat": [`${pageType.slug}/${seat.slug}`] }),
    extending,
    gathered,
    parts,
    declared: () => new Set<string>(["boolean-property/on-call"]),
  })(["on-call.boolean-property.ts", "on-call.boolean-property.types.ts"])
}

test("module folders the page above declares take the shape", () => {
  expect(partsUnderTheirPlural(declared([]))).toEqual([])
})

test("a folder named no page type's plural is refused, and the reason names it", () => {
  const said = partsUnderTheirPlural(unnamed([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("widgets")
})

test("a module the page above declares nothing of is refused, and the reason names it", () => {
  const said = partsUnderTheirPlural(undeclared([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("two")
  expect(said[0]).toContain("`checks`")
})

test("a subfolder holding a page gathered under another name is refused", () => {
  const said = partsUnderTheirPlural(foreign([]))
  expect(said[0]).toContain("three")
})

test("a folder above holding no page is asked for no part", () => {
  expect(partsUnderTheirPlural(nowhere([]))).toEqual([])
})

test("property pages sitting as files of their own take the shape", () => {
  expect(partsUnderTheirPlural(propertied((page) => [page.path, BESIDE]))).toEqual([])
})

test("a file beside a page that page states nowhere is refused", () => {
  const said = partsUnderTheirPlural(propertied((page) => [page.path]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("on-call.boolean-property.types.ts")
})

test("a page of a page type gathered under another name is refused", () => {
  const said = partsUnderTheirPlural(
    folderFrom({
      folder: FOLDER,
      pageTypes: PAGE_TYPES,
      holds,
      extending,
      gathered,
      declared: () => new Set<string>(["domain/other"]),
    })(["other.domain.ts"])
  )
  expect(said[0]).toContain("other.domain.ts")
})

test("a file that is neither a page nor a file beside one is refused", () => {
  const said = partsUnderTheirPlural(
    folderFrom({
      folder: FOLDER,
      pageTypes: PAGE_TYPES,
      holds,
      extending,
      gathered,
      declared: () => new Set<string>(),
    })(["notes.txt"])
  )
  expect(said[0]).toContain("notes.txt")
})
