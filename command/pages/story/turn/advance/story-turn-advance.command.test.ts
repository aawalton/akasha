import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  storyTurnAdvance,
  taken,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import type {
  Reach,
  Seated,
  Starting,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const CALLED = "akasha story turn advance"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-advance-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const SLUG = "the-saga-00-003"

const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

const MASTER = "mari-game-master-the-saga"

const BUILDER = "mari-world-builder-the-saga"

const REVIEWERS = [
  {
    slug: "continuity",
    name: "Continuity",
    at: "reviewers/continuity.story-reviewer.ts",
    instructionsAt: "reviewers/continuity.story-reviewer.instructions.md",
  },
  {
    slug: "voice",
    name: "Voice",
    at: "reviewers/voice.story-reviewer.ts",
    instructionsAt: "reviewers/voice.story-reviewer.instructions.md",
  },
]

const RECORDERS = [
  {
    slug: "memory",
    name: "Memory",
    at: "recorders/memory.story-recorder.ts",
    instructionsAt: "recorders/memory.story-recorder.instructions.md",
  },
  {
    slug: "cast",
    name: "Cast",
    at: "recorders/cast.story-recorder.ts",
    instructionsAt: "recorders/cast.story-recorder.instructions.md",
  },
]

const DRAFTED: readonly FileChange[] = [
  { kind: "add", path: "lore/a-hall.lore.ts", content: "cast\n" },
  { kind: "add", path: "lore/the-gate.lore.ts", content: "memory\n" },
]

const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: "an-agent" }

const LANDED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

writeFileSync(join(ROOT, "beats.txt"), "Mara opens the gate\n\nThe hall is dark\n")
writeFileSync(join(ROOT, "issues.txt"), '"opens" - it was locked\n')
writeFileSync(join(ROOT, "prose.txt"), "Mara opens the gate.\n")

function turnAt(status: TurnStep, more: Record<string, unknown> = {}): Turn {
  return {
    at: AT,
    slug: SLUG,
    value: {
      partOfCollections: ["story-played/the-saga"],
      turnStatus: `${turnStatus.slug}/${status}`,
      ...more,
    },
  }
}

type Seen = {
  readonly folded: Naming[]
  readonly starts: Starting[]
  readonly stops: string[]
  readonly notices: string[]
  readonly keeps: string[]
  readonly releases: string[]
  readonly landings: (readonly FileChange[])[]
}

function seen(): Seen {
  return {
    folded: [],
    starts: [],
    stops: [],
    notices: [],
    keeps: [],
    releases: [],
    landings: [],
  }
}

function reachOver(
  turn: Turn,
  seat: Seated | null,
  into: Seen,
  recorders: typeof RECORDERS = RECORDERS
): Reach {
  return {
    turnAt: (_root, slug) => (slug === turn.slug ? turn : null),
    reviewersIn: () => REVIEWERS,
    recordersIn: () => recorders,
    keep: (_root, agentId, at) => {
      into.keeps.push(`${agentId ?? ""} ${at}`)
      return null
    },
    kept: () => DRAFTED,
    release: (_root, at) => {
      into.releases.push(at)
      return true
    },
    seatOf: () => seat,
    storyOf: () => ({ title: "The Saga", master: MASTER }),
    rulesAt: () => "style/style-rule/pages",
    fold: (_root, naming) => {
      into.folded.push(naming)
      return []
    },
    start: async (starting) => {
      into.starts.push(starting)
      const flex = starting.flex === null ? "" : `-${starting.flex}`
      return `${starting.persona}-${starting.role}-${starting.game}${flex}`
    },
    stop: (_root, name) => {
      into.stops.push(name)
      return undefined
    },
    notify: async (to, body) => {
      into.notices.push(`${to}: ${body}`)
      return null
    },
  }
}

function seatOf(role: string, name: string): Seated {
  return { name, role, game: "the-saga" }
}

function landingInto(into: Seen, refusals: readonly string[] = []): Landing {
  return async (_root, _asked, _message, writing) => {
    into.landings.push(writing?.kept ?? [])
    return refusals.length === 0 ? LANDED : { refusals, code: DATA }
  }
}

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

