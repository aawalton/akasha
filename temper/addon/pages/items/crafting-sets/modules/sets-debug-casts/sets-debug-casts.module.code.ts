import "akasha/temper/addon/pages/items/crafting-sets/sets-constant-shapes/sets-constant-shapes.type-declaration.d.ts"

type SetNamesTable = { [setId: number]: { [lang: string]: string } }
export function asSetNamesTable(value: unknown): SetNamesTable {
  return value as SetNamesTable
}

type SetNamesTableOpt = { [setId: number]: { [lang: string]: string } | undefined }
export function asSetNamesTableOpt(value: unknown): SetNamesTableOpt {
  return value as SetNamesTableOpt
}

type SetItemIdsTable = { [setId: number]: { [itemId: number]: number } }

type SetItemIdsTableOpt = SetItemIdsTable | undefined
export function asSetItemIdsTableOpt(value: unknown): SetItemIdsTableOpt {
  return value as SetItemIdsTableOpt
}

type NewSetIdsSV = { [world: string]: { [api: string]: unknown } }
export function asNewSetIdsSV(value: unknown): NewSetIdsSV {
  return value as NewSetIdsSV
}

type NewSetIdsByWorld = {
  [world: string]: { [api: number]: { [index: number]: unknown } }
}
export function asNewSetIdsByWorldOpt(value: unknown): NewSetIdsByWorldOpt {
  return value as NewSetIdsByWorldOpt
}
type NewSetIdsByWorldOpt = NewSetIdsByWorld | undefined

export interface DebugGetAllDataRun {
  clientLang?: string
  running?: boolean
  finished?: boolean
  DateTimeStart?: string
  DateTimeEnd?: string
  langDone?: { [lang: string]: unknown }
  LanguageChangeDateTime?: string
  LanguageChangeTo?: string
  LastErrorDateTime?: string
  LastError?: string
}

type DebugGetAllDataSV = { [api: number]: DebugGetAllDataRun }
export function asDebugGetAllDataSV(value: unknown): DebugGetAllDataSV {
  return value as DebugGetAllDataSV
}

type WayshrineSV = { [nodeId: number]: string }
export function asWayshrineSV(value: unknown): WayshrineSV {
  return value as WayshrineSV
}

type DungeonFinderKeyboard =
  | { navigationTree?: { rootNode?: { children?: { [index: number]: unknown } } } }
  | undefined
export function asDungeonFinderKeyboard(value: unknown): DungeonFinderKeyboard {
  return value as DungeonFinderKeyboard
}

type ZoneLibraryOpt = SetsDebugZoneLibrary | undefined
export function asZoneLibraryOpt(value: unknown): ZoneLibraryOpt {
  return value as ZoneLibraryOpt
}
