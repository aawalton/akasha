import { expect, test } from "bun:test"
import { scope } from "akasha/commands/arguments/pages/scope.argument.ts"
import { toggle } from "akasha/commands/arguments/pages/toggle.argument.ts"
import { value } from "akasha/commands/arguments/pages/value.argument.ts"
import {
  INPUT,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  type Asking,
  changing,
  type Toggling,
  temperInventoryAutomationSet,
} from "akasha/commands/pages/temper/inventory/automation/set/temper-inventory-automation-set.command.code.ts"
import { temperInventoryAutomationSet as page } from "akasha/commands/pages/temper/inventory/automation/set/temper-inventory-automation-set.command.ts"
import type { AutomationSettings } from "akasha/temper/inventory-automation/modules/automation-toggles/automation-toggles.module.code.ts"

const CALLED_AS = "akasha temper inventory automation set"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const CHARACTER = "@a-player__a-character"

const NOTHING_SET: AutomationSettings = { characters: {}, companions: {} }

const FOOD_SET: AutomationSettings = {
  characters: { [CHARACTER]: { food: true } },
  companions: {},
}

const ASKED: Asking = { scope: "global", toggle: "food", value: "true" }

const UNREADABLE: Toggling = {
  read: () => Promise.reject(new Error("the settings would not be read")),
  write: () => Promise.reject(new Error("the settings would not be written")),
}

function togglingOver(
  settings: AutomationSettings,
  write: (next: AutomationSettings) => Promise<unknown>
): Toggling {
  return { read: () => Promise.resolve(settings), write }
}

async function writtenBy(
  asking: Asking,
  settings: AutomationSettings
): Promise<AutomationSettings> {
  const written: AutomationSettings[] = []
  const said = await changing(
    asking,
    togglingOver(settings, (next) => {
      written.push(next)
      return Promise.resolve()
    })
  )
  expect(said.refusals).toEqual([])
  const first = written[0]
  if (first === undefined) throw new Error("the write the call should have made never came")
  return first
}

const setRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryAutomationSet(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("the page takes the scope, the toggle and the value, and leaves the target open", () => {
  expect(page.arguments.length).toBe(4)
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[2]?.required).toBe(true)
  expect("required" in page.arguments[3]).toBe(false)
})

test("a call saying none of the three is refused for all three", async () => {
  const said = await setRefusals([])
  expect(said.join("\n")).toContain(scope.said)
  expect(said.join("\n")).toContain(toggle.said)
  expect(said.join("\n")).toContain(value.said)
})

test("a scope that is no scope is refused before the settings are read at all", async () => {
  const said = await changing({ ...ASKED, scope: "a-scope-no-call-carries" }, UNREADABLE)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("a-scope-no-call-carries")
  expect(said.refusals.join("\n")).not.toContain("went unread")
})

test("a value that is neither true nor false nor null is refused before the read", async () => {
  const said = await changing({ ...ASKED, value: "perhaps" }, UNREADABLE)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("perhaps")
  expect(said.refusals.join("\n")).not.toContain("went unread")
})

test("a global toggle both interfaces carry needs a target, and says so before the read", async () => {
  const said = await changing({ ...ASKED, toggle: "equipment" }, UNREADABLE)
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("ambiguous")
  expect(said.refusals.join("\n")).not.toContain("went unread")
})

test("settings that cannot be read refuse the call as the run rather than the caller", async () => {
  const said = await changing(ASKED, UNREADABLE)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals.join("\n")).toContain("went unread")
})

test("a toggle set reaches the write, and the answer names what was set", async () => {
  const next = await writtenBy(ASKED, NOTHING_SET)
  expect(next.global?.characters?.food).toBe(true)
  const said = await changing(
    ASKED,
    togglingOver(NOTHING_SET, () => Promise.resolve())
  )
  expect(said.report.join("\n")).toContain("food")
  expect(said.report.join("\n")).toContain("global.characters")
})

test("a null value takes the entry away rather than writing it false", async () => {
  const asking: Asking = { scope: `character:${CHARACTER}`, toggle: "food", value: "null" }
  const next = await writtenBy(asking, FOOD_SET)
  expect("food" in (next.characters[CHARACTER] ?? {})).toBe(false)
})

test("a write the settings refuse says so, and claims nothing about what changed", async () => {
  const refusing = togglingOver(NOTHING_SET, () =>
    Promise.reject(new Error("the settings would not take it"))
  )
  const said: Answer = await changing(ASKED, refusing)
  expect(said.code).toBe(OPERATIONAL)
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("no toggle changed")
})
