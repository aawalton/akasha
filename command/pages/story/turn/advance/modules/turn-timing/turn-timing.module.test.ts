import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import {
  endTaken,
  timeCheckIn,
  untimedRefused,
} from "akasha/command/pages/story/turn/advance/modules/turn-timing/turn-timing.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  AT,
  advancedBy,
  CHAPTER_ARGV,
  CHAPTER_BEATS,
  chapterReach,
  GIVEN,
  LANDED,
  MASTER,
  ROOT,
  reachOver,
  SLUG,
  seatOf,
  seen,
  turnAt,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import type { Reference } from "akasha/page/modules/referencing/page-referencing.module.code.ts"

const HERE = mkdtempSync(join("/var/tmp", "turn-timing-test-"))

writeFileSync(join(HERE, "beats.txt"), "Mara opens the gate\n")

afterAll(() => {
  rmSync(HERE, { recursive: true, force: true })
  rmSync(ROOT, { recursive: true, force: true })
})

const BEATS = ["--beats-file", join(HERE, "beats.txt")]

function timed(): string {
  return "the-saga-time"
}

const STORY = "w/stories/played/saga/saga.story-played.ts"

function imported(path: string): Reference {
  return { propertySlug: "import", fileName: "time-passing.module.code.ts", path, id: null }
}

const OWN = imported(
  "w/stories/played/saga/mechanics/checks/saga-time.world-check.settling.code.ts"
)

const OTHER = imported(
  "w/stories/played/sagas/mechanics/checks/sagas-time.world-check.settling.code.ts"
)

const TEST = imported(
  "w/stories/played/saga/mechanics/checks/saga-time.world-check.settling.test.ts"
)

test("a story settles its time by the check under its folder importing the time-passing rule", () => {
  expect(timeCheckIn(STORY, [OTHER, TEST, OWN])).toBe("saga-time")
})

test("a story with no such check under its folder settles no time", () => {
  expect(timeCheckIn(STORY, [OTHER, TEST])).toBeNull()
})

test("a turn stating no endsAt in a story settling its time is refused with the settle call", () => {
  const why = untimedRefused("saga-time", "saga", "saga-00-002", {}) ?? ""
  expect(why).toContain(
    "`akasha story settle --story saga --check saga-time --turn saga-00-002 --reading '"
  )
  expect(why).toContain("states no `endsAt`")
})

test("a turn stating its endsAt is not refused", () => {
  const value = { endsAt: "2026-09-28T17:05:00.000Z" }
  expect(untimedRefused("saga-time", "saga", "saga-00-002", value)).toBeNull()
})

test("a story settling no time refuses no turn", () => {
  expect(untimedRefused(null, "saga", "saga-00-002", {})).toBeNull()
})

test("a game master's advance of a turn stating no endsAt is refused and lands nothing", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(
    BEATS,
    reach,
    async () => LANDED,
    () => undefined,
    timed
  )
  expect(answer.refusals.join(" ")).toContain("--check the-saga-time")
  expect(into.folded).toEqual([])
  expect(into.notices).toEqual([])
})

