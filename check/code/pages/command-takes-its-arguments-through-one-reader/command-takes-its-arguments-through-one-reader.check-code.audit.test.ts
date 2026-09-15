import { afterAll, expect, test } from "bun:test"
import { commandTakesItsArgumentsThroughOneReader } from "akasha/check/code/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.check-code.audit.code.ts"
import { treed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"

const AT = "command/pages/humming/leaf/humming-leaf.command.code.ts"

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
