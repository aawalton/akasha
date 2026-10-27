import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

export type FlowPart = "event" | "changes" | "prose" | "memory" | "pictured"

export type Ready = { readonly turn: number; readonly beat: number }

export const AFTER: Readonly<{ [part in FlowPart]: FlowPart | null }> = {
  event: null,
  changes: "event",
  prose: "changes",
  memory: "prose",
  pictured: "prose",
}

const SHOWN_BY: readonly FlowPart[] = ["changes", "prose"]

export function filledOn(held: Beats, beat: number, part: FlowPart): boolean {
  if (beat < 1 || beat > held.beats.length) return false
  if (part === "event") return true
  if (part === "prose") return (held.prose ?? []).some((one) => one.beat === beat)
  const listed = part === "pictured" ? (held.pictured ?? []) : held[part]
  if (listed.some((one) => one.beat === beat)) return true
  return (held.none ?? []).some((one) => one.beat === beat && one.part === part)
}

export function filledThrough(held: Beats, part: FlowPart): number {
  let beat = 0
  while (filledOn(held, beat + 1, part)) beat += 1
  return beat
}

export function doneBy(held: Beats, part: FlowPart): boolean {
  return held.beats.length > 0 && filledThrough(held, part) === held.beats.length
}

export function refusedAt(held: Beats): number | null {
  const beats = (held.issues ?? []).map((one) => one.beat)
  return beats.length === 0 ? null : Math.min(...beats)
}

export function readyFor(held: Beats, part: FlowPart): number | null {
  const before = AFTER[part]
  if (before === null) return null
  const next = filledThrough(held, part) + 1
  if ((held.issues ?? []).some((one) => one.beat === next)) return null
  return filledOn(held, next, before) ? next : null
}

export function shownThrough(held: Beats): number {
  return Math.min(...SHOWN_BY.map((part) => filledThrough(held, part)))
}

export function readyAcross(turns: readonly Beats[], part: FlowPart): Ready | null {
  const turn = turns.findIndex((one) => !doneBy(one, part))
  const held = turns[turn]
  if (held === undefined) return null
  const beat = readyFor(held, part)
  return beat === null ? null : { turn, beat }
}
