import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import {
  storyTurnAdvance,
  type Timed,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  AT,
  advancedBy,
  CALLED,
  CHAPTER_ARGV,
  CHAPTER_AT,
  CHAPTER_BEATS,
  chapterReach,
  DRAFTED,
  ENDED,
  GIVEN,
  LANDED,
  landingGiven,
  landingInto,
  MARA_HEALTH,
  MARA_LORE,
  MASTER,
  MOVED,
  PLANNED_BODY,
  REVIEWED,
  ROOT,
  racing,
  reachOver,
  SLUG,
  seatOf,
  seen,
  storing,
  toldAll,
  turnAt,
  WRITER,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import { writtenLine } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type { Reach } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

test("the game master's beats land on the turn and tell the writer the lore to read, starting no seat", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    stepStatus: `${stepStatus.slug}/writer`,
    beats: "jsonl",
  })
  expect(into.folded[0]?.bodies).toEqual({ beats: PLANNED_BODY })
  expect(into.folded[0]?.path).toBe(AT)
  expect(into.folded[0]?.merge).toBe(true)
  expect(into.starts).toEqual([])
  expect(into.notices).toEqual(toldAll("writer"))
  expect(into.stops).toEqual([])
})

test("the lore in play is gathered from the turn, its game and the step's values", async () => {
  const asked: unknown[] = []
  const turn = turnAt("game-master", { lore: ["lore/grace"] })
  const reach: Reach = {
    ...reachOver(turn, seatOf("game-master", MASTER), seen()),
    loreGathered: (_root, held) => {
      asked.push(held.value["lore"])
      return { values: {}, named: [] }
    },
  }
  await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(asked).toEqual([["lore/grace"]])
})

test("the last reviewer's clean review starts the recorders and stops the reviewer's seat", async () => {
  const into = seen()
  const turn = turnAt("reviewers", { reviewedBy: ["story-reviewer/voice"], prose: "txt" })
  const reviewer = "mari-reviewer-the-saga-flex-1"
  const answer = await advancedBy(
    ["--reviewer", "continuity"],
    reachOver(turn, seatOf("reviewer", reviewer), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["stepStatus"]).toBe(`${stepStatus.slug}/recorders`)
  expect(into.folded[0]?.bodies).toBeUndefined()
  expect(into.starts.map((one) => [one.role, one.flex])).toEqual([
    ["story-recorder", "flex-2"],
    ["story-recorder", "flex-1"],
  ])
  expect(into.notices).toEqual(toldAll("recorders"))
  expect(into.stops).toEqual([reviewer])
  expect(into.pushes).toEqual([])
})

test("the last reviewer's issues send the turn back to the game master, starting nothing", async () => {
  const into = seen()
  const turn = turnAt("reviewers", { reviewedBy: ["story-reviewer/voice"], prose: "txt" })
  const reviewer = "mari-reviewer-the-saga-flex-1"
  const answer = await advancedBy(
    ["--reviewer", "continuity", "--issues-file", join(ROOT, "issues.txt")],
    reachOver(turn, seatOf("reviewer", reviewer), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["stepStatus"]).toBe(`${stepStatus.slug}/game-master`)
  expect(into.starts).toEqual([])
  expect(into.notices).toEqual(toldAll("game-master"))
  expect(into.stops).toEqual([reviewer])
})

test("a reviewer that is not the last lands its issues, tells nobody and stops its seat", async () => {
  const into = seen()
  const reviewer = "mari-reviewer-the-saga-flex-2"
  const answer = await advancedBy(
    ["--reviewer", "voice", "--issues-file", join(ROOT, "issues.txt")],
    reachOver(turnAt("reviewers"), seatOf("reviewer", reviewer), into),
    landingInto(into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.steps).toEqual(["read", `hold ${AT}`, "read", "land", `free ${AT}`])
  expect(into.folded[0]?.values).toEqual({
    stepStatus: `${stepStatus.slug}/reviewers`,
    reviewedBy: ["story-reviewer/voice"],
    issues: ['"opens" - it was locked'],
  })
  expect(into.notices).toEqual([])
  expect(into.stops).toEqual([reviewer])
})

test("two reviewers advancing at once each land on what the other landed, so the turn moves on", async () => {
  const race = racing(turnAt("reviewers", { prose: "txt" }))
  const [voice, continuity] = await Promise.all([
    advancedBy(["--reviewer", "voice"], race.reach, race.landing),
    advancedBy(["--reviewer", "continuity"], race.reach, race.landing),
  ])
  expect([...voice.refusals, ...continuity.refusals]).toEqual([])
  expect(race.now().value["reviewedBy"]).toEqual(REVIEWED.slice().reverse())
  expect(race.now().value["stepStatus"]).toBe(`${stepStatus.slug}/recorders`)
})

const WRITTEN = ["--prose-file", join(ROOT, "prose.txt"), "--character", "character-player/mara"]

test("the writer's first prose lands beside the turn and starts one fresh seat for each reviewer", async () => {
  const into = seen()
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer"), seatOf("writer", WRITER), into, [])
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    stepStatus: `${stepStatus.slug}/reviewers`,
    prose: "txt",
    ownLength: 4,
    characters: ["character-player/mara"],
  })
  expect(into.folded[0]?.bodies).toEqual({ prose: "Mara opens the gate.\n" })
  expect(into.starts.map((one) => [one.persona, one.role, one.game, one.flex])).toEqual([
    ["mari", "reviewer", "the-saga", "flex-1"],
    ["mari", "reviewer", "the-saga", "flex-2"],
  ])
  const prompt = into.starts[0]?.prompt ?? ""
  expect(prompt).toContain(AT)
  expect(prompt).toContain("its prose")
  expect(prompt).toContain("reviewers/continuity.story-reviewer.instructions.md")
  expect(prompt).toContain(`The lore in play on the turn is on \`${MARA_LORE}\`.`)
  expect(prompt).not.toContain(MARA_HEALTH)
  expect(prompt).toContain(
    `${CALLED} --turn story-turn-played/${SLUG} --reviewer continuity --issues-file <path>`
  )
  expect(into.notices).toEqual(toldAll("reviewers"))
  expect(into.stops).toEqual([])
})

test("with no story recorder the writer's prose on a reviewed turn goes to the player, and the writer's seat runs on", async () => {
  const into = seen()
  const reviewed = { reviewedBy: REVIEWED }
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer", reviewed), seatOf("writer", WRITER), into, [])
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    stepStatus: `${stepStatus.slug}/player`,
    prose: "txt",
    ownLength: 4,
    characters: ["character-player/mara"],
  })
  expect(into.folded[0]?.bodies).toEqual({ prose: "Mara opens the gate.\n" })
  expect(into.starts).toEqual([])
  expect(into.stops).toEqual([])
})

