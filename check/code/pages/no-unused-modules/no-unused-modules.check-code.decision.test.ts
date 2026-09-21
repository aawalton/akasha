import { afterAll, expect, test } from "bun:test"
import { refusalsOver } from "akasha/check/code/pages/no-unused-modules/no-unused-modules.check-code.decision.code.ts"
import {
  change,
  founded,
  shadowed,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { importFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_AT = "akasha/modules/held/held.module.ts"

const CODE_AT = "akasha/modules/held/held.module.code.ts"

const PROVER_AT = "akasha/modules/held/held.module.test.ts"

const READER_AT = "akasha/modules/reader/reader.module.code.ts"

const PAGE_TEXT =
  'export const held = { id: "01a0c660-9eed-7007-8000-000000000001",' +
  ' pageTypeSlug: "module", slug: "held" }\n'

const A_DAY = 86_400_000

const TWO_DAYS = 2 * A_DAY

function rooted(reader: string): string {
  const root = scratch.rootFor("akasha-unused-modules-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  wrote(root, {
    [PAGE_AT]: PAGE_TEXT,
    [CODE_AT]: "export const held = 1\n",
    [PROVER_AT]: "export const proved = 1\n",
    [READER_AT]: reader,
  })
  return root
}

function bare(): string {
  return rooted("export const reader = 1\n")
}

function refusedIn(root: string, now: number = Date.now()): readonly string[] {
  const over = change(root, [PAGE_AT, CODE_AT])
  return refusalsOver(over, shadowed(over), now).map((one) => one.path)
}

function landedIn(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "held"])
  return root
}

test("a module nothing reaches is refused", () => {
  expect(refusedIn(bare())).toEqual([PAGE_AT])
})

test("a refusal says nothing reaches the module", () => {
  const root = bare()
  const over = change(root, [PAGE_AT])

  expect(refusalsOver(over, shadowed(over))[0]?.reason).toContain("no file imports `held`")
})

test("a module another file imports is refused by nothing", () => {
  const root = bare()
  importFiled(root, CODE_AT, [{ path: READER_AT }])

  expect(refusedIn(root)).toEqual([])
})

test("a module only its own test imports is refused", () => {
  const root = bare()
  importFiled(root, CODE_AT, [{ path: PROVER_AT }])

  expect(refusedIn(root)).toEqual([PAGE_AT])
})

test("a module another file spells the slug of is refused by nothing", () => {
  const root = rooted('const RUNS = "held"\n\nexport const reader = RUNS\n')

  expect(refusedIn(root)).toEqual([])
})

test("a module a commit inside the last day holds is refused by nothing", () => {
  expect(refusedIn(landedIn(bare()), Date.now())).toEqual([])
})

test("a module last committed before that day is refused", () => {
  expect(refusedIn(landedIn(bare()), Date.now() + TWO_DAYS)).toEqual([PAGE_AT])
})

test("a module the head commit is missing a file of is refused by nothing", () => {
  const root = landedIn(bare())
  wrote(root, { "akasha/modules/held/held.module.test-fixtures.ts": "export const set = 1\n" })

  expect(refusedIn(root, Date.now() + TWO_DAYS)).toEqual([])
})
