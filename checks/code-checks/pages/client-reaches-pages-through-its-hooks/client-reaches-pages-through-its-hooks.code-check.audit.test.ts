import { afterAll, expect, test } from "bun:test"
import { listedFiled, pathFiled } from "@akasha/indexes/testing"
import { scratch, staged } from "../typecheck/typecheck.code-check.decision.test-fixtures.ts"
import {
  askingAt,
  clientReachesPagesThroughItsHooks,
} from "./client-reaches-pages-through-its-hooks.code-check.audit.code.ts"

afterAll(scratch.sweep)

const PACKAGE = "workspace-package"

const ACCESS_AT = "pages/access/pages-access.workspace-package.ts"

const HOOKS_AT = "pages/ui/pages-ui.workspace-package.ts"

const UPSERT_AT = "pages/access/upsert.module.code.ts"

const PANEL_AT = "pages/app/panel.module.code.ts"

const ID = "01a04f2b-3d24-70b3-8c3e-3076a9299155"

const HELD = "export const held = 1\n"

const UPSERT = "export const upsertPages = () => 1\n"

const REACHES =
  '"use client"\nimport { upsertPages } from "../access/upsert.module.code.ts"\n' +
  "export const held = upsertPages()\n"

function rootWith(panel: string, filed = true): string {
  const root = staged({
    [ACCESS_AT]: HELD,
    [HOOKS_AT]: HELD,
    [UPSERT_AT]: UPSERT,
    [PANEL_AT]: panel,
  })
  listedFiled(root, PACKAGE, "pages-access", [{ path: ACCESS_AT, id: ID }])
  listedFiled(root, PACKAGE, "pages-ui", [{ path: HOOKS_AT, id: ID }])
  if (filed) pathFiled(root, PANEL_AT, [{ path: PANEL_AT, id: ID }])
  return root
}

test("an audit reads every path the index files rather than a change", () => {
  const said = clientReachesPagesThroughItsHooks(rootWith(REACHES))
  expect(said.map((one) => one.path)).toEqual([PANEL_AT])
  expect(said[0]?.reason).toContain("`upsertPages`")
})

test("an audit lets a file carrying no directive through", () => {
  expect(clientReachesPagesThroughItsHooks(rootWith(HELD))).toEqual([])
})

test("an audit judges no file the index does not file", () => {
  expect(clientReachesPagesThroughItsHooks(rootWith(REACHES, false))).toEqual([])
})

test("what the audit asks names a side's folder from the package page the index files", () => {
  expect(askingAt(rootWith(HELD)).folderOf("pages-access")).toBe("pages/access")
})

test("what the audit asks reads a body from the disk, there being no change", () => {
  expect(askingAt(rootWith(REACHES)).textAt(PANEL_AT)).toBe(REACHES)
})

test("what the audit asks answers nothing for a path that is not there", () => {
  expect(askingAt(rootWith(HELD)).textAt("pages/app/nowhere.module.code.ts")).toBe(null)
})
