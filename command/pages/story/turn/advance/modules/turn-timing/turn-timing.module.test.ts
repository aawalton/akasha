import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  timeCheckIn,
  untimedRefused,
} from "akasha/command/pages/story/turn/advance/modules/turn-timing/turn-timing.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  advancedBy,
  CHAPTER_ARGV,
  chapterReach,
  GIVEN,
  LANDED,
  MASTER,
  ROOT,
  reachOver,
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

test("a written chapter's game master advances with no endsAt", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, ...BEATS]
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
