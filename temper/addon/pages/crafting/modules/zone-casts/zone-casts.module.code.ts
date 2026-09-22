import { SLASH_COMMANDER } from "akasha/temper/addon/pages/crafting/modules/slash-commander-surface/slash-commander-surface.module.code.ts"
import type {
  DebugInfoList,
  GeoDebugEntries,
  Lib,
  MapNamesTable,
  SavedVarsTable,
  ZoneDataEntry,
  ZoneLscLib,
  ZonePoiInfoTable,
} from "akasha/temper/addon/pages/crafting/modules/zone-types/zone-types.module.code.ts"

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asZoneDataEntry(value: unknown): ZoneDataEntry {
  return value as ZoneDataEntry
}

export function asMapNamesTable(value: unknown): MapNamesTable {
  return value as MapNamesTable
}

export function asGeoDebugEntries(value: unknown): GeoDebugEntries {
  return value as GeoDebugEntries
}

export function asZonePoiInfoTable(value: unknown): ZonePoiInfoTable {
  return value as ZonePoiInfoTable
}

export function asSavedVarsTable(value: unknown): SavedVarsTable {
  return value as SavedVarsTable
}

export function asDebugInfoList(value: unknown): DebugInfoList {
  return value as DebugInfoList
}

export function slashCommander(this: void): ZoneLscLib {
  const commander: unknown = SLASH_COMMANDER
  return commander as ZoneLscLib
}
