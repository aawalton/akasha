import { afterAll, expect, test } from "bun:test"
import {
  noUnusedExports,
  refusalsLeft,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.check.code.ts"
import {
  AT,
  HELD_TEXT,
  importedBy,
  landed,
  READER,
  readerText,
  reading,
  rooted,
  scratch,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  judgingBy,
  landing,
  put,
  shadowed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(noUnusedExports)

const A_DAY = 86_400_000

const TWO_DAYS = 2 * A_DAY

test("the check refuses a file the change carries exporting a value no other file names", () => {
  const said = judging(landing(rooted(), { [AT]: bytesOf(HELD_TEXT) }))

  expect(said.map((one) => one.path)).toEqual([AT, AT])
})

test("the check lets through a file whose every export another file names", () => {
  const root = rooted()
  reading(root, readerText("held"))
  importedBy(root, [READER])

  expect(judging(landing(root, { [AT]: bytesOf("export const held = 1\n") }))).toEqual([])
})

test("the check takes a TypeScript body as its input and no file that is none", () => {
  const shadow = shadowed(landing(rooted(), { [AT]: bytesOf(HELD_TEXT) }))

  expect(noUnusedExports.isInput(AT, shadow)).toBe(true)
  expect(noUnusedExports.isInput("akasha/held.md", shadow)).toBe(false)
})

test("the check passes over a file whose last commit is inside the last day", () => {
  const over = landing(landed(rooted(), { [AT]: HELD_TEXT }), { [AT]: bytesOf(HELD_TEXT) })

  expect(refusalsLeft(over, shadowed(over), Date.now())).toEqual([])
})

test("the check refuses a file whose last commit is before that day", () => {
  const over = landing(landed(rooted(), { [AT]: HELD_TEXT }), { [AT]: bytesOf(HELD_TEXT) })
  const said = refusalsLeft(over, shadowed(over), Date.now() + TWO_DAYS)

  expect(said.map((one) => one.path)).toEqual([AT, AT])
})

test("the check passes over a file no commit holds at all", () => {
  const over = landing(landed(rooted()), { [AT]: bytesOf(HELD_TEXT) })

  expect(refusalsLeft(over, shadowed(over), Date.now() + TWO_DAYS)).toEqual([])
})

const OTHER = "akasha/other.module.code.ts"

function losing(root: string): Change {
  return landing(
    root,
    { [READER]: bytesOf("export const reader = 1\n") },
    { [READER]: bytesOf(readerText("held")) }
  )
}

function reasonsAt(said: readonly { path: string; reason: string }[]): readonly string[] {
  return said.filter((one) => one.path === AT).map((one) => one.reason)
}

test("the check refuses a change taking away the last import of a value in another file", () => {
  const root = rooted()
  put(root, AT, bytesOf(HELD_TEXT))
  reading(root, readerText("held"))
  importedBy(root, [READER])

  expect(reasonsAt(judging(losing(root)))).toEqual([expect.stringContaining("`held`")])
})

test("the check lets through a change taking away one of two imports of a value", () => {
  const root = rooted()
  put(root, AT, bytesOf(HELD_TEXT))
  reading(root, readerText("held"))
  put(root, OTHER, bytesOf(readerText("held")))
  importedBy(root, [READER, OTHER])

  expect(reasonsAt(judging(losing(root)))).toEqual([])
})

test("the check refuses a file losing its last import even where that file landed lately", () => {
  const root = rooted()
  importedBy(root, [READER])
  landed(root, { [AT]: HELD_TEXT, [READER]: readerText("held") })
  const over = losing(root)

  expect(reasonsAt(refusalsLeft(over, shadowed(over), Date.now()))).toEqual([
    expect.stringContaining("`held`"),
  ])
})

test("the check still passes over a lately landed file the change carries beside a lost import", () => {
  const root = rooted()
  importedBy(root, [READER])
  landed(root, { [AT]: HELD_TEXT, [READER]: readerText("held"), [OTHER]: HELD_TEXT })
  const over = landing(
    root,
    { [READER]: bytesOf("export const reader = 1\n"), [OTHER]: bytesOf(HELD_TEXT) },
    { [READER]: bytesOf(readerText("held")), [OTHER]: bytesOf(HELD_TEXT) }
  )
  const said = refusalsLeft(over, shadowed(over), Date.now())

  expect(said.filter((one) => one.path === OTHER)).toEqual([])
  expect(reasonsAt(said)).toEqual([expect.stringContaining("`held`")])
})
