import {
  GAME,
  MASTER,
  SEATS,
  type Seen,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import type { Commit } from "akasha/command/pages/story/turn/modules/turn-commits/turn-commits.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { TakingBack } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export const SLUG = "the-saga-00-003"

const WORLD = "worlds/saga/"

const STORY = `${WORLD}stories/played/the-saga/`

export const AT = `${STORY}turns/${SLUG}.story-turn-played.ts`

export const PROSE_AT = `${STORY}turns/${SLUG}.story-turn-played.prose.txt`

export const OUTCOMES_AT = `${STORY}turns/${SLUG}.story-turn-played.outcomes.jsonl`

export const BEFORE_AT = `${STORY}turns/the-saga-00-002.story-turn-played.ts`

export const HALL_AT = `${WORLD}lore/the-hall.lore.ts`

export const GATE_AT = `${WORLD}places/the-gate.place.ts`

export const HER_AT = `${STORY}mechanics/relationships/the-saga-her.world-relationship.ts`

export const HER = "world-relationship/the-saga-her"

export const HER_REFERENCES_AT = `${STORY}mechanics/relationships/the-saga-her.world-relationship.referenced-by.jsonl`

export const ELSEWHERE_AT = "personas/her.persona.ts"

export const ELSEWHERE = "persona/her"

export const OTHER_AT = `${WORLD}stories/played/another/turns/another-00-009.story-turn-played.ts`

export const MADE = "c1"

const MOVED = "c9"

const MOVED_SAID = `${SLUG} moves from recorders to player`

const MADE_SAID = `${SLUG} is made from the player's action`

const HISTORY: readonly Commit[] = [
  { commit: MOVED, subject: MOVED_SAID, paths: [AT] },
  { commit: "c5", subject: `${SLUG} moves from game-master to writer`, paths: [AT] },
  { commit: MADE, subject: MADE_SAID, paths: [AT] },
]

export const RUN: readonly Commit[] = [
  { commit: MOVED, subject: MOVED_SAID, paths: [AT, HALL_AT, HER_AT, HER_REFERENCES_AT] },
  { commit: "c7", subject: "a message is read", paths: ["agent/messages/one.agent-message.ts"] },
  { commit: "c5", subject: `${SLUG} moves from writer to reviewers`, paths: [AT, PROSE_AT] },
  { commit: "c3", subject: "A fact of lore/the-gate is told", paths: [GATE_AT] },
  { commit: MADE, subject: MADE_SAID, paths: [AT] },
]

export const OWN_RUN: readonly Commit[] = [
  { commit: MOVED, subject: MOVED_SAID, paths: [AT, HER_AT] },
  { commit: "c4", subject: "another-00-009 moves", paths: [OTHER_AT] },
  { commit: MADE, subject: MADE_SAID, paths: [AT] },
]

const BEFORE: Readonly<Record<string, string>> = {
  [HALL_AT]: "the hall, before\n",
  [HER_AT]: "her, before\n",
  [HER_REFERENCES_AT]: "references, before\n",
}

export const NOW: Readonly<Record<string, string>> = {
  [AT]: "the turn\n",
  [PROSE_AT]: "the prose\n",
  [OUTCOMES_AT]: "",
  [HALL_AT]: "the hall, after\n",
  [GATE_AT]: "the gate\n",
  [HER_AT]: "her, after\n",
  [HER_REFERENCES_AT]: "references, after\n",
}

export function turnAt(status: TurnStep = "player"): Turn {
  return {
    at: AT,
    slug: SLUG,
    value: {
      partOfCollections: [`story-played/${GAME}`],
      position: 3,
      stepStatus: `${stepStatus.slug}/${status}`,
      action: "I open the gate",
    },
  }
}

const HALL_KNOWN = 'facts: ["The hall is cold."], knowers: []\n'

const HALL_RECORDED =
  'facts: ["The hall is cold.", "Mara hid the key under the hearth."], knowers: ["character-player/mara"]\n'

const GATE_RECORDED = "the gate, open since Mara passed\n"

export const RECORDED_BEFORE: Readonly<Record<string, string>> = {
  [HALL_AT]: HALL_KNOWN,
  [GATE_AT]: "the gate, shut\n",
}

export const RECORDED_NOW: Readonly<Record<string, string>> = {
  [AT]: "the turn\n",
  [PROSE_AT]: "the prose\n",
  [OUTCOMES_AT]: "",
  [HALL_AT]: HALL_RECORDED,
  [GATE_AT]: GATE_RECORDED,
}

const RECORDED_RUN: readonly Commit[] = [
  { commit: MOVED, subject: MOVED_SAID, paths: [AT] },
  {
    commit: "c8",
    subject: `${SLUG} moves from recorders to recorders`,
    paths: [AT, HALL_AT, GATE_AT],
  },
  { commit: "c5", subject: `${SLUG} moves from writer to reviewers`, paths: [AT, PROSE_AT] },
  { commit: MADE, subject: MADE_SAID, paths: [AT] },
]

export const RECORDED: Story = {
  run: RECORDED_RUN,
  now: RECORDED_NOW,
  ended: RECORDED_NOW,
  before: RECORDED_BEFORE,
}

type Story = {
  readonly latest?: string
  readonly run?: readonly Commit[]
  readonly now?: Readonly<Record<string, string>>
  readonly ended?: Readonly<Record<string, string>>
  readonly before?: Readonly<Record<string, string>>
  readonly appendOnly?: readonly string[]
  readonly outcomes?: string
  readonly drafts?: string[]
  readonly draftRefused?: string
}

const SCORED = { relationshipPoints: 12 }

const ELSEWHERE_SCORED = { relationshipPoints: 5 }

export function reachOver(turn: Turn, into: Seen, story: Story = {}): TakingBack {
  const now = story.now ?? NOW
  return {
    hold: async (_root, at, act) => {
      into.steps.push(`hold ${at}`)
      const done = await act()
      into.steps.push(`free ${at}`)
      return done
    },
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
    loreGathered: () => ({ values: {}, named: [] }),
    changedLore: () => [],
    writtenOn: () => [],
    readyPushed: async () => "a take-back pushes nothing",
    turnsOf: () => [
      { at: BEFORE_AT, slug: "the-saga-00-002", position: 2 },
      { at: AT, slug: story.latest ?? SLUG, position: 3 },
    ],
    seatsIn: () => SEATS,
    present: (_root, path) => path in now,
    textIn: (_root, path) => (path === OUTCOMES_AT ? (story.outcomes ?? "") : ""),
    addingOf: async (_root, check) =>
      check === "the-saga-scoring"
        ? (reading) => [
            { page: (reading as { page: string }).page, key: "relationshipPoints", by: 3 },
          ]
        : null,
    pageAt: (_root, page) => {
      if (page === HER) {
        return {
          at: HER_AT,
          pageTypeSlug: "world-relationship",
          slug: "the-saga-her",
          value: SCORED,
        }
      }
      if (page === ELSEWHERE) {
        return { at: ELSEWHERE_AT, pageTypeSlug: "persona", slug: "her", value: ELSEWHERE_SCORED }
      }
      return null
    },
    foldersOf: () => ({ story: STORY, world: WORLD }),
    commitsOn: (_root, range) => (range === "HEAD" ? HISTORY : (story.run ?? RUN)),
    addedOn: () => MADE,
    appendsOnly: (_root, path) => story.appendOnly?.includes(path) ?? false,
    bodyThen: (_root, commit, path) => {
      if (commit === `${MADE}^`) return (story.before ?? BEFORE)[path] ?? null
      const ended = commit === MOVED || commit === "HEAD"
      return ended ? ((story.ended ?? NOW)[path] ?? null) : null
    },
    bodyNow: (_root, path) => now[path] ?? null,
    besideOnDisk: () => [AT, PROSE_AT, OUTCOMES_AT],
    draft: (_root, game, action) => {
      if (story.draftRefused !== undefined) return story.draftRefused
      story.drafts?.push(`${game}: ${action}`)
      return null
    },
  }
}

export function scoredLine(page: string): string {
  const reading = { page, character: page }
  return JSON.stringify({ check: "world-check/the-saga-scoring", reading, answered: {} })
}
