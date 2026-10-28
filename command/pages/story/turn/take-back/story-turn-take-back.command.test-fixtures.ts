import {
  GAME,
  MASTER,
  SEATS,
  type Seen,
} from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.test-fixtures.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { unplayingOver } from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.test-fixtures.ts"
import type { TakingBack } from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export const SLUG = "the-saga-00-003"

const STORY = "worlds/saga/stories/played/the-saga/"

export const AT = `${STORY}turns/${SLUG}.story-turn-played.ts`

export const PROSE_AT = `${STORY}turns/${SLUG}.story-turn-played.prose.txt`

export const OUTCOMES_AT = `${STORY}turns/${SLUG}.story-turn-played.outcomes.jsonl`

export const BEATS_AT = `${STORY}turns/${SLUG}.story-turn-played.beats.jsonl`

export const BEFORE_AT = `${STORY}turns/the-saga-00-002.story-turn-played.ts`

export const HER = "world-relationship/the-saga-her"

export const HER_AT = `${STORY}mechanics/relationships/the-saga-her.world-relationship.ts`

export const ELSEWHERE_AT = "personas/her.persona.ts"

export const ELSEWHERE = "persona/her"

export const PURSE = "metric-character-currency/mara"

export const PURSE_AT = `${STORY}purses/mara.metric-character-currency.ts`

const PAID = { page: PURSE, note: "paid the gatekeeper", key: "value", from: 9, to: 4 }

const BEATS_TEXT = `${JSON.stringify({ beat: 1, event: "Mara pays the gatekeeper.", changes: [PAID] })}\n`

export function turnAt(status: TurnStep = "player"): Turn {
  return {
    at: AT,
    slug: SLUG,
    value: {
      partOfCollections: [`story-played/${GAME}`],
      position: 3,
      stepStatus: `${stepStatus.slug}/${status}`,
      action: "I open the gate",
      beats: "jsonl",
    },
  }
}

type Story = {
  readonly latest?: string
  readonly outcomes?: string
  readonly drafts?: string[]
  readonly draftRefused?: string
  readonly purse?: number
}

const SCORED = { relationshipPoints: 12 }

const ELSEWHERE_SCORED = { relationshipPoints: 5 }

export function reachOver(turn: Turn, into: Seen, story: Story = {}): TakingBack {
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
    readyPushed: async () => "a take-back pushes nothing",
    turnsOf: () => [
      { at: BEFORE_AT, slug: "the-saga-00-002", position: 2 },
      { at: AT, slug: story.latest ?? SLUG, position: 3 },
    ],
    seatsIn: () => SEATS,
    present: (_root, path) => path === PROSE_AT || path === OUTCOMES_AT,
    textIn: (_root, path) => {
      if (path === OUTCOMES_AT) return story.outcomes ?? ""
      return path === BEATS_AT ? BEATS_TEXT : ""
    },
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
    besideOnDisk: () => [BEATS_AT, PROSE_AT, OUTCOMES_AT],
    unplayingOf: () =>
      unplayingOver({ [PURSE]: { at: PURSE_AT, value: { value: story.purse ?? 4 } } }),
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
