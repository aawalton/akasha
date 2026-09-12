import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { charactersPath } from "akasha/commands/arguments/pages/characters-path.argument.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { temperInventoryCapacityAudit as page } from "akasha/commands/pages/temper/inventory/capacity-audit/temper-inventory-capacity-audit.command.ts"

const CALLED = "akasha temper inventory capacity-audit"

const TAKES = "it takes `--json`, `--inventory-path`, `--characters-path`"

function refusedBy(argv: readonly string[]): readonly string[] {
  const said = takenFor(argv, CALLED, page, [json, inventoryPath, charactersPath])
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

test("`--json` said twice is refused where the page says it does not repeat", () => {
  expect(refusedBy(["--json", "--json"])).toEqual([
    "`--json` is said twice, and one call says it once",
  ])
})

test("a flag where a value belongs is refused rather than swallowed as that value", () => {
  expect(refusedBy(["--inventory-path", "--json"])).toEqual([
    "`--inventory-path` takes a value, and none follows it",
  ])
})

test("a value carried on a flag that takes none is refused", () => {
  expect(refusedBy(["--json=yes"])).toEqual([
    "`--json` carries no value, and `--json=yes` names one",
  ])
})
