import { afterAll, expect, test } from "bun:test"
import { readsBesideAt } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  refusalsAt,
  refusalsKept,
} from "akasha/agent/modules/refusals-keeping/refusals-keeping.module.code.ts"
import {
  CARRIED_AT,
  carriedOff,
  droppedFor,
  droppedOutlived,
  editsSaid,
  gaveBack,
  keptForIn,
  LEFT_BY,
  movedOnto,
  namedAt,
  READ_BY,
  readsSaid,
  refusalsSaid,
  seatEditsAt,
  seatReadsAt,
  seatRefusalsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import {
  AGENT_ID,
  AGENT_ID_TOO,
  bodyAt,
  folderFor,
  keptForOne,
  keptIn,
  OTHER,
  READING,
  READING_TOO,
  ROW,
  readingsKept,
  readingsPut,
  recordedAt,
  SEAT,
  SEAT_ID,
  subagentPaged,
  UNDER,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.test-fixtures.ts"
import {
  appendEdits,
  linesIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { z } from "zod"

const READING_LINE = z.record(z.string(), z.unknown())

afterAll(scratch.sweep)

test("the edits a subagent never landed are appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW, OTHER])

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 2, refusals: false })
  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
})

test("a line appended says which subagent left it and when the seat took it", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)

  const [one] = keptIn(root)
  expect(one?.[LEFT_BY]).toBe("tester-abc")
  const at = one?.[CARRIED_AT] ?? ""
  expect(new Date(at).toISOString()).toBe(at)
})

test("every line one move appends says the same time", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW, OTHER])
  movedOnto(root, SEAT, UNDER)

  const held = keptIn(root)
  expect(held.length).toBe(2)
  expect(held[0]?.[CARRIED_AT]).toBe(held[1]?.[CARRIED_AT] ?? "")
})

test("a line that reads as no object is appended unchanged", () => {
  expect(editsSaid(["not an object"], "tester-abc", "2026-09-13T00:00:00.000Z")).toBe(
    "not an object\n"
  )
})

test("a second subagent's edits follow the first rather than replacing them", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)
  const second = "agent/subagent/pages/tester-def/tester-def.subagent.ts"
  appendEdits(root, second, [OTHER])
  movedOnto(root, SEAT, second)

  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
  expect(keptIn(root).map((one) => one[LEFT_BY])).toEqual(["tester-abc", "tester-def"])
})

test("what was moved is taken from beside the subagent rather than copied", () => {
  const root = scratch.rootFor("subagent-recovering-")
  folderFor(root, UNDER)
  appendEdits(root, UNDER, [ROW])
  refusalsKept(root, UNDER, ["why"])
  movedOnto(root, SEAT, UNDER)

  expect(linesIn(root, UNDER)).toEqual([])
  expect(bodyAt(root, refusalsAt(UNDER))).toBe("")
})

test("a second move over the same subagent moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])
  movedOnto(root, SEAT, UNDER)

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: false })
  expect(keptIn(root).map((one) => one.path)).toEqual(["one.md"])
})

test("a subagent with nothing beside it moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: false })
  expect(bodyAt(root, seatEditsAt(SEAT))).toBe("")
})

test("what the last landing a subagent tried refused is appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  folderFor(root, UNDER)
  refusalsKept(root, UNDER, ["the body moved under the change"])

  expect(movedOnto(root, SEAT, UNDER)).toEqual({ edits: 0, refusals: true })
  expect(bodyAt(root, seatRefusalsAt(SEAT))).toBe(
    refusalsSaid("tester-abc", "the body moved under the change")
  )
})

test("a refusal appended is opened by the slug of the subagent whose refusal it was", () => {
  expect(refusalsSaid("tester-abc", "why")).toBe("tester-abc\n\nwhy\n\n")
})

test("a subagent's slug is read off its page rather than handed in", () => {
  expect(namedAt(UNDER)).toBe("tester-abc")
})

