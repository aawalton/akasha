import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  storyTurnAdvance,
  taken,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  AT,
  DRAFTED,
  ENDED,
  LANDED,
  landingInto,
  MARA_HEALTH,
  MARA_LORE,
  MASTER,
  MOVED,
  REVIEWED,
  racing,
  reachOver,
  SLUG,
  seatOf,
  seen,
  toldAll,
  turnAt,
  WRITER,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import { writtenLine } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type { Reach } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"

import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const CALLED = "akasha story turn advance"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-advance-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: "an-agent" }

writeFileSync(join(ROOT, "beats.txt"), "Mara opens the gate\n\nThe hall is dark\n")
writeFileSync(join(ROOT, "issues.txt"), '"opens" - it was locked\n')
writeFileSync(join(ROOT, "prose.txt"), "Mara opens the gate.\n")

async function advancedBy(
  argv: readonly string[],
  reach: Reach,
  landing: Landing = async () => LANDED
) {
  return await storyTurnAdvance(
    ["--turn", `story-turn-played/${SLUG}`, ...argv],
    GIVEN,
    landing,
    reach
  )
}

test("the game master's beats land on the turn and tell the writer the lore to read, starting no seat", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/writer`,
    beats: ["Mara opens the gate", "The hall is dark"],
  })
  expect(into.folded[0]?.path).toBe(AT)
  expect(into.folded[0]?.merge).toBe(true)
  expect(into.starts).toEqual([])
  expect(into.notices).toEqual(toldAll("writer"))
  expect(into.stops).toEqual([])
})

test("the lore in play is looked up from the lore and the characters the turn itself names", async () => {
  const asked: (readonly string[])[] = []
  const turn = turnAt("game-master", { lore: ["lore/grace"] })
  const reach: Reach = {
    ...reachOver(turn, seatOf("game-master", MASTER), seen()),
    loreOf: (_root, stated, characters) => {
      asked.push(stated, characters)
      return []
    },
  }
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(asked).toEqual([["lore/grace"], []])
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
  expect(into.folded[0]?.values["turnStatus"]).toBe(`${turnStatus.slug}/recorders`)
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
  expect(into.folded[0]?.values["turnStatus"]).toBe(`${turnStatus.slug}/game-master`)
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
    turnStatus: `${turnStatus.slug}/reviewers`,
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
  expect(race.now().value["turnStatus"]).toBe(`${turnStatus.slug}/recorders`)
})

const WRITTEN = ["--prose-file", join(ROOT, "prose.txt"), "--character", "character-player/mara"]

test("the writer's first prose lands beside the turn and starts one fresh seat for each reviewer", async () => {
  const into = seen()
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer"), seatOf("writer", WRITER), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/reviewers`,
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
    turnStatus: `${turnStatus.slug}/player`,
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
  expect(into.folded[0]?.values["turnStatus"]).toBe(`${turnStatus.slug}/recorders`)
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

test("a recorder that is not the last keeps its drafted edits beside the turn, lands none, and stops", async () => {
  const into = seen()
  const answer = await advancedBy(
    ["--recorder", "cast"],
    reachOver(turnAt("recorders"), seatOf("story-recorder", RECORDER_SEAT), into),
    landingInto(into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.keeps).toEqual([`an-agent ${AT}`])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/recorders`,
    recordedBy: ["story-recorder/cast"],
  })
  expect(into.landings).toEqual([[]])
  expect(into.releases).toEqual([])
  expect(into.notices).toEqual([])
  expect(into.stops).toEqual([RECORDER_SEAT])
})

test("the last recorder lands every recorder's kept edits with the move to player in one landing", async () => {
  const into = seen()
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"] })
  const answer = await advancedBy(
    ["--recorder", "memory"],
    reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    landingInto(into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.keeps).toEqual([`an-agent ${AT}`])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/player`,
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
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"] })
  const reach = {
    ...reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    kept: () => [...DRAFTED, ENDED],
  }
  const answer = await advancedBy(["--recorder", "memory"], reach, landingInto(into))
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    endsAt: "2026-09-26T09:05:00.000Z",
    turnStatus: `${turnStatus.slug}/player`,
    recordedBy: ["story-recorder/cast", `${storyRecorder.slug}/${memory.slug}`],
  })
  expect(into.landings).toEqual([DRAFTED])
})

test("a recorder that is not the last folds its edit to the turn's own page into its move and keeps it no longer", async () => {
  const into = seen()
  const reach = {
    ...reachOver(turnAt("recorders"), seatOf("story-recorder", RECORDER_SEAT), into),
    kept: () => [...DRAFTED, ENDED],
  }
  const answer = await advancedBy(["--recorder", "cast"], reach, landingInto(into))
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    endsAt: "2026-09-26T09:05:00.000Z",
    turnStatus: `${turnStatus.slug}/recorders`,
    recordedBy: ["story-recorder/cast"],
  })
  expect(into.landings).toEqual([[]])
  expect(into.unkeeps).toEqual([[ENDED]])
  expect(into.releases).toEqual([])
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

test("an advance handing in two steps' output is refused before anything is read", () => {
  const read = taken(
    ["--turn", SLUG, "--beats-file", "nowhere.txt", "--prose-file", "nowhere.txt"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    refused: ["an advance hands in one step's output, and this hands in beats and prose"],
  })
})

test("a game master's beats with `--character` are refused as the writer's flag, not as prose", () => {
  const read = taken(
    ["--turn", SLUG, "--beats-file", "nowhere.txt", "--character", "character-player/mara"],
    CALLED,
    ROOT
  )
  expect(read).toEqual({
    refused: [
      "`--character` names who is present in the writer's prose, so it belongs to the writer's step with `--prose-file`, and this advance hands in beats",
    ],
  })
})

test("an advance naming no step's output hands in the world builder's lore", () => {
  expect(taken(["--turn", SLUG], CALLED, ROOT)).toEqual({
    turn: SLUG,
    handed: { kind: "lore", lore: [] },
  })
})
