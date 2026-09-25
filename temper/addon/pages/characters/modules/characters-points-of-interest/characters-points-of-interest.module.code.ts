import { mergeIdList } from "akasha/temper/addon/pages/characters/modules/characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import type { SparsePoiDiscovery } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

function scanPointsOfInterest(this: void): SparsePoiDiscovery {
  const result: SparsePoiDiscovery = {}
  let zoneId = GetNextZoneStoryZoneId(undefined)
  while (zoneId !== undefined) {
    const zoneIndex = GetZoneIndex(zoneId)
    const numPOIs = GetNumPOIs(zoneIndex)
    const discovered: number[] = []
    for (let poiIndex = 1; poiIndex <= numPOIs; poiIndex++) {
      const [, , , , , , isDiscovered] = GetPOIMapInfo(zoneIndex, poiIndex)
      if (isDiscovered) {
        discovered.push(poiIndex)
      }
    }
    if (discovered.length > 0) {
      result[zoneId] = discovered
    }
    zoneId = GetNextZoneStoryZoneId(zoneId)
  }
  return result
}

export function collectPointsOfInterest(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.pointsOfInterest = scanPointsOfInterest()
}

export function updatePointOfInterest(this: void, zoneIndex: number, poiIndex: number): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  const discovery = charEntry.pointsOfInterest ?? {}
  const zoneId = GetZoneId(zoneIndex)
  discovery[zoneId] = mergeIdList(discovery[zoneId], [poiIndex])
  charEntry.pointsOfInterest = discovery
}
