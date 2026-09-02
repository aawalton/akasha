import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const STOP_SCHEMA = z
  .object({
    id: z.string(),
    zoneIndex: z.number(),
    zoneName: z.string(),
    stopIndex: z.number(),
    poiName: z.string(),
  })
  .strict()

const LEVEL_SCHEMA = z
  .object({
    title: z.string(),
    displayOrder: z.number(),
    cadwellStops: z.array(STOP_SCHEMA),
  })
  .strict()

interface OutPoi {
  poiIndex: number
  name: string
}

interface OutZone {
  zoneIndex: number
  name: string
  pois: OutPoi[]
}

interface OutLevel {
  level: number
  label: string
  zones: OutZone[]
}

function levelOf(row: Page): OutLevel {
  const held = LEVEL_SCHEMA.parse({
    title: row.title,
    displayOrder: row.displayOrder,
    cadwellStops: row.cadwellStops ?? [],
  })
  const zones: OutZone[] = []
  for (const stop of held.cadwellStops) {
    const open = zones.at(-1)
    const same = open !== undefined && open.zoneIndex === stop.zoneIndex
    const zone =
      same && open !== undefined
        ? open
        : { zoneIndex: stop.zoneIndex, name: stop.zoneName, pois: [] }
    if (!same) zones.push(zone)
    if (zone.name !== stop.zoneName) {
      throw new Error(
        `zone ${stop.zoneIndex} is named both \`${zone.name}\` and \`${stop.zoneName}\``
      )
    }
    zone.pois.push({ poiIndex: stop.stopIndex, name: stop.poiName })
  }
  return { level: held.displayOrder, label: held.title, zones }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "cadwell")
  if (found === undefined) throw new Error("no `temper-catalog-domain` page is slugged `cadwell`")
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `cadwell` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperCadwell(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const levels = rows.map(levelOf).sort((a, b) => a.level - b.level)
  const zoneCount = levels.reduce((held, level) => held + level.zones.length, 0)
  const poiCount = levels.reduce(
    (held, level) => held + level.zones.reduce((each, zone) => each + zone.pois.length, 0),
    0
  )
  return `\
/**
 * Cadwell's Almanac Static Data (Generated)
 *
 * ${levels.length} levels, ${zoneCount} zones, ${poiCount} POIs
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate cadwell
 */

interface CadwellPOIData {
  poiIndex: number
  name: string
}

interface CadwellZoneData {
  zoneIndex: number
  name: string
  pois: readonly CadwellPOIData[]
}

interface CadwellLevelData {
  level: number
  label: string
  zones: readonly CadwellZoneData[]
}

export const cadwellData: CadwellLevelData[] = ${JSON.stringify(levels, null, 2)}
`
}
