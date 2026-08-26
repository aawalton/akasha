import { tierFloorValues } from "./circle/circle.ts"
import { GREEN_DAY_UNITS_LADDER } from "./circle/ladder/ladder.ts"
import { evalDailyTier, type DailyTierColor, type DailyTierLadder } from "./circle/tier/tier.ts"
import { aggregateValueUnits, readPersonaDaily } from "./daily-stoplights.ts"
import { getInboxStoplightTiers } from "./inbox-stoplights.ts"
import { resolveReadoutGroup, type Ask, type ResolvedReadoutGroup } from "./readout-resolver.ts"
import { getUpkeepStoplightTiers } from "./upkeep-stoplights.ts"

const UPKEEP_GROUP_SLUG = "upkeep"

const INBOX_GROUP_SLUG = "inboxes"

const VALUES_GROUP_SLUG = "values"

function floorOf(tier: DailyTierColor, ladder: DailyTierLadder): number {
  return tierFloorValues(ladder).get(tier) ?? 0
}

export interface StoplightMeanInputs {
  readonly fixedFloors: readonly number[]
  readonly ownValueOtherUnits: number | null
  readonly denominator: number
  readonly ladder: DailyTierLadder
}

export interface StoplightMeanTally {
  readonly points: number
  readonly lightsCounted: number
  readonly iterations: number
  readonly ownLightFloor: number | null
}

export function resolveStoplightMean(inputs: StoplightMeanInputs): StoplightMeanTally {
  const fixedSum = inputs.fixedFloors.reduce((sum, floor) => sum + floor, 0)
  if (inputs.ownValueOtherUnits === null) {
    return {
      points: fixedSum / inputs.denominator,
      lightsCounted: inputs.fixedFloors.length,
      iterations: 1,
      ownLightFloor: null,
    }
  }

  const maxPasses = inputs.ladder.length + 2
  let reading = 0
  let ownFloor = 0
  let iterations = 0
  for (let pass = 0; pass < maxPasses; pass++) {
    iterations = pass + 1
    ownFloor = floorOf(
      evalDailyTier(inputs.ownValueOtherUnits + reading, inputs.ladder).tier,
      inputs.ladder
    )
    const next = (fixedSum + ownFloor) / inputs.denominator
    if (next === reading) break
    reading = next
  }
  return {
    points: reading,
    lightsCounted: inputs.fixedFloors.length + 1,
    iterations,
    ownLightFloor: ownFloor,
  }
}

export function scoredLightCount(groups: readonly ResolvedReadoutGroup[]): number {
  const short = groups.filter((group) => group.unresolved.size > 0)
  if (short.length > 0) {
    const why = short
      .map((group) => {
        const refused = [...group.unresolved]
          .map(([slug, reason]) => `\`${slug}\`: ${reason}`)
          .join("; ")
        return (
          `\`${group.slug}\` resolved ${group.readouts.length} of ` +
          `${group.readouts.length + group.unresolved.size} — ${refused}`
        )
      })
      .join(" | ")
    throw new Error(
      "scoredLightCount: a stoplight group resolved short, and the day is scored out of the " +
        "lights its groups hold, so carrying on would divide by a smaller count and move every " +
        `reading Alan is scored on without anything saying so — ${why}`
    )
  }
  return groups.reduce((count, group) => count + group.readouts.length, 0)
}

export function drawnAsResolved(group: ResolvedReadoutGroup, drawn: number): undefined {
  if (drawn !== group.readouts.length) {
    throw new Error(
      `drawnAsResolved: group \`${group.slug}\` holds ${group.readouts.length} lights and ` +
        `${drawn} were drawn for the day, so the points summed and the count divided by would ` +
        "run over different sets of lights"
    )
  }
  return undefined
}

export interface StoplightMeanArgs {
  readonly day: string
  readonly personaId: string
  readonly ask?: Ask
}

export async function readStoplightMeanForDay(
  args: StoplightMeanArgs
): Promise<StoplightMeanTally> {
  const asking = args.ask === undefined ? {} : { ask: args.ask }
  const forDay = { day: args.day, ...asking }
  const [upkeepGroup, inboxGroup, valuesGroup, daily, inbox, upkeep] = await Promise.all([
    resolveReadoutGroup(UPKEEP_GROUP_SLUG),
    resolveReadoutGroup(INBOX_GROUP_SLUG),
    resolveReadoutGroup(VALUES_GROUP_SLUG),
    readPersonaDaily(forDay),
    getInboxStoplightTiers(forDay),
    getUpkeepStoplightTiers(forDay),
  ])

  const denominator = scoredLightCount([upkeepGroup, inboxGroup, valuesGroup])
  drawnAsResolved(inboxGroup, inbox.length)
  drawnAsResolved(upkeepGroup, upkeep.length)

  const ownValueSlug = daily.find((row) => row.personaId === args.personaId)?.valueSlug ?? null
  const sums = aggregateValueUnits(daily.filter((row) => row.personaId !== args.personaId))

  const fixedFloors: number[] = [
    ...inbox.map((light) => floorOf(light.tier, GREEN_DAY_UNITS_LADDER)),
    ...upkeep.map((light) => floorOf(light.tier, GREEN_DAY_UNITS_LADDER)),
    ...valuesGroup.readouts
      .filter((readout) => readout.slug !== ownValueSlug)
      .map((readout) =>
        floorOf(
          evalDailyTier(sums.get(readout.slug) ?? 0, GREEN_DAY_UNITS_LADDER).tier,
          GREEN_DAY_UNITS_LADDER
        )
      ),
  ]

  return resolveStoplightMean({
    fixedFloors,
    ownValueOtherUnits: ownValueSlug === null ? null : (sums.get(ownValueSlug) ?? 0),
    denominator,
    ladder: GREEN_DAY_UNITS_LADDER,
  })
}
