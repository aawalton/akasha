import { expect, test } from "bun:test"
import {
  equationsById,
  tableIn,
} from "akasha/command/pages/temper/catalog/import-skill-equations/temper-catalog-import-skill-equations.command.code.ts"

const EMBERS = [
  "Burning Embers 1",
  "20660",
  "Werewolf",
  "Dragonknight",
  "Ardent Flame",
  "",
  "2",
  "You heal for <<1>> Health and <<2>> Health each tick.",
  "<<1>> = 0.206642 Health - 1.14018 (Health, Heal)\n<<2>> = 10 seconds (Constant)",
]

test("a row's equations are kept by its ability id, one per line", () => {
  expect(equationsById([EMBERS]).get(20660)).toEqual([
    "<<1>> = 0.206642 Health - 1.14018 (Health, Heal)",
    "<<2>> = 10 seconds (Constant)",
  ])
})

test("a row with no equations or no id keeps nothing", () => {
  expect(equationsById([["x", "", "", "", "", "", "0", "", ""]]).size).toBe(0)
})

test("the table reads whether the browser saved it once or twice encoded", () => {
  const table = { version: "51", rows: [EMBERS] }
  expect(tableIn(JSON.stringify(table))).toEqual(table)
  expect(tableIn(JSON.stringify(JSON.stringify(table)))).toEqual(table)
})
