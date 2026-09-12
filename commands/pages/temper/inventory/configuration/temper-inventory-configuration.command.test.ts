import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { section } from "akasha/commands/arguments/pages/section.argument.ts"
import { sectionIn } from "akasha/commands/pages/temper/inventory/configuration/temper-inventory-configuration.command.code.ts"
import { temperInventoryConfiguration as page } from "akasha/commands/pages/temper/inventory/configuration/temper-inventory-configuration.command.ts"

const CALLED = "akasha temper inventory configuration"

const TAKES = "it takes `--json`, `--inventory-path`, `--section`"

function refusedBy(argv: readonly string[]): readonly string[] {
  const said = takenFor(argv, CALLED, page, [json, inventoryPath, section])
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
  expect(refusedBy(["--section"])).toEqual(["`--section` takes a value, and none follows it"])
})

test("`--json` said twice is refused where the page says it does not repeat", () => {
  expect(refusedBy(["--json", "--json"])).toEqual([
    "`--json` is said twice, and one call says it once",
  ])
})

test("a flag where a path belongs is refused rather than swallowed as that path", () => {
  expect(refusedBy(["--inventory-path", "--json"])).toEqual([
    "`--inventory-path` takes a value, and none follows it",
  ])
})

test("naming no section reads as every section", () => {
  const said = takenFor([], CALLED, page, [json, inventoryPath, section])
  expect("refused" in said ? null : said.taken.section).toBe("all")
})

test("a section the configuration does not hold is refused", () => {
  const said = sectionIn("bogus")
  expect(typeof said === "string" ? [] : said.refused).toEqual([
    "`--section` takes `rules`, `consumables`, `priority`, `all`, and `bogus` is none of them",
  ])
})

test("a section the configuration holds is read as that section", () => {
  expect(sectionIn("rules")).toBe("rules")
})