test("the seat keeps each kind beside its own page under the name its property states", () => {
  expect(seatEditsAt(SEAT)).toBe(
    "agent/seat/pages/tester/tester.seat.subagent-edits.uncommitted.jsonl"
  )
  expect(seatRefusalsAt(SEAT)).toBe(
    "agent/seat/pages/tester/tester.seat.subagent-refusals.uncommitted.txt"
  )
})

test("a page taken away that is no subagent moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])

  expect(carriedOff(root, UNDER, { type: "module", slug: "tester-abc" })).toBe(null)
  expect(linesIn(root, UNDER)).toEqual([JSON.stringify(ROW)])
})

test("a subagent page naming no seat moves nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  appendEdits(root, UNDER, [ROW])

  expect(carriedOff(root, UNDER, { type: "subagent", slug: "tester-abc" })).toBe(null)
  expect(linesIn(root, UNDER)).toEqual([JSON.stringify(ROW)])
})

test("a path that is no page keeps nothing", () => {
  expect(seatEditsAt("notes.md")).toBe(null)
  expect(seatRefusalsAt("notes.md")).toBe(null)
  expect(seatReadsAt("notes.md")).toBe(null)
})

test("the readings a subagent made are appended to the seat", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING, READING_TOO])
  movedOnto(root, SEAT, UNDER)

  expect(readingsKept(root).map((one) => one.path)).toEqual(["one.md", "two.md"])
})

test("a reading the seat keeps says the agent id it was made by", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(readingsKept(root)[0]?.[READ_BY]).toBe(AGENT_ID)
})

test("the readings moved are taken from beside the subagent", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(UNDER))).toBe("")
  movedOnto(root, SEAT, UNDER)
  expect(readingsKept(root).length).toBe(1)
})

test("a page stating no agent id moves no reading", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, null)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(UNDER))).toBe(`${READING}\n`)
  expect(bodyAt(root, seatReadsAt(SEAT))).toBe("")
})

test("a reading the seat keeps is beside the seat rather than among the seat's own", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(bodyAt(root, readsBesideAt(SEAT))).toBe("")
  expect(seatReadsAt(SEAT)).toBe(
    "agent/seat/pages/tester/tester.seat.subagent-reads.uncommitted.jsonl"
  )
})

test("a reading that reads as no object is appended unchanged", () => {
  expect(readsSaid(["not an object"], AGENT_ID)).toBe("not an object\n")
})

test("a subagent whose page comes back takes back the readings the seat kept for it", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING, READING_TOO])
  movedOnto(root, SEAT, UNDER)

  expect(gaveBack(root, SEAT, UNDER, AGENT_ID)).toBe(2)
  expect(bodyAt(root, readsBesideAt(UNDER))).toBe(`${READING}\n${READING_TOO}\n`)
  expect(bodyAt(root, seatReadsAt(SEAT))).toBe("")
})

test("a reading going back loses the agent id the seat kept it under", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)
  gaveBack(root, SEAT, UNDER, AGENT_ID)

  const line = READING_LINE.parse(JSON.parse(bodyAt(root, readsBesideAt(UNDER)).trim()))
  expect(Object.hasOwn(line, READ_BY)).toBe(false)
})

test("a page taken up under another agent id takes back no reading", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(gaveBack(root, SEAT, UNDER, AGENT_ID_TOO)).toBe(0)
  expect(readingsKept(root).length).toBe(1)
  expect(bodyAt(root, readsBesideAt(UNDER))).toBe("")
})

test("a reading the seat keeps under another agent id is left where it is", () => {
  const root = scratch.rootFor("subagent-recovering-")
  const second = "agent/subagent/pages/tester-def/tester-def.subagent.ts"
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  subagentPaged(root, second, AGENT_ID_TOO)
  readingsPut(root, second, [READING_TOO])
  movedOnto(root, SEAT, UNDER)
  movedOnto(root, SEAT, second)

  expect(gaveBack(root, SEAT, UNDER, AGENT_ID)).toBe(1)
  expect(readingsKept(root).map((one) => one[READ_BY])).toEqual([AGENT_ID_TOO])
})

