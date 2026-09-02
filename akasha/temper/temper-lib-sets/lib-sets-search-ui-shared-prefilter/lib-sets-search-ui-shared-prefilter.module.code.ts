import { asNumberArrayOpt, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asCategoryBoolMapOpt,
  asDropLocationNamesMapOpt,
  asFavoritesNestedMapOpt,
  asIdBoolMapOpt,
  asIdNumBoolMapOpt,
  asPrefilterSetData,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"

const lib = LibSets

const zoite = ZO_IsTableEmpty

const clientLang = lib.clientLang
const langAllowedCheck = lib.LangAllowedCheck

const libSets_GetDropLocationNamesBySetId = lib.GetDropLocationNamesBySetId
const libSets_GetDropMechanic = lib.GetDropMechanic
const libSets_GetDropZonesBySetId = lib.GetDropZonesBySetId
const libSets_buildItemLink = lib.buildItemLink
const libSets_GetSetFirstItemId = lib.GetSetFirstItemId
const libSets_GetSetEnchantSearchCategories = lib.GetSetEnchantSearchCategories
const libSets_IsEquipTypeSet = lib.IsEquipTypeSet
const libSets_IsWeaponTypeSet = lib.IsWeaponTypeSet
const libSets_IsArmorTypeSet = lib.IsArmorTypeSet

const gilsi = GetItemLinkSetInfo

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategories = lib.possibleSetSearchFavoriteCategories

sharedClass.PreFilterMasterList = function (
  this: LibSetsSearchUISharedObject,
  defaultMasterListBase: { [setId: number]: { [key: string]: unknown } } | undefined
): { [setId: number]: { [key: string]: unknown } } | undefined {
  if (defaultMasterListBase === undefined || zoite(defaultMasterListBase)) {
    return undefined
  }
  const searchParams = this.searchParams
  if (searchParams !== undefined && !zoite(searchParams)) {
    const setsBaseList: { [setId: number]: { [key: string]: unknown } } = {}
    const langTouse = langAllowedCheck(clientLang)
    const settings = lib.svData

    const multiSelectFilterDropdownToSearchParamName =
      this.multiSelectFilterDropdownToSearchParamName

    const paramFor = (control: SearchUIControl): { [id: string]: boolean } | undefined => {
      const name = multiSelectFilterDropdownToSearchParamName.get(control)
      if (name === undefined) {
        return undefined
      }
      return asIdBoolMapOpt(searchParams[name])
    }

    const searchParamsSetType = paramFor(this.setTypeFiltersControl)
    const searchParamsArmorType = paramFor(this.armorTypeFiltersControl)
    const searchParamsWeaponType = paramFor(this.weaponTypeFiltersControl)
    const searchParamsEquipmentType = paramFor(this.equipmentTypeFiltersControl)
    const searchParamsDLCId = paramFor(this.DCLIdFiltersControl)
    const searchParamsFavorites = paramFor(this.favoritesFiltersControl)
    const searchParamsEnchantSearchCategory = paramFor(this.enchantSearchCategoryTypeFiltersControl)
    const searchParamsNumBonus = paramFor(this.numBonusFiltersControl)
    const searchParamsDropZone = paramFor(this.dropZoneFiltersControl)
    const searchParamsDropMechanic = paramFor(this.dropMechanicsFiltersControl)
    const searchParamsDropLocation = paramFor(this.dropLocationsFiltersControl)

    const setSearchFavoritesSV =
      settings === undefined ? undefined : asFavoritesNestedMapOpt(settings.setSearchFavorites)

    for (const [setId, setData] of pairs(defaultMasterListBase)) {
      let isAllowed = true

      if (setSearchFavoritesSV !== undefined) {
        for (const [, favoriteCategoryData] of ipairs(possibleSetSearchFavoriteCategories)) {
          const favoriteCategory = favoriteCategoryData.category
          if (
            searchParamsFavorites !== undefined &&
            setSearchFavoritesSV[favoriteCategory] !== undefined
          ) {
            isAllowed = false
            const searchParamsFavoritesOfCategoryIdIsFiltered =
              searchParamsFavorites[favoriteCategory]
            if (searchParamsFavoritesOfCategoryIdIsFiltered === true) {
              const favCategoryTable = setSearchFavoritesSV[favoriteCategory]
              if (favCategoryTable !== undefined && favCategoryTable[setId] === true) {
                isAllowed = true
                break
              }
            }
          }
        }
      }

      const setDataTyped = asPrefilterSetData(setData)

      if (isAllowed && searchParamsSetType !== undefined) {
        isAllowed = false
        if (
          setDataTyped.setType !== undefined &&
          searchParamsSetType[setDataTyped.setType] === true
        ) {
          isAllowed = true
        }
      }
      if (isAllowed && searchParamsDLCId !== undefined) {
        isAllowed = false
        if (setDataTyped.dlcId !== undefined && searchParamsDLCId[setDataTyped.dlcId] === true) {
          isAllowed = true
        }
      }
      if (isAllowed && searchParamsArmorType !== undefined) {
        isAllowed = false
        for (const [armorType, isFiltered] of pairs(searchParamsArmorType)) {
          if (isFiltered === true && libSets_IsArmorTypeSet(setId, tonumber(armorType))) {
            isAllowed = true
            break
          }
        }
      }
      if (isAllowed && searchParamsWeaponType !== undefined) {
        isAllowed = false
        for (const [weaponType, isFiltered] of pairs(searchParamsWeaponType)) {
          if (isFiltered === true && libSets_IsWeaponTypeSet(setId, tonumber(weaponType))) {
            isAllowed = true
            break
          }
        }
      }
      if (isAllowed && searchParamsEquipmentType !== undefined) {
        isAllowed = false
        for (const [equipType, isFiltered] of pairs(searchParamsEquipmentType)) {
          if (isFiltered === true && libSets_IsEquipTypeSet(setId, tonumber(equipType))) {
            isAllowed = true
            break
          }
        }
      }
      if (isAllowed && searchParamsEnchantSearchCategory !== undefined) {
        isAllowed = false
        const enchantSearchCategories = asCategoryBoolMapOpt(
          setDataTyped[asPresent(LIBSETS_TABLEKEY_ENCHANT_SEARCHCATEGORY_TYPES)] ??
            (libSets_GetSetEnchantSearchCategories !== undefined
              ? libSets_GetSetEnchantSearchCategories(
                  setId,
                  undefined,
                  undefined,
                  undefined,
                  undefined
                )
              : undefined)
        )
        if (enchantSearchCategories !== undefined) {
          for (const [enchantSearchCategory, isFiltered] of pairs(
            searchParamsEnchantSearchCategory
          )) {
            if (isFiltered === true && enchantSearchCategories[enchantSearchCategory] === true) {
              isAllowed = true
              break
            }
          }
        }
      }
      if (isAllowed && searchParamsNumBonus !== undefined) {
        isAllowed = false
        let numBonuses: number | undefined
        if (setDataTyped.numBonuses === undefined) {
          const itemId = libSets_GetSetFirstItemId(setId, undefined)
          if (itemId !== undefined) {
            const itemLink = libSets_buildItemLink(itemId, 370)
            if (itemLink !== undefined) {
              const [, , bonusCount] = gilsi(itemLink, false)
              setDataTyped.numBonuses = bonusCount
              numBonuses = bonusCount
            }
          }
        } else {
          numBonuses = setDataTyped.numBonuses
        }
        for (const [numBonus, isFiltered] of pairs(searchParamsNumBonus)) {
          if (isFiltered === true && numBonuses === tonumber(numBonus)) {
            isAllowed = true
            break
          }
        }
      }
      if (isAllowed && searchParamsDropZone !== undefined) {
        isAllowed = false
        const dropZones = asIdNumBoolMapOpt(
          setDataTyped.dropZones ?? libSets_GetDropZonesBySetId(setId)
        )
        if (dropZones !== undefined) {
          setDataTyped.dropZones = dropZones
          for (const [dropZoneId, isFiltered] of pairs(dropZones)) {
            if (searchParamsDropZone[dropZoneId] === true && isFiltered === true) {
              isAllowed = true
              break
            }
          }
        } else {
          if (searchParamsDropZone[-1] === true) {
            isAllowed = true
          }
        }
      }
      if (isAllowed && searchParamsDropMechanic !== undefined) {
        isAllowed = false
        let dropMechanicSource = setDataTyped[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC)]
        if (dropMechanicSource === undefined) {
          const [dropMechanicIds] = libSets_GetDropMechanic(setId, undefined, undefined)
          dropMechanicSource = dropMechanicIds
        }
        const dropMechanics = asNumberArrayOpt(dropMechanicSource)
        if (dropMechanics !== undefined) {
          setDataTyped[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC)] = dropMechanics
          for (const [dropMechanicId, isFiltered] of pairs(searchParamsDropMechanic)) {
            if (
              isFiltered === true &&
              ZO_IsElementInNumericallyIndexedTable(dropMechanics, tonumber(dropMechanicId))
            ) {
              isAllowed = true
              break
            }
          }
        }
      }
      if (isAllowed && searchParamsDropLocation !== undefined) {
        isAllowed = false
        const dropLocationNames = asDropLocationNamesMapOpt(
          setDataTyped[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] ??
            libSets_GetDropLocationNamesBySetId(setId, undefined)
        )
        if (dropLocationNames !== undefined) {
          setDataTyped[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] = dropLocationNames
          for (const [dropLocationName, isFiltered] of pairs(searchParamsDropLocation)) {
            if (isFiltered === true && !isAllowed) {
              for (const [, dropLocationNameLanguages] of pairs(dropLocationNames)) {
                const dropLocationNameInLangToUse = dropLocationNameLanguages[langTouse]
                if (
                  dropLocationNameInLangToUse !== undefined &&
                  dropLocationNameInLangToUse === dropLocationName
                ) {
                  isAllowed = true
                  break
                }
              }
            }
            if (isAllowed) {
              break
            }
          }
        }
      }

      if (isAllowed) {
        setsBaseList[setId] = setData
      }
    }

    return setsBaseList
  }
  return defaultMasterListBase
}
