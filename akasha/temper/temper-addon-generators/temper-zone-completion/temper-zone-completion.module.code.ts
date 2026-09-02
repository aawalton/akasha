import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const ACTIVITY_SCHEMA = z
  .object({
    id: z.string(),
    completionType: z.number(),
    completionTypeLabel: z.string(),
    activityIndex: z.number(),
    esoActivityId: z.number(),
    activityName: z.string(),
  })
  .strict()

const ZONE_SCHEMA = z
  .object({
    title: z.string(),
    esoZoneId: z.number(),
    zoneCompletionActivities: z.array(ACTIVITY_SCHEMA).min(1),
  })
  .strict()

type HeldActivity = z.infer<typeof ACTIVITY_SCHEMA>

interface OutActivity {
  activityIndex: number
  activityId: number
  name: string
}

interface OutGroup {
  completionType: number
  label: string
  activities: readonly OutActivity[]
}

interface OutZone {
  zoneId: number
  name: string
  completionTypes: readonly OutGroup[]
}

function labelOf(zoneName: string, completionType: number, held: readonly HeldActivity[]): string {
  const labels = new Set(held.map((activity) => activity.completionTypeLabel))
  if (labels.size !== 1) {
    throw new Error(
      `completion type ${completionType} in ${zoneName} carries ${labels.size} labels`
    )
  }
  return [...labels][0] as string
}

function groupsOf(zoneName: string, held: readonly HeldActivity[]): readonly OutGroup[] {
  const byType = new Map<number, HeldActivity[]>()
  for (const activity of held) {
    const found = byType.get(activity.completionType)
    if (found === undefined) byType.set(activity.completionType, [activity])
    else found.push(activity)
  }
  return [...byType.keys()]
    .sort((a, b) => a - b)
    .map((completionType) => {
      const rows = byType.get(completionType) as HeldActivity[]
      return {
        completionType,
        label: labelOf(zoneName, completionType, rows),
        activities: [...rows]
          .sort((a, b) => a.activityIndex - b.activityIndex)
          .map((activity) => ({
            activityIndex: activity.activityIndex,
            activityId: activity.esoActivityId,
            name: activity.activityName,
          })),
      }
    })
}

function zoneOf(row: Page): OutZone {
  const held = ZONE_SCHEMA.parse({
    title: row.title,
    esoZoneId: row.esoZoneId,
    zoneCompletionActivities: row.zoneCompletionActivities,
  })
  return {
    zoneId: held.esoZoneId,
    name: held.title,
    completionTypes: groupsOf(held.title, held.zoneCompletionActivities),
  }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "zone-completion")
  if (found === undefined) {
    throw new Error("no `temper-catalog-domain` page is slugged `zone-completion`")
  }
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `zone-completion` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperZoneCompletion(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const zones = rows
    .filter((row) => row.zoneCompletionActivities !== undefined)
    .map(zoneOf)
    .sort((a, b) => a.name.localeCompare(b.name))
  const groupCount = zones.reduce((held, zone) => held + zone.completionTypes.length, 0)
  const activityCount = zones.reduce(
    (held, zone) =>
      held + zone.completionTypes.reduce((sum, group) => sum + group.activities.length, 0),
    0
  )
  return `\
/**
 * Zone Completion Static Data (Generated)
 *
 * ${zones.length} zones, ${groupCount} completion types, ${activityCount} activities
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate zone-completion
 */

interface ZoneCompletionActivityEntry {
  activityIndex: number
  activityId: number
  name: string
}

interface ZoneCompletionTypeEntry {
  completionType: number
  label: string
  activities: readonly ZoneCompletionActivityEntry[]
}

interface ZoneCompletionZoneEntry {
  zoneId: number
  name: string
  completionTypes: readonly ZoneCompletionTypeEntry[]
}

export const zoneCompletionData: ZoneCompletionZoneEntry[] = ${JSON.stringify(zones, null, 2)}
`
}
