import { afterAll, expect, test } from "bun:test"
import { commandTakesItsArgumentsThroughOneReader } from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.audit.code.ts"
import { treed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const AT = "commands/pages/humming/leaf/humming-leaf.command.code.ts"

const READS =
  "export function hummingLeaf(argv: readonly string[]): Answer {\n" +
  '  return answered(argv.includes("--json"))\n}\n'

const HANDS =
  "export function hummingLeaf(argv: readonly string[], given: Given): Answer {\n" +
  "  return answered(takenFor(argv, given.calledAs, page, PAGES))\n}\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(body: string): string {
  const root = scratch.rootFor("akasha-command-one-reader-audit-")
  writing(root, AT, body)
  return treed(root)
}

test("a command reading the words of its call is refused over the whole tree", () => {
  const said = commandTakesItsArgumentsThroughOneReader(rooted(READS))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`argv.includes`")
})

test("a tree whose commands hand those words on is let through", () => {
  expect(commandTakesItsArgumentsThroughOneReader(rooted(HANDS))).toEqual([])
})
