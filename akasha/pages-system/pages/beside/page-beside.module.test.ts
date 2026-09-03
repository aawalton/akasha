import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  besideAt,
  besideNamed,
  secretAt,
  uncommittedAt,
  uncommittedBesideAt,
} from "../file-name/page-file-name.module.code.ts"
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

test("the later parts of a property go with the page as its first part does", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/held.module.prose.txt",
    "akasha/one/held.module.prose.part2.txt",
    "akasha/one/held.module.prose.part10.txt",
  ])
  expect(besideOf(root, PAGE)).toEqual([
    "akasha/one/held.module.prose.part10.txt",
    "akasha/one/held.module.prose.part2.txt",
    "akasha/one/held.module.prose.txt",
  ])
})

test("a property held uncommitted goes with the page", () => {
  const root = rootWith([PAGE, "akasha/one/held.module.patch.uncommitted.diff"])
  expect(besideOf(root, PAGE)).toEqual(["akasha/one/held.module.patch.uncommitted.diff"])
})

test("a later part held uncommitted goes with the page", () => {
  const root = rootWith([PAGE, "akasha/one/held.module.prose.part3.uncommitted.txt"])
  expect(besideOf(root, PAGE)).toEqual(["akasha/one/held.module.prose.part3.uncommitted.txt"])
})

test("a first part spelled out is no name a property's file carries, so it is not beside it", () => {
  const root = rootWith([PAGE, "akasha/one/held.module.prose.part1.txt"])
  expect(besideOf(root, PAGE)).toEqual([])
})

test("the litter a crashed write left beside a page is not beside it", () => {
  const root = rootWith([
    PAGE,
    "akasha/one/held.module.uncommitted.ts",
    "akasha/one/held.module.uncommitted.ts.3032024.part",
  ])
  expect(besideOf(root, PAGE)).toEqual(["akasha/one/held.module.uncommitted.ts"])
})

test("the litter a crashed write left beside an uncommitted file is not beside that file", () => {
  const root = rootWith([
    "akasha/one/held.module.uncommitted.ts",
    "akasha/one/held.module.uncommitted.ts.3032024.part",
  ])
  expect(besideOf(root, "akasha/one/held.module.uncommitted.ts")).toEqual([])
})

test("the sections past a page's name are a property's slug, its part, and whether it is committed", () => {
  expect(besideNamed("code.ts")).toBe(true)
  expect(besideNamed("uncommitted.ts")).toBe(true)
  expect(besideNamed("sops.yaml")).toBe(true)
  expect(besideNamed("prose.part2.txt")).toBe(true)
  expect(besideNamed("prose.part10.txt")).toBe(true)
  expect(besideNamed("patch.uncommitted.diff")).toBe(true)
  expect(besideNamed("prose.part3.uncommitted.txt")).toBe(true)
})

test("sections naming no property of a page are beside no page", () => {
  expect(besideNamed("ts")).toBe(false)
  expect(besideNamed("code.d.ts")).toBe(false)
  expect(besideNamed("prose.part1.txt")).toBe(false)
  expect(besideNamed("uncommitted.ts.3032024.part")).toBe(false)
  expect(besideNamed("ts.3032024.part")).toBe(false)
  expect(besideNamed("CODE.ts")).toBe(false)
  expect(besideNamed("code.TS")).toBe(false)
})

test("what the builders put together, besideNamed reads back as beside a page", () => {
  const page = "akasha/one/dalla.seat.ts"
  const built = [
    besideAt(page, "code", "ts"),
    uncommittedAt(page),
    secretAt(page),
    uncommittedBesideAt(page, "patch", "diff"),
    besideAt(page, "prose.part2", "txt"),
    uncommittedBesideAt(page, "prose.part3", "txt"),
  ]
  for (const one of built) {
    if (one === null) throw new Error("expected a name beside the page")
    expect(besideNamed(one.slice("akasha/one/dalla.seat.".length))).toBe(true)
  }
})
