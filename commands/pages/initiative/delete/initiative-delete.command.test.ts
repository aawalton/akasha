import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  initiativeDelete,
  messageFor,
  namedSaid,
  namingOver,
  noInitiative,
  saidFor,
  takenAwayBy,
} from "akasha/commands/pages/initiative/delete/initiative-delete.command.code.ts"

const SEAT = { path: "agents/seats/pages/hum/hum.seat.ts", propertySlug: "assignment-slug" }

const OWN = { path: "domains/initiatives/pages/held.initiative.ts", propertySlug: "parts" }

function given(root: string): Given {
  return { root, calledAs: "akasha initiative delete", from: root, writer: null, agentId: null }
}

test("a call naming no word is refused, naming the initiative by its placeholder", async () => {
  const said = await initiativeDelete([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`akasha initiative delete` takes `<initiative>`, and nothing said it"
  )
})

test("a call naming two words is refused", async () => {
  const said = await initiativeDelete(["one", "two"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`akasha initiative delete` takes 1 word and this call says 2 words — nothing takes `two`"
  )
})

test("a name that is no initiative is refused in words naming it", () => {
  expect(noInitiative("nowhere")).toBe(
    "`nowhere` names no initiative, so there is no page to take away"
  )
})

test("the commit says which initiative went", () => {
  expect(messageFor("held")).toBe("delete the initiative held")
})

test("a page naming the initiative is said with the key naming it", () => {
  expect(namedSaid(SEAT)).toBe(
    "`agents/seats/pages/hum/hum.seat.ts` still names it as its `assignment-slug`"
  )
})

test("the page being taken away is no page still naming it", () => {
  expect(namingOver([OWN, SEAT], OWN.path)).toEqual([SEAT])
})

test("one page naming it twice under one key is named once", () => {
  expect(namingOver([SEAT, SEAT], OWN.path)).toEqual([SEAT])
})

test("the pages naming it are said in the order of their paths", () => {
  const first = { path: "a.seat.ts", propertySlug: "assignment-slug" }
  const second = { path: "b.seat.ts", propertySlug: "assignment-slug" }

  expect(namingOver([second, first], OWN.path)).toEqual([first, second])
})

test("a run names every page still naming the initiative and how to mend the index", () => {
  expect(saidFor("held", [SEAT], "abc123")).toEqual([
    "held is gone",
    "`agents/seats/pages/hum/hum.seat.ts` still names it as its `assignment-slug`",
    "the index files those names until `akasha index refresh` runs",
    "abc123",
  ])
})

test("a run nothing else names says the initiative went and nothing of the index", () => {
  expect(saidFor("held", [], "abc123")).toEqual(["held is gone", "abc123"])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor("held", [], null)).toEqual(["held is gone"])
})

const RAN_OVER = new Error("the page could not be taken away")

test("a run that landed the page going and then threw says that commit", async () => {
  const said = await takenAwayBy("held", given("/nowhere"), throwingAfter(["abc123"], RAN_OVER))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run throwing with nothing taken away says only why it threw", async () => {
  const said = await takenAwayBy("held", given("/nowhere"), throwingAfter([], RAN_OVER))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the page could not be taken away")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write in the order it was written", async () => {
  const wrote = ["the page at held.initiative.ts is gone", "abc123"]
  const said = await takenAwayBy("held", given("/nowhere"), throwingAfter(wrote, RAN_OVER))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "the page at held.initiative.ts is gone; abc123. Nothing after that ran."
  )
})
