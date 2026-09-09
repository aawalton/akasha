export type PopulationBound = {
  readonly examined: number
  readonly declared: number
  readonly unit: string
}

export function renderPopulationBound(bound: PopulationBound): string {
  const { examined, declared, unit } = bound
  if (declared === 0) {
    return `[EMPTY POPULATION — 0 ${unit}: this run examined nothing, so it certifies nothing]`
  }
  if (examined > declared) {
    throw new Error(
      `renderPopulationBound: ${examined} ${unit} examined against ${declared} declared. ` +
        "A run cannot examine more than its population holds, so one of the two counts is wrong " +
        "and the note would certify a reach the run never had."
    )
  }
  const missing = declared - examined
  return missing > 0
    ? `[over ${examined} of ${declared} ${unit} — ${missing} could not be examined]`
    : `[over ${examined} of ${declared} ${unit}]`
}