test("the writer's rewrite skips the reviewers, moving the turn to the recorders with one fresh seat for each", async () => {
  const into = seen()
  const reviewed = {
    reviewedBy: REVIEWED,
    issues: ['"opens" - it was locked'],
    prose: "txt",
  }
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer", reviewed), seatOf("writer", WRITER), into),
    landingInto(into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["stepStatus"]).toBe(`${stepStatus.slug}/recorders`)
  expect(into.folded[0]?.bodies).toEqual({ prose: "Mara opens the gate.\n" })
  expect(into.landings).toEqual([[]])
  expect(into.starts.map((one) => [one.persona, one.role, one.game, one.flex])).toEqual([
    ["mari", "story-recorder", "the-saga", "flex-2"],
    ["mari", "story-recorder", "the-saga", "flex-1"],
  ])
  expect(answer.report).toContain("started\tmari-story-recorder-the-saga-flex-2")
  const prompt = into.starts[0]?.prompt ?? ""
  expect(prompt).toContain(AT)
  expect(prompt).toContain("recorders/memory.story-recorder.instructions.md")
  expect(prompt).toContain("akasha change apply --draft")
  expect(prompt).toContain(writtenLine([MARA_HEALTH]))
  expect(prompt).toContain(`${CALLED} --turn story-turn-played/${SLUG} --recorder memory`)
  expect(into.notices).toEqual(toldAll("recorders"))
  expect(into.stops).toEqual([])
})

const RECORDER_SEAT = "mari-story-recorder-the-saga-flex-1"

test("each recorder lands only its own edits, so nothing kept waits for a later landing to stale it", async () => {
  const into = seen()
  const first = DRAFTED.slice(0, 1)
  const second = DRAFTED.slice(1)
  const kept = storing(into, { cast: first, memory: second })
  kept.as("cast")
  await advancedBy(["--recorder", "cast"], kept.reach(turnAt("recorders")), landingInto(into))
  expect(into.folded[0]?.values["stepStatus"]).toBe(`${stepStatus.slug}/recorders`)
  expect(kept.store).toEqual([])
  kept.as("memory")
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"] })
  const answer = await advancedBy(["--recorder", "memory"], kept.reach(turn), landingInto(into))
  expect(answer.refusals).toEqual([])
  expect(into.landings).toEqual([first, second])
  expect(kept.store).toEqual([])
  expect(into.stops).toEqual([RECORDER_SEAT, RECORDER_SEAT])
})

