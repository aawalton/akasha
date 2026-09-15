import { expect, test } from "bun:test"
import {
  folderFrom,
  holdsFrom,
  sameName,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { testFixturesOnly } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/test-fixtures-only/test-fixtures-only.folder-shape.code.ts"

const FOLDER = "akasha/checks/test-fixtures"

const ABOVE = "akasha/checks"

const PAGE_TYPES = new Set<string>(["test-fixture", "domain"])

const HELD: Record<string, readonly string[]> = {
  "akasha/checks": ["domain/checks"],
  "akasha/checks/test-fixtures/one": ["test-fixture/one"],
  "akasha/checks/test-fixtures/two": ["test-fixture/two"],
}

const holds = holdsFrom(HELD)

const extending = sameName

const DEEP = ["one/one.test-fixture.ts", "two/two.test-fixture.ts"]

const folder = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })

const declared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  declared: () => new Set<string>(["test-fixture/one", "test-fixture/two"]),
})

const undeclared = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  deep: DEEP,
  holds,
  extending,
  declared: () => new Set<string>(["test-fixture/one"]),
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

test("a folder named test-fixtures holding no file of its own takes the shape", () => {
  expect(testFixturesOnly(folder([]))).toEqual([])
})

test("a folder holding a page is refused, and the reason names it", () => {
  const said = testFixturesOnly(folder(["one.test-fixture.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.test-fixture.ts")
})

test("the refusal counts every file sitting in it", () => {
  const said = testFixturesOnly(folder(["one.test-fixture.ts", "notes.txt"]))
  expect(said[0]).toContain("2 files")
})

test("test fixtures the page above declares take the shape", () => {
  expect(testFixturesOnly(declared([]))).toEqual([])
})

test("a fixture the page above declares nothing of is refused, and the reason names it", () => {
  const said = testFixturesOnly(undeclared([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("two")
  expect(said[0]).toContain("`checks`")
})

test("a subfolder holding no test fixture is refused", () => {
  const said = testFixturesOnly(foreign([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("the folder of no test fixture")
})

test("a folder above holding no page is asked for no part", () => {
  expect(testFixturesOnly(nowhere([]))).toEqual([])
})
