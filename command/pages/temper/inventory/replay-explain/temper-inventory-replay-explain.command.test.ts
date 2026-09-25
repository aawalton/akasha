import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { inventoryPath } from "akasha/command/argument/pages/inventory-path.argument.ts"
import { itemlink } from "akasha/command/argument/pages/itemlink.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperInventoryReplayExplain } from "akasha/command/pages/temper/inventory/replay-explain/temper-inventory-replay-explain.command.code.ts"
import { temperInventoryReplayExplain as page } from "akasha/command/pages/temper/inventory/replay-explain/temper-inventory-replay-explain.command.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const CALLED = "akasha temper inventory replay-explain"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const LINK = "|H1:item:5:1:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

function savedVariablesHolding(inventory: string): string {
  return `TemperInventory_SavedVariables =
{
  ["Default"] =
  {
    ["@one"] =
    {
      ["$AccountWide"] =
      {
        ["diagnostics"] =
        {
          ["lastExplain"] =
          {
            ["schemaVersion"] = 1,
            ["timestamp"] = 42,
            ["itemLink"] = "${LINK}",
            ["itemId"] = 5,
            ["itemName"] = "Rusty Dagger",
            ["itemNameRaw"] = "rusty dagger^n",
            ["inventory"] = ${inventory},
            ["signals"] =
            {
              ["itemType"] = 1,
              ["filterType"] = 1,
              ["traitType"] = 0,
              ["equipType"] = 1,
              ["armorType"] = 0,
              ["weaponType"] = 1,
              ["quality"] = 1,
            },
            ["classification"] =
            {
              ["leafCategoryId"] = "weapons",
              ["ancestorChain"] = { [1] = "weapons" },
              ["categoryPath"] = "weapons",
            },
            ["itemKey"] = { ["kind"] = "consumable", ["detail"] = { ["itemId"] = 5 } },
            ["orderedWalk"] = { ["rulesConsidered"] = 0, ["rulesEvaluated"] = 0, ["rejections"] = { } },
            ["outcome"] = { ["action"] = "no-match", ["destination"] = "nil", ["summary"] = "none" },
            ["notes"] = { },
          },
        },
      },
    },
  },
}
`
}

async function answerFor(inventory: string): Promise<Answer> {
  const path = join(SCRATCH.rootFor("temper-inventory-replay-explain-"), "TemperItems.lua")
  await Bun.write(path, savedVariablesHolding(inventory))
  return await temperInventoryReplayExplain(["--inventory-path", path], GIVEN)
}

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

test("a stored trace carrying the junk state answers the state the game answered", async () => {
  const said = await answerFor(
    '{ ["found"] = true, ["bagId"] = 1, ["slotIndex"] = 3, ["junk"] = true, ["junkable"] = false }'
  )

  expect(said.refusals).toEqual([])
  expect(said.report).toContain("junk\ttrue")
  expect(said.report).toContain("junkable\tfalse")
})

test("a stored trace written before the junk state was carried answers it as not captured", async () => {
  const said = await answerFor('{ ["found"] = true, ["bagId"] = 1, ["slotIndex"] = 3 }')

  expect(said.refusals).toEqual([])
  expect(said.report).toContain("junk\tnot captured")
  expect(said.report).toContain("junkable\tnot captured")
})
