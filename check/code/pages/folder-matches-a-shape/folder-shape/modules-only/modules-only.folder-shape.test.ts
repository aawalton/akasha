import { expect, test } from "bun:test"
import {
  folderFrom,
  holdsFrom,
  sameName,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { modulesOnly } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/modules-only/modules-only.folder-shape.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"

const FOLDER = "akasha/checks/modules"

const ABOVE = "akasha/checks"

const PAGE_TYPES = new Set<string>(["module", "domain"])

const HELD: Record<string, readonly string[]> = {
  "akasha/checks": ["domain/checks"],
  "akasha/checks/modules/one": ["module/one"],
  "akasha/checks/modules/two": ["module/two"],
}

const holds = holdsFrom(HELD)

const extending = sameName

const DEEP = ["one/one.module.ts", "two/two.module.ts"]

const folder = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })

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
  holds: (at) => (at === `${FOLDER}/three` ? ["domain/three"] : (HELD[at] ?? [])),
  extending,
  declared: () => new Set<string>(["domain/three"]),
})

const nowhere = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds: (at) => (at === ABOVE ? [] : (HELD[at] ?? [])),
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

test("modules the page above declares take the shape", () => {
  expect(modulesOnly(declared([]))).toEqual([])
})

test("a module the page above declares nothing of is refused, and the reason names it", () => {
  const said = modulesOnly(undeclared([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("two")
  expect(said[0]).toContain("`checks`")
})

test("the refusal names modules by the plural the module page type states", () => {
  expect(modulesOnly(undeclared([]))[0]).toContain(`1 ${module.pluralSlug} are no part`)
})

test("a subfolder holding no module is refused", () => {
  const said = modulesOnly(foreign([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the folder of no module")
})

test("a folder above holding no page is asked for no part", () => {
  expect(modulesOnly(nowhere([]))).toEqual([])
})
