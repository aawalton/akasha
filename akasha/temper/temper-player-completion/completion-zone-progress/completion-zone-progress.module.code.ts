import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterZoneCompletionProgress,
  ZoneActivityProgress,
  ZoneCompletionTypeProgress,
  ZoneCompletionZoneProgress,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface ZoneCompletionCatalogActivity {
  completionType: number
  completionTypeLabel: string
  activityIndex: number
  esoActivityId: number
  activityName: string
}

export interface ZoneCompletionCatalogZone {
  esoZoneId: number
  title: string
  zoneCompletionActivities: readonly ZoneCompletionCatalogActivity[]
}

interface CompletionTypeGroup {
  completionType: number
  label: string
  activities: ZoneCompletionCatalogActivity[]
}

interface GroupedZone {
  esoZoneId: number
  title: string
  completionTypes: readonly CompletionTypeGroup[]
}

function groupByCompletionType(
  activities: readonly ZoneCompletionCatalogActivity[]
): readonly CompletionTypeGroup[] {
  const groups: CompletionTypeGroup[] = []
  const byType = new Map<number, CompletionTypeGroup>()

  for (const activity of activities) {
    let group = byType.get(activity.completionType)
    if (!group) {
      group = {
        completionType: activity.completionType,
        label: activity.completionTypeLabel,
        activities: [],
      }
      byType.set(activity.completionType, group)
      groups.push(group)
    }
    group.activities.push(activity)
  }

  return groups
}

function completedActivityIndexes(
  completion: NonNullable<CompletionCharacterRow["completion"]>
): Map<number, Map<number, Set<number>>> {
  const lookup = new Map<number, Map<number, Set<number>>>()
  const rawZoneCompletion = completion.zoneCompletion
  if (!rawZoneCompletion || typeof rawZoneCompletion !== "object") return lookup

  for (const [zoneIdStr, typeMap] of Object.entries(rawZoneCompletion)) {
    if (!typeMap || typeof typeMap !== "object") continue
    const typeLookup = new Map<number, Set<number>>()

    for (const [typeStr, rawIndexes] of Object.entries(typeMap)) {
      const indexes = new Set<number>()
      if (Array.isArray(rawIndexes)) {
        for (const index of rawIndexes) {
          if (typeof index === "number") indexes.add(index)
        }
      } else if (typeof rawIndexes === "object" && rawIndexes !== null) {
        for (const index of Object.values(rawIndexes)) {
          if (typeof index === "number") indexes.add(index)
        }
      }
      typeLookup.set(Number(typeStr), indexes)
    }

    lookup.set(Number(zoneIdStr), typeLookup)
  }

  return lookup
}

export function transformZoneCompletionProgress(
  rows: readonly CompletionCharacterRow[],
  zoneCatalog: readonly ZoneCompletionCatalogZone[]
): readonly CharacterZoneCompletionProgress[] {
  if (zoneCatalog.length === 0) return []

  const groupedZones: readonly GroupedZone[] = zoneCatalog.map((zone) => ({
    esoZoneId: zone.esoZoneId,
    title: zone.title,
    completionTypes: groupByCompletionType(zone.zoneCompletionActivities),
  }))

  const totalCount = groupedZones.reduce(
    (sum, zone) =>
      sum + zone.completionTypes.reduce((inner, type) => inner + type.activities.length, 0),
    0
  )

  const result: CharacterZoneCompletionProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const completedLookup = completedActivityIndexes(completion)
    let characterCompletedCount = 0

    const zones: ZoneCompletionZoneProgress[] = groupedZones.map((zone) => {
      const typeLookup = completedLookup.get(zone.esoZoneId)
      let zoneCompleted = 0
      let zoneTotal = 0

      const completionTypes: ZoneCompletionTypeProgress[] = zone.completionTypes.map((type) => {
        const completedIndexes = typeLookup?.get(type.completionType)
        let typeCompleted = 0

        const activities: ZoneActivityProgress[] = type.activities.map((activity) => {
          const completed = completedIndexes?.has(activity.activityIndex) ?? false
          if (completed) typeCompleted++
          return {
            activityIndex: activity.activityIndex,
            name: activity.activityName,
            completed,
          }
        })

        zoneCompleted += typeCompleted
        zoneTotal += activities.length

        return {
          completionType: type.completionType,
          label: type.label,
          activities,
          completedCount: typeCompleted,
          totalCount: activities.length,
        }
      })

      characterCompletedCount += zoneCompleted

      return {
        zoneId: zone.esoZoneId,
        name: zone.title,
        completionTypes,
        completedCount: zoneCompleted,
        totalCount: zoneTotal,
      }
    })

    result.push({
      characterId: row.id,
      zones,
      completedCount: characterCompletedCount,
      totalCount,
    })
  }

  return result
}
