import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import { besideAll, besideOf } from "./page-beside.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWith(paths: readonly string[]): string {
  const root = scratch.rootFor("akasha-beside-")
  for (const one of paths) {
    const at = join(root, one)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, "")
  }
  return root
}

const PAGE = "akasha/one/held.module.ts"

test("the code and the test standing beside a page are answered", () => {
  const root = rootWith([PAGE, "akasha/one/held.module.code.ts", "akasha/one/held.module.test.ts"])
  expect(besideOf(root, PAGE)).toEqual([
    "akasha/one/held.module.code.ts",
    "akasha/one/held.module.test.ts",
  ])
})

test("another page sharing the folder is not beside it", () => {
  const root = rootWith([PAGE, "akasha/one/other.module.ts", "akasha/one/other.module.code.ts"])
  expect(besideOf(root, PAGE)).toEqual([])
})

test("a page whose name begins with this one's is not beside it, the part read being whole", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/heldover.module.ts",
    "akasha/one/heldover.module.code.ts",
  ])
  expect(besideOf(root, PAGE)).toEqual([])
})

test("a file holding any property goes with the page, whatever the property is called", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/held.module.test-fixtures.ts",
    "akasha/one/held.module.notes.md",
    "akasha/one/held.module.code.ts",
  ])
  expect(besideOf(root, PAGE)).toEqual([
    "akasha/one/held.module.code.ts",
    "akasha/one/held.module.notes.md",
    "akasha/one/held.module.test-fixtures.ts",
  ])
})

test("a file carrying more than one part past the page's name is not beside it", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/held.module.code.d.ts",
    "akasha/one/held.module.code.ts",
  ])
  expect(besideOf(root, PAGE)).toEqual(["akasha/one/held.module.code.ts"])
})

test("what stands beside several paths is answered once, sorted, and holds none of them", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/held.module.code.ts",
    "akasha/one/other.module.ts",
    "akasha/one/other.module.code.ts",
  ])
  expect(besideAll(root, [PAGE, "akasha/one/other.module.ts"])).toEqual([
    "akasha/one/held.module.code.ts",
    "akasha/one/other.module.code.ts",
  ])
})

test("a path named among the set is never answered as standing beside another", () => {
  const root = rootWith([PAGE, "akasha/one/held.module.code.ts"])
  expect(besideAll(root, [PAGE, "akasha/one/held.module.code.ts"])).toEqual([])
})

test("a path that is no TypeScript file answers nothing", () => {
  const root = rootWith(["akasha/one/held.md", "akasha/one/held.code.ts"])
  expect(besideOf(root, "akasha/one/held.md")).toEqual([])
})

test("a folder that is not there answers nothing rather than throwing", () => {
  expect(besideOf(rootWith([]), "akasha/never/held.module.ts")).toEqual([])
})

test("a page with nothing beside it answers nothing", () => {
  expect(besideOf(rootWith([PAGE]), PAGE)).toEqual([])
})

test("a page in the root folder is answered without a folder put before it", () => {
  const root = rootWith(["held.module.ts", "held.module.code.ts"])
  expect(besideOf(root, "held.module.ts")).toEqual(["held.module.code.ts"])
})
