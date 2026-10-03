import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { advanced as advancedOver } from "akasha/story/world/stories/played/turns/modules/turn-advancing/turn-advancing.module.code.ts"
import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"
import type {
  Advanced,
  Caller,
  Handed,
  Held,
  Moved,
  TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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
  return `${stepStatus.slug}/${step}`
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

const ADMITTED: Admitted = {
  types: ["world-character", "character-player", "character-other"],
  filed: (address) => address !== "character-other/nobody",
}

export function advanced(
  held: Held,
  caller: Caller,
  handed: Handed,
  reviewers: readonly string[],
  recorders: readonly string[] = RECORDING,
  cast: readonly Character[] = [],
  admitted: Admitted = ADMITTED
): Advanced {
  return advancedOver(held, caller, handed, reviewers, recorders, cast, admitted)
}

export function movedOf(said: Advanced): Moved {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

export function refusalOf(said: Advanced): string {
  if (!("refused" in said)) throw new Error(`moved to ${said.status}`)
  return said.refused
}
