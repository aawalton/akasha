import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type {
  Seated,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Unwinding } from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"

export const SLUG = "the-saga-00-003"

export const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

export const PROSE_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.prose.txt`

export const OUTCOMES_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.outcomes.jsonl`

export const MASTER = "mari-game-master-the-saga"

export const BUILDER = "mari-world-builder-the-saga"

export const WRITER = "mari-writer-the-saga"

export const UNIT = `${unit.slug}/${words.slug}`

const SEATS: readonly Seated[] = [
  { name: MASTER, role: "game-master", game: "the-saga" },
  { name: BUILDER, role: "world-builder", game: "the-saga" },
  { name: "mari-reviewer-the-saga-flex-1", role: "reviewer", game: "the-saga" },
  { name: WRITER, role: "writer", game: "the-saga" },
  { name: "mari-story-recorder-the-saga-flex-1", role: "story-recorder", game: "the-saga" },
  { name: "mari-reviewer-another-flex-1", role: "reviewer", game: "another" },
]

const PLAYED = {
  partOfCollections: ["story-played/the-saga"],
  position: 3,
  unit: UNIT,
  stepStatus: `${stepStatus.slug}/player`,
  beats: ["Mara opens the gate"],
  issues: ['"opens" - it was locked'],
  reviewedBy: ["story-reviewer/voice"],
  lore: ["world-place/the-hall"],
  characters: ["character-player/mara"],
  ownLength: 4,
  prose: "txt",
  endsAt: "2026-09-26T09:05:00.000Z",
}

export function turnAt(more: Record<string, unknown> = {}): Turn {
  return { at: AT, slug: SLUG, value: { ...PLAYED, ...more } }
}

export type Seen = {
  readonly folded: Naming[]
  readonly asked: Asking[]
  readonly stops: string[]
  readonly notices: string[]
  readonly releases: string[]
}

export function seen(): Seen {
  return { folded: [], asked: [], stops: [], notices: [], releases: [] }
}

const MADE_BY = [
  { commit: "c9", subject: `${SLUG} moves from recorders to player`, paths: [AT] },
  { commit: "c1", subject: `${SLUG} is made from the player's action`, paths: [AT] },
]

export function reachOver(turn: Turn, into: Seen, latest = SLUG): Unwinding {
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
    start: async () => ({ how: "started", name: "" }),
    stop: (_root, name) => {
      into.stops.push(name)
      return undefined
    },
    notify: async (to, body) => {
      into.notices.push(`${to}: ${body}`)
      return null
    },
    loreGathered: () => ({ values: {}, named: [] }),
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
    foldersOf: () => ({ story: "stories/the-saga/", world: "world/" }),
    commitsOn: (_root, range) => (range === "HEAD" ? MADE_BY : []),
    addedOn: () => "c1",
    appendsOnly: () => false,
    bodyThen: () => null,
    bodyNow: () => null,
    besideOnDisk: () => [],
  }
}

const SCORING = "world-check/the-saga-scoring"

export const HER = "world-relationship/the-saga-her"

export const HER_AT = "stories/the-saga/relationships/the-saga-her.world-relationship.ts"

export function scoredLine(change: number): string {
  const reading = { character: "character-other/the-saga-her" }
  return JSON.stringify({ check: SCORING, reading, answered: { change } })
}

export function scoredOver(turn: Turn, into: Seen, lines: readonly string[]): Unwinding {
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
