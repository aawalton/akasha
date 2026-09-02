import { poiCatalogSchema } from "@akasha/temper-game-catalog-capture-host/poi-catalog-schema"
import {
  CATALOG_SAVED_VARIABLES,
  type Tier,
  type TierEmit,
} from "../catalog-tier/catalog-tier.module.code.ts"

const POI_TYPE_LABELS: Record<number, string> = {
  0: "Standard",
  1: "Wayshrines",
  2: "Achievement Components",
  3: "Achievements",
  4: "Objectives",
  5: "Public Dungeons",
  6: "Group Dungeons",
  7: "Houses",
}

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

function extractPoiDataFromSavedVars(
  accountWide: Record<string, unknown>
): readonly PoiZoneEntry[] {
  if (accountWide.poiCatalog === undefined)
    throw new Error("No poiCatalog found. Deploy the TemperCatalog addon and log in to collect it.")

  const poiCatalog = poiCatalogSchema.parse(accountWide.poiCatalog)

  const zones: PoiZoneEntry[] = []

  for (const [zoneKey, zone] of Object.entries(poiCatalog)) {
    const zoneId = Number(zoneKey)
    const zoneName = zone.name

    const typeGroups = new Map<number, PoiEntry[]>()

    for (const [poiKey, poi] of Object.entries(zone.pois)) {
      const poiIndex = Number(poiKey)
      const poiType = poi.poiType

      let group = typeGroups.get(poiType)
      if (!group) {
        group = []
        typeGroups.set(poiType, group)
      }
      group.push({ poiIndex, name: poi.name, poiType })
    }

    const poiTypes: PoiTypeGroup[] = []
    for (const [poiType, pois] of typeGroups) {
      pois.sort((a, b) => a.poiIndex - b.poiIndex)
      poiTypes.push({
        poiType,
        label: POI_TYPE_LABELS[poiType] ?? `Type ${poiType}`,
        pois,
      })
    }

    poiTypes.sort((a, b) => a.poiType - b.poiType)

    if (poiTypes.length > 0) {
      zones.push({ zoneId, name: zoneName, poiTypes })
    }
  }

  zones.sort((a, b) => a.name.localeCompare(b.name))

  return zones
}

function generateDataFile(zones: readonly PoiZoneEntry[], apiVersion: string): string {
  const totalTypes = zones.reduce((sum, z) => sum + z.poiTypes.length, 0)
  const totalPois = zones.reduce(
    (sum, z) => sum + z.poiTypes.reduce((tSum, t) => tSum + t.pois.length, 0),
    0
  )

  return `\
/**
 * Points of Interest Static Data (Generated)
 *
 * ${zones.length} zones, ${totalTypes} POI type groups, ${totalPois} POIs
 *
 * apiVersion: ${apiVersion}
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

export const POI_TIER: Tier = {
  slug: "poi",
  summary: "Points of interest, by zone and type",
  savedVariables: CATALOG_SAVED_VARIABLES,
  outputPath: "temper/player-completion/src/generated/poi-data.generated.ts",
  format: true,
  emit: (accountWide, apiVersion): TierEmit => {
    const zones = extractPoiDataFromSavedVars(accountWide)

    const totalTypes = zones.reduce((sum, z) => sum + z.poiTypes.length, 0)
    const totalPois = zones.reduce(
      (sum, z) => sum + z.poiTypes.reduce((tSum, t) => tSum + t.pois.length, 0),
      0
    )

    return {
      content: generateDataFile(zones, apiVersion),
      report: [
        `Found ${zones.length} zones, ${totalTypes} POI type groups, ${totalPois} POIs (apiVersion: ${apiVersion})`,
      ],
    }
  },
}
