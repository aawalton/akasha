import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  CadwellCatalogLevel,
  CadwellCatalogPOI,
  CadwellCatalogZone,
} from "@akasha/temper-capture-shapes/cadwell-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export const CADWELL_LEVELS = [
  CADWELL_PROGRESSION_LEVEL_BRONZE,
  CADWELL_PROGRESSION_LEVEL_SILVER,
  CADWELL_PROGRESSION_LEVEL_GOLD,
]

export function collectCadwellCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, CadwellCatalogLevel> = {}

  for (const level of CADWELL_LEVELS) {
    const numZones = GetNumZonesForCadwellProgressionLevel(level)
    const zones: Record<number, CadwellCatalogZone> = {}

    for (let z = 1; z <= numZones; z++) {
      const [rawZoneName, , zoneOrder] = GetCadwellZoneInfo(level, z)
      const zoneName = zo_strformat("<<1>>", rawZoneName)
      if (zoneName === "") continue

      const numPOIs = GetNumPOIsForCadwellProgressionLevelAndZone(level, z)
      const pois: Record<number, CadwellCatalogPOI> = {}

      for (let p = 1; p <= numPOIs; p++) {
        const [rawName, , , order] = GetCadwellZonePOIInfo(level, z, p)
        const name = zo_strformat("<<1>>", rawName)
        if (name === "") continue

        pois[p] = { name, order }
      }

      zones[z] = { name: zoneName, order: zoneOrder, pois }
    }

    catalog[level] = { zones }
  }

  savedVars.cadwellCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "cadwellCatalog", collect: collectCadwellCatalog })
