import { expect, test } from "bun:test"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import { subagent } from "akasha/agent/subagent/subagent.page-type.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import { changePagePagePropertyRelation } from "akasha/change/mechanical/file-content/change/change-page-page-property-relation/change-page-page-property-relation.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/command/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  askingFor,
  defaultAssignmentOf,
  initiativeDelete,
  messageFor,
  namedSaid,
  namingOver,
  noInitiative,
  reassignedSaid,
  reassigning,
  saidFor,
  takenAwayBy,
} from "akasha/command/pages/initiative/delete/initiative-delete.command.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { persona } from "akasha/persona/persona.page-type.ts"

const SEAT = { path: "agent/seat/pages/hum/hum.seat.ts", propertySlug: "assignment-slug" }

const OWN = { path: "domain/initiative/pages/held.initiative.ts", propertySlug: "parts" }

const SEAT_TYPE = `${pageType.slug}/${seat.slug}`

const PERSONA_TYPE = `${pageType.slug}/${persona.slug}`

const REASSIGNS =
  `${changeMechanicalFileContent.slug}/${changePagePagePropertyRelation.slug}` as const

const REMOVES = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const HUM_SEAT = { type: SEAT_TYPE, slug: "hum", persona: "persona/hum" }

const HUM = { type: PERSONA_TYPE, slug: "hum", championedDomain: "domain/drums" }

const MOVED = { path: SEAT.path, to: "domain/drums" }

function personaNamed(slug: string): Record<string, unknown> | null {
  return slug === "hum" ? HUM : null
}

test("a seat's default assignment is the domain its persona champions", () => {
  expect(defaultAssignmentOf(HUM_SEAT, personaNamed)).toBe("domain/drums")
})

test("a seat whose persona champions no domain has no default assignment", () => {
  const plain = { type: PERSONA_TYPE, slug: "hum" }
  expect(defaultAssignmentOf(HUM_SEAT, () => plain)).toBeNull()
})

test("a seat whose persona is no page has no default assignment", () => {
  expect(defaultAssignmentOf({ ...HUM_SEAT, persona: "persona/gone" }, personaNamed)).toBeNull()
})

test("a page that is no seat has no default assignment", () => {
  const run = { type: `${pageType.slug}/${subagent.slug}`, slug: "hum-a1", persona: "persona/hum" }
  expect(defaultAssignmentOf(run, personaNamed)).toBeNull()
  expect(defaultAssignmentOf(null, personaNamed)).toBeNull()
})

test("a seat assigned the initiative is reassigned its default", () => {
  expect(reassigning([SEAT], () => "domain/drums")).toEqual({ reassigned: [MOVED], left: [] })
})

test("a seat with no default is left naming the initiative", () => {
  expect(reassigning([SEAT], () => null)).toEqual({ reassigned: [], left: [SEAT] })
})

test("a page naming the initiative under another key is left naming it", () => {
  const parent = { path: "domain/initiative/pages/child.initiative.ts", propertySlug: "parent" }
  expect(reassigning([parent], () => "domain/drums")).toEqual({ reassigned: [], left: [parent] })
})

test("each seat is reassigned before the initiative's page goes, in one landing", () => {
  expect(askingFor(OWN.path, [MOVED])).toEqual([
    { at: REASSIGNS, given: { at: SEAT.path, key: "assignmentSlug", to: "domain/drums" } },
    { at: REMOVES, given: { at: OWN.path } },
  ])
})

test("a run reassigning nothing only takes the page away", () => {
  expect(askingFor(OWN.path, [])).toEqual([{ at: REMOVES, given: { at: OWN.path } }])
})

test("a reassigned seat is said with what it answers to now", () => {
  expect(reassignedSaid(MOVED)).toBe(
    "`agent/seat/pages/hum/hum.seat.ts` answers to domain/drums, the domain its persona champions"
  )
})

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
    "`agent/seat/pages/hum/hum.seat.ts` still names it as its `assignment-slug`"
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
  expect(saidFor("held", { reassigned: [], left: [SEAT] }, "abc123")).toEqual([
    "held is gone",
    "`agent/seat/pages/hum/hum.seat.ts` still names it as its `assignment-slug`",
    "the index files those names until `akasha index refresh` runs",
    "abc123",
  ])
})

test("a run names every seat it reassigned and says nothing of the index for them", () => {
  expect(saidFor("held", { reassigned: [MOVED], left: [] }, "abc123")).toEqual([
    "held is gone",
    reassignedSaid(MOVED),
    "abc123",
  ])
})

test("a run nothing else names says the initiative went and nothing of the index", () => {
  expect(saidFor("held", { reassigned: [], left: [] }, "abc123")).toEqual([
    "held is gone",
    "abc123",
  ])
})

test("a run landing no commit says what went alone", () => {
  expect(saidFor("held", { reassigned: [], left: [] }, null)).toEqual(["held is gone"])
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
