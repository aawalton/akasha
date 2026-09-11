import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { idIsAUuidVersion7 } from "akasha/checks/code-checks/pages/id-is-a-uuid-version-7/id-is-a-uuid-version-7.code-check.audit.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "akasha/git/running/git-running.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD = "akasha/one/held.check.ts"

const HELPER = "akasha/one/helper.ts"

const NOTES = "akasha/one/notes.md"

const GONE = "akasha/one/gone.ts"

function rootWith(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-id-audit-")
  for (const [at, body] of Object.entries(bodies)) writing(root, at, body)
  git(root, ["init", "-q"])
  return root
}

function page(id: string): string {
  return `export const held = {\n  id: "${id}",\n} as const satisfies Check\n`
}

test("an audit reads every text the tree holds rather than a change", () => {
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

test("a path the tree names and the disk no longer holds reads as nothing", () => {
  const root = rootWith({ [HELD]: page("01a04b5e-39e5-7730-9318-c34e7807c200") })
  writing(root, GONE, page("held-1"))
  git(root, ["add", "-A"])
  rmSync(join(root, GONE))

  expect(idIsAUuidVersion7(root)).toEqual([])
})
