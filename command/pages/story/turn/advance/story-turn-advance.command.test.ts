import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
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
}

function seen(): Seen {
  return { folded: [], starts: [], stops: [], notices: [] }
}

function reachOver(turn: Turn, seat: Seated | null, into: Seen): Reach {
  return {
    turnAt: (_root, slug) => (slug === turn.slug ? turn : null),
    reviewersIn: () => REVIEWERS,
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

async function advancedBy(argv: readonly string[], reach: Reach) {
  return await storyTurnAdvance(
    ["--turn", `story-turn-played/${SLUG}`, ...argv],
    GIVEN,
    async () => LANDED,
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

test("the writer's prose is written beside the turn with its length, and the writer's seat stops", async () => {
  const into = seen()
  const writer = "mari-writer-the-saga"
  const answer = await advancedBy(
    ["--prose-file", join(ROOT, "prose.txt"), "--character", "character-player/mara"],
    reachOver(turnAt("writer"), seatOf("writer", writer), into)
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values).toEqual({
    turnStatus: `${turnStatus.slug}/player`,
    prose: "txt",
    ownLength: 4,
    characters: ["character-player/mara"],
  })
  expect(into.folded[0]?.bodies).toEqual({ prose: "Mara opens the gate.\n" })
  expect(into.stops).toEqual([writer])
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

test("an advance naming no step's output hands in the world builder's lore", () => {
  expect(taken(["--turn", SLUG], CALLED, ROOT)).toEqual({
    turn: SLUG,
    handed: { kind: "lore", lore: [] },
  })
})
