import { afterAll, expect, test } from "bun:test"
import {
  entriesDeclared,
  type Held,
} from "akasha/check/code/pages/no-unused-modules/modules/entry-declaring/entry-declaring.module.code.ts"
import {
  change,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const MORE_AT = "akasha/modules/held/held.module.code.part2.ts"

const PROVER_AT = "akasha/modules/held/held.module.test.ts"

const DRAFT_AT = "akasha/modules/held/held.module.code.uncommitted.ts"

const PAGE_TEXT = 'export const held = { slug: "held" }\n'

const SHEBANG = "#!/usr/bin/env bun\n\nexport const held = 1\n"

const GUARDED = "export const held = 1\n\nif (import.meta.main) console.log(held)\n"

const QUIET = "export const held = 1\n"

const OWN: readonly Held[] = [
  { page: PAGE_AT, files: [PAGE_AT, CODE_AT, MORE_AT, PROVER_AT, DRAFT_AT] },
]

function rooted(bodies: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-entry-declaring-")
  wrote(root, { [PAGE_AT]: PAGE_TEXT, ...bodies })
  return root
}

test("a module whose code opens on a shebang line declares an entry point", () => {
  const root = rooted({ [CODE_AT]: SHEBANG })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([PAGE_AT])
})

test("a module whose code names import.meta.main declares an entry point", () => {
  const root = rooted({ [CODE_AT]: GUARDED })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([PAGE_AT])
})

test("a module whose second code file declares an entry point declares one", () => {
  const root = rooted({ [CODE_AT]: QUIET, [MORE_AT]: GUARDED })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([PAGE_AT])
})

test("a module whose code declares neither declares no entry point", () => {
  const root = rooted({ [CODE_AT]: QUIET })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([])
})

test("a shebang below the first line declares no entry point", () => {
  const root = rooted({ [CODE_AT]: `\n${SHEBANG}` })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([])
})

test("a module whose page alone names import.meta.main declares no entry point", () => {
  const root = rooted({ [PAGE_AT]: 'export const held = { at: "import.meta.main" }\n' })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([])
})

test("a module whose test alone declares an entry point declares none", () => {
  const root = rooted({ [CODE_AT]: QUIET, [PROVER_AT]: SHEBANG })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([])
})

test("a code file spelled uncommitted declares no entry point", () => {
  const root = rooted({ [CODE_AT]: QUIET, [DRAFT_AT]: SHEBANG })

  expect([...entriesDeclared(change(root, []), OWN)]).toEqual([])
})

test("a run asking after no module declares nothing", () => {
  const root = rooted({ [CODE_AT]: SHEBANG })

  expect(entriesDeclared(change(root, []), []).size).toBe(0)
})
