import { afterAll, expect, test } from "bun:test"
import { symlinkSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { countsIn, linesOf, typeOf } from "./repo-measuring.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repoWith(): string {
  const root = scratch.rootFor("repo-measuring-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  put(root, ".gitignore", "node_modules/\n")
  put(root, "one.ts", "one\ntwo\n")
  put(root, "deep/two.ts", "three\n")
  put(root, "notes.txt", "a\nb\nc")
  put(root, "node_modules/pkg/four.ts", "four\n")
  put(root, "pages-core/generated/five.ts", "five\n")
  put(root, "web/build/six.js", "six\n")
  put(root, "seven.generated.yaml", "seven\n")
  put(root, "pages/vendor/eight.ts", "eight\n")
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

test("every file the checkout holds is counted, and a generated file is not", () => {
  const counts = countsIn(repoWith())

  expect(counts.files).toBe(5)
  expect(counts.lines).toBe(8)
})

test("a file not yet committed is counted where the repository does not ignore it", () => {
  const root = repoWith()
  put(root, "nine.ts", "nine\n")

  expect(countsIn(root).files).toBe(6)
})

test("a file type is what follows the last dot in a name", () => {
  expect(typeOf("deep/two.ts")).toBe("ts")
  expect(typeOf("amy.persona.appearance.md")).toBe("md")
  expect(typeOf("Containerfile")).toBe("Containerfile")
  expect(typeOf(".gitignore")).toBe(".gitignore")
  expect(typeOf("bin/akasha")).toBe("akasha")
})

test("a file that could not be read is counted with no lines and named", () => {
  const root = repoWith()
  symlinkSync(join(root, "nowhere.ts"), join(root, "broken.ts"))
  git(root, ["add", "-A"])
  const counts = countsIn(root)

  expect(counts.files).toBe(6)
  expect(counts.lines).toBe(8)
  expect(counts.unread).toEqual(["broken.ts"])
  expect(linesOf(counts)).toContain("these were not read, and count no lines:")
})

test("types are ordered by how many lines each type holds", () => {
  const counts = countsIn(repoWith())

  expect(counts.types.map((one) => one.type)).toEqual(["ts", "txt", ".gitignore"])
})

test("the numbers are set out in a column under a heading, above a total", () => {
  const said = linesOf({
    types: [
      { type: "ts", files: 3, lines: 40 },
      { type: "md", files: 1, lines: 2 },
    ],
    files: 4,
    lines: 42,
    unread: [],
  })

  expect(said).toEqual([
    "type   files  lines",
    "ts         3     40",
    "md         1      2",
    "",
    "total      4     42",
  ])
})
