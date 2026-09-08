import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { countsOver, linesOf, pageTypeOf } from "./page-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_TYPES = new Set(["persona", "module"])

const FILE_PROPERTIES = new Set(["appearance", "portrait", "code"])

const PATHS: readonly string[] = [
  "personas/amy.persona.ts",
  "personas/amy.persona.appearance.md",
  "personas/amy.persona.portrait.md",
  "modules/one.module.ts",
  "modules/one.module.code.ts",
  "accounts/aine.claude-account.sops.yaml",
  "package.json",
  "widgets/one.widget.ts",
]

function treeWith(): string {
  const root = scratch.rootFor("page-measuring-")
  put(root, "personas/amy.persona.ts", "one\ntwo\n")
  put(root, "personas/amy.persona.appearance.md", "a\nb\nc\n")
  put(root, "personas/amy.persona.portrait.md", "a\n")
  put(root, "modules/one.module.ts", "a\n")
  put(root, "modules/one.module.code.ts", "a\nb\nc\nd\n")
  put(root, "accounts/aine.claude-account.sops.yaml", "a\n")
  put(root, "package.json", "{}\n")
  put(root, "widgets/one.widget.ts", "a\n")
  return root
}

function countsWith(): ReturnType<typeof countsOver> {
  return countsOver(treeWith(), PATHS, PAGE_TYPES, FILE_PROPERTIES)
}

function fieldsIn(said: string): readonly string[] {
  return said.trim().split(/\s+/)
}

test("a page and the properties beside that page are counted under one page type", () => {
  const counts = countsWith()
  const persona = counts.types.find((one) => one.type === "persona")

  expect(persona?.pages).toEqual({ files: 1, lines: 2 })
  expect(persona?.properties).toEqual({ files: 2, lines: 4 })
})

test("a page type is the second part of a file name", () => {
  expect(pageTypeOf("personas/amy.persona.appearance.md", PAGE_TYPES)).toBe("persona")
  expect(pageTypeOf("modules/one.module.code.ts", PAGE_TYPES)).toBe("module")
})

test("a file naming a page type nothing declares is counted under no page type", () => {
  expect(pageTypeOf("widgets/one.widget.ts", PAGE_TYPES)).toBe(null)
  expect(countsWith().types.map((one) => one.type)).toEqual(["persona", "module"])
})

test("a secret beside a page, and a file that is no page, are counted under the total alone", () => {
  expect(countsWith().outside).toBe(3)
})

test("page types are ordered by how many lines each page type holds in all", () => {
  expect(countsWith().types.map((one) => one.type)).toEqual(["persona", "module"])
})

test("the totals are the pages and the properties counted apart", () => {
  const counts = countsWith()

  expect(counts.pages).toEqual({ files: 2, lines: 3 })
  expect(counts.properties).toEqual({ files: 3, lines: 8 })
})

test("a file that could not be read is counted with no lines and named", () => {
  const counts = countsOver(
    treeWith(),
    ["personas/nowhere.persona.ts"],
    PAGE_TYPES,
    FILE_PROPERTIES
  )

  expect(counts.pages).toEqual({ files: 1, lines: 0 })
  expect(counts.unread).toEqual(["personas/nowhere.persona.ts"])
  expect(linesOf(counts)).toContain("these were not read, and count no lines:")
})

test("a generated file is not counted", () => {
  const counts = countsOver(
    treeWith(),
    ["generated/one.module.ts", "package.json"],
    PAGE_TYPES,
    FILE_PROPERTIES
  )

  expect(counts.pages).toEqual({ files: 0, lines: 0 })
  expect(counts.outside).toBe(1)
})

test("two sets of columns are set out under one heading, above a total", () => {
  const said = linesOf(countsWith())

  expect(said[0]).toContain("page lines")
  expect(said[0]).toContain("property lines")
  expect(fieldsIn(said[1] ?? "")).toEqual(["persona", "1", "2", "2", "4"])
  expect(fieldsIn(said[2] ?? "")).toEqual(["module", "1", "1", "1", "4"])
  expect(said[3]).toBe("")
  expect(fieldsIn(said[4] ?? "")).toEqual(["total", "2", "3", "3", "8"])
  expect(said[5]).toBe("files the checkout holds that are no page: 3")
})
