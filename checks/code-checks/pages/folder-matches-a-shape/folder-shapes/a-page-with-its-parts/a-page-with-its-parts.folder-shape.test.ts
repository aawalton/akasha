import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import type { Standing, Wanted } from "../folder-shape.page-type.ts"
import { aPageWithItsParts } from "./a-page-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/code-checks"

const PAGE_TYPES = new Set<string>(["page-type", "domain", "module", "code-check"])

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
    "pages/one.code-check.ts",
    "properties/two.text-property.ts",
    "modules/m/m.module.ts",
    "sections/one.book-section.ts",
  ])
  expect(aPageWithItsParts(held(["code-check.page-type.ts"]))).toEqual([])
})

test("a subfolder other than modules, pages, properties or sections is refused, however named", () => {
  const forItsPage = over(["model-checks/model-check.page-type.ts"])
  const said = aPageWithItsParts(forItsPage(["code-check.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("model-checks")

  const otherwise = over(["rules/rule.page-type.ts"])
  const held = aPageWithItsParts(otherwise(["code-check.page-type.ts"]))
  expect(held).toHaveLength(1)
  expect(held[0]).toContain("rules")
})

test("a folder named other than what its page calls it is refused, naming both", () => {
  const held = folderFrom({
    folder: "akasha/code-check",
    pageTypes: PAGE_TYPES,
    naming: () => ({ name: "code-checks" }),
  })
  const said = aPageWithItsParts(held(["code-check.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`code-check`")
  expect(said[0]).toContain("`code-checks`")
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

test("a folder holding no page at all is refused", () => {
  const held = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })
  expect(aPageWithItsParts(held([]))).toEqual(["it holds no page of its own"])
})

test("a second page in the folder is refused, and the reason names it", () => {
  const said = aPageWithItsParts(folder(["code-check.page-type.ts", "one.code-check.ts"]))
  expect(said.some((each) => each.includes("one.code-check.ts"))).toBe(true)
})

test("a file the page states no property for is refused, however it is named", () => {
  const beside = aPageWithItsParts(
    folder(["code-check.page-type.ts", "code-check.page-type.code.ts"])
  )
  expect(beside.some((each) => each.includes("code-check.page-type.code.ts"))).toBe(true)
  const loose = aPageWithItsParts(folder(["code-check.page-type.ts", "notes.txt"]))
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
