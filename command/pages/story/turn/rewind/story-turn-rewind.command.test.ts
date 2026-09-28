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

const OUTCOMES_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.outcomes.jsonl`

const MASTER = "mari-game-master-the-saga"

const BUILDER = "mari-world-builder-the-saga"

const WRITER = "mari-writer-the-saga"

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
  { name: WRITER, role: "writer", game: "the-saga" },
  { name: "mari-story-recorder-the-saga-flex-1", role: "story-recorder", game: "the-saga" },
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
  endsAt: "2026-09-26T09:05:00.000Z",
}

function turnAt(more: Record<string, unknown> = {}): Turn {
  return { at: AT, slug: SLUG, value: { ...PLAYED, ...more } }
}

type Seen = {
  readonly folded: Naming[]
  readonly asked: Asking[]
  readonly stops: string[]
  readonly notices: string[]
  readonly releases: string[]
}

function seen(): Seen {
  return { folded: [], asked: [], stops: [], notices: [], releases: [] }
}

function reachOver(turn: Turn, into: Seen, latest = SLUG): Rewinding {
  return {
    hold: async (_root, _at, act) => await act(),
    turnAt: (_root, slug) => (slug === turn.slug ? turn : null),
    reviewersIn: () => [],
    recordersIn: () => [],
    keep: () => [],
    kept: () => [],
    unkeep: () => null,
    giveBack: () => null,
    release: (_root, at) => {
      into.releases.push(at)
      return true
    },
    seatOf: () => null,
    storyOf: () => ({ title: "The Saga", master: MASTER }),
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
    loreOf: () => [],
    changedLore: () => [],
    writtenOn: () => [],
    readyPushed: async () => "a rewind pushes nothing",
    turnsOf: () => [
      { at: "stories/the-saga/turns/the-saga-00-002.story-turn-played.ts", slug: "x", position: 2 },
      { at: AT, slug: latest, position: 3 },
    ],
    seatsIn: () => SEATS,
    present: (_root, path) => path === PROSE_AT || path === OUTCOMES_AT,
    textIn: () => "",
    addingOf: async () => () => [],
    pageAt: () => null,
  }
}

const SCORING = "world-check/the-saga-scoring"

const HER = "world-relationship/the-saga-her"

const HER_AT = "stories/the-saga/relationships/the-saga-her.world-relationship.ts"

function scoredLine(change: number): string {
  const reading = { character: "character-other/the-saga-her" }
  return JSON.stringify({ check: SCORING, reading, answered: { change } })
}

function scoredOver(turn: Turn, into: Seen, lines: readonly string[]): Rewinding {
  return {
    ...reachOver(turn, into),
    textIn: (_root, path) => (path === OUTCOMES_AT ? `${lines.join("\n")}\n` : ""),
    addingOf: async (_root, check) =>
      check === "the-saga-scoring"
        ? (_reading, answered) => {
            const by = (answered as { change: number }).change
            return [{ page: HER, key: "relationshipPoints", by }]
          }
        : null,
    pageAt: (_root, page) =>
      page === HER
        ? {
            at: HER_AT,
            pageTypeSlug: "world-relationship",
            slug: "the-saga-her",
            value: { relationshipPoints: 12 },
          }
        : null,
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
    turnStatus: `${turnStatus.slug}/world-builder`,
    action: "I open the gate",
  })
  expect(into.asked).toEqual([taking(PROSE_AT), taking(OUTCOMES_AT)])
})

test("a rewind clears which recorders ran and discards the edits they kept beside the turn", async () => {
  const into = seen()
  const turn = turnAt({
    action: "I open the gate",
    turnStatus: `${turnStatus.slug}/recorders`,
    recordedBy: ["story-recorder/cast"],
  })
  const answer = await rewoundBy([], reachOver(turn, into), into)
  expect(answer.refusals).toEqual([])
  expect(into.folded[0]?.values["recordedBy"]).toBeUndefined()
  expect(into.releases).toEqual([AT])
  expect(answer.report).toContain("discarded\tthe recorders' kept edits")
})

test("a rewind stops the game's reviewer and recorder seats and tells its game master, world builder and writer", async () => {
  const into = seen()
  await rewoundBy([], reachOver(turnAt({ action: "I open the gate" }), into), into)
  expect(into.stops).toEqual([
    "mari-reviewer-the-saga-flex-1",
    "mari-story-recorder-the-saga-flex-1",
  ])
  expect(into.notices).toEqual([
    `${MASTER}: The turn \`${AT}\` is at world-builder.`,
    `${BUILDER}: The turn \`${AT}\` is at world-builder.`,
    `${WRITER}: The turn \`${AT}\` is at world-builder.`,
  ])
})

test("each seat told is named, by path, the lore pages it read that have changed since", async () => {
  const into = seen()
  const hall = "world/lore/the-hall.lore.ts"
  const reach: Rewinding = {
    ...reachOver(turnAt({ action: "I open the gate" }), into),
    changedLore: (_root, seat) => (seat === WRITER ? [hall] : []),
  }
  await rewoundBy([], reach, into)
  const said = `The turn \`${AT}\` is at world-builder.`
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
    turnStatus: `${turnStatus.slug}/world-builder`,
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

test("a rewind of a scored turn takes back what its landed outcomes added, in the same landing", async () => {
  const into = seen()
  const turn = turnAt({ action: "I open the gate" })
  const reach = scoredOver(turn, into, [scoredLine(3), scoredLine(-1)])
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
  const turn = turnAt({ action: "I open the gate", turnStatus: `${turnStatus.slug}/recorders` })
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
