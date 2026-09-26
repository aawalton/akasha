import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type {
  Rewinding,
  Seated,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnRewind } from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { taking } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const CALLED = "akasha story turn rewind"

const ROOT = mkdtempSync(join("/var/tmp", "story-turn-rewind-test-"))

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const SLUG = "the-saga-00-003"

const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

const PROSE_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.prose.txt`

const ROLLS_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.rolls.jsonl`

const MASTER = "mari-game-master-the-saga"

const BUILDER = "mari-world-builder-the-saga"

const UNIT = `${unit.slug}/${words.slug}`

const GIVEN: Given = { root: ROOT, calledAs: CALLED, from: "", writer: null, agentId: "an-agent" }

const LANDED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

const SEATS: readonly Seated[] = [
  { name: MASTER, role: "game-master", game: "the-saga" },
  { name: BUILDER, role: "world-builder", game: "the-saga" },
  { name: "mari-reviewer-the-saga-flex-1", role: "reviewer", game: "the-saga" },
  { name: "mari-writer-the-saga", role: "writer", game: "the-saga" },
  { name: "mari-reviewer-another-flex-1", role: "reviewer", game: "another" },
]

writeFileSync(join(ROOT, "action.txt"), "Mara opens the gate\n\n")
writeFileSync(join(ROOT, "empty.txt"), "\n\n")

const PLAYED = {
  partOfCollections: ["story-played/the-saga"],
  position: 3,
  unit: UNIT,
  turnStatus: `${turnStatus.slug}/player`,
  beats: ["Mara opens the gate"],
  issues: ['"opens" - it was locked'],
  reviewedBy: ["story-reviewer/voice"],
  lore: ["world-place/the-hall"],
  characters: ["character-player/mara"],
  ownLength: 4,
  prose: "txt",
}

function turnAt(more: Record<string, unknown> = {}): Turn {
  return { at: AT, slug: SLUG, value: { ...PLAYED, ...more } }
}

type Seen = {
  readonly folded: Naming[]
  readonly asked: Asking[]
  readonly stops: string[]
  readonly notices: string[]
}

function seen(): Seen {
  return { folded: [], asked: [], stops: [], notices: [] }
}

function reachOver(turn: Turn, into: Seen, latest = SLUG): Rewinding {
  return {
    turnAt: (_root, slug) => (slug === turn.slug ? turn : null),
    reviewersIn: () => [],
    seatOf: () => null,
    storyOf: () => ({ title: "The Saga", master: MASTER }),
    rulesAt: () => "style/style-rule/pages",
    fold: (_root, naming) => {
      into.folded.push(naming)
      return []
    },
    start: async () => "",
    stop: (_root, name) => {
      into.stops.push(name)
      return undefined
    },
    notify: async (to, body) => {
      into.notices.push(`${to}: ${body}`)
      return null
    },
    turnsOf: () => [
      { at: "stories/the-saga/turns/the-saga-00-002.story-turn-played.ts", slug: "x", position: 2 },
      { at: AT, slug: latest, position: 3 },
    ],
    seatsIn: () => SEATS,
    present: (_root, path) => path === PROSE_AT || path === ROLLS_AT,
  }
}

async function rewoundBy(argv: readonly string[], reach: Rewinding, into: Seen) {
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

test("a rewind clears what the turn made, keeps its action and takes its files in one landing", async () => {
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
    turnStatus: `${turnStatus.slug}/world-builder`,
    action: "I open the gate",
  })
  expect(into.asked).toEqual([taking(PROSE_AT), taking(ROLLS_AT)])
})

test("a rewind stops the game's reviewer and writer seats and tells its game master and world builder", async () => {
  const into = seen()
  await rewoundBy([], reachOver(turnAt({ action: "I open the gate" }), into), into)
  expect(into.stops).toEqual(["mari-reviewer-the-saga-flex-1", "mari-writer-the-saga"])
  expect(into.notices).toEqual([
    `${MASTER}: The turn \`${AT}\` is at world-builder.`,
    `${BUILDER}: The turn \`${AT}\` is at world-builder.`,
  ])
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
