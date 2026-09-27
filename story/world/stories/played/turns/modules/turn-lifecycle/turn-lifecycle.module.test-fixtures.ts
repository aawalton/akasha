import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import {
  type Advanced,
  advanced as advancedOver,
  type Caller,
  type Handed,
  type Held,
  type Moved,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const GAME = "the-saga"

export const VOICE = "voice"

export const TWO = [continuity.slug, VOICE]

export const CAST = "cast"

const RECORDING = [memory.slug, CAST]

export const BUILDER: Caller = { role: "world-builder", game: GAME }

export const MASTER: Caller = { role: "game-master", game: GAME }

export const REVIEWER: Caller = { role: "reviewer", game: GAME }

export const WRITER: Caller = { role: "writer", game: GAME }

export const RECORDER: Caller = { role: "story-recorder", game: GAME }

export const WORDS = `${unit.slug}/${words.slug}`

export const PROSE = {
  kind: "prose",
  prose: "Mara opens the gate.",
  characters: ["character-player/mara", "character-other/ceri"],
} as const

export function at(step: TurnStep): string {
  return `${turnStatus.slug}/${step}`
}

export function by(reviewer: string): string {
  return `${storyReviewer.slug}/${reviewer}`
}

export function recordedBy(recorder: string): string {
  return `${storyRecorder.slug}/${recorder}`
}

export function heldAt(status: TurnStep, more: Partial<Held> = {}): Held {
  return {
    game: GAME,
    status,
    lore: [],
    issues: [],
    reviewedBy: [],
    recordedBy: [],
    written: false,
    ...more,
  }
}

export function advanced(
  held: Held,
  caller: Caller,
  handed: Handed,
  reviewers: readonly string[],
  recorders: readonly string[] = RECORDING
): Advanced {
  return advancedOver(held, caller, handed, reviewers, recorders)
}

export function movedOf(said: Advanced): Moved {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

export function refusalOf(said: Advanced): string {
  if (!("refused" in said)) throw new Error(`moved to ${said.status}`)
  return said.refused
}
