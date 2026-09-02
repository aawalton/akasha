import type { LIBRARY_INFO } from "../zone-constants/zone-constants.module.code.ts"

export type GlobalObjectTable = Record<string, unknown>

export interface ZoneDataEntry {
  name?: string
  zoneIndex?: number
  parentZone?: number
  [key: string]: unknown
}

export type SavedVarsTable = Record<string | number, unknown>

export interface DebugInfoEntry {
  LastUpdate?: string
  APIVersionLastUpdate?: number
  APIVersion?: number
  [key: string]: unknown
}

export type DebugInfoList = DebugInfoEntry[]

export type MapNamesTable = Record<number, Record<string, Record<number, string>>>

export type GeoDebugEntries = Record<number, Record<number, string>>

export type ZonePoiInfoTable = Record<number, Record<number, string> | undefined>

export interface ZoneLscAutoCompleteProvider {
  resultList: Record<string, string>
  lookupList: Record<string, string>
  lang: string
  GetResultList: (this: ZoneLscAutoCompleteProvider) => Record<string, string>
  GetResultFromLabel: (this: ZoneLscAutoCompleteProvider, label: string) => string
  [key: string]: unknown
}

export interface ZoneLscAutoCompleteProviderClass {
  Subclass: (this: ZoneLscAutoCompleteProviderClass) => ZoneLscAutoCompleteProviderClass
  New: (this: void, parent: object) => ZoneLscAutoCompleteProvider
  [key: string]: unknown
}

export interface ZoneLscSubCommand {
  AddAlias: (this: ZoneLscSubCommand, alias: string) => void
  SetDescription: (this: ZoneLscSubCommand, description: string) => void
  SetCallback: (this: ZoneLscSubCommand, callback: (this: void, input: string) => void) => void
  SetAutoComplete: (this: ZoneLscSubCommand, provider: ZoneLscAutoCompleteProvider) => void
  [key: string]: unknown
}

export interface ZoneLscCommand {
  HasSubCommandAlias: (this: ZoneLscCommand, alias: string) => boolean
  RegisterSubCommand: (this: ZoneLscCommand) => ZoneLscSubCommand
  [key: string]: unknown
}

export interface ZoneLscLib {
  Register: (
    this: ZoneLscLib,
    aliases: string | string[],
    callback: ((this: void) => void) | undefined,
    description: string
  ) => ZoneLscCommand
  AutoCompleteProvider: ZoneLscAutoCompleteProviderClass
  [key: string]: unknown
}

export interface Lib {
  libraryInfo: typeof LIBRARY_INFO
  oldMinor: undefined
  currentAPIVersion: number
  worldName: string
  zoneData: SavedVarsTable
  localizedZoneData: SavedVarsTable
  geoDebugData: SavedVarsTable
  svDebugData: SavedVarsTable | undefined
  publicDungeonMapIds: Record<number, boolean>
  searchDirty: boolean
  searchTranslatedZoneResultList: Record<string, unknown>
  searchTranslatedZoneLookupList: Record<string, unknown>
  maxZoneIndices: number
  maxZoneIds: number
  maxMapIds: number
  currentClientLanguage: string
  supportedLanguages: Record<number, string>
  translations: Record<string, Record<string, string>>
  blacklistedZoneIdsForAutoCompletion: Record<number, boolean>
  preloadedZoneNames: Record<string, Record<number, string>>
  geoDataReferenceTable: Record<number, Record<number, number>>
  adjustedParentZoneIds: Record<number, number>
  adjustedParentMultiZoneIds: Record<number, Record<number, boolean>>
  checkIfLanguageIsSupported: (this: void, lang: string | undefined) => boolean
  mapId2Name: Record<number, string>
  commandsLzt: Record<string, ZoneLscCommand>
  LSC: ZoneLscLib | undefined
  wayshrineString: string

  GetParentMapId: (this: Lib, mapId: number) => number
  GetCurrentZoneIds: (
    this: Lib
  ) => LuaMultiReturn<
    [number, number, number | undefined, number, number, number | undefined, number]
  >
  GetAllZoneData: (this: Lib) => Record<string, Record<number, string>>
  GetZoneDataBySubZone: (
    this: Lib,
    subZoneId: number,
    language?: string
  ) => Record<number, { parentZoneId: number; name: string }> | undefined
  GetZoneData: (
    this: Lib,
    zoneId: number,
    subZoneId?: number,
    language?: string
  ) => LuaMultiReturn<[ZoneDataEntry | undefined, ZoneDataEntry | undefined]>
  ShowZoneData: (this: Lib, zoneId: number, subZoneId?: number, language?: string) => undefined
  GetZoneName: (this: Lib, zoneId: number, language?: string) => string
  GetZoneNamesByIds: (
    this: Lib,
    zoneIdsTable: Record<number, number>,
    language?: string
  ) => Record<number, string>
  GetZoneDataByIds: (
    this: Lib,
    zoneIdsTable: Record<number, number>,
    language?: string
  ) => Record<number, ZoneDataEntry>
  GetZoneNameByLocalizedSearchString: (
    this: Lib,
    searchStr: string,
    searchLanguage: string | undefined,
    returnLanguage: string
  ) => Record<number, string>
  GetMaxZoneId: (this: Lib) => LuaMultiReturn<[number, number]>
  GetZoneNameByMapTexture: (
    this: Lib,
    mapTileTextureName?: string,
    patternToUse?: string,
    chatOutput?: boolean
  ) => LuaMultiReturn<
    [string | undefined, string | undefined, string | undefined, string | undefined]
  >

  GetAllZoneDataById: (this: Lib, reBuildNew?: boolean, doReloadUI?: boolean) => boolean | undefined

  GetCurrentZoneAndGroupStatus: (
    this: Lib
  ) => LuaMultiReturn<[boolean, boolean, boolean, boolean, boolean, boolean, number]>
  IsInDelve: (this: Lib) => boolean
  IsInPublicDungeon: (this: Lib) => boolean
  IsInGroupDungeon: (this: Lib) => boolean
  IsInTrial: (this: Lib) => boolean
  IsInAnyDungeon: (this: Lib) => boolean
  GetCurrentDungeonType: (this: Lib) => LuaMultiReturn<[boolean, boolean, boolean, boolean]>
  IsInHouse: (this: Lib) => boolean
  IsInCyrodiil: (this: Lib) => boolean
  IsInImperialCity: (this: Lib) => boolean
  IsInBattleground: (this: Lib) => boolean
  IsInPVP: (this: Lib) => boolean
  GetMapNames: (this: Lib, override?: boolean) => Record<number, string>

  GetZoneMapPinInfo: (
    this: Lib,
    zoneId: number,
    parentZoneId?: number
  ) => LuaMultiReturn<
    [number | undefined, number | undefined, number | undefined, boolean | undefined]
  >
  GetZoneGeographicalParentZoneId: (this: Lib, zoneId: number) => number | undefined
  GetZoneGeographicalParentMapId: (this: Lib, zoneId: number) => number | undefined
  GetGeographicalParentMapId: (this: Lib, mapId: number) => number | undefined

  DebugInspectZonePoiInfo: (this: Lib, zoneId: number) => undefined
  DebugClearGeoDataSv: (this: Lib) => undefined
  DebugVerifyGeoData: (this: Lib) => undefined
  DebugGetAllZoneDataNew: (this: Lib, doReloadUI?: boolean) => boolean | undefined

  buildAutoComplete: (
    this: Lib,
    command: ZoneLscCommand | undefined,
    langToUse: string
  ) => undefined
  buildLSCZoneSearchAutoComplete: (this: Lib) => undefined

  [key: string]: unknown
}
