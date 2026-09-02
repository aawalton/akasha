import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import { scriptsOnly } from "./scripts-only.folder-shape.code.ts"

const FOLDER = "akasha/code-system/ios-harnesses/scripts"

const OTHER = "akasha/code-system/ios-harnesses/shell-scripts"

const PAGE_TYPES = new Set<string>(["shell-script", "module"])

function holdsAt(at: string): string | null {
  if (at.endsWith("/render-harness-run")) return "shell-script/render-harness-run"
  if (at.endsWith("/notes")) return "module/notes"
  return null
}

function judged(deep: readonly string[], names: readonly string[]): readonly string[] {
  const made = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES, holds: holdsAt, deep })
  return scriptsOnly(made(names))
}

const ONE_SCRIPT = ["render-harness-run/render-harness-run.shell-script.ts"]

test("a folder named scripts holding a folder for each script takes the shape", () => {
  expect(judged(ONE_SCRIPT, [])).toEqual([])
})

test("a folder holding a file of its own is refused, and the reason names it", () => {
  const said = judged(ONE_SCRIPT, ["one.shell-script.ts"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.shell-script.ts")
})

test("the refusal counts every file sitting in it", () => {
  const said = judged(ONE_SCRIPT, ["one.shell-script.ts", "two.shell-script.ts", "notes.txt"])
  expect(said.some((each) => each.includes("3 files"))).toBe(true)
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const made = folderFrom({
    folder: OTHER,
    pageTypes: PAGE_TYPES,
    holds: holdsAt,
    deep: ONE_SCRIPT,
  })
  const said = scriptsOnly(made([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`shell-scripts`")
  expect(said[0]).toContain("`scripts`")
})

test("a subfolder holding a page that is no shell script is refused, and the reason names it", () => {
  const said = judged([...ONE_SCRIPT, "notes/notes.module.ts"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes")
  expect(said[0]).toContain("shell-script")
})

test("a subfolder holding no page at all is refused too", () => {
  const said = judged([...ONE_SCRIPT, "loose/held.module.code.ts"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("loose")
})

test("the refusal counts every subfolder holding no script", () => {
  const said = judged(["notes/notes.module.ts", "loose/held.module.code.ts"], [])
  expect(said.some((each) => each.includes("2 subfolders"))).toBe(true)
})
