import { afterAll, expect, test } from "bun:test"
import { commandTakesItsArgumentsThroughOneReader } from "akasha/check/code/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AT = "command/pages/humming/leaf/humming-leaf.command.code.ts"

const NOTES_AT = "command/pages/humming/leaf/notes.md"

const READS =
  "export function hummingLeaf(argv: readonly string[]): Answer {\n" +
  '  return answered(argv.includes("--json"))\n}\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function judged(path: string): readonly Judged[] {
  const root = scratch.rootFor("akasha-command-one-reader-check-")
  return commandTakesItsArgumentsThroughOneReader(arriving(root, { [path]: READS }), shadowAt(root))
}

test("a command's code the change carries is judged", () => {
  const said = judged(AT)
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`argv.includes`")
})

test("a path the change carries that is no TypeScript is passed over", () => {
  expect(judged(NOTES_AT)).toEqual([])
})
