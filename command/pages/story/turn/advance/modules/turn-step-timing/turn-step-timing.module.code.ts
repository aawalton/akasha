import type { Ended } from "akasha/story/engine/modules/phase-timing/phase-timing.module.code.ts"
import type {
  Handed,
  Held,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

export type Stepped = Pick<Ended, "step" | "beat">

type Recorded = Extract<Handed, { readonly kind: "record" }>

const BEATS = "beats"

const EVENT = "event"

const CHANGES = "changes"

const MEMORY = "memory"

const PICTURED = "pictured"

const REVIEW = "review"

const RECORD = "record"

function beatsNamed(handed: Handed): readonly number[] {
  if (handed.kind === "prose") return (handed.beatProse ?? []).map((one) => one.beat)
  if (handed.kind !== "record") return []
  const named = [...(handed.changes ?? []), ...(handed.memory ?? []), ...(handed.pictured ?? [])]
  return named.map((one) => one.beat)
}

function beatOf(handed: Handed): number | null {
  if ("beat" in handed && handed.beat !== undefined) return handed.beat
  const named = [...new Set(beatsNamed(handed))]
  return named.length === 1 ? (named[0] ?? null) : null
}

function recordNamed(handed: Recorded, mechanics: readonly string[]): string {
  if (mechanics.includes(handed.recorder)) return CHANGES
  if ((handed.memory ?? []).length > 0) return MEMORY
  if ((handed.pictured ?? []).length > 0) return PICTURED
  return `${RECORD} ${handed.recorder}`
}

function stepNamed(handed: Handed, mechanics: readonly string[]): string {
  if (handed.kind === "review") return `${REVIEW} ${handed.reviewer}`
  if (handed.kind === "record") return recordNamed(handed, mechanics)
  if (handed.kind === "beats") return handed.beat === undefined ? BEATS : EVENT
  return handed.kind
}

export function stepTimed(held: Held, handed: Handed, mechanics: readonly string[]): Stepped {
  if (held.oneSeat !== true) return {}
  const beat = beatOf(handed)
  return { step: stepNamed(handed, mechanics), ...(beat === null ? {} : { beat }) }
}
