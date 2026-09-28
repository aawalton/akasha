import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Cancelling } from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.code.ts"
import type {
  Seated,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

export const GAME = "the-saga"

export const SLUG = "the-saga-00-056"

export const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

export const PROSE_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.prose.txt`

export const OUTCOMES_AT = `stories/the-saga/turns/${SLUG}.story-turn-played.outcomes.jsonl`

export const MASTER = "mari-game-master-the-saga"

export const BUILDER = "mari-world-builder-the-saga"

export const WRITER = "mari-writer-the-saga"

export const REVIEWER = "mari-reviewer-the-saga-flex-1"

export const RECORDER = "mari-story-recorder-the-saga-flex-1"

export const SEATS: readonly Seated[] = [
  { name: MASTER, role: "game-master", game: GAME },
  { name: BUILDER, role: "world-builder", game: GAME },
  { name: REVIEWER, role: "reviewer", game: GAME },
  { name: WRITER, role: "writer", game: GAME },
  { name: RECORDER, role: "story-recorder", game: GAME },
  { name: "mari-reviewer-another-flex-1", role: "reviewer", game: "another" },
]

export const HEALTH_AT = "stories/the-saga/mechanics/health/mara.the-saga-health.ts"

export const HEALTH_HISTORY_AT =
  "stories/the-saga/mechanics/health/mara.the-saga-health.history.jsonl"

export const HEALTH: Value = {
  id: "01a0e363-5bac-748a-b101-1da77aa50044",
  type: "page-type/the-saga-health",
  slug: "mara",
  value: 7,
  history: "jsonl",
}

export const HEALTH_KEPT = '{"turn":1,"value":12}\n{"turn":54,"value":10}\n'

export const HEALTH_HISTORY = `${HEALTH_KEPT}{"turn":56,"value":9}\n{"turn":56,"value":7}\n`

export const CANCEL_NOTICE = `The turn \`${AT}\` is cancelled.`

export const LANDED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

export function turnAt(status: TurnStep, more: Record<string, unknown> = {}): Turn {
  return {
    at: AT,
    slug: SLUG,
    value: {
      partOfCollections: [`story-played/${GAME}`],
      position: 56,
      turnStatus: `${turnStatus.slug}/${status}`,
      action: "I open the gate",
      ...more,
    },
  }
}

export type Seen = {
  readonly folded: Naming[]
  readonly asked: Asking[]
  readonly stops: string[]
  readonly notices: string[]
  readonly releases: string[]
  readonly steps: string[]
}

export function seen(): Seen {
  return { folded: [], asked: [], stops: [], notices: [], releases: [], steps: [] }
}

export type Story = {
  readonly written?: readonly string[]
  readonly present?: readonly string[]
  readonly latest?: string
  readonly seat?: Seated | null
  readonly history?: string
}

export function reachOver(turn: Turn, into: Seen, story: Story = {}): Cancelling {
  const present = story.present ?? [PROSE_AT, OUTCOMES_AT]
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
    seatOf: () => story.seat ?? null,
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
    writtenOn: () => story.written ?? [],
    readyPushed: async () => "a cancel pushes nothing",
    turnsOf: () => [
      {
        at: "stories/the-saga/turns/the-saga-00-055.story-turn-played.ts",
        slug: "x",
        position: 55,
      },
      { at: AT, slug: story.latest ?? SLUG, position: 56 },
    ],
    seatsIn: () => SEATS,
    present: (_root, path) => present.includes(path),
    textIn: (_root, path) => (path === HEALTH_HISTORY_AT ? (story.history ?? HEALTH_HISTORY) : ""),
    addingOf: async () => () => [],
    pageAt: () => null,
    valueAt: (_root, path) => (path === HEALTH_AT ? HEALTH : null),
  }
}

export function landingInto(into: Seen): Landing {
  return async (_root, asking) => {
    into.asked.push(...asking)
    into.steps.push("land")
    return LANDED
  }
}
