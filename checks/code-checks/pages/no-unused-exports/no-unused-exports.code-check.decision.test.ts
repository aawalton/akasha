import { afterAll, expect, test } from "bun:test"
import {
  namesToldIn,
  refusalsOver,
  takenFrom,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.code.ts"
import {
  AT,
  EVERY_TEXT,
  HELD_TEXT,
  importedBy,
  READER,
  readerText,
  reading,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.test-fixtures.ts"
import { judgingBy, landing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"

afterAll(scratch.sweep)

const judging = judgingBy(refusalsOver)

test("the values a file exports are told apart by name", () => {
  expect(namesToldIn(AT, HELD_TEXT)).toEqual(["held", "spare"])
})

test("a file exporting every name of another file is judged by nothing", () => {
  expect(namesToldIn(AT, 'export * from "akasha/one.module.code.ts"\n')).toBeNull()
})

test("the names an importer takes from one file are read off its import", () => {
  expect(takenFrom(READER, readerText("held"), AT)).toEqual(["held"])
})

test("an import of another file names nothing taken from this one", () => {
  expect(takenFrom(READER, 'import { held } from "akasha/elsewhere.module.code.ts"\n', AT)).toEqual(
    []
  )
})

test("a value no other file names is refused and one another file names is not", () => {
  const root = rooted()
  reading(root, readerText("held"))
  importedBy(root, [READER])

  const said = judging(landing(root, { [AT]: bytesOf(HELD_TEXT) })).map((one) => one.reason)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`spare`")
})

test("a file no file imports has every value it exports refused", () => {
  const root = rooted()

  expect(judging(landing(root, { [AT]: bytesOf(HELD_TEXT) }))).toHaveLength(2)
})

test("an import taking every name a file exports leaves that file unrefused", () => {
  const root = rooted()
  reading(root, EVERY_TEXT)
  importedBy(root, [READER])

  expect(judging(landing(root, { [AT]: bytesOf(HELD_TEXT) }))).toEqual([])
})

test("a file the change takes away is passed over", () => {
  expect(judging(landing(rooted(), { [AT]: null }))).toEqual([])
})

test("a file that is no TypeScript body is passed over", () => {
  expect(judging(landing(rooted(), { "akasha/held.md": bytesOf(HELD_TEXT) }))).toEqual([])
})
