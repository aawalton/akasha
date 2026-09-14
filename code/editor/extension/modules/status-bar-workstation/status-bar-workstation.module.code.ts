export type WorkstationReading = {
  readonly processorPct: number | null
  readonly memoryGb: number | null
}

export function workstationReadingOf(
  processorPct: number | null,
  memoryGb: number | null
): WorkstationReading | null {
  if (processorPct === null && memoryGb === null) return null
  return { processorPct, memoryGb }
}
