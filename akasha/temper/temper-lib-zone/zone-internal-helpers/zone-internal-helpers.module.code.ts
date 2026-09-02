import { asDebugInfoList } from "../zone-casts/zone-casts.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"
import type { SavedVarsTable } from "../zone-types/zone-types.module.code.ts"

export function getMaxZoneIndicesAndIds(this: void): LuaMultiReturn<[number, number]> {
  const numZoneIndices = GetNumZones()
  let maxZoneIds = 0
  for (const zoneIndex of $range(0, numZoneIndices)) {
    const zoneId = GetZoneId(zoneIndex)
    if (zoneId > maxZoneIds) {
      maxZoneIds = zoneId
    }
  }
  lib.maxZoneIndices = numZoneIndices
  lib.maxZoneIds = maxZoneIds
  return $multi(numZoneIndices, maxZoneIds)
}

export function checkMaxZoneIndicesAndIds(this: void): undefined {
  if (lib.maxZoneIndices === 0 || lib.maxZoneIds === 0) {
    const [indices, ids] = getMaxZoneIndicesAndIds()
    lib.maxZoneIndices = indices
    lib.maxZoneIds = ids
  }
}

export function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

export function isValidPin(this: void, poiIndex: number | undefined): boolean {
  return poiIndex !== undefined && poiIndex > 0
}

export function addDebugInfoSubTable(
  this: void,
  tabToAddTo: SavedVarsTable | undefined,
  dateAndTimeFormatted?: string
): undefined {
  if (tabToAddTo === undefined) return
  const stamp = dateAndTimeFormatted ?? os.date("%c", GetTimeStamp())
  const existing = tabToAddTo.__debugInfo__
  const history = asDebugInfoList(existing ?? [])
  tabToAddTo.__debugInfo__ = history
  history.push({
    LastUpdate: tostring(stamp),
    APIVersionLastUpdate: lib.currentAPIVersion,
  })
}
