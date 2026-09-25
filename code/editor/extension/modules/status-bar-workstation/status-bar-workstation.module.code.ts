export type WorkstationReading = Readonly<Record<string, number | null>>

export function workstationReadingOf(figures: WorkstationReading): WorkstationReading | null {
  return Object.values(figures).some((one) => one !== null) ? figures : null
}
