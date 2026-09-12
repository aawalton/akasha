import { expect, test } from "bun:test"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { conditions } from "akasha/commands/arguments/pages/conditions.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  answering,
  INPUT,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  changing,
  type Taken,
  temperInventoryRuleUpdate,
} from "akasha/commands/pages/temper/inventory/rule/update/temper-inventory-rule-update.command.code.ts"
import { temperInventoryRuleUpdate as page } from "akasha/commands/pages/temper/inventory/rule/update/temper-inventory-rule-update.command.ts"
import {
  type Writing,
  wroteSaid,
} from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  HELD,
  LOCKED_ID as SHUT,
  WROTE,
  writingThat,
} from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const CALLED_AS = "akasha temper inventory rule update"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const updateRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleUpdate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

function changingWith(held: Partial<Taken>, writing: Writing, done: string[]): Promise<Answer> {
  return changing({ categoryRuleId: HELD, force: false, ...held }, CALLED_AS, writing, done)
}

test("the page declares the id as a word and every field it changes at a flag", () => {
  expect(page.arguments.length).toBe(12)
  const said = page.arguments[10]
  expect(said?.argument).toContain(categoryRuleId.slug)
  expect(said?.required).toBe(true)
  expect(said?.saidAs).toBe("word")
})

test("a call naming a field to change but no id is refused for the id", async () => {
  const said = await updateRefusals([title.said, "a new title"])
  expect(said.join("\n")).toContain(`<${categoryRuleId.placeholder}>`)
})

test("a call naming no field to change is refused, naming the fields it does change", async () => {
  const said = await updateRefusals([HELD])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("names no field to change")
  expect(said[0]).toContain(title.said)
  expect(said[0]).toContain(action.said)
})

test("an action the rules carry no such name for is refused before anything is read", async () => {
  const said = await updateRefusals([HELD, action.said, "polish-it"])
  expect(said.join("\n")).toContain("polish-it")
})

test("conditions that are not JSON are refused before anything is read", async () => {
  const said = await updateRefusals([HELD, conditions.said, "{not json"])
  expect(said.length).toBeGreaterThan(0)
})

test("a rule changed is named on the caller's list as soon as the write has gone", async () => {
  const done: string[] = []
  await changingWith({ title: "a new title" }, WROTE, done)
  expect(done).toEqual([wroteSaid("category", HELD, "changed")])
})

test("an id the settings carry no rule for writes nothing and names nothing", async () => {
  const done: string[] = []
  const said = await changingWith(
    { categoryRuleId: "no-rule-carries-this", title: "a new title" },
    WROTE,
    done
  )
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("no-rule-carries-this")
})

test("a locked rule the call says nothing to force is refused and written nothing", async () => {
  const done: string[] = []
  const said = await changingWith({ categoryRuleId: SHUT, title: "a new title" }, WROTE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("is locked")
})

test("a locked rule the call says to force is changed and that change named", async () => {
  const done: string[] = []
  await changingWith({ categoryRuleId: SHUT, force: true, title: "a new title" }, WROTE, done)
  expect(done).toEqual([wroteSaid("category", SHUT, "changed")])
})

test("a change that wrote and then threw names that write in its refusal", async () => {
  const said = await answered(async (done) => {
    await changingWith({ title: "a new title" }, WROTE, done)
    throw new Error("the answer would not be composed")
  })
  expect(said.refusals.join("\n")).toContain("would not be composed")
  expect(said.refusals.join("\n")).toContain(wroteSaid("category", HELD, "changed"))
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) => changingWith({ title: "a new title" }, refusing, done))
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})
