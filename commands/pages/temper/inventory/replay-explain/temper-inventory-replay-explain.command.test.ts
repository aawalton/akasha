import { expect, test } from "bun:test"
import { readIn } from "akasha/commands/pages/temper/inventory/replay-explain/temper-inventory-replay-explain.command.code.ts"

const TAKES = "it takes `--inventory-path` and `--itemlink`"

function refusedBy(argv: readonly string[]): readonly string[] {
  const said = readIn(argv)
  return "refused" in said ? said.refused : []
}

test("a flag this command does not take is refused", () => {
  expect(refusedBy(["--bogus"])).toEqual([`\`--bogus\` is nothing this takes — ${TAKES}`])
})

test("a bare word is refused as a flag this command does not take", () => {
  expect(refusedBy(["extra"])).toEqual([`\`extra\` is nothing this takes — ${TAKES}`])
})

test("a flag naming a value with nothing after it is refused", () => {
  expect(refusedBy(["--inventory-path"])).toEqual([
    "`--inventory-path` takes a value, and none followed it",
  ])
})

test("`--itemlink` said twice keeps the last one rather than being refused", () => {
  expect(readIn(["--itemlink", "a", "--itemlink", "b"])).toEqual({
    inventoryPath: null,
    itemLink: "b",
  })
})

test("a flag where a value belongs is swallowed as that value", () => {
  expect(readIn(["--itemlink", "--inventory-path"])).toEqual({
    inventoryPath: null,
    itemLink: "--inventory-path",
  })
})
