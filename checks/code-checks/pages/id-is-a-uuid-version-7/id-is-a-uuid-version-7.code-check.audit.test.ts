import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pathFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { idIsAUuidVersion7 } from "./id-is-a-uuid-version-7.code-check.audit.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "akasha/one/held.check.ts"

const HELPER = "akasha/one/helper.ts"

const NOTES = "akasha/one/notes.md"

const UNFILED = "akasha/one/unfiled.ts"

function written(root: string, at: string, body: string): undefined {
  mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, at), body)
}

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-id-audit-")
  for (const [at, body] of Object.entries(bodies)) {
    written(root, at, body)
    pathFiled(root, at, [{ path: at, id: "01a04b5e-39e5-7730-9318-c34e7807c200" }])
  }
  return root
}

function page(id: string): string {
  return `export const held = {\n  id: "${id}",\n} as const satisfies Check\n`
}

test("an audit reads every path the index files rather than a change", () => {
  const said = idIsAUuidVersion7(rootWith({ [HELD]: page("held-1") }))
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain("is not a uuid")
})

test("an audit lets a page stating a uuid version 7 through", () => {
  expect(
    idIsAUuidVersion7(rootWith({ [HELD]: page("01a04b5e-39e5-7730-9318-c34e7807c200") }))
  ).toEqual([])
})

test("an audit reaches every TypeScript file, as the check does, rather than the pages alone", () => {
  const root = rootWith({ [HELPER]: page("held-1") })
  expect(idIsAUuidVersion7(root).map((one) => one.path)).toEqual([HELPER])
})

test("an audit passes over a file that is no TypeScript, as the check does", () => {
  expect(idIsAUuidVersion7(rootWith({ [NOTES]: page("held-1") }))).toEqual([])
})

test("an audit judges no file the index does not file", () => {
  const root = rootWith({ [HELD]: page("01a04b5e-39e5-7730-9318-c34e7807c200") })
  written(root, UNFILED, page("held-1"))
  expect(idIsAUuidVersion7(root)).toEqual([])
})
