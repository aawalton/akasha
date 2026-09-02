interface LibSetsApi {
  checkIfSetsAreLoadedProperly: (setId?: number) => boolean
  IsCraftedSet: (setId: number) => boolean
  IsMonsterSet: (setId: number) => boolean
  IsDungeonSet: (setId: number) => boolean
  IsTrialSet: (setId: number) => boolean
  IsArenaSet: (setId: number) => boolean
  IsOverlandSet: (setId: number) => boolean
  IsCyrodiilSet: (setId: number) => boolean
  IsBattlegroundSet: (setId: number) => boolean
  IsImperialCitySet: (setId: number) => boolean
  IsSpecialSet: (setId: number) => boolean
  IsDailyRandomDungeonAndImperialCityRewardSet: (setId: number) => boolean
  GetSetType: (setId: number | undefined) => number | undefined
  GetSetTypeName: (libSetsSetType: number | undefined, lang?: string) => string | undefined
}

declare const LibSets: LibSetsApi