test("a game master's advance of a turn stating its endsAt lands", async () => {
  const into = seen()
  const turn = turnAt("game-master", { endsAt: "2026-09-26T09:05:00.000Z" })
  const reach = reachOver(turn, seatOf("game-master", MASTER), into)
  const answer = await advancedBy(
    BEATS,
    reach,
    async () => LANDED,
    () => undefined,
    timed
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})

const NARRATOR = seatOf(roleplay.slug, "shaestrel-roleplay-the-saga")

const TOLD = [...BEATS, "--prose-file", join(ROOT, "prose.txt")]

test("a narrator's beats and prose on a roleplayed turn stating no endsAt are refused", async () => {
  const into = seen()
  const reach = reachOver(turnAt("world-builder", { roleplayed: true }), NARRATOR, into)
  const answer = await advancedBy(
    TOLD,
    reach,
    async () => LANDED,
    () => undefined,
    timed
  )
  expect(answer.refusals.join(" ")).toContain("--check the-saga-time")
  expect(into.folded).toEqual([])
  expect(into.pushes).toEqual([])
})

test("a narrator's beats and prose land together, skip the writer and push the turn ready", async () => {
  const into = seen()
  const ended = { roleplayed: true, endsAt: "2026-09-26T09:05:00.000Z" }
  const reach = reachOver(turnAt("world-builder", ended), NARRATOR, into)
  const answer = await advancedBy(
    TOLD,
    reach,
    async () => LANDED,
    () => undefined,
    timed
  )
  expect(answer.report[0]).toBe(`${SLUG}\tworld-builder\trecorders`)
  expect(Object.keys(into.folded[0]?.bodies ?? {}).sort()).toEqual(["beats", "prose"])
  expect(into.pushes).toEqual([`the-saga ${AT}`])
})

const ENDS = "2026-09-26T09:05:00.000Z"

const TIMED = {
  kind: "beats",
  beats: ["Mara opens the gate", "The hall is dark"],
  scenes: [{ beat: 1, at: "2026-09-26T09:00:00.000Z" }],
} as const

test("a last beat stating no time takes the settled endsAt as its time", () => {
  expect(endTaken("saga-time", "saga-00-002", { endsAt: ENDS }, TIMED)).toEqual({
    ...TIMED,
    scenes: [...TIMED.scenes, { beat: 2, at: ENDS }],
  })
})

test("a last beat stating a time other than the settled endsAt is refused with the fix", () => {
  const scenes = [...TIMED.scenes, { beat: 2, at: "2026-09-26T09:04:00.000Z" }]
  const said = endTaken("saga-time", "saga-00-002", { endsAt: ENDS }, { ...TIMED, scenes })
  expect(said).toEqual({
    refused: `\`saga-00-002\` settled its \`endsAt\` as \`${ENDS}\`, and beat 2, the last, states its time as \`2026-09-26T09:04:00.000Z\`, so beat 2 states \`"at":"${ENDS}"\` or no \`at\``,
  })
})

test("a beat stating a time after the settled endsAt is refused", () => {
  const scenes = [{ beat: 1, at: "2026-09-26T09:30:00.000Z" }]
  const said = endTaken("saga-time", "saga-00-002", { endsAt: ENDS }, { ...TIMED, scenes })
  expect(said).toMatchObject({ refused: expect.stringContaining("beat 1 states its time") })
})

test("beats stating no time, or a story settling no time, are left as handed", () => {
  const untimed = { ...TIMED, scenes: [] }
  expect(endTaken("saga-time", "saga-00-002", { endsAt: ENDS }, untimed)).toBe(untimed)
  expect(endTaken(null, "saga-00-002", { endsAt: ENDS }, TIMED)).toBe(TIMED)
})

writeFileSync(
  join(HERE, "timed.jsonl"),
  `${JSON.stringify({ event: "Mara opens the gate", at: "2026-09-26T09:00:00.000Z" })}\nThe hall is dark\n`
)

async function endedBy(status: "game-master" | "world-builder", argv: readonly string[]) {
  const into = seen()
  const seat = status === "game-master" ? seatOf("game-master", MASTER) : NARRATOR
  const reach = reachOver(
    turnAt(status, { roleplayed: status !== "game-master", endsAt: ENDS }),
    seat,
    into
  )
  const answer = await storyTurnAdvance(
    ["--turn", `story-turn-played/${SLUG}`, "--beats-file", join(HERE, "timed.jsonl"), ...argv],
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined,
    timed,
    () => [],
    () => ({ types: ["character-player"], filed: () => true }),
    () => null,
    () => ({ values: {}, namings: [] })
  )
  expect(answer.report[0]).toStartWith(`${SLUG}\t${status}\t`)
  return into.folded[0]?.bodies?.["beats"] ?? ""
}

test("a game master's and a narrator's last beat land stating the settled endsAt alike", async () => {
  const last = `"at":"${ENDS}"`
  expect((await endedBy("game-master", [])).trim().split("\n").at(-1)).toContain(last)
  const told = ["--prose-file", join(ROOT, "prose.txt")]
  expect((await endedBy("world-builder", told)).trim().split("\n").at(-1)).toContain(last)
})

test("a written chapter's game master advances with no endsAt", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", CHAPTER_BEATS]
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    chapterReach(into),
    () => undefined,
    timed
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})
