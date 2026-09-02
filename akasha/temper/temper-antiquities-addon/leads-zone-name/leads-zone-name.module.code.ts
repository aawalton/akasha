import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"
import { DUAL_ZONE_COMPONENTS, FAKE_ZONE_IDS } from "../leads-zones/leads-zones.module.code.ts"

export function specialZoneName(zoneId: number): string | undefined {
  if (zoneId === FAKE_ZONE_IDS.ALLZONES) {
    return STRINGS.ZONENAME_ALLZONES
  }
  if (zoneId === FAKE_ZONE_IDS.BGS) {
    return STRINGS.ZONENAME_BGS
  }
  const components = DUAL_ZONE_COMPONENTS[zoneId]
  if (components !== undefined) {
    return ZO_CachedStrFormat(
      "<<C:1>>, <<C:2>>",
      GetZoneNameById(components[0]),
      GetZoneNameById(components[1])
    )
  }
  return undefined
}

export function zoneDisplayName(zoneId: number): string {
  if (zoneId < FAKE_ZONE_IDS.ALLZONES) {
    return ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))
  }
  return specialZoneName(zoneId) ?? ""
}
