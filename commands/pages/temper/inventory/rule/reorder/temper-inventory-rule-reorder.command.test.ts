import { expect, test } from "bun:test"
import { after } from "akasha/commands/arguments/pages/after.argument.ts"
import { before } from "akasha/commands/arguments/pages/before.argument.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { toPosition } from "akasha/commands/arguments/pages/to-position.argument.ts"
import {
  answering,
  DATA,
  INPUT,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  moving,
  type Taken,
  temperInventoryRuleReorder,
} from "akasha/commands/pages/temper/inventory/rule/reorder/temper-inventory-rule-reorder.command.code.ts"
import { temperInventoryRuleReorder as page } from "akasha/commands/pages/temper/inventory/rule/reorder/temper-inventory-rule-reorder.command.ts"
import { wroteSaid } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  HELD,
  LOCKED_ID,
  UNREADABLE,
  WROTE,
  writingThat,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const CALLED_AS = "akasha temper inventory rule reorder"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const LAST = 1

const MOVED_LAST: Taken = { categoryRuleId: HELD, force: false, toPosition: LAST }

const MOVED_SAID = wroteSaid("category", HELD, `moved to ${LAST}`)

const reorderRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleReorder(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

test("the page takes the id as a word and one of three ways to place the rule", () => {
  expect(page.arguments.length).toBe(5)
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[1]?.saidAs).toBe("word")
  expect(page.arguments[2]?.oneOf).toEqual(["argument/before", "argument/after"])
  expect(page.arguments[2]?.notWith).toEqual(["argument/before", "argument/after"])
})

test("a call naming no way of placing the rule is refused for all three", async () => {
  const said = await reorderRefusals([HELD])
  expect(said.join("\n")).toContain(toPosition.said)
  expect(said.join("\n")).toContain(before.said)
  expect(said.join("\n")).toContain(after.said)
})

test("a call naming two ways of placing the rule is refused for saying both", async () => {
  const said = await reorderRefusals([HELD, toPosition.said, "1", before.said, LOCKED_ID])
  expect(said.join("\n")).toContain(toPosition.said)
  expect(said.join("\n")).toContain(before.said)
})

test("a call naming no rule at all is refused for the id it never said", async () => {
  const said = await reorderRefusals([toPosition.said, "1"])
  expect(said.join("\n")).toContain(`<${categoryRuleId.placeholder}>`)
})

test("an id the settings carry no rule for moves nothing and names nothing", async () => {
  const done: string[] = []
  const said = await moving(
    { categoryRuleId: "no-rule-carries-this", force: false, toPosition: 0 },
    WROTE,
    done
  )
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("no-rule-carries-this")
})

test("a locked rule is refused unless the call forces it, and moves nothing meanwhile", async () => {
  const done: string[] = []
  const said = await moving({ categoryRuleId: LOCKED_ID, force: false, toPosition: 0 }, WROTE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("is locked")
})

test("a position past the end of the written rules is refused, naming both numbers", async () => {
  const done: string[] = []
  const said = await moving({ categoryRuleId: HELD, force: false, toPosition: 99 }, WROTE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("99")
  expect(said.refusals.join("\n")).toContain("2")
})

test("a rule anchored to itself is refused, since a rule anchors to another", async () => {
  const done: string[] = []
  const said = await moving({ categoryRuleId: HELD, force: false, before: HELD }, WROTE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("names the rule being moved")
})

test("an anchor no written rule carries is answered as the data rather than the call", async () => {
  const done: string[] = []
  const said = await moving(
    { categoryRuleId: HELD, force: false, after: "no-rule-carries-this-either" },
    WROTE,
    done
  )
  expect(done).toEqual([])
  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain("no-rule-carries-this-either")
})

test("a rule moved is named on the caller's list, and the move reaches the store", async () => {
  const done: string[] = []
  const written: InventoryRuleSettings[] = []
  const keeping = writingThat((settings) => {
    written.push(settings)
    return Promise.resolve()
  })
  const said = await moving(MOVED_LAST, keeping, done)
  expect(said.refusals).toEqual([])
  expect(written[0]?.rules[LAST]?.id).toBe(HELD)
  expect(done).toEqual([MOVED_SAID])
})

test("a move that wrote and then threw names that move in its refusal", async () => {
  const said = await answered(async (done) => {
    await moving(MOVED_LAST, WROTE, done)
    throw new Error("the answer would not be composed")
  })
  expect(said.refusals.join("\n")).toContain("stopped part way")
  expect(said.refusals.join("\n")).toContain(MOVED_SAID)
})

test("a store that cannot be read moves nothing and names nothing as moved", async () => {
  const done: string[] = []
  const said = await answered((held) =>
    moving(MOVED_LAST, UNREADABLE, held).finally(() => done.push(...held))
  )
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("would not be read")
})