test("the last recorder lands its drafted edits with the move to player in one landing", async () => {
  const into = seen()
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"], reviewedBy: REVIEWED })
  const answer = await advancedBy(
    ["--recorder", "memory"],
    reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    landingInto(into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.keeps).toEqual([`an-agent ${AT}`])
  expect(into.folded[0]?.values).toEqual({
    stepStatus: `${stepStatus.slug}/player`,
    recordedBy: ["story-recorder/cast", `${storyRecorder.slug}/${memory.slug}`],
  })
  expect(into.landings).toEqual([DRAFTED])
  expect(into.releases).toEqual([AT])
  expect(into.notices).toEqual(toldAll("player"))
  expect(into.stops).toEqual([RECORDER_SEAT])
  expect(into.pushes).toEqual([`the-saga ${AT}`])
})

test("a recorder's kept edit to the turn's own page is folded into the move to player", async () => {
  const into = seen()
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"], reviewedBy: REVIEWED })
  const reach = {
    ...reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    kept: () => [...DRAFTED, ENDED],
  }
  const answer = await advancedBy(["--recorder", "memory"], reach, landingInto(into))
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    endsAt: "2026-09-26T09:05:00.000Z",
    stepStatus: `${stepStatus.slug}/player`,
    recordedBy: ["story-recorder/cast", `${storyRecorder.slug}/${memory.slug}`],
  })
  expect(into.landings).toEqual([DRAFTED])
})

test("a recorder that is not the last folds its edit to the turn's own page into its move", async () => {
  const into = seen()
  const reach = {
    ...reachOver(turnAt("recorders"), seatOf("story-recorder", RECORDER_SEAT), into),
    kept: () => [...DRAFTED, ENDED],
  }
  const answer = await advancedBy(["--recorder", "cast"], reach, landingInto(into))
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["endsAt"]).toBe("2026-09-26T09:05:00.000Z")
  expect(into.landings).toEqual([DRAFTED])
  expect(into.releases).toEqual([AT])
})

test("a refused landing gives the caller its drafted edits back, and leaves the turn at recorders and the seat running", async () => {
  const into = seen()
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"] })
  const answer = await advancedBy(
    ["--recorder", "memory"],
    reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    landingInto(into, ["`lore/a-hall.lore.ts` moved since it was read"])
  )
  expect(answer.refusals.join(" ")).toContain("lore/a-hall.lore.ts")
  expect(into.landings).toEqual([DRAFTED])
  expect(into.givenBack).toEqual([MOVED])
  expect(into.releases).toEqual([])
  expect(into.notices).toEqual([])
  expect(into.starts).toEqual([])
  expect(into.stops).toEqual([])
})

test("an advance from a seat not holding the turn lands nothing", async () => {
  const into = seen()
  const answer = await advancedBy(
    ["--beats-file", join(ROOT, "beats.txt")],
    reachOver(turnAt("world-builder"), seatOf("game-master", MASTER), into)
  )
  expect(answer.refusals.join(" ")).toContain("world-builder")
  expect(into.folded).toEqual([])
  expect(into.starts).toEqual([])
})

test("a written chapter advances as a turn does, folded and told as a chapter", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", CHAPTER_BEATS]
  const reach = chapterReach(into)
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.pageTypeSlug).toBe("story-chapter-written")
  expect(into.notices[0]).toContain(`The chapter \`${CHAPTER_AT}\` is at writer.`)
})

test("a titled chapter is renamed after its title", async () => {
  const into = seen()
  const given: unknown[] = []
  const runs: string[] = []
  const reach = chapterReach(into, "writer", seatOf("writer", WRITER))
  const argv = [...CHAPTER_ARGV, "--prose-file", join(ROOT, "prose.txt"), "--title", "The Gate"]
  const answer = await storyTurnAdvance(argv, GIVEN, landingGiven(given), reach, (_root, one) => {
    runs.push(one.run)
    return undefined
  })
  const renamed = CHAPTER_AT.replace("0002", "0002-the-gate")
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["title"]).toBe("The Gate")
  expect(given).toEqual([{ at: CHAPTER_AT, to: "the-saga-0002-the-gate" }])
  expect(answer.report).toContain(`renamed\t${renamed}`)
  expect(into.notices[0]).toContain(`The chapter \`${renamed}\` is at recorders.`)
  expect(runs).toEqual(["the-saga-0002"])
})

test("a landed advance ends the phase the turn was at, naming the seat that ended it", async () => {
  const ended: string[] = []
  const timed: Timed = (_root, one) => {
    ended.push(`${one.story} ${one.run} ${one.phase} ${one.seat}`)
    return undefined
  }
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), seen())
  await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach, async () => LANDED, timed)
  expect(ended).toEqual([`the-saga ${SLUG} game-master ${MASTER}`])
})
