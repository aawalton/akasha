import { afterAll, expect, test } from "bun:test"
import {
  type Gathered,
  modulesIn,
} from "akasha/check/code/pages/no-unused-modules/modules/module-gathering/module-gathering.module.code.ts"
import {
  change,
  founded,
  readingOver,
  shadowed,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const PROVER_AT = "akasha/modules/held/held.module.test.ts"

const ELSE_AT = "akasha/modules/held/spare.txt"

const PAGE_TEXT =
  'export const held = { id: "01a0c660-9eed-7005-8000-000000000001",' +
  ' type: "page-type/module", slug: "held" }\n'

function rooted(): string {
  const root = scratch.rootFor("akasha-module-gathering-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  wrote(root, {
    [PAGE_AT]: PAGE_TEXT,
    [CODE_AT]: "export const held = 1\n",
    [PROVER_AT]: "export const proved = 1\n",
    [ELSE_AT]: "spare\n",
  })
  return root
}

function gathered(over: Change): readonly Gathered[] {
  const held = shadowed(over)
  return modulesIn(over.changed, held.listed(), held, readingOver(over))
}

test("a module's code names the module that code is beside", () => {
  const root = rooted()
  const over = change(root, [CODE_AT])

  expect(gathered(over).map((one) => one.page)).toEqual([PAGE_AT])
})

test("a module's own files are the files beside its page carrying that page's name", () => {
  const root = rooted()
  const over = change(root, [PAGE_AT])
  const found = gathered(over)

  expect(found[0]?.files.toSorted()).toEqual([CODE_AT, PROVER_AT, PAGE_AT])
})

test("a module several files of one change name is gathered once", () => {
  const root = rooted()
  const over = change(root, [PAGE_AT, CODE_AT, PROVER_AT])

  expect(gathered(over).length).toBe(1)
})

test("a module page the change takes away is gathered by nothing", () => {
  const root = rooted()
  const over = change(root, [PAGE_AT, CODE_AT], () => null)

  expect(gathered(over)).toEqual([])
})

test("a file naming no module page type is gathered by nothing", () => {
  const root = rooted()
  const over = change(root, [ELSE_AT])

  expect(gathered(over)).toEqual([])
})
