interface LibSetsApi {
  GetWayshrineIds: (
    this: void,
    setId: number | undefined,
    withRelatedZoneIds?: boolean
  ) => LuaMultiReturn<[unknown, { [wayshrineNodeId: number]: number | undefined } | undefined]>
  GetWayshrinesZoneId: (this: void, wayshrineNodeId: number | undefined) => number | undefined
  GetZoneIds: (this: void, setId: number | undefined) => unknown

  GetDLCId: (this: void, setId: number | undefined) => unknown
  IsCurrentDLC: (this: void, setId: number | undefined) => boolean | undefined
  GetAllDLCIds: (this: void) => unknown
  GetDLCType: (this: void, setId: number | undefined) => number | undefined
  GetDLCTypeName: (this: void, dlcTypeId: number | undefined) => string | undefined
  GetAllDLCTypes: (this: void) => unknown

  GetTraitsNeeded: (this: void, setId: number | undefined) => unknown

  GetSetTypeName: (
    this: void,
    libSetsSetType: number | undefined,
    lang?: string
  ) => string | undefined
  GetAllSetTypes: (this: void) => unknown
}

interface LibSetsApi {
  GetDropMechanicName: (
    this: void,
    libSetsDropMechanicId: number | undefined,
    lang?: string
  ) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetDropMechanic: (
    this: void,
    setId: number | undefined,
    withNames?: boolean,
    lang?: string
  ) => LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown]>
  GetAllDropMechanics: (this: void) => unknown

  GetDropZonesBySetId: (this: void, setId: number | undefined) => unknown
  GetSetIdsByDropZone: (this: void, zoneId: number | undefined) => unknown
  GetSetIdsOfCurrentZone: (
    this: void
  ) => LuaMultiReturn<[unknown, number | undefined, number | undefined]>

  GetDropLocationNamesBySetId: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetIdsByDropLocationName: (
    this: void,
    dropLocationName: string | undefined,
    lang?: string
  ) => unknown

  GetAllSetIds: (this: void) => unknown
  GetAllSetItemIds: (this: void) => unknown
}

interface LibSetsApi {
  GetSetItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined
  GetSetFirstItemId: (
    this: void,
    setId: number | undefined,
    isNoESOSetId?: boolean,
    equipType?: number,
    traitType?: number,
    enchantSearchCategoryType?: number | string,
    armorType?: number,
    weaponType?: number
  ) => number | undefined

  GetSetName: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetNames: (this: void, setId: number | undefined) => unknown
  GetAllSetNames: (this: void) => unknown

  GetSetArmorTypes: (this: void, setId: number | undefined) => unknown
  GetArmorTypeName: (this: void, armorType: number | undefined) => string | undefined
  GetItemsArmorType: (this: void, itemId: number | undefined) => number | undefined

  GetSetWeaponTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined
  GetItemsWeaponType: (this: void, itemId: number | undefined) => number | undefined

  GetNumEquippedItemsByItemIds: (
    this: void,
    setsItemIds: { [itemId: number]: unknown } | undefined
  ) => number
  GetNumEquippedItemsBySetId: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>
  GetNumEquippedItemsByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined, number | undefined]>

  GetSetEquipTypes: (
    this: void,
    setId: number | undefined
  ) => { [setId: number]: boolean | undefined } | undefined

  GetSetByName: (
    this: void,
    setName: string | undefined,
    lang?: string
  ) => LuaMultiReturn<[number | undefined, unknown]>
  GetSetBonuses: (this: void, itemLink: string, numBonuses: number) => (string | undefined)[]

  GetClassSets: (this: void, classId: number | undefined) => unknown
  GetAllClassSets: (this: void) => unknown

  JumpToSetId: (this: void, setId: number | undefined, factionIndex?: number) => boolean | undefined

  RegisterCustomSetSearchResultsListContextMenu: (
    this: void,
    addonName: string | undefined,
    headerName: string | undefined,
    submenuName: string | undefined,
    submenuEntries: object | undefined,
    visibleFunc: ((this: void, ...args: unknown[]) => unknown) | undefined
  ) => void
  GetSetSearchFavoriteCategories: (this: void) => {
    category: string
    categoryName: unknown
    texture: string
  }[]
  GetSetSearchFavoriteCategoryData: (
    this: void,
    category: string | undefined
  ) =>
    | {
        category: string
        categoryName: unknown
        texture: string
      }
    | undefined
  GetSetSearchFavoritesCategoriesForSetId: (
    this: void,
    setId: number | undefined
  ) =>
    | (
        | {
            category: string
            categoryName: unknown
            texture: string
          }
        | undefined
      )[]
    | undefined
}
