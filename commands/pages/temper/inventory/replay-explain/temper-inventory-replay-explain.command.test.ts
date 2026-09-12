import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { itemlink } from "akasha/commands/arguments/pages/itemlink.argument.ts"
import { temperInventoryReplayExplain as page } from "akasha/commands/pages/temper/inventory/replay-explain/temper-inventory-replay-explain.command.ts"

const CALLED = "akasha temper inventory replay-explain"

const TAKES = "it takes `--inventory-path`, `--itemlink`"

function refusedBy(argv: readonly string[]): readonly string[] {
  const said = takenFor(argv, CALLED, page, [inventoryPath, itemlink])
  return "refused" in said ? said.refused : []
}

test("a flag this command does not take is refused", () => {
  expect(refusedBy(["--bogus"])).toEqual([
    `\`--bogus\` is no argument \`${CALLED}\` takes — ${TAKES}`,
  ])
})

test("a bare word is refused where this command takes no word", () => {
  expect(refusedBy(["extra"])).toEqual([`\`extra\` is no argument \`${CALLED}\` takes — ${TAKES}`])
})

test("a flag naming a value with nothing after it is refused", () => {
  expect(refusedBy(["--inventory-path"])).toEqual([
    "`--inventory-path` takes a value, and none follows it",
  ])
})

test("`--itemlink` said twice is refused where the page says it does not repeat", () => {
  expect(refusedBy(["--itemlink", "a", "--itemlink", "b"])).toEqual([
    "`--itemlink` is said twice, and one call says it once",
  ])
})

test("a flag where a value belongs is refused rather than swallowed as that value", () => {
  expect(refusedBy(["--itemlink", "--inventory-path"])).toEqual([
    "`--itemlink` takes a value, and none follows it",
    "`--inventory-path` takes a value, and none follows it",
  ])
})
