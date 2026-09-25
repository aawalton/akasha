import {
  asNumberArrayOpt,
  asPresent,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import {
  asIdNumRecordOpt,
  asParamStringMap,
  asSetsCopyDialogData,
  asSetsSearchRowDataOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"

const tos = tostring
const zoite = ZO_IsTableEmpty
const zocstrfor = ZO_CachedStrFormat

const clientLang = lib.clientLang
const getLocalizedText = lib.GetLocalizedText
const sets_GetDropZonesBySetId = lib.GetDropZonesBySetId
const sets_GetZoneName = lib.GetZoneName
const sets_OpenMapOfZoneId = lib.openMapOfZoneId
const sets_GetWayshrineIds = lib.GetWayshrineIds
const sets_ShowWayshrineNodeIdOnMap = lib.showWayshrineNodeIdOnMap
const sets_OpenSetItemCollectionBookForItemLink = lib.OpenSetItemCollectionBookForItemLink
const checkLSM = lib.CheckScrollableMenu

import { getSharedSearchUIClass } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-class/sets-search-ui-shared-class.module.code.ts"
import {
  addOtherAddonsContextMenuEntries,
  checkAndGetWayshrineName,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-helpers/sets-search-ui-shared-helpers.module.code.ts"
import {
  dropZoneAndWayshrinesStr,
  dropZonesStr,
  favoriteIconWithNameTexts,
  searchUI,
  wayshrinesStr,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import { SETS_SETTYPE_CRAFTED } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-settype-ids/sets-const-settype-ids.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-strings/eso-item-browser-strings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategories = lib.possibleSetSearchFavoriteCategories

const favoriteIconTexts = searchUI.favoriteIconTexts

sharedClass.ShowRowContextMenu = function (
  this: SetsSearchUISharedObject,
  rowControl: SearchUIControl
) {
  if (!checkLSM()) {
    return
  }

  const data = asSetsSearchRowDataOpt(rowControl.data)
  if (data === undefined) {
    return
  }
  const setId = data.setId
  const owningWindow = rowControl.GetOwningWindow()

  const setName = zocstrfor("<<1>>", data.name)
  const setTypeName = data.setTypeName
  const setTypeTexture = data.setTypeTexture
  const searchEntryText = getLocalizedText("setCollectionsSearchItemLink", clientLang, setName)
  const searchEntryTextWithTexture =
    setTypeTexture !== undefined && setTypeTexture !== ""
      ? setTypeTexture + searchEntryText
      : searchEntryText
  const setNameWithSetId = `${setName} [${tos(setId)}]`

  TemperScrollableMenuClear()

  TemperScrollableMenuAddHeader(setNameWithSetId)
  TemperScrollableMenuAddEntry(
    setTypeTexture !== undefined && setTypeTexture !== "" && setTypeName !== undefined
      ? setTypeTexture + setTypeName
      : (setTypeName ?? ""),
    () => {},
    TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
    undefined,
    { enabled: false }
  )

  TemperScrollableMenuAddEntry(getLocalizedText("linkToChat"), () => {
    this.ItemLinkToChat(data)
  })

  TemperScrollableMenuAddHeader(getLocalizedText("tooltips"))

  const popupTooltipSubmenu: LSMSubmenuEntry[] = [
    {
      label: getLocalizedText("auto"),
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = -1
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === -1,
    },
    {
      label: "-",
      callback: () => {},
    },
    {
      label: getLocalizedText("left"),
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === LEFT,
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = LEFT
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
    },
    {
      label: getLocalizedText("right"),
      entryType: TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === RIGHT,
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = RIGHT
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
    },
  ]
  TemperScrollableMenuAddEntry(getLocalizedText("popupTooltip"), () => {
    this.ShowItemLinkPopupTooltip(owningWindow, data)
  })
  TemperScrollableMenuAddSubMenuEntry(getLocalizedText("popupTooltipPosition"), popupTooltipSubmenu)

  if (setId !== undefined) {
    let wasFavoriteHeaderAdded = false
    let removeAllFavoritesAdded = false
    const favoriteCategoriesToAddSubmenuEntries: LSMSubmenuEntry[] = []
    for (const [, favoriteCategoryData] of ipairs(possibleSetSearchFavoriteCategories)) {
      const favoriteCategory = favoriteCategoryData.category
      if (!wasFavoriteHeaderAdded) {
        TemperScrollableMenuAddHeader(asPresent(favoriteIconWithNameTexts[favoriteCategory]))
        wasFavoriteHeaderAdded = true
      }
      if (this.IsSetIdInFavorites(setId, favoriteCategory)) {
        if (!removeAllFavoritesAdded) {
          removeAllFavoritesAdded = true
          TemperScrollableMenuAddEntry(
            `${GetString(SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE)} - ${GetString(SI_HOUSINGFURNITUREBOUNDFILTER0)}`,
            () => {
              this.RemoveSetIdFromAllFavorites(rowControl, setId)
            }
          )
        }
        TemperScrollableMenuAddEntry(
          `${asPresent(favoriteIconTexts[favoriteCategory])} ${GetString(SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE)} '${zo_strformat("<<C:1>>", favoriteCategory)}'`,
          () => {
            this.RemoveSetIdFromFavorites(rowControl, setId, favoriteCategory)
          }
        )
      } else {
        const subMenuEntry: LSMSubmenuEntry = {
          label:
            asPresent(favoriteIconTexts[favoriteCategory]) +
            zo_strformat("<<C:1>>", favoriteCategory),
          callback: () => {
            this.AddSetIdToFavorites(rowControl, setId, favoriteCategory)
          },
        }
        favoriteCategoriesToAddSubmenuEntries.push(subMenuEntry)
      }
    }
    if (!zoite(favoriteCategoriesToAddSubmenuEntries)) {
      TemperScrollableMenuAddSubMenuEntry(
        GetString(SI_COLLECTIBLE_ACTION_ADD_FAVORITE),
        favoriteCategoriesToAddSubmenuEntries
      )
    }

    const setDropZones = asIdNumRecordOpt(sets_GetDropZonesBySetId(setId))
    const zoneIdSubmenuEntries: LSMSubmenuEntry[] = []
    if (!zoite(setDropZones ?? {})) {
      const alreadyAddedZoneIds: { [zoneId: number]: boolean } = {}
      const zoneIds = data.zoneIds ?? []
      for (const [, zoneId] of ipairs(zoneIds)) {
        if (zoneId !== -1 && alreadyAddedZoneIds[zoneId] !== true) {
          const zoneName = sets_GetZoneName(zoneId)
          const subMenuEntry: LSMSubmenuEntry = {
            label: zoneName,
            callback: () => {
              sets_OpenMapOfZoneId(zoneId)
            },
          }
          zoneIdSubmenuEntries.push(subMenuEntry)
          alreadyAddedZoneIds[zoneId] = true
        }
      }
    }

    const wayshrinesSubmenuEntries: LSMSubmenuEntry[] = []
    const [setWayshrines] = sets_GetWayshrineIds(setId)
    const setWayshrinesTab = asNumberArrayOpt(setWayshrines)
    if (setWayshrinesTab !== undefined && !zoite(setWayshrinesTab)) {
      checkAndGetWayshrineName(setWayshrinesTab)

      const alreadyAddedWayshrines: { [wsIndex: number]: boolean } = {}
      for (const [, wayshrineNodeIndex] of ipairs(setWayshrinesTab)) {
        if (wayshrineNodeIndex > 0 && alreadyAddedWayshrines[wayshrineNodeIndex] !== true) {
          const [wsKnown, wsName] = GetFastTravelNodeInfo(wayshrineNodeIndex)
          let wayshrineName = ZO_CachedStrFormat("<<C:1>>", wsName)
          if (wsKnown !== true) {
            wayshrineName = `${wayshrineName} <|cFF0000${GetString(SI_INPUT_LANGUAGE_UNKNOWN)}|r>`
          }
          const subMenuEntry: LSMSubmenuEntry = {
            label: wayshrineName,
            callback: () => {
              sets_ShowWayshrineNodeIdOnMap(wayshrineNodeIndex)
            },
          }
          wayshrinesSubmenuEntries.push(subMenuEntry)
          alreadyAddedWayshrines[wayshrineNodeIndex] = true
        }
      }
    }

    const gotDropZones = !zoite(zoneIdSubmenuEntries)
    const gotWayshrines = !zoite(wayshrinesSubmenuEntries)
    if (gotDropZones || gotWayshrines) {
      TemperScrollableMenuAddHeader(dropZoneAndWayshrinesStr)
      if (gotDropZones) {
        TemperScrollableMenuAddSubMenuEntry(dropZonesStr, zoneIdSubmenuEntries)
      }
      if (gotWayshrines) {
        TemperScrollableMenuAddSubMenuEntry(wayshrinesStr, wayshrinesSubmenuEntries)
      }
    }

    if (data.setDataText !== undefined) {
      const getSetTextForCopyDialog = (withTextures: boolean): undefined => {
        const copyDialog = lib.CopyDialog
        let setNameForDialog = data.name
        if (data.setTypeTexture !== undefined) {
          setNameForDialog = `${data.setTypeTexture} ${setNameForDialog}`
        }
        const textParams = asParamStringMap({ 1: setNameForDialog })
        copyDialog.Show(
          asSetsCopyDialogData({
            text: withTextures ? data.setDataText : data.setDataTextClean,
            setData: data,
          }),
          asParamStringMap({ titleParams: textParams })
        )
      }

      TemperScrollableMenuAddHeader(getLocalizedText("setInfos"))
      TemperScrollableMenuAddEntry(getLocalizedText("showAsText"), () => {
        getSetTextForCopyDialog(false)
      })
      TemperScrollableMenuAddEntry(getLocalizedText("showAsTextWithIcons"), () => {
        getSetTextForCopyDialog(true)
      })
    }

    if (data.itemLink !== undefined) {
      const setType = data.setType
      const isCraftedSet = setType === SETS_SETTYPE_CRAFTED

      if (!isCraftedSet) {
        TemperScrollableMenuAddHeader(getLocalizedText("headerItemLinks"))

        TemperScrollableMenuAddEntry(searchEntryTextWithTexture, () => {
          if (data.itemLink !== undefined) {
            sets_OpenSetItemCollectionBookForItemLink(data.itemLink)
          }
        })
      }
    }

    addOtherAddonsContextMenuEntries(rowControl, setId)
  }
  TemperScrollableMenuShow(rowControl, { visibleRowsDropdown: 18 })
}
