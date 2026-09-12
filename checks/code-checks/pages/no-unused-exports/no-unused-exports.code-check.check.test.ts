import { afterAll, expect, test } from "bun:test"
import { noUnusedExports } from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.check.code.ts"
import {
  AT,
  HELD_TEXT,
  importedBy,
  READER,
  readerText,
  reading,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.test-fixtures.ts"
import {
  judgingBy,
  landing,
  shadowed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(noUnusedExports)

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
