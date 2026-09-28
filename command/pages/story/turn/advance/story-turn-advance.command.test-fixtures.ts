import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { loreLine } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type {
  Reach,
  Seated,
  Starting,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

export const SLUG = "the-saga-00-003"

export const AT = `stories/the-saga/turns/${SLUG}.story-turn-played.ts`

export const MASTER = "mari-game-master-the-saga"

export const MARA_LORE = "world/lore/mara.lore.ts"

export const MARA_HEALTH = "stories/the-saga/mechanics/health/mara.the-saga-health.ts"

export const LANDED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

export const REVIEWERS = [
  {
    slug: continuity.slug,
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

export const REVIEWED = REVIEWERS.map((one) => `${storyReviewer.slug}/${one.slug}`)

export const RECORDERS = [
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

export const DRAFTED: readonly FileChange[] = [
  { kind: "add", path: "lore/a-hall.lore.ts", content: "cast\n" },
  { kind: "add", path: "lore/the-gate.lore.ts", content: "memory\n" },
]

export const MOVED: readonly FileChange[] = DRAFTED.slice(1)

const TURN_TEXT = `export const theSaga00003 = {
  id: "01a0e393-a07a-7840-b8b4-26277498779c",
  type: "page-type/story-turn-played",
  slug: "${SLUG}",
  partOfCollections: ["story-played/the-saga"],
  turnStatus: "turn-status/recorders",
  recordedBy: ["story-recorder/cast"],
} as const
`

export const ENDED: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: `  recordedBy: ["story-recorder/cast"],\n`,
  contentTo: `  recordedBy: ["story-recorder/cast"],\n  endsAt: "2026-09-26T09:05:00.000Z",\n`,
}

export type Seen = {
  readonly folded: Naming[]
  readonly starts: Starting[]
  readonly stops: string[]
  readonly notices: string[]
  readonly keeps: string[]
  readonly unkeeps: (readonly FileChange[])[]
  readonly givenBack: (readonly FileChange[])[]
  readonly releases: string[]
  readonly landings: (readonly FileChange[])[]
  readonly pushes: string[]
  readonly steps: string[]
}

export function seen(): Seen {
  return {
    folded: [],
    starts: [],
    stops: [],
    notices: [],
    keeps: [],
    unkeeps: [],
    givenBack: [],
    releases: [],
    landings: [],
    pushes: [],
    steps: [],
  }
}

export function reachOver(
  turn: Turn,
  seat: Seated | null,
  into: Seen,
  recorders: typeof RECORDERS = RECORDERS
): Reach {
  return {
    hold: async (_root, at, act) => {
      into.steps.push(`hold ${at}`)
      const done = await act()
      into.steps.push(`free ${at}`)
      return done
    },
    turnAt: (_root, slug) => {
      into.steps.push("read")
      return slug === turn.slug ? turn : null
    },
    reviewersIn: () => REVIEWERS,
    recordersIn: () => recorders,
    keep: (_root, agentId, at) => {
      into.keeps.push(`${agentId ?? ""} ${at}`)
      return MOVED
    },
    kept: () => DRAFTED,
    unkeep: (_root, _at, rows) => {
      into.unkeeps.push(rows)
      return null
    },
    giveBack: (_root, _agentId, _at, rows) => {
      into.givenBack.push(rows)
      return null
    },
    release: (_root, at) => {
      into.releases.push(at)
      return true
    },
    seatOf: () => seat,
    storyOf: () => ({ title: "The Saga", master: MASTER }),
    fold: (_root, naming) => {
      into.folded.push(naming)
      return []
    },
    textIn: () => TURN_TEXT,
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
    loreOf: () => [MARA_LORE],
    changedLore: () => [],
    writtenOn: () => [MARA_HEALTH],
    readyPushed: async (_root, game, at) => {
      into.pushes.push(`${game} ${at}`)
      return null
    },
  }
}

const BUILDER = "mari-world-builder-the-saga"

export const WRITER = "mari-writer-the-saga"

export function toldAll(step: TurnStep): string[] {
  const said = `The turn \`${AT}\` is at ${step}.`
  const body = step === "writer" ? `${said}\n\n${loreLine([MARA_LORE])}` : said
  return [MASTER, BUILDER, WRITER].map((to) => `${to}: ${body}`)
}

export function turnAt(status: TurnStep, more: Record<string, unknown> = {}): Turn {
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

export type Race = { readonly reach: Reach; readonly landing: Landing; readonly now: () => Turn }

export function racing(start: Turn): Race {
  const into = seen()
  let turn = start
  let queue: Promise<unknown> = Promise.resolve()
  const reach: Reach = {
    ...reachOver(start, seatOf("reviewer", "mari-reviewer-the-saga-flex-1"), into),
    turnAt: () => turn,
    hold: async (_root, _at, act) => {
      const run = queue.then(act)
      queue = run.catch(() => undefined)
      return await run
    },
  }
  const landing: Landing = async () => {
    turn = { ...turn, value: { ...turn.value, ...(into.folded.at(-1)?.values ?? {}) } }
    await Promise.resolve()
    return LANDED
  }
  return { reach, landing, now: () => turn }
}

export function seatOf(role: string, name: string): Seated {
  return { name, role, game: "the-saga" }
}

export function landingInto(into: Seen, refusals: readonly string[] = []): Landing {
  return async (_root, _asked, _message, writing) => {
    into.landings.push(writing?.kept ?? [])
    into.steps.push("land")
    return refusals.length === 0 ? LANDED : { refusals, code: DATA }
  }
}
