import type { DailyTierColor } from "./daily-tier.ts"
import { readingUnitOf } from "./readout-measure.ts"
import {
  type Ask,
  type ReadoutReading,
  type ResolvedReadout,
  readoutCircle,
  readReadoutReading,
  resolveReadoutGroup,
  resolveReadoutGroupLegend,
} from "./readout-resolver.ts"
import { type StoplightCircle, unknownCircle } from "./stoplight-circle.ts"

const COLOR_GLYPH: Readonly<Record<DailyTierColor, string>> = {
  black: "⚫",
  red: "🔴",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
}

const UPKEEP_GROUP_SLUG = "upkeep"

export async function getUpkeepLegend(): Promise<string> {
  return resolveReadoutGroupLegend(UPKEEP_GROUP_SLUG)
}

export interface ReadoutGroupCircle extends StoplightCircle {
  readonly key: string
  readonly label: string
}

export interface UpkeepStoplight extends StoplightCircle {
  readonly habit: string
  readonly label: string
}

export interface UpkeepArgs {
  readonly day: string
  readonly ask?: Ask
}

const UNANSWERED: ReadoutReading = { reading: null, earned: false }

async function readGroupReadings(
  readouts: readonly ResolvedReadout[],
  args: UpkeepArgs
): Promise<ReadonlyMap<string, ReadoutReading>> {
  const read = new Map<string, ReadoutReading>()
  await Promise.all(
    readouts
      .filter((readout) => readout.querySlug !== null)
      .map(async (readout) => {
        read.set(readout.slug, await readReadoutReading(readout, args.day, args.ask))
      })
  )
  const unsourced = readouts
    .filter((readout) => readout.querySlug === null)
    .map((readout) => `\`${readout.slug}\``)
  if (unsourced.length > 0) {
    throw new Error(
      `readGroupReadings: ${unsourced.join(", ")} state no \`query-slug\`, so nothing answers them`
    )
  }
  return read
}

export function groupCircle(
  readout: ResolvedReadout,
  answered: ReadoutReading
): ReadoutGroupCircle {
  const drawn =
    answered.reading === null
      ? unknownCircle()
      : readoutCircle({
          reading: answered.reading,
          scale: readout.scale,
          unit: readingUnitOf(readout.unit),
          earned: answered.earned,
        })
  return { key: readout.wireKey, label: readout.label, ...drawn }
}

export async function readReadoutGroupCircles(
  groupSlug: string,
  args: UpkeepArgs
): Promise<readonly ReadoutGroupCircle[]> {
  const group = await resolveReadoutGroup(groupSlug)
  const read = await readGroupReadings(group.readouts, args)
  return group.readouts.map((readout) => groupCircle(readout, read.get(readout.slug) ?? UNANSWERED))
}

export function upkeepStoplight(
  readout: ResolvedReadout,
  answered: ReadoutReading
): UpkeepStoplight {
  const { key, ...rest } = groupCircle(readout, answered)
  return { habit: key, ...rest }
}

export async function getReadoutGroupStoplights(
  groupSlug: string,
  args: UpkeepArgs
): Promise<readonly UpkeepStoplight[]> {
  return (await readReadoutGroupCircles(groupSlug, args)).map(({ key, ...rest }) => ({
    habit: key,
    ...rest,
  }))
}

export async function resolveOneReadout(groupSlug: string): Promise<ResolvedReadout> {
  const group = await resolveReadoutGroup(groupSlug)
  const [readout, ...rest] = group.readouts
  if (readout === undefined || rest.length > 0) {
    throw new Error(
      `resolveOneReadout: group \`${groupSlug}\` holds ${group.readouts.length} readouts, and the ` +
        "caller watches one reading rather than a strip"
    )
  }
  return readout
}

export async function getUpkeepStoplightTiers(
  args: UpkeepArgs
): Promise<readonly UpkeepStoplight[]> {
  return getReadoutGroupStoplights(UPKEEP_GROUP_SLUG, args)
}

export async function getUpkeepStoplights(args: UpkeepArgs): Promise<string> {
  return (await getUpkeepStoplightTiers(args))
    .map((stoplight) => COLOR_GLYPH[stoplight.tier])
    .join("")
}
