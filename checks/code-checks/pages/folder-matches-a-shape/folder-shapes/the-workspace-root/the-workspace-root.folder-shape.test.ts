import { expect, test } from "bun:test"
import { heldIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { theWorkspaceRoot } from "./the-workspace-root.folder-shape.code.ts"

const PAGE_TYPES = new Set<string>(["domain", "workspace", "seat"])

const DOMAIN_PAGE = "akasha.domain.ts"

const WORKSPACE_PAGE = "akasha-workspace.workspace.ts"

const BOTH: readonly string[] = [DOMAIN_PAGE, WORKSPACE_PAGE]

const PARTS: Readonly<Record<string, readonly string[]>> = {
  [WORKSPACE_PAGE]: [WORKSPACE_PAGE, "package.json", "bun.lock"],
}

const DECLARED = new Set<string>(["domain/agents", "domain/checks"])

function judged(
  folder: string,
  names: readonly string[],
  subfolders: readonly string[]
): readonly string[] {
  const held = names.map((each) => heldIn(each, PAGE_TYPES, new Set<string>()))
  const made: Standing = {
    folder,
    files: held.map((each) => each.path),
    pages: held.filter((each) => each.kind === "page"),
    properties: [],
    strays: [],
    entered: () => false,
    extending: (pageTypeSlug, wanted) =>
      pageTypeSlug === wanted || (wanted === "domain" && pageTypeSlug === "workspace"),
    subfolders,
    held: new Set<string>(),
    under: () => [],
    declaring: () => null,
    naming: () => null,
    holds: (at) => [`domain/${at}`],
    declared: () => DECLARED,
    parts: (page) => PARTS[page.path] ?? [page.path],
    partOf: () => [],
  }
  return theWorkspaceRoot(made)
}

test("the root with its workspace, its domain and the files those state takes the shape", () => {
  expect(judged("", [...BOTH, "package.json", "bun.lock"], [])).toEqual([])
})

test("a folder inside the workspace takes no shape here, and the reason names it", () => {
  const said = judged("agents", [], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("agents")
})

test("the root holding one page rather than two is refused", () => {
  const said = judged("", [DOMAIN_PAGE], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("1 page(s)")
})

test("the root holding two pages neither of which is a workspace is refused", () => {
  const said = judged("", [DOMAIN_PAGE, "akasha.seat.ts"], [])
  expect(said).toEqual(["neither page here is a workspace"])
})

test("a file neither page states is refused, and the reason names it", () => {
  const said = judged("", [...BOTH, "loose.json"], [])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("loose.json")
})

test("a subfolder the domain declares a part takes the shape", () => {
  expect(judged("", BOTH, ["agents", "checks"])).toEqual([])
})

test("a subfolder the domain declares nowhere is refused, and the reason names it", () => {
  const said = judged("", BOTH, ["agents", "infra"])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("infra")
  expect(said[0]).not.toContain("agents")
})
