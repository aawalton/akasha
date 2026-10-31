import {
  BEATS_STEP,
  LORE_STEP,
  PROSE_STEP,
  partStep,
  recordStep,
  reviewStep,
} from "akasha/command/pages/story/turn/modules/turn-step-naming/turn-step-naming.module.code.ts"
import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import type { Ended } from "akasha/story/engine/modules/phase-timing/phase-timing.module.code.ts"
import { recorderOf } from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import {
  BEATS,
  type Handed,
  type Held,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

type Stepped = Pick<Ended, "step" | "beat">

type Recorded = Extract<Handed, { readonly kind: "record" }>

const RECORDED: readonly FlowPart[] = ["changes", "memory", "pictured"]

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

function recordNamed(held: Held, handed: Recorded): string {
  const flowing = held.status === BEATS || held.memoryOwed === true
  const part = flowing ? RECORDED.find((one) => recorderOf(one) === handed.recorder) : undefined
  return part === undefined ? recordStep(handed.recorder) : partStep(part)
}

function stepNamed(held: Held, handed: Handed): string {
  if (handed.kind === "review") return reviewStep(handed.reviewer)
  if (handed.kind === "record") return recordNamed(held, handed)
  if (handed.kind === "beats") return handed.beat === undefined ? BEATS_STEP : partStep("event")
  if (handed.kind === "lore") return LORE_STEP
  return PROSE_STEP
}

export function stepTimed(held: Held, handed: Handed): Stepped {
  if (held.oneSeat !== true) return {}
  const beat = held.memoryOwed === true ? null : beatOf(handed)
  return { step: stepNamed(held, handed), ...(beat === null ? {} : { beat }) }
}
