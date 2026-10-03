import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  AT,
  CHAPTER_ARGV,
  CHAPTER_AT,
  chapterReach,
  GIVEN,
  LANDED,
  MASTER,
  pushingReach,
  ROOT,
  seatOf,
  seen,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import {
  type LoreLooking,
  loreNamed,
} from "akasha/command/pages/story/turn/modules/turn-lore-in-play/turn-lore-in-play.module.code.ts"
import {
  noticesSent,
  type Reach,
  type Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const GAME = "the-saga"

test("a move to player pushes Alan for a written chapter as for a played turn, and no other move does", async () => {
  const pushed: string[] = []
  const reach = pushingReach(seen(), pushed)
  const after: Told = { report: [], faults: [] }
  await noticesSent(reach, ROOT, GAME, MASTER, CHAPTER_AT, "player", after, [], "chapter")
  await noticesSent(reach, ROOT, GAME, MASTER, AT, "player", after)
  await noticesSent(reach, ROOT, GAME, MASTER, CHAPTER_AT, "recorders", after, [], "chapter")
  expect(pushed).toEqual([`chapter ${GAME} ${CHAPTER_AT}`, `turn ${GAME} ${AT}`])
  expect(after.report.filter((one) => one.startsWith("pushed"))).toEqual([
    `pushed\t${GAME}`,
    `pushed\t${GAME}`,
  ])
  expect(after.faults).toEqual([])
})

test("only a chapter's move to player keeps its story's backlog", async () => {
  const kept: string[] = []
  const reach: Reach = {
    ...pushingReach(seen(), []),
    backlogKept: async (story) => {
      kept.push(story)
      return { said: `${story}\tskipped\tunread: x`, failed: false, faults: [] }
    },
  }
  const after: Told = { report: [], faults: [] }
  await noticesSent(reach, ROOT, GAME, MASTER, CHAPTER_AT, "player", after, [], "chapter")
  await noticesSent(reach, ROOT, GAME, MASTER, AT, "player", after)
  await noticesSent(reach, ROOT, GAME, MASTER, CHAPTER_AT, "recorders", after, [], "chapter")
  expect(kept).toEqual([GAME])
  expect(after.report).toContain(`backlog\t${GAME}\tskipped\tunread: x`)
})

test("an advance moving a chapter to player starts the next, and a failure is only a fault", async () => {
  const kept: string[] = []
  const seat = seatOf("reviewer", "mari-reviewer-the-saga-flex-1")
  const argv = [...CHAPTER_ARGV, "--reviewer", "continuity"]
  const done = {
    recordedBy: [`${storyRecorder.slug}/${memory.slug}`, "story-recorder/cast"],
    reviewedBy: ["story-reviewer/voice"],
    prose: "txt",
  }
  const keeping = (fails: boolean): Reach => ({
    ...chapterReach(seen(), "reviewers", seat, done),
    backlogKept: async (story) => {
      kept.push(story)
      return { said: `${story}\t${fails ? "failed" : "started"}`, failed: fails, faults: [] }
    },
  })
  const started = await storyTurnAdvance(argv, GIVEN, async () => LANDED, keeping(false))
  expect(started.refusals).toEqual([])
  expect(started.report).toContain(`backlog\t${GAME}\tstarted`)
  const failed = await storyTurnAdvance(argv, GIVEN, async () => LANDED, keeping(true))
  expect(failed.report).toContain(`${GAME}-0002\treviewers\tplayer`)
  expect(failed.refusals.join(" ")).toContain(`was not started: ${GAME}\tfailed`)
  expect(kept).toEqual([GAME, GAME])
})

const GRACE = "character-other/grace"

const ECHO = "character-other/echo"

const GRACE_LORE = "world/lore/grace.lore.ts"

const GRACE_PERSONA_LORE = "world/lore/grace-persona.lore.ts"

const ECHO_LORE = "world/lore/echo.lore.ts"

const BOULDER_LORE = "world/lore/boulder-woman.lore.ts"

const HALL_LORE = "world/lore/the-hall.lore.ts"

const PATHS: Record<string, string> = {
  "lore/grace": GRACE_LORE,
  "lore/echo": ECHO_LORE,
  "lore/the-hall": HALL_LORE,
}

const GRACE_PERSONA = "grace-persona"

const ECHO_PERSONA = "echo-persona"

const PERSONAS: Record<string, string> = { [GRACE]: GRACE_PERSONA, [ECHO]: ECHO_PERSONA }

function lookOver(withheld: readonly string[] = []): LoreLooking {
  return {
    pathOf: (page) => PATHS[page] ?? null,
    personaOf: (character) => PERSONAS[character] ?? null,
    about: [
      [GRACE_LORE, GRACE],
      [GRACE_PERSONA_LORE, GRACE_PERSONA],
      [ECHO_LORE, ECHO],
      [BOULDER_LORE, ECHO_PERSONA],
      [HALL_LORE, null],
    ],
    withheld,
  }
}

test("a turn at writer naming a new character's lore names that lore and no earlier turn's cast", () => {
  expect(loreNamed(["lore/grace"], [], lookOver())).toEqual([GRACE_LORE])
})

test("a turn naming a new character names the lore about that character and its persona, and not an earlier character's", () => {
  expect(loreNamed(["lore/grace"], [GRACE], lookOver())).toEqual([GRACE_PERSONA_LORE, GRACE_LORE])
})

test("lore a turn names that is about no character is named", () => {
  expect(loreNamed(["lore/the-hall"], [ECHO], lookOver())).toEqual([
    BOULDER_LORE,
    ECHO_LORE,
    HALL_LORE,
  ])
})

test("a turn naming no lore and no character names nothing", () => {
  expect(loreNamed([], [], lookOver())).toEqual([])
})

test("withheld lore is never named, whether the turn names it or it is about a character", () => {
  expect(loreNamed(["lore/grace"], [GRACE], lookOver([GRACE_LORE, GRACE_PERSONA_LORE]))).toEqual([])
})

test("a lore address naming no page is left out", () => {
  expect(loreNamed(["lore/nowhere"], [], lookOver())).toEqual([])
})

const GRACE_MORE_LORE = "world/lore/grace-2.lore.ts"

const HALL_MORE_LORE = "world/lore/the-hall-2.lore.ts"

const GLADE_LORE = "world/places/glade.place.ts"

const GLADE_MORE_LORE = "world/lore/glade-2.lore.ts"

const WORLD_LORE = "world/lore/magic.lore.ts"

const WORLD_OTHER_LORE = "world/lore/peoples.lore.ts"

function continuedOver(): LoreLooking {
  const look = lookOver()
  return {
    ...look,
    pathOf: (page) =>
      ({ "place/glade": GLADE_LORE, "lore/magic": WORLD_LORE })[page] ?? look.pathOf(page),
    about: [
      ...look.about,
      [GRACE_MORE_LORE, GRACE],
      [HALL_MORE_LORE, "lore/the-hall"],
      [GLADE_MORE_LORE, "place/glade"],
      [WORLD_LORE, "world/held"],
      [WORLD_OTHER_LORE, "world/held"],
    ],
  }
}

test("lore named brings every page about its target, so a continuation comes with it", () => {
  expect(loreNamed(["lore/grace"], [], continuedOver())).toEqual([GRACE_MORE_LORE, GRACE_LORE])
})

test("lore about no page brings the pages about it, as a place does", () => {
  expect(loreNamed(["lore/the-hall"], [], continuedOver())).toEqual([HALL_MORE_LORE, HALL_LORE])
  expect(loreNamed(["place/glade"], [], continuedOver())).toEqual([GLADE_MORE_LORE, GLADE_LORE])
})

test("lore named about a whole world brings no other lore about that world", () => {
  expect(loreNamed(["lore/magic"], [], continuedOver())).toEqual([WORLD_LORE])
})
