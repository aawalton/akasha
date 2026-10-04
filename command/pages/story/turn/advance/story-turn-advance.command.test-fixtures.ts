import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Crossing } from "akasha/command/pages/story/turn/advance/modules/turn-crossed/turn-crossed.module.code.ts"
import {
  type Admitting,
  type Casting,
  storyTurnAdvance,
  type Timed,
  type Timing,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import type { Starting } from "akasha/command/pages/story/turn/modules/turn-job-handing/turn-job-handing.module.code.ts"
import { loreLine } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import type {
  Reach,
  Seated,
  Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import type { TurnStep } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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

const REVIEWERS = [
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
  stepStatus: "step-status/recorders",
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
      return {
        how: "started",
        name: `${starting.persona}-${starting.role}-${starting.game}${flex}`,
      }
    },
    stop: (_root, name) => {
      into.stops.push(name)
      return undefined
    },
    notify: async (to, body) => {
      into.notices.push(`${to}: ${body}`)
      return null
    },
    loreGathered: () => ({ values: {}, named: [MARA_LORE] }),
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
      stepStatus: `${stepStatus.slug}/${status}`,
      ...more,
    },
  }
}

type Race = { readonly reach: Reach; readonly landing: Landing; readonly now: () => Turn }

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

type Stored = {
  readonly reach: (turn: Turn) => Reach
  readonly store: FileChange[]
  readonly as: (recorder: string) => void
}

export function storing(into: Seen, rows: Readonly<Record<string, readonly FileChange[]>>): Stored {
  const store: FileChange[] = []
  let caller = ""
  const reach = (turn: Turn): Reach => ({
    ...reachOver(turn, seatOf("story-recorder", "mari-story-recorder-the-saga-flex-1"), into),
    keep: () => {
      const mine = rows[caller] ?? []
      store.push(...mine)
      return mine
    },
    kept: () => [...store],
    release: () => store.splice(0).length > 0,
  })
  return { reach, store, as: (recorder) => (caller = recorder) }
}

export const CHAPTER_AT = "stories/the-saga/chapters/the-saga-0002.story-chapter-written.ts"

export const CHAPTER_ARGV = ["--chapter", "story-chapter-written/the-saga-0002"]

export function chapterReach(
  into: Seen,
  status: TurnStep = "game-master",
  seat: Seated = seatOf("game-master", MASTER),
  more: Record<string, unknown> = {}
): Reach {
  const chapter = {
    at: CHAPTER_AT,
    slug: "the-saga-0002",
    value: {
      story: "story-written/the-saga",
      stepStatus: `${stepStatus.slug}/${status}`,
      ...more,
    },
  }
  return {
    ...reachOver(turnAt(status), seat, into),
    chapterAt: (_root, slug) => (slug === chapter.slug ? chapter : null),
  }
}

export function pushingReach(into: Seen, pushed: string[]): Reach {
  return {
    ...reachOver(turnAt("player"), seatOf("game-master", MASTER), into),
    readyPushed: async (_root, game, at, noun) => {
      pushed.push(`${noun} ${game} ${at}`)
      return null
    },
  }
}

export const CALLED = "akasha story turn advance"

export const ROOT = mkdtempSync(join("/var/tmp", "story-turn-advance-test-"))

export const GIVEN: Given = {
  root: ROOT,
  calledAs: CALLED,
  from: "",
  writer: null,
  agentId: "an-agent",
}

writeFileSync(join(ROOT, "beats.txt"), "Mara opens the gate\n\nThe hall is dark\n")

export const PLANNED_BODY = beatsWritten({
  beats: ["Mara opens the gate", "The hall is dark"],
  scenes: [],
  changes: [],
  memory: [],
})
writeFileSync(join(ROOT, "issues.txt"), '"opens" - it was locked\n')
writeFileSync(join(ROOT, "prose.txt"), "Mara opens the gate.\n")

export const CHAPTER_BEATS = join(ROOT, "chapter-beats.txt")

export function beatsOf(count: number): string[] {
  return Array.from({ length: count }, (_, at) => `Mara takes step ${at + 1}`)
}

writeFileSync(CHAPTER_BEATS, `${beatsOf(50).join("\n")}\n`)

const ADMITTED = {
  types: ["world-character", "character-player", "character-other"],
  filed: () => true,
}

export async function advancedBy(
  argv: readonly string[],
  reach: Reach,
  landing: Landing = async () => LANDED,
  timed: Timed = () => undefined,
  timing: Timing = () => null,
  casting: Casting = () => [],
  admitting: Admitting = () => ADMITTED,
  crossing: Crossing = () => null
) {
  return await storyTurnAdvance(
    ["--turn", `story-turn-played/${SLUG}`, ...argv],
    GIVEN,
    landing,
    reach,
    timed,
    timing,
    casting,
    admitting,
    crossing
  )
}

export function landingGiven(given: unknown[]): Landing {
  return async (_root, some) => {
    given.push(...some.map((one) => one.given))
    return LANDED
  }
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
