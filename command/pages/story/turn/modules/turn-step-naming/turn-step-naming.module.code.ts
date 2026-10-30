import type { FlowPart } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"

export const LORE_STEP = "lore"

export const BEATS_STEP = "beats"

export const PROSE_STEP = "prose"

const PART_STEP: Readonly<Record<FlowPart, string>> = {
  event: "restate",
  changes: "numbers",
  prose: PROSE_STEP,
  memory: "memory",
  pictured: "pictures",
}

export function partStep(part: FlowPart): string {
  return PART_STEP[part]
}

export function reviewStep(reviewer: string): string {
  return `review ${reviewer}`
}

export function recordStep(recorder: string): string {
  return `record ${recorder}`
}
