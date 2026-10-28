import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  storyTurnRewind,
  type Unwinding,
} from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import {
  AT,
  BUILDER,
  HER,
  HER_AT,
  MASTER,
  OUTCOMES_AT,
  PROSE_AT,
  reachOver,
  type Seen,
  SLUG,
  scoredLine,
  scoredOver,
  seen,
  turnAt,
  UNIT,
  unplayingOver,
  WRITER,
} from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.test-fixtures.ts"
import { taking } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { noticeOf } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const CALLED = "akasha story turn rewind"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-rewind-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: "an-agent" }

const LANDED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

writeFileSync(join(ROOT, "action.txt"), "Mara opens the gate\n\n")
writeFileSync(join(ROOT, "empty.txt"), "\n\n")

async function rewoundBy(argv: readonly string[], reach: Unwinding, into: Seen) {
  return await storyTurnRewind(
    ["--turn", `story-turn-played/${SLUG}`, ...argv],
    GIVEN,
    async (_root, asking) => {
      into.asked.push(...asking)
      return LANDED
    },
    reach
  )
}

test("a rewind clears what the turn made, its end time too, keeps its action and takes its files in one landing", async () => {
  const into = seen()
  const answer = await rewoundBy([], reachOver(turnAt({ action: "I open the gate" }), into), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toHaveLength(1)
  expect(into.folded[0]?.path).toBe(AT)
  expect(into.folded[0]?.merge).toBeUndefined()
  expect(into.folded[0]?.values).toEqual({
    partOfCollections: ["story-played/the-saga"],
    position: 3,
    unit: UNIT,
    stepStatus: `${stepStatus.slug}/world-builder`,
    action: "I open the gate",
  })
  expect(into.asked).toEqual([taking(PROSE_AT), taking(OUTCOMES_AT)])
})

test("a rewind clears which recorders ran and discards the edits they kept beside the turn", async () => {
  const into = seen()
  const turn = turnAt({
    action: "I open the gate",
    stepStatus: `${stepStatus.slug}/recorders`,
    recordedBy: ["story-recorder/cast"],
  })
  const answer = await rewoundBy([], reachOver(turn, into), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["recordedBy"]).toBeUndefined()
  expect(into.releases).toEqual([AT])
  expect(answer.report).toContain("discarded\tthe recorders' kept edits")
})

test("a rewind at a step where a job may be in flight stops the game's reviewer and recorder seats", async () => {
  for (const step of ["mechanics", "reviewers", "recorders"]) {
    const into = seen()
    const turn = turnAt({ action: "I open the gate", stepStatus: `${stepStatus.slug}/${step}` })
    await rewoundBy([], reachOver(turn, into), into)
    expect(into.stops).toEqual([
      "mari-reviewer-the-saga-flex-1",
      "mari-story-recorder-the-saga-flex-1",
    ])
  }
})

test("a rewind at any other step leaves those seats on call and tells its game master, world builder and writer", async () => {
  const into = seen()
  await rewoundBy([], reachOver(turnAt({ action: "I open the gate" }), into), into)
  expect(into.stops).toEqual([])
  const said = noticeOf(AT, "world-builder")
  expect(into.notices).toEqual([`${MASTER}: ${said}`, `${BUILDER}: ${said}`, `${WRITER}: ${said}`])
})

test("each seat told is named, by path, the lore pages it read that have changed since", async () => {
  const into = seen()
  const hall = "world/lore/the-hall.lore.ts"
  const reach: Unwinding = {
    ...reachOver(turnAt({ action: "I open the gate" }), into),
    changedLore: (_root, seat) => (seat === WRITER ? [hall] : []),
  }
  await rewoundBy([], reach, into)
  const said = noticeOf(AT, "world-builder")
  expect(into.notices).toEqual([
    `${MASTER}: ${said}`,
    `${BUILDER}: ${said}`,
    `${WRITER}: ${said}\n\nThese lore pages have changed since you last read them:\n- \`${hall}\``,
  ])
})

test("a turn already rewound lands nothing and is told again", async () => {
  const into = seen()
  const bare = {
    partOfCollections: ["story-played/the-saga"],
    position: 3,
    unit: UNIT,
    stepStatus: `${stepStatus.slug}/world-builder`,
    action: "I open the gate",
  }
  const reach = { ...reachOver(turnAt(), into), present: () => false }
  const answer = await rewoundBy(
    [],
    { ...reach, turnAt: () => ({ at: AT, slug: SLUG, value: bare }) },
    into
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded).toEqual([])
  expect(into.asked).toEqual([])
  expect(into.notices).toHaveLength(3)
})

test("an action file sets the action, trimmed of its trailing lines", async () => {
  const into = seen()
  const answer = await rewoundBy(
    ["--action-file", join(ROOT, "action.txt")],
    reachOver(turnAt({ action: "I open the gate" }), into),
    into
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["action"]).toBe("Mara opens the gate")
})

test("an action file rewinds a turn that states no action", async () => {
  const into = seen()
  const answer = await rewoundBy(
    ["--action-file", join(ROOT, "action.txt")],
    reachOver(turnAt(), into),
    into
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["action"]).toBe("Mara opens the gate")
})

test("a turn stating no action, rewound with no action file, lands nothing", async () => {
  const into = seen()
  const answer = await rewoundBy([], reachOver(turnAt(), into), into)
  expect(answer.refusals.join(" ")).toContain("states no action")
  expect(into.folded).toEqual([])
  expect(into.stops).toEqual([])
  expect(into.notices).toEqual([])
})

test("an empty action file lands nothing", async () => {
  const into = seen()
  const answer = await rewoundBy(
    ["--action-file", join(ROOT, "empty.txt")],
    reachOver(turnAt({ action: "I open the gate" }), into),
    into
  )
  expect(answer.refusals.join(" ")).toContain("holds no action")
  expect(into.folded).toEqual([])
})

test("a turn that is not the latest of its story lands nothing", async () => {
  const into = seen()
  const answer = await rewoundBy(
    [],
    reachOver(turnAt({ action: "I open the gate" }), into, "the-saga-00-004"),
    into
  )
  expect(answer.refusals.join(" ")).toContain("is not the latest turn")
  expect(into.folded).toEqual([])
  expect(into.stops).toEqual([])
  expect(into.notices).toEqual([])
})

test("a rewind of a scored turn takes back what its landed outcomes added, a line replaced taking back nothing", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate" })
  const reach = scoredOver(turn, into, [scoredLine(5), scoredLine(2)])
  const answer = await rewoundBy([], reach, into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toHaveLength(2)
  expect(into.folded[1]).toEqual({
    pageTypeSlug: "world-relationship",
    slug: "the-saga-her",
    path: HER_AT,
    values: { relationshipPoints: 10 },
    merge: true,
  })
  expect(into.asked).toEqual([taking(PROSE_AT), taking(OUTCOMES_AT)])
  expect(answer.report).toContain(`taken back\t${HER}\trelationshipPoints`)
})

test("a rewind of a turn with no outcomes takes nothing back", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate" })
  const reach = { ...scoredOver(turn, into, [scoredLine(3)]), present: () => false }
  const answer = await rewoundBy([], reach, into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toHaveLength(1)
  expect(answer.report.join("\n")).not.toContain("taken back")
})

test("outcomes only drafted beside the turn are discarded and take nothing back", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate", stepStatus: `${stepStatus.slug}/recorders` })
  const reach = {
    ...scoredOver(turn, into, [scoredLine(3)]),
    present: (_root: string, path: string) => path === PROSE_AT,
  }
  const answer = await rewoundBy([], reach, into)
  expect(answer.refusals).toEqual([])
  expect(into.folded).toHaveLength(1)
  expect(into.releases).toEqual([AT])
  expect(answer.report).toContain("discarded\tthe recorders' kept edits")
})

