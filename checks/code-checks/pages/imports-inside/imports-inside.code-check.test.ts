import { afterAll, expect, test } from "bun:test"
import type { Naming } from "@akasha/code-system/code-specifier"
import { scratchWorld } from "@akasha/command-system/scratching"
import { noPathsFiled } from "@akasha/indexes/testing"
import { shadowFor } from "@akasha/pages-system/shadow"
import { bodiesIn, bytesOf } from "@akasha/testing-system/bodying"
import {
  carrying,
  declaring,
  landing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import {
  importsInside,
  reachedBy,
  reasonsIn,
  reasonsWith,
  workspacesIn,
} from "./imports-inside.code-check.code.ts"

const ROOT = "/repo"

const given = bodiesIn(ROOT)

const NAMING: Naming = new Map([
  ["@shared/pages-query", "shared/pages-query/src/writing.ts"],
  ["@akasha/indexes", "akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"],
])

const reasonsNaming = reasonsWith(NAMING)

test("a relative import landing inside the akasha folder is let through", () => {
  const said = reasonsIn(
    given(
      "akasha/write-system/landing.module.code.ts",
      'import { one } from "./reading.module.code.ts"\n'
    )
  )
  expect(said).toEqual([])
})

test("a relative import climbing out of the akasha folder is refused, and names where it lands", () => {
  const said = reasonsIn(
    given(
      "akasha/write-system/landing.module.code.ts",
      'import { one } from "../../graph/page-index.ts"\n'
    )
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`graph/page-index.ts`")
  expect(said[0]).toContain("imports no file outside the akasha folder")
})

test("a specifier no manifest names lands nowhere and is passed over", () => {
  const body = [
    'import ts from "typescript"',
    'import { readFileSync } from "node:fs"',
    'import { test } from "bun:test"',
  ].join("\n")
  expect(reasonsNaming(given("akasha/held.ts", body))).toEqual([])
})

test("a package landing outside the akasha folder is refused like any other path", () => {
  const said = reasonsNaming(given("akasha/held.ts", 'import one from "@shared/pages-query"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`shared/pages-query/src/writing.ts`")
  expect(said[0]).toContain("imports no file outside the akasha folder")
})

test("a package landing inside the akasha folder is let through", () => {
  const said = reasonsNaming(given("akasha/held.ts", 'import { one } from "@akasha/indexes"\n'))
  expect(said).toEqual([])
})

test("a subpath of a package the naming names is judged by where that subpath lands", () => {
  const naming: Naming = new Map([["@shared/pages-query/ask", "shared/pages-query/src/asking.ts"]])
  const said = reasonsWith(naming)(
    given("akasha/held.ts", 'import { askPage } from "@shared/pages-query/ask"\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`shared/pages-query/src/asking.ts`")
})

test("a type-only import that leaves is refused the same as a value one", () => {
  const said = reasonsIn(
    given("akasha/held.ts", 'import type { One } from "../shared/verdict/verdict.ts"\n')
  )
  expect(said).toHaveLength(1)
})

test("a re-export, a dynamic import and a require are all specifiers", () => {
  const body = [
    'export { one } from "../a.ts"',
    'const two = await import("../b.ts")',
    'const three = require("../c.ts")',
  ].join("\n")
  expect(reasonsIn(given("akasha/held.ts", body))).toHaveLength(3)
})

test("a bare re-export naming everything is a specifier", () => {
  expect(reasonsIn(given("akasha/held.ts", 'export * from "../a.ts"\n'))).toHaveLength(1)
})

test("an import written inside a type position is a specifier too", () => {
  const said = reasonsIn(given("akasha/held.ts", 'export type One = import("../d.ts").Two\n'))
  expect(said).toHaveLength(1)
})

test("an import equals require is a specifier too", () => {
  const said = reasonsIn(given("akasha/held.ts", 'import one = require("../e.ts")\n'))
  expect(said).toHaveLength(1)
})

test("a file that is not TypeScript is passed over", () => {
  expect(reasonsIn(given("akasha/notes.txt", 'import { one } from "../a.ts"\n'))).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const said = reasonsIn(given("shared/held.ts", 'import { one } from "../other/a.ts"\n'))
  expect(said).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(() => reasonsIn(held)).toThrow("akasha/raw.ts")
  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})

test("where a relative specifier lands is read from the file holding it", () => {
  const deep = reasonsIn(
    given(
      "akasha/a/b/c/held.ts",
      'import { one } from "../../../write-system/ledger.module.code.ts"\n'
    )
  )
  expect(deep).toEqual([])
  const out = reasonsIn(given("akasha/a/held.ts", 'import { one } from "../../outside.ts"\n'))
  expect(out).toHaveLength(1)
})

test("a sibling folder whose name begins with akasha is outside the akasha folder", () => {
  const said = reasonsIn(
    given("akasha/a/held.ts", 'import { one } from "../../akasha-notes/z.ts"\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`akasha-notes/z.ts`")
})

test("a specifier climbing to the repo root is refused", () => {
  expect(reasonsIn(given("akasha/held.ts", 'import { one } from "../root.ts"\n'))).toHaveLength(1)
})

test("an absolute specifier is refused, because no absolute path is inside the akasha folder", () => {
  const said = reasonsIn(given("akasha/held.ts", 'import { one } from "/etc/held.ts"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("/etc/held.ts")
})

test("a specifier is judged by where it lands, not by what is there", () => {
  const said = reasonsIn(
    given("akasha/held.ts", 'import { one } from "../never-written/at-all.ts"\n')
  )
  expect(said).toHaveLength(1)
})

test("a package lands where the naming says, and nowhere where none is handed in", () => {
  expect(reachedBy("akasha/a/held.ts", "typescript")).toBeNull()
  expect(reachedBy("akasha/a/held.ts", "@shared/pages-query")).toBeNull()
  expect(reachedBy("akasha/a/held.ts", "@shared/pages-query", NAMING)).toBe(
    "shared/pages-query/src/writing.ts"
  )
  expect(reachedBy("akasha/a/held.ts", "./b.ts")).toBe("akasha/a/b.ts")
  expect(reachedBy("akasha/a/held.ts", "../../b.ts")).toBe("b.ts")
})

test("a specifier spelt from the root names itself, so what it reaches is still judged", () => {
  expect(reachedBy("akasha/a/held.ts", "/etc/passwd")).toBe("/etc/passwd")
  expect(reasonsIn(given("akasha/held.ts", 'import { one } from "/etc/passwd"\n'))).toHaveLength(1)
})

test("a workspace the root manifest names is read at the manifest beneath it", () => {
  const said = workspacesIn('{"workspaces":["shared/pages-query","tools"]}')
  expect(said).toEqual(["shared/pages-query/package.json", "tools/package.json"])
})

test("a workspace named by a pattern is left to the index", () => {
  expect(workspacesIn('{"workspaces":["akasha/**","shared/one"]}')).toEqual([
    "shared/one/package.json",
  ])
})

test("a root manifest naming no workspaces, or none at all, names nothing", () => {
  expect(workspacesIn('{"name":"held"}')).toEqual([])
  expect(workspacesIn("not json at all")).toEqual([])
  expect(workspacesIn(null)).toEqual([])
})

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "akasha/held/held.workspace-package.ts"

const AT = "akasha/held/package.json"

const USER = "akasha/held/use.ts"

const STATED = [
  "export const held = {",
  '  id: "01a04b5e-39e5-7fa4-be61-f3fa8d7d1703",',
  '  pageTypeSlug: "workspace-package",',
  '  slug: "held",',
  '  manifest: "json",',
  "}",
  "",
].join("\n")

function manifested(): string {
  const root = scratch.rootFor("akasha-imports-inside-")
  noPathsFiled(root)
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "page-type" })
  declaring(root, "manifest", {
    pageTypeSlug: "named-file-property",
    unique: null,
    fileName: "package.json",
  })
  carrying(root, "workspace-package", ["manifest"])
  return root
}

test("a manifest the change carries names where a package lands, though the tree has none", () => {
  const root = manifested()
  const over = landing(root, {
    [PAGE]: bytesOf(STATED),
    [AT]: bytesOf('{"name":"@akasha/held","exports":{".":"../../shared/outside.ts"}}\n'),
    [USER]: bytesOf('import { one } from "@akasha/held"\n'),
  })
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = importsInside(over, cast.shadow)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(USER)
  expect(said[0]?.reason).toContain("`shared/outside.ts`")
})

test("a manifest the change leaves naming nothing outside lets its importer through", () => {
  const root = manifested()
  const over = landing(root, {
    [PAGE]: bytesOf(STATED),
    [AT]: bytesOf('{"name":"@akasha/held","exports":{".":"./held.module.code.ts"}}\n'),
    [USER]: bytesOf('import { one } from "@akasha/held"\n'),
  })
  const cast = shadowFor(over)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(importsInside(over, cast.shadow)).toEqual([])
})
