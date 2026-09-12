import { expect, test } from "bun:test"
import { readIn } from "akasha/commands/pages/temper/inventory/configuration/temper-inventory-configuration.command.code.ts"

const TAKES = "it takes `--inventory-path`, `--section` and `--json`"

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
  expect(refusedBy(["--section"])).toEqual(["`--section` takes a value, and none followed it"])
})

test("a section the configuration does not hold is refused", () => {
  expect(refusedBy(["--section", "bogus"])).toEqual([
    "`--section` takes `rules`, `consumables`, `priority`, `all`, and `bogus` is none of them",
  ])
})

test("`--json` said twice is taken rather than refused", () => {
  expect(readIn(["--json", "--json"])).toEqual({
    inventoryPath: null,
    section: "all",
    json: true,
  })
})

test("a flag where a path belongs is swallowed as that path", () => {
  expect(readIn(["--inventory-path", "--json"])).toEqual({
    inventoryPath: "--json",
    section: "all",
    json: false,
  })
})