test("outcomes naming a check that is not here land nothing", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate" })
  const line = JSON.stringify({ check: "world-check/gone", reading: {}, answered: { change: 3 } })
  const answer = await rewoundBy([], scoredOver(turn, into, [line]), into)
  expect(answer.refusals.join(" ")).toContain("names no check here")
  expect(into.folded).toEqual([])
  expect(into.asked).toEqual([])
})

const BEATS_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.beats.jsonl`

const PURSE = "metric-character-currency/mara"

const PURSE_AT = "stories/the-saga/purses/mara.metric-character-currency.ts"

const PAID = { page: PURSE, note: "paid the gatekeeper", key: "value", from: 9, to: 4 }

const BEATS_TEXT = `${JSON.stringify({ beat: 1, event: "Mara pays.", changes: [PAID] })}\n`

function beatenOver(turn: Turn, into: Seen, purse: number): Unwinding {
  return {
    ...reachOver(turn, into),
    textIn: (_root, path) => (path === BEATS_AT ? BEATS_TEXT : ""),
    besideOnDisk: () => [BEATS_AT],
    unplayingOf: () => unplayingOver({ [PURSE]: { at: PURSE_AT, value: { value: purse } } }),
  }
}

test("a rewind takes back the numbers the turn's beats wrote, and leaves every other page as it was", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate", beats: "jsonl" })
  const answer = await rewoundBy([], beatenOver(turn, into, 4), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded.map((one) => one.path)).toEqual([AT, PURSE_AT])
  expect(into.folded[1]?.values).toEqual({ value: 9 })
  expect(into.asked).toEqual([taking(PROSE_AT), taking(OUTCOMES_AT), taking(BEATS_AT)])
})

test("a number changed since the turn left it refuses the rewind, and nothing lands", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate", beats: "jsonl" })
  const answer = await rewoundBy([], beatenOver(turn, into, 6), into)
  expect(answer.refusals.join(" ")).toContain("`value` of `metric-character-currency/mara` is 6")
  expect(into.asked).toEqual([])
  expect(into.notices).toEqual([])
})
