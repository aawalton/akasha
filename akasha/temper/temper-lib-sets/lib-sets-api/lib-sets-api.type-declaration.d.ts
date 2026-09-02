interface LibSetsApi {
  name: string
  prefix: string
  version: number
  author: string
  svName: string
  svDebugName: string
  svVersion: number
  setsLoaded: boolean
  setsScanning: boolean
  fullyLoaded: boolean
  startedLoading: boolean
  IsConsole: boolean
  checkIfPTSAPIVersionIsLive: (this: void) => boolean
  APIVersions: { [key: string]: number }
  setDataPreloaded: { [tableKey: string]: unknown }
  setIds: { [setId: number]: boolean }
  nonExistingSetIdsAtCurrentApiVersion: { [setId: number]: boolean }
}

interface LibSetsApi {
  openMapOfZoneId: (
    this: void,
    zoneId: number | undefined,
    isParentZoneId?: boolean
  ) => boolean | undefined
  showWayshrineNodeIdOnMap: (this: void, wayshrineNodeId: number | undefined) => boolean | undefined

  IsCraftedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsMonsterSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDungeonSet: (this: void, setId: number | undefined) => boolean | undefined
  IsTrialSet: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[boolean | undefined, boolean | undefined]>
  IsArenaSet: (this: void, setId: number | undefined) => boolean | undefined
  IsOverlandSet: (this: void, setId: number | undefined) => boolean | undefined
  IsCyrodiilSet: (this: void, setId: number | undefined) => boolean | undefined
  IsBattlegroundSet: (this: void, setId: number | undefined) => boolean | undefined
  IsImperialCitySet: (this: void, setId: number | undefined) => boolean | undefined
  IsSpecialSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDailyRandomDungeonAndImperialCityRewardSet: (
    this: void,
    setId: number | undefined
  ) => boolean | undefined
  IsMythicSet: (this: void, setId: number | undefined) => boolean | undefined
  IsClassSet: (this: void, setId: number | undefined, classId?: number) => boolean | undefined

  IsDungeonZoneId: (this: void, zoneId: number | undefined) => boolean | undefined
  IsDungeonZoneIdTrial: (this: void, zoneId: number | undefined) => boolean | undefined
}

interface LibSetsApi {
  IsAPerfectedOrNonPerfectedSetId: (this: void, setId: number) => boolean
  IsPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsNonPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  GetPerfectedSetId: (
    this: void,
    perfectedSetId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetPerfectedSetInfo: (
    this: void,
    setId: number | undefined
  ) => { [k: string]: unknown } | undefined
  GetAllPerfectedSetIds: (this: void) => unknown
  GetAllNonPerfectedSetIds: (this: void) => unknown
  IsSetByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsSetByItemLink: (
    this: void,
    itemLink: string | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsVeteranSet: (
    this: void,
    setId: number | undefined,
    itemLink: string | undefined
  ) => boolean | undefined
}

interface LibSetsApi {
  IsArmorTypeSet: (
    this: void,
    setId: number | undefined,
    armorType: number | undefined
  ) => boolean | undefined
  IsLightArmorSet: (this: void, setId: number | undefined) => boolean
  IsMediumArmorSet: (this: void, setId: number | undefined) => boolean
  IsHeavyArmorSet: (this: void, setId: number | undefined) => boolean
  IsAllArmorSet: (this: void, setId: number | undefined) => boolean
  IsArmorSet: (this: void, setId: number | undefined) => boolean
  IsJewelrySet: (this: void, setId: number | undefined) => boolean
  IsWeaponSet: (this: void, setId: number | undefined) => boolean
  IsWeaponTypeSet: (
    this: void,
    setId: number | undefined,
    weaponType: number | undefined
  ) => boolean
  IsEquipTypeSet: (this: void, setId: number | undefined, equipType: number | undefined) => boolean

  GetAllArmorTypeSets: (this: void, armorType: number | undefined) => unknown
  GetAllArmorSets: (this: void) => unknown
  GetAllJewelrySets: (this: void) => unknown
  GetAllWeaponSets: (this: void) => unknown
  GetAllWeaponTypeSets: (this: void, weaponType: number | undefined) => unknown
  GetAllEquipTypeSets: (this: void, equipType: number | undefined) => unknown
}
