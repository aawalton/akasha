import { expect, test } from "bun:test"
import type { Standing } from "../folder-shape.page-type.ts"
import { theWorkspaceRoot } from "./the-workspace-root.folder-shape.code.ts"

function judged(
  folder: string,
  files: readonly string[],
  subfolders: readonly string[]
): readonly string[] {
  const made: Standing = {
    folder,
    files,
    pages: [],
    properties: [],
    strays: [],
    entered: () => false,
    extending: () => false,
    subfolders,
    held: new Set<string>(),
    under: () => [],
    declaring: () => null,
    naming: () => null,
    holds: () => [],
    declared: () => new Set<string>(),
    parts: (page) => [page.path],
    partOf: () => [],
  }
  return theWorkspaceRoot(made)
}

test("the root holding nothing takes the shape", () => {
  expect(judged("", [], [])).toEqual([])
})

test("a folder inside the workspace takes no shape here, and the reason names it", () => {
  const said = judged("agents", [], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("agents")
})

test("a file sitting in the root is refused, and the reason names it", () => {
  const said = judged("", ["akasha.domain.ts"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("akasha.domain.ts")
})

test("a folder the root is allowed to hold takes the shape", () => {
  expect(judged("", [], ["agents", "checks", "pages"])).toEqual([])
})

test("a folder the root is not allowed to hold is refused, and the reason names it", () => {
  const said = judged("", [], ["infra"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("infra")
})

test("a folder the root is allowed to hold is left out of the refusal", () => {
  const said = judged("", [], ["agents", "infra"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("infra")
  expect(said[0]).not.toContain("agents")
})

test("the refusal counts every file and every folder the root may not hold", () => {
  const said = judged("", ["akasha.domain.ts", "package.json"], ["infra", "version", "checks"])
  expect(said).toHaveLength(2)
  expect(said[0]).toContain("2 files")
  expect(said[1]).toContain("2 folders")
})
