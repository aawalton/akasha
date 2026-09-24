import { afterAll, expect, test } from "bun:test"
import { noUnusedModules } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.check.code.ts"
import {
  change,
  founded,
  shadowed,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const ELSE_AT = "akasha/modules/reader/reader.txt"

const PAGE_TEXT =
  'export const held = { id: "01a0c660-9eed-7008-8000-000000000001",' +
  ' type: "page-type/module", slug: "held" }\n'

function rooted(): string {
  const root = scratch.rootFor("akasha-unused-modules-check-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  wrote(root, {
    [PAGE_AT]: PAGE_TEXT,
    [CODE_AT]: "export const held = 1\n",
    [ELSE_AT]: "spare\n",
  })
  return root
}

test("a change naming a module's code has that module judged", () => {
  const root = rooted()
  const over = change(root, [CODE_AT])

  expect(noUnusedModules(over, shadowed(over)).map((one) => one.path)).toEqual([PAGE_AT])
})

test("a change naming no file of a module is judged by nothing", () => {
  const root = rooted()
  const over = change(root, [ELSE_AT])

  expect(noUnusedModules(over, shadowed(over))).toEqual([])
})

test("the check takes a module's own files as its input", () => {
  const root = rooted()

  expect(noUnusedModules.isInput(CODE_AT, shadowed(change(root, [CODE_AT])))).toBe(true)
})
