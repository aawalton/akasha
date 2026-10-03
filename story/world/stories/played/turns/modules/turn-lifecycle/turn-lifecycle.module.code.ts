import { gameMaster } from "akasha/story/chapter/step-status/pages/game-master.step-status.ts"
import { mechanics } from "akasha/story/chapter/step-status/pages/mechanics.step-status.ts"
import { player } from "akasha/story/chapter/step-status/pages/player.step-status.ts"
import { recorders as recordersStatus } from "akasha/story/chapter/step-status/pages/recorders.step-status.ts"
import { reviewers as reviewersStatus } from "akasha/story/chapter/step-status/pages/reviewers.step-status.ts"
import { worldBuilder } from "akasha/story/chapter/step-status/pages/world-builder.step-status.ts"
import { writer } from "akasha/story/chapter/step-status/pages/writer.step-status.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import type { Pictured } from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"
import type {
  BeatScene,
  Planned,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

const TURN_STEPS = [
  worldBuilder.slug,
  gameMaster.slug,
  mechanics.slug,
  writer.slug,
  reviewersStatus.slug,
  recordersStatus.slug,
  player.slug,
] as const

export type TurnStep = (typeof TURN_STEPS)[number]

export const WORLD_BUILDER: TurnStep = worldBuilder.slug

export const GAME_MASTER: TurnStep = gameMaster.slug

export const MECHANICS: TurnStep = mechanics.slug

export const REVIEWERS: TurnStep = reviewersStatus.slug

export const WRITER: TurnStep = writer.slug

export const RECORDERS: TurnStep = recordersStatus.slug

export const PLAYER: TurnStep = player.slug

const MANY: readonly TurnStep[] = [REVIEWERS, RECORDERS]

export const STEP_SENDER = "story-step"

export const LONGEST_ACTION = 4000

const STEP_STATUS = stepStatus.slug

const PARTED = "/"

const BREAK = "\n"

const LINES = /\r?\n/

const LAST_NUMBER = /^(.*?)(\d+)$/

export type Handed =
  | { readonly kind: "lore"; readonly lore: readonly string[] }
  | {
      readonly kind: "beats"
      readonly beats: readonly string[]
      readonly scenes?: readonly BeatScene[]
    }
  | { readonly kind: "review"; readonly reviewer: string; readonly issues: readonly string[] }
  | { readonly kind: "prose"; readonly prose: string; readonly characters: readonly string[] }
  | {
      readonly kind: "record"
      readonly recorder: string
      readonly changes?: readonly BeatChange[]
      readonly issues?: readonly string[]
      readonly memory?: readonly Memory[]
      readonly pictured?: readonly Pictured[]
    }

export type Noun = "turn" | "chapter"

export const TURN: Noun = "turn"

export const CHAPTER: Noun = "chapter"

export type Held = {
  readonly game: string
  readonly noun?: Noun
  readonly status: TurnStep
  readonly lore: readonly string[]
  readonly issues: readonly string[]
  readonly reviewedBy: readonly string[]
  readonly recordedBy: readonly string[]
  readonly written: boolean
  readonly beats?: number
  readonly mechanicsIssues?: readonly string[]
  readonly mechanicsSentBack?: boolean
  readonly changes?: readonly BeatChange[]
  readonly memory?: readonly Memory[]
}

export type Caller = { readonly role: string | null; readonly game: string | null }

export type Start =
  | { readonly kind: "reviewer"; readonly reviewer: string }
  | { readonly kind: "recorder"; readonly recorder: string }
  | { readonly kind: "mechanics"; readonly recorder: string }

export type Moved = {
  readonly status: TurnStep
  readonly values: Readonly<Record<string, unknown>>
  readonly prose: string | null
  readonly planned: Planned | null
  readonly changes: readonly BeatChange[] | null
  readonly memory: readonly Memory[] | null
  readonly pictured?: readonly Pictured[] | null
  readonly starts: readonly Start[]
  readonly stopsCaller: boolean
  readonly landsKept: boolean
}

export type Advanced = Moved | { readonly refused: string }

export type Latest = {
  readonly slug: string
  readonly position: number
  readonly collections: readonly string[]
  readonly unit: string | null
  readonly status: TurnStep | null
}

export type Made =
  | { readonly slug: string; readonly values: Readonly<Record<string, unknown>> }
  | { readonly refused: string }

const WHO: Readonly<Record<TurnStep, string>> = {
  "world-builder": "the world builder",
  "game-master": "the game master",
  mechanics: "the mechanics recorder",
  writer: "the writer",
  reviewers: "the reviewers",
  recorders: "the recorders",
  player: "the player",
}

export function stepIn(value: unknown): TurnStep | null {
  if (typeof value !== "string") return null
  const slug = value.slice(value.lastIndexOf(PARTED) + 1)
  return TURN_STEPS.find((one) => one === slug) ?? null
}

export function statusOf(step: TurnStep): string {
  return `${STEP_STATUS}${PARTED}${step}`
}

export function bareOf(address: string): string {
  return address.slice(address.lastIndexOf(PARTED) + 1)
}

function isOf(step: TurnStep): string {
  return MANY.includes(step) ? "are" : "is"
}

export function workingSaid(step: TurnStep): string {
  const who = WHO[step]
  const opening = `${who.charAt(0).toUpperCase()}${who.slice(1)}`
  return `${opening} ${isOf(step)} working…`
}

export const STALL_AFTER_MS = 120_000

export function makingSaid(
  step: TurnStep,
  working: boolean,
  quietMs: number = Number.POSITIVE_INFINITY
): string {
  if (working || quietMs < STALL_AFTER_MS) return workingSaid(step)
  return `The turn has stalled: ${WHO[step]} ${isOf(step)} not working on it.`
}

export function linesIn(text: string): readonly string[] {
  return text
    .split(LINES)
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function noticeOf(
  turn: string,
  step: TurnStep,
  changed: readonly string[] = [],
  noun: Noun = TURN
): string {
  const said = `The ${noun} \`${turn}\` is at ${step}.`
  if (changed.length === 0) return said
  const listed = changed.map((one) => `- \`${one}\``)
  return [said, "", "These lore pages have changed since you last read them:", ...listed].join(
    BREAK
  )
}

export function slugAfter(slug: string): string | null {
  const found = LAST_NUMBER.exec(slug)
  if (found === null) return null
  const head = found[1] ?? ""
  const digits = found[2] ?? ""
  return `${head}${String(Number(digits) + 1).padStart(digits.length, "0")}`
}

export function latestOf<Of extends { readonly position: number }>(
  turns: readonly Of[]
): Of | null {
  return turns.toSorted((one, other) => other.position - one.position)[0] ?? null
}

export function makingRefused(latest: Latest | null): string | null {
  if (latest === null) return "This story has no turn yet for a new one to follow."
  const status = latest.status ?? PLAYER
  if (status === PLAYER) return null
  return `The last turn is still being made: ${WHO[status]} ${MANY.includes(status) ? "are" : "is"} working on it.`
}
