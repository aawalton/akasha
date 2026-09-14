export type WorkstationReading = {
  readonly processorPct: number | null
  readonly memoryPct: number | null
}

export function workstationReadingOf(
  processorPct: number | null,
  memoryPct: number | null
): WorkstationReading | null {
  if (processorPct === null && memoryPct === null) return null
  return { processorPct, memoryPct }
}