test("the game master's beats land on the turn and start one fresh seat for each reviewer", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/reviewers`,
    beats: ["Mara opens the gate", "The hall is dark"],
  })
  expect(into.folded[0]?.path).toBe(AT)
  expect(into.folded[0]?.merge).toBe(true)
  expect(into.starts.map((one) => [one.persona, one.role, one.game, one.flex])).toEqual([
    ["mari", "reviewer", "the-saga", "flex-1"],
    ["mari", "reviewer", "the-saga", "flex-2"],
  ])
  const prompt = into.starts[0]?.prompt ?? ""
  expect(prompt).toContain(AT)
  expect(prompt).toContain("reviewers/continuity.story-reviewer.instructions.md")
  expect(prompt).toContain(
    `${CALLED} --turn story-turn-played/${SLUG} --reviewer continuity --issues-file <path>`
  )
  expect(into.notices).toEqual([
    `${MASTER}: The turn \`${AT}\` is at reviewers.`,
    `${BUILDER}: The turn \`${AT}\` is at reviewers.`,
  ])
  expect(into.stops).toEqual([])
})

test("the last reviewer's clean review starts the writer and stops the reviewer's seat", async () => {
  const into = seen()
  const turn = turnAt("reviewers", { reviewedBy: ["story-reviewer/voice"] })
  const reviewer = "mari-reviewer-the-saga-flex-1"
  const answer = await advancedBy(
    ["--reviewer", "continuity"],
    reachOver(turn, seatOf("reviewer", reviewer), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["turnStatus"]).toBe(`${turnStatus.slug}/writer`)
  expect(into.starts.map((one) => [one.role, one.flex])).toEqual([["writer", null]])
  expect(into.starts[0]?.prompt).toContain("style/style-rule/pages")
  expect(into.starts[0]?.prompt).toContain(`--prose-file <path> --character <address>`)
  expect(into.stops).toEqual([reviewer])
})

test("a reviewer that is not the last lands its issues, tells nobody and stops its seat", async () => {
  const into = seen()
  const reviewer = "mari-reviewer-the-saga-flex-2"
  const answer = await advancedBy(
    ["--reviewer", "voice", "--issues-file", join(ROOT, "issues.txt")],
    reachOver(turnAt("reviewers"), seatOf("reviewer", reviewer), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/reviewers`,
    reviewedBy: ["story-reviewer/voice"],
    issues: ['"opens" - it was locked'],
  })
  expect(into.notices).toEqual([])
  expect(into.stops).toEqual([reviewer])
})

const WRITTEN = ["--prose-file", join(ROOT, "prose.txt"), "--character", "character-player/mara"]

test("with no story recorder the writer's prose lands beside the turn at the player, and the writer's seat stops", async () => {
  const into = seen()
  const writer = "mari-writer-the-saga"
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer"), seatOf("writer", writer), into, [])
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
  expect(into.stops).toEqual([writer])
})

test("the writer's prose moves the turn to the recorders and starts one fresh seat for each", async () => {
  const into = seen()
  const writer = "mari-writer-the-saga"
  const answer = await advancedBy(
    WRITTEN,
    reachOver(turnAt("writer"), seatOf("writer", writer), into),
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
  expect(prompt).toContain(`${CALLED} --turn story-turn-played/${SLUG} --recorder memory`)
  expect(into.notices).toEqual([
    `${MASTER}: The turn \`${AT}\` is at recorders.`,
    `${BUILDER}: The turn \`${AT}\` is at recorders.`,
  ])
  expect(into.stops).toEqual([writer])
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
  expect(into.notices).toEqual([
    `${MASTER}: The turn \`${AT}\` is at player.`,
    `${BUILDER}: The turn \`${AT}\` is at player.`,
  ])
  expect(into.stops).toEqual([RECORDER_SEAT])
})

test("a refused landing keeps the edits beside the turn, the turn at recorders and the seat running", async () => {
  const into = seen()
  const turn = turnAt("recorders", { recordedBy: ["story-recorder/cast"] })
  const answer = await advancedBy(
    ["--recorder", "memory"],
    reachOver(turn, seatOf("story-recorder", RECORDER_SEAT), into),
    landingInto(into, ["`lore/a-hall.lore.ts` moved since it was read"])
  )
  expect(answer.refusals.join(" ")).toContain("lore/a-hall.lore.ts")
  expect(into.landings).toEqual([DRAFTED])
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
