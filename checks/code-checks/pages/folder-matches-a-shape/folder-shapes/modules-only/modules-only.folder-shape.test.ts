import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { modulesOnly } from "./modules-only.folder-shape.code.ts"

const FOLDER = "akasha/checks/modules"

const OTHER = "akasha/checks/mods"

const ABOVE = "akasha/checks"

const PAGE_TYPES = new Set<string>(["module", "domain"])

const HELD: Record<string, string> = {
  "akasha/checks": "domain/checks",
  "akasha/checks/modules/one": "module/one",
  "akasha/checks/modules/two": "module/two",
}

const holds: Standing["holds"] = (at) => HELD[at] ?? null

const extending: Standing["extending"] = (pageTypeSlug, wanted) => pageTypeSlug === wanted

const DEEP = ["one/one.module.ts", "two/two.module.ts"]

const folder = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })

const otherwise = folderFrom({ folder: OTHER, pageTypes: PAGE_TYPES })

const declared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  declared: () => new Set<string>(["module/one", "module/two"]),
})

const undeclared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  declared: () => new Set<string>(["module/one"]),
})

const foreign = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: ["three/three.domain.ts"],
  holds: (at) => (at === `${FOLDER}/three` ? "domain/three" : (HELD[at] ?? null)),
  extending,
  declared: () => new Set<string>(["domain/three"]),
})

const nowhere = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds: (at) => (at === ABOVE ? null : (HELD[at] ?? null)),
  extending,
  declared: () => new Set<string>(),
})

test("a folder named modules holding no file of its own takes the shape", () => {
  expect(modulesOnly(folder([]))).toEqual([])
})

test("a folder holding a page is refused, and the reason names it", () => {
  const said = modulesOnly(folder(["one.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.module.ts")
})

test("a folder holding a file that is no page is refused too", () => {
  expect(modulesOnly(folder(["notes.txt"]))).toHaveLength(1)
})

test("the refusal counts every file sitting in it", () => {
  const said = modulesOnly(folder(["one.module.ts", "two.module.ts", "notes.txt"]))
  expect(said[0]).toContain("3 files")
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const said = modulesOnly(otherwise([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`mods`")
  expect(said[0]).toContain("`modules`")
})

test("modules the page above declares take the shape", () => {
  expect(modulesOnly(declared([]))).toEqual([])
})

test("a module the page above declares nothing of is refused, and the reason names it", () => {
  const said = modulesOnly(undeclared([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("two")
  expect(said[0]).toContain("`checks`")
})

test("a subfolder holding no module is refused", () => {
  const said = modulesOnly(foreign([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("hold no module")
})

test("a folder above holding no page is asked for no part", () => {
  expect(modulesOnly(nowhere([]))).toEqual([])
})
