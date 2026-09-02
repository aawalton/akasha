import type { AutoQuestTraceEntry } from "@akasha/temper-quests-trace/auto-quest-trace"

export const TRACE_CAP = 300

export interface AutoQuestTraceOption {
  readonly index: number
  readonly optionType: number
  readonly optionTypeName?: string
  readonly kind: string
  readonly important: boolean
  readonly chosenBefore: boolean
  readonly text: string
}

export function appendBounded(
  buffer: readonly AutoQuestTraceEntry[],
  entry: AutoQuestTraceEntry,
  cap: number
): AutoQuestTraceEntry[] {
  const next = [...buffer, entry]
  if (next.length <= cap) return next
  return next.slice(next.length - cap)
}
