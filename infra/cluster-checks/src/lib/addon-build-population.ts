export type DeployableOutcome = "hit" | "built" | "failed"

export interface AddonBuildTally {
  readonly deployables: number
  readonly hits: number
  readonly built: number
  readonly failed: readonly string[]
  readonly notAttempted: readonly string[]
}

export const addonBuildTally = (
  roster: readonly string[],
  outcomes: ReadonlyMap<string, DeployableOutcome>
): AddonBuildTally => {
  const stray = [...outcomes.keys()].filter((name) => !roster.includes(name))
  if (stray.length > 0) {
    throw new Error(
      `addon-build recorded an outcome for deployable(s) absent from the roster of ${roster.length}: ${stray.join(", ")}`
    )
  }
  const withOutcome = (want: DeployableOutcome): readonly string[] =>
    roster.filter((name) => outcomes.get(name) === want)
  return {
    deployables: roster.length,
    hits: withOutcome("hit").length,
    built: withOutcome("built").length,
    failed: withOutcome("failed"),
    notAttempted: roster.filter((name) => !outcomes.has(name)),
  }
}

export const addonBuildPopulationLine = (tally: AddonBuildTally): string => {
  const reached = tally.hits + tally.built + tally.failed.length
  const accounted = reached + tally.notAttempted.length
  if (accounted !== tally.deployables) {
    throw new Error(
      `addon-build tally does not account for its roster: ${tally.hits} hit + ${tally.built} built + ${tally.failed.length} failed + ${tally.notAttempted.length} never attempted = ${accounted}, roster is ${tally.deployables}`
    )
  }
  return `${tally.deployables} deployable(s): ${tally.hits} cache hit(s), ${tally.built} built, ${tally.failed.length} failed, ${tally.notAttempted.length} never attempted`
}
