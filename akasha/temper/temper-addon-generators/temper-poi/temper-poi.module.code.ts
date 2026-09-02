import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const POI_SCHEMA = z
  .object({
    id: z.string(),
    poiType: z.number(),
    poiTypeLabel: z.string(),
    poiIndex: z.number(),
    poiName: z.string(),
  })
  .strict()

const ZONE_SCHEMA = z
  .object({
    title: z.string(),
    esoZoneId: z.number(),
    pois: z.array(POI_SCHEMA).min(1),
  })
  .strict()

type HeldPoi = z.infer<typeof POI_SCHEMA>

interface OutPoi {
  poiIndex: number
  name: string
  poiType: number
}

interface OutGroup {
  poiType: number
  label: string
  pois: readonly OutPoi[]
}

interface OutZone {
  zoneId: number
  name: string
  poiTypes: readonly OutGroup[]
}

function labelOf(zoneName: string, poiType: number, held: readonly HeldPoi[]): string {
  const labels = new Set(held.map((poi) => poi.poiTypeLabel))
  if (labels.size !== 1) {
    throw new Error(`poi type ${poiType} in ${zoneName} carries ${labels.size} labels`)
  }
  return [...labels][0] as string
}

function groupsOf(zoneName: string, held: readonly HeldPoi[]): readonly OutGroup[] {
  const byType = new Map<number, HeldPoi[]>()
  for (const poi of held) {
    const found = byType.get(poi.poiType)
    if (found === undefined) byType.set(poi.poiType, [poi])
    else found.push(poi)
  }
  return [...byType.keys()]
    .sort((a, b) => a - b)
    .map((poiType) => {
      const rows = byType.get(poiType) as HeldPoi[]
      return {
        poiType,
        label: labelOf(zoneName, poiType, rows),
        pois: [...rows]
          .sort((a, b) => a.poiIndex - b.poiIndex)
          .map((poi) => ({ poiIndex: poi.poiIndex, name: poi.poiName, poiType: poi.poiType })),
      }
    })
}

function zoneOf(row: Page): OutZone {
  const held = ZONE_SCHEMA.parse({ title: row.title, esoZoneId: row.esoZoneId, pois: row.pois })
  return {
    zoneId: held.esoZoneId,
    name: held.title,
    poiTypes: groupsOf(held.title, held.pois),
  }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "poi")
  if (found === undefined) throw new Error("no `temper-catalog-domain` page is slugged `poi`")
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `poi` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

export function generateTemperPoi(rows: readonly Page[], catalogDomains: readonly Page[]): string {
  const zones = rows
    .filter((row) => row.pois !== undefined)
    .map(zoneOf)
    .sort((a, b) => a.name.localeCompare(b.name))
  const groupCount = zones.reduce((held, zone) => held + zone.poiTypes.length, 0)
  const poiCount = zones.reduce(
    (held, zone) => held + zone.poiTypes.reduce((sum, group) => sum + group.pois.length, 0),
    0
  )
  return `\
/**
 * Points of Interest Static Data (Generated)
 *
 * ${zones.length} zones, ${groupCount} POI type groups, ${poiCount} POIs
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate poi
 */

interface PoiEntry {
  poiIndex: number
  name: string
  poiType: number
}

interface PoiTypeGroup {
  poiType: number
  label: string
  pois: readonly PoiEntry[]
}

interface PoiZoneEntry {
  zoneId: number
  name: string
  poiTypes: readonly PoiTypeGroup[]
}

export const poiData: PoiZoneEntry[] = ${JSON.stringify(zones, null, 2)}
`
}
