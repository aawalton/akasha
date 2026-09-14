import { afterAll, expect, test } from "bun:test"
import { commandTakesItsArgumentsThroughOneReader } from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.check.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/checks/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowAt } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

const AT = "commands/pages/humming/leaf/humming-leaf.command.code.ts"

const NOTES_AT = "commands/pages/humming/leaf/notes.md"

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
