import { expect, test } from "bun:test"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { category } from "akasha/commands/arguments/pages/category.argument.ts"
import { conditions } from "akasha/commands/arguments/pages/conditions.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  making,
  type Taken,
  temperInventoryRuleCreate,
} from "akasha/commands/pages/temper/inventory/rule/create/temper-inventory-rule-create.command.code.ts"
import { temperInventoryRuleCreate as page } from "akasha/commands/pages/temper/inventory/rule/create/temper-inventory-rule-create.command.ts"
import {
  UNREADABLE,
  WROTE,
  writingThat,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const CALLED_AS = "akasha temper inventory rule create"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ASKED: Taken = { action: "nothing", category: "all" }

const createRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleCreate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

test("the page needs the action and the category and leaves the rest to the call", () => {
  expect(page.arguments.length).toBe(9)
  expect(page.arguments[4]?.required).toBe(true)
  expect(page.arguments[7]?.required).toBe(true)
})

test("a call saying neither the action nor the category is refused for both", async () => {
  const said = await createRefusals([])
  expect(said.join("\n")).toContain(action.said)
  expect(said.join("\n")).toContain(category.said)
})

test("a call saying only the action is refused for the category alone", async () => {
  const said = await createRefusals([action.said, "nothing"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(category.said)
})

test("a rule added is named on the caller's list as soon as the write has gone", async () => {
  const done: string[] = []
  const said = await making(ASKED, WROTE, done)
  expect(said.refusals).toEqual([])
  expect(done.length).toBe(1)
  expect(done[0]).toContain("category rule")
  expect(done[0]).toContain("added")
})

test("an action the rules carry no such name for is refused and nothing is written", async () => {
  const done: string[] = []
  const said = await answered((held) =>
    making({ ...ASKED, action: "polish-it" }, WROTE, held).finally(() => done.push(...held))
  )
  expect(said.refusals.join("\n")).toContain("polish-it")
  expect(done).toEqual([])
})

test("conditions that are not JSON are refused and nothing is written", async () => {
  const done: string[] = []
  const said = await answered((held) =>
    making({ ...ASKED, conditions: "{not json" }, WROTE, held).finally(() => done.push(...held))
  )
  expect(said.refusals.length).toBeGreaterThan(0)
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
  expect(done).toEqual([])
  expect(conditions.said).toBe("--conditions")
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) => making(ASKED, refusing, done))
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})

test("a misspelled action is refused by a store that cannot be read, which never is", async () => {
  const said = await answered((done) => making({ ...ASKED, action: "polish-it" }, UNREADABLE, done))
  expect(said.refusals.join("\n")).toContain("polish-it")
  expect(said.refusals.join("\n")).not.toContain("would not be read")
})

test("a category no tree carries is refused ahead of the store, which never is read", async () => {
  const said = await answered((done) =>
    making({ ...ASKED, category: "a-category-no-tree-carries" }, UNREADABLE, done)
  )
  expect(said.refusals.join("\n")).toContain("a-category-no-tree-carries")
  expect(said.refusals.join("\n")).not.toContain("would not be read")
})

test("a call spelt right reaches the store, and says so when the store cannot be read", async () => {
  const said = await answered((done) => making(ASKED, UNREADABLE, done))
  expect(said.refusals.join("\n")).toContain("would not be read")
})