test("a reading goes back before what the page already holds", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)
  readingsPut(root, UNDER, [READING_TOO])

  gaveBack(root, SEAT, UNDER, AGENT_ID)
  expect(bodyAt(root, readsBesideAt(UNDER))).toBe(`${READING}\n${READING_TOO}\n`)
})

test("a path that is no page gives nothing back", () => {
  const root = scratch.rootFor("subagent-recovering-")

  expect(gaveBack(root, SEAT, "notes.md", AGENT_ID)).toBe(0)
})

test("a reading the seat keeps goes where its agent id is handed in as gone", () => {
  const root = scratch.rootFor("subagent-recovering-")
  const second = "agent/subagent/pages/tester-def/tester-def.subagent.ts"
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  subagentPaged(root, second, AGENT_ID_TOO)
  readingsPut(root, second, [READING_TOO])
  movedOnto(root, SEAT, UNDER)
  movedOnto(root, SEAT, second)

  expect(droppedFor(root, SEAT, [AGENT_ID])).toBe(1)
  expect(readingsKept(root).map((one) => one[READ_BY])).toEqual([AGENT_ID_TOO])
})

test("the seat's file goes once the last reading it kept has been dropped", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING, READING_TOO])
  movedOnto(root, SEAT, UNDER)

  expect(droppedFor(root, SEAT, [AGENT_ID])).toBe(2)
  expect(bodyAt(root, seatReadsAt(SEAT))).toBe("")
})

test("a drop naming no agent the seat keeps for leaves every reading where it is", () => {
  const root = scratch.rootFor("subagent-recovering-")
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)

  expect(droppedFor(root, SEAT, [])).toBe(0)
  expect(droppedFor(root, SEAT, [""])).toBe(0)
  expect(droppedFor(root, SEAT, [AGENT_ID_TOO])).toBe(0)
  expect(readingsKept(root).length).toBe(1)
})

test("a seat keeping nothing drops nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")

  expect(droppedFor(root, SEAT, [AGENT_ID])).toBe(0)
  expect(droppedFor(root, "notes.md", [AGENT_ID])).toBe(0)
})

test("the agent ids a seat keeps readings for are answered off its own file", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)

  expect(keptForIn(root, SEAT)).toEqual([AGENT_ID])
  expect(keptForIn(root, "notes.md")).toEqual([])
})

test("a reading goes where its agent's last record predates the client handed in", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)
  const tx = recordedAt(root, "abc", 1)

  expect(droppedOutlived(root, SEAT, SEAT_ID, 2000, tx)).toBe(1)
  expect(bodyAt(root, seatReadsAt(SEAT))).toBe("")
})

test("a reading whose agent's record came after that client is left where it is", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)
  const tx = recordedAt(root, "abc", 5)

  expect(droppedOutlived(root, SEAT, SEAT_ID, 2000, tx)).toBe(0)
  expect(keptForIn(root, SEAT)).toEqual([AGENT_ID])
})

test("a reading whose agent has no record at all is left where it is", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)
  const tx = recordedAt(root, "other", 1)

  expect(droppedOutlived(root, SEAT, SEAT_ID, 2000, tx)).toBe(0)
  expect(keptForIn(root, SEAT)).toEqual([AGENT_ID])
})

test("a client start or transcript that is not known drops nothing", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)
  const tx = recordedAt(root, "abc", 1)

  expect(droppedOutlived(root, SEAT, SEAT_ID, null, tx)).toBe(0)
  expect(droppedOutlived(root, SEAT, SEAT_ID, 2000, null)).toBe(0)
  expect(droppedOutlived(root, SEAT, SEAT_ID, 2000, "")).toBe(0)
  expect(keptForIn(root, SEAT)).toEqual([AGENT_ID])
})

test("a reading kept under another seat id is left where it is", () => {
  const root = scratch.rootFor("subagent-recovering-")
  keptForOne(root)
  const tx = recordedAt(root, "abc", 1)

  expect(droppedOutlived(root, SEAT, "01a09573-2604-7000-98dd-000000000000", 2000, tx)).toBe(0)
  expect(keptForIn(root, SEAT)).toEqual([AGENT_ID])
})
