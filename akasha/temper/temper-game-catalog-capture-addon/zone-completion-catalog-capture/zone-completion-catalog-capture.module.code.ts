import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"

import type {
  ZoneCompletionCatalogActivity,
  ZoneCompletionCatalogType,
  ZoneCompletionCatalogZone,
} from "@akasha/temper-capture-shapes/zone-completion-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export const ZONE_COMPLETION_TYPES = [
  ZONE_COMPLETION_TYPE_DELVES,
  ZONE_COMPLETION_TYPE_FEATURED_ACHIEVEMENTS,
  ZONE_COMPLETION_TYPE_GROUP_BOSSES,
  ZONE_COMPLETION_TYPE_GROUP_DELVES,
  ZONE_COMPLETION_TYPE_MAGES_GUILD_BOOKS,
  ZONE_COMPLETION_TYPE_MUNDUS_STONES,
  ZONE_COMPLETION_TYPE_POINTS_OF_INTEREST,
  ZONE_COMPLETION_TYPE_PRIORITY_QUESTS,
  ZONE_COMPLETION_TYPE_PUBLIC_DUNGEONS,
  ZONE_COMPLETION_TYPE_SET_STATIONS,
  ZONE_COMPLETION_TYPE_SKYSHARDS,
  ZONE_COMPLETION_TYPE_STRIKING_LOCALES,
  ZONE_COMPLETION_TYPE_WAYSHRINES,
  ZONE_COMPLETION_TYPE_WORLD_EVENTS,
]

export function collectZoneCompletionCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, ZoneCompletionCatalogZone> = {}

  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined && zoneId !== 0) {
    const zoneName = zo_strformat("<<1>>", GetZoneNameById(zoneId))
    const completionTypes: Record<number, ZoneCompletionCatalogType> = {}

    for (const completionType of ZONE_COMPLETION_TYPES) {
      const numActivities = GetNumZoneActivitiesForZoneCompletionType(zoneId, completionType)
      if (numActivities === undefined || numActivities <= 0) continue

      const activities: Record<number, ZoneCompletionCatalogActivity> = {}

      for (let i = 1; i <= numActivities; i++) {
        const activityId = GetZoneActivityIdForZoneCompletionType(zoneId, completionType, i)
        const name = zo_strformat(
          "<<1>>",
          GetZoneStoryActivityNameByActivityIndex(zoneId, completionType, i)
        )
        if (name === undefined || name === "") continue

        activities[i] = { name, activityId }
      }

      if (Object.keys(activities).length > 0) {
        completionTypes[completionType] = { activities }
      }
    }

    if (Object.keys(completionTypes).length > 0) {
      catalog[zoneId] = { name: zoneName, completionTypes }
    }

    zoneId = GetNextZoneStoryZoneId(zoneId)
  }

  savedVars.zoneCompletionCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "zoneCompletionCatalog", collect: collectZoneCompletionCatalog })
