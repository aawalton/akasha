import { afterAll, expect, test } from "bun:test"
import { slugsSpelled } from "akasha/check/code/pages/no-unused-modules/modules/slug-spelling/slug-spelling.module.code.ts"
import {
  change,
  readingOver,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const RUNNER_AT = "akasha/modules/runner/runner.module.code.ts"

const HELD: readonly string[] = [PAGE_AT, CODE_AT]

const OWN = [{ slug: "held", files: HELD }]

function rooted(runner: string): string {
  const root = scratch.rootFor("akasha-slug-spelling-")
  wrote(root, {
    [PAGE_AT]: 'export const held = { slug: "held" }\n',
    [CODE_AT]: "export const held = 1\n",
    [RUNNER_AT]: runner,
  })
  return root
}

function spelled(root: string, named = OWN): ReadonlySet<string> {
  return slugsSpelled(root, readingOver(change(root, [])), named)
}

test("a module another file spells the slug of is named", () => {
  const root = rooted('const RUNS = "held"\n\nexport const runner = RUNS\n')

  expect([...spelled(root)]).toEqual(["held"])
})

test("a module a single-quoted word spells the slug of is named", () => {
  const root = rooted("const RUNS = 'held'\n\nexport const runner = RUNS\n")

  expect([...spelled(root)]).toEqual(["held"])
})

test("a slug spelled inside a longer word names no module", () => {
  const root = rooted('const RUNS = "held-over"\n\nexport const runner = RUNS\n')

  expect([...spelled(root)]).toEqual([])
})

test("a slug only the module's own files spell names no module", () => {
  const root = rooted("export const runner = 1\n")

  expect([...spelled(root)]).toEqual([])
})

test("a run asking after no slug names no module", () => {
  const root = rooted('const RUNS = "held"\n\nexport const runner = RUNS\n')

  expect(spelled(root, []).size).toBe(0)
})
