import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages/shadow"
import {
  change,
  scratch,
  staged,
} from "../typecheck/typecheck.code-check.decision.test-fixtures.ts"
import {
  askingIn,
  clientReachesPagesThroughItsHooks,
} from "./client-reaches-pages-through-its-hooks.code-check.check.code.ts"

afterAll(scratch.sweep)

const PACKAGE = "workspace-package"

const ACCESS_AT = "pages/access/pages-access.workspace-package.ts"

const HOOKS_AT = "pages/ui/pages-ui.workspace-package.ts"

const UPSERT_AT = "pages/access/upsert.module.code.ts"

const PANEL_AT = "pages/app/panel.module.code.ts"

const NOTES_AT = "pages/app/notes.md"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299154"

const HELD = "export const held = 1\n"

const UPSERT = "export const upsertPages = () => 1\n"

const REACHES =
  '"use client"\nimport { upsertPages } from "../access/upsert.module.code.ts"\n' +
  "export const held = upsertPages()\n"

function rooted(): string {
  const root = staged({
    [ACCESS_AT]: HELD,
    [HOOKS_AT]: HELD,
    [UPSERT_AT]: UPSERT,
    [PANEL_AT]: HELD,
  })
  listedFiled(root, PACKAGE, "pages-access", [{ path: ACCESS_AT, id: ID }])
  listedFiled(root, PACKAGE, "pages-ui", [{ path: HOOKS_AT, id: ID }])
  pathFiled(root, PANEL_AT, [{ path: PANEL_AT, id: ID }])
  return root
}

test("what the check asks names a side's folder from the package page the index files", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).folderOf("pages-access")).toBe("pages/access")
})

test("what the check asks names nothing for a package the index files no page for", () => {
  const root = rooted()
  expect(askingIn(change(root, {}), shadowAt(root)).folderOf("pages-ui-store")).toBe(null)
})

test("what the check asks reads a body from the change rather than from the disk", () => {
  const root = rooted()
  expect(askingIn(change(root, { [PANEL_AT]: REACHES }), shadowAt(root)).textAt(PANEL_AT)).toBe(
    REACHES
  )
})

test("a body the change carries is judged by what the decision answers", () => {
  const root = rooted()
  const given = change(root, { [PANEL_AT]: REACHES })
  const said = clientReachesPagesThroughItsHooks(given, shadowAt(root))
  expect(said.map((one) => one.path)).toEqual([PANEL_AT])
  expect(said[0]?.reason).toContain("`upsertPages`")
})

test("a change whose bodies carry no directive is judged by nothing", () => {
  const root = rooted()
  const given = change(root, { [PANEL_AT]: HELD })
  expect(clientReachesPagesThroughItsHooks(given, shadowAt(root))).toEqual([])
})

test("a TypeScript file is input to this check and a file that is not is no input", () => {
  const shadow = shadowAt(rooted())
  expect(clientReachesPagesThroughItsHooks.isInput(PANEL_AT, shadow)).toBe(true)
  expect(clientReachesPagesThroughItsHooks.isInput(NOTES_AT, shadow)).toBe(false)
})
