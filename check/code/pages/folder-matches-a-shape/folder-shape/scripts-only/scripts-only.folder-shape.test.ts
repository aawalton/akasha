import { expect, test } from "bun:test"
import {
  folderFrom,
  sameName,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { scriptsOnly } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/scripts-only/scripts-only.folder-shape.code.ts"

const FOLDER = "akasha/code/ios-harness/scripts"

const PAGE_TYPES = new Set<string>(["shell-script", "module"])

function holdsAt(at: string): readonly string[] {
  if (at.endsWith("/a-script")) return ["shell-script/a-script"]
  if (at.endsWith("/a-module")) return ["module/a-module"]
  return []
}

function judged(deep: readonly string[], names: readonly string[]): readonly string[] {
  const made = folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    holds: holdsAt,
    extending: sameName,
    deep,
  })
  return scriptsOnly(made(names))
}

const ONE_SCRIPT = ["a-script/a-script.shell-script.ts"]

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

test("a subfolder holding a page that is no shell script is refused, and the reason names it", () => {
  const said = judged([...ONE_SCRIPT, "a-module/a-module.module.ts"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("a-module")
  expect(said[0]).toContain("the folder of no script")
})

test("a subfolder holding no page at all is refused too", () => {
  const said = judged([...ONE_SCRIPT, "loose/held.module.code.ts"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("loose")
})

test("the refusal counts every subfolder holding no script", () => {
  const said = judged(["a-module/a-module.module.ts", "loose/held.module.code.ts"], [])
  expect(said.some((each) => each.includes("2 subfolders"))).toBe(true)
})
