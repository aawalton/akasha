import {
  asBooleanOpt,
  asPresent,
  asStrRecordOpt,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import {
  asCategoryRecordOpt,
  asSearchHistoryStringMapOpt,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"

const zoite = ZO_IsTableEmpty

const clientLang = lib.clientLang
const fallbackLang = lib.fallbackLang
const getLocalizedText = lib.GetLocalizedText
const sets_showSettingsMenu = lib.ShowSettingsMenu
const checkLSM = lib.CheckLSM

import { getSharedSearchUIClass } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-class/sets-search-ui-shared-class.module.code.ts"
import { showDropdownContextMenu } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-dropdown-menu/sets-search-ui-shared-dropdown-menu.module.code.ts"
import { clearSearchHistory } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-helpers/sets-search-ui-shared-helpers.module.code.ts"
import {
  autoStr,
  bottomStr,
  clearSearchHistoryStr,
  defaultActionLeftClickStr,
  favoriteIconWithNameTexts,
  favoritesStr,
  leftStr,
  linkToChatStr,
  popupTooltipStr,
  rightStr,
  SEARCH_TYPE_BONUS,
  SEARCH_TYPE_NAME,
  setNamesStr,
  setSearchDropLocationTooltipPosStr,
  settingsIconText,
  showAsTooltipStr,
  showLibSetsSettingsStr,
  tooltipsStr,
  topStr,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-scrollable-menu/lib-scrollable-menu.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategories = lib.possibleSetSearchFavoriteCategories

function settingsView(this: void): { [key: string]: unknown } | undefined {
  return asStrRecordOpt(lib.svData)
}

sharedClass.ShowSettingsMenu = function (
  this: SetsSearchUISharedObject,
  anchorControl: SearchUIControl
) {
  if (!checkLSM()) {
    return
  }

  ClearCustomScrollableMenu()
  AddCustomScrollableMenuHeader(
    `${settingsIconText} ${GetString(SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES1305)}`
  )

  AddCustomScrollableMenuEntry(showLibSetsSettingsStr, () => {
    sets_showSettingsMenu()
  })

  AddCustomScrollableMenuHeader(
    `${defaultActionLeftClickStr} |t100.000000%:100.000000%:EsoUI/Art/Miscellaneous/icon_LMB.dds|t`
  )

  AddCustomScrollableMenuRadioButton(
    linkToChatStr,
    () => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.setSearchUIRowLeftClickDefaultAction = "linkToChat"
      }
    },
    () => settingsView()?.setSearchUIRowLeftClickDefaultAction === "linkToChat"
  )

  AddCustomScrollableMenuRadioButton(
    popupTooltipStr,
    () => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.setSearchUIRowLeftClickDefaultAction = "popupTooltip"
      }
    },
    () => settingsView()?.setSearchUIRowLeftClickDefaultAction === "popupTooltip"
  )

  AddCustomScrollableMenuHeader(GetString(SI_GAMEPAD_BANK_FILTER_HEADER))
  const dlcDropdownFilterSubmenu: LSMSubmenuEntry[] = [
    {
      label: getLocalizedText("sortByName"),
      callback: () => {
        const settings = settingsView()
        if (settings !== undefined) {
          settings.setSearchDLCDropdownSortBy = 1
        }
      },
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => settingsView()?.setSearchDLCDropdownSortBy === 1,
      buttonGroup: 3,
    },
    {
      label: getLocalizedText("sortByDateOfRelease"),
      callback: () => {
        const settings = settingsView()
        if (settings !== undefined) {
          settings.setSearchDLCDropdownSortBy = 2
        }
      },
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => settingsView()?.setSearchDLCDropdownSortBy === 2,
      buttonGroup: 3,
    },
  ]
  AddCustomScrollableSubMenuEntry(getLocalizedText("DLCDropdown"), dlcDropdownFilterSubmenu)

  AddCustomScrollableMenuHeader(tooltipsStr)
  AddCustomScrollableMenuCheckbox(
    getLocalizedText("textBoxFilterTooltips"),
    (_comboBox, _itemName, _item, checked) => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.setSearchTooltipsAtTextFilters = checked
      }
    },
    () => asBooleanOpt(settingsView()?.setSearchTooltipsAtTextFilters)
  )
  AddCustomScrollableMenuCheckbox(
    getLocalizedText("dropdownFilterTooltips"),
    (_comboBox, _itemName, _item, checked) => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.setSearchTooltipsAtFilters = checked
      }
    },
    () => asBooleanOpt(settingsView()?.setSearchTooltipsAtFilters)
  )
  AddCustomScrollableMenuCheckbox(
    getLocalizedText("dropdownFilterEntryTooltips"),
    (_comboBox, _itemName, _item, checked) => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.setSearchTooltipsAtFilterEntries = checked
      }
    },
    () => asBooleanOpt(settingsView()?.setSearchTooltipsAtFilterEntries)
  )

  AddCustomScrollableMenuHeader(getLocalizedText("droppedBy"))
  AddCustomScrollableMenuCheckbox(
    showAsTooltipStr,
    (_comboBox, _itemName, _item, checked) => {
      const settings = settingsView()
      if (settings !== undefined) {
        settings.showSetSearchDropLocationTooltip = checked
      }
    },
    () => asBooleanOpt(settingsView()?.showSetSearchDropLocationTooltip)
  )

  const dropLocEnabled = (): boolean => settingsView()?.showSetSearchDropLocationTooltip === true
  const setDropLocPos = (pos: number): undefined => {
    const settings = settingsView()
    if (settings !== undefined) {
      settings.setSearchDropLocationTooltipPos = pos
    }
  }
  const isDropLocPos = (pos: number): boolean =>
    settingsView()?.setSearchDropLocationTooltipPos === pos
  const subMenuEntriesTooltipPositions: LSMSubmenuEntry[] = [
    {
      label: autoStr,
      callback: () => setDropLocPos(-1),
      enabled: dropLocEnabled,
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => isDropLocPos(-1),
      buttonGroup: 1,
    },
    { label: "-", entryType: LSM_ENTRY_TYPE_DIVIDER },
    {
      label: topStr,
      callback: () => setDropLocPos(TOP),
      enabled: dropLocEnabled,
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => isDropLocPos(TOP),
      buttonGroup: 1,
    },
    {
      label: rightStr,
      callback: () => setDropLocPos(RIGHT),
      enabled: dropLocEnabled,
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => isDropLocPos(RIGHT),
      buttonGroup: 1,
    },
    {
      label: bottomStr,
      callback: () => setDropLocPos(BOTTOM),
      enabled: dropLocEnabled,
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => isDropLocPos(BOTTOM),
      buttonGroup: 1,
    },
    {
      label: leftStr,
      callback: () => setDropLocPos(LEFT),
      enabled: dropLocEnabled,
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      checked: () => isDropLocPos(LEFT),
      buttonGroup: 1,
    },
  ]
  AddCustomScrollableMenuEntry(
    setSearchDropLocationTooltipPosStr,
    undefined,
    LSM_ENTRY_TYPE_SUBMENU,
    subMenuEntriesTooltipPositions,
    undefined
  )

  if (clientLang !== fallbackLang) {
    AddCustomScrollableMenuHeader(setNamesStr)
    AddCustomScrollableMenuCheckbox(
      getLocalizedText("searchUIShowSetNameInEnglishToo"),
      (_comboBox, _itemName, _item, checked) => {
        const settings = settingsView()
        if (settings !== undefined) {
          settings.setSearchShowSetNamesInEnglishToo = checked
        }
        this.resultsList.RefreshData()
      },
      () => asBooleanOpt(settingsView()?.setSearchShowSetNamesInEnglishToo)
    )
  }

  const settings = settingsView()
  const setSearchFavorites =
    settings === undefined ? undefined : asCategoryRecordOpt(settings.setSearchFavorites)
  let wasFavoriteHeaderAdded = false
  for (const [, favoriteCategoryData] of ipairs(possibleSetSearchFavoriteCategories)) {
    const favoriteCategory = favoriteCategoryData.category
    if (setSearchFavorites !== undefined && !zoite(setSearchFavorites[favoriteCategory] ?? {})) {
      if (!wasFavoriteHeaderAdded) {
        AddCustomScrollableMenuHeader(favoritesStr)
        wasFavoriteHeaderAdded = true
      }
      AddCustomScrollableMenuEntry(
        `${asPresent(favoriteIconWithNameTexts[favoriteCategory])} ${GetString(SI_ATTRIBUTEPOINTALLOCATIONMODE_CLEARKEYBIND1)} '${zo_strformat("<<C:1>>", favoriteCategory)}'`,
        () => {
          this.RemoveAllSetFavorites(favoriteCategory)
        }
      )
    }
  }

  ShowCustomScrollableMenu(anchorControl)
}

sharedClass.ShowDropdownContextMenu = showDropdownContextMenu

sharedClass.OnSearchEditBoxContextMenu = function (
  this: SetsSearchUISharedObject,
  editBoxControl: SearchUIEditBox | undefined,
  _shift?: boolean,
  _alt?: boolean,
  _ctrl?: boolean,
  _command?: boolean
) {
  if (!checkLSM()) {
    return
  }
  if (editBoxControl === undefined) {
    return
  }

  const settings = settingsView()
  let doShowMenu = false
  let anyEntryAddedAlready = false

  ClearCustomScrollableMenu()

  if (editBoxControl.GetText() !== "") {
    ClearCustomScrollableMenu()
    anyEntryAddedAlready = true
    AddCustomScrollableMenuEntry(GetString(SI_GAMEPAD_MAIL_SEND_CLEAR), () => {
      this.SetSearchEditBoxValue(editBoxControl, "")
      ClearCustomScrollableMenu()
    })
    AddCustomScrollableMenuDivider()
    doShowMenu = true
  }

  const addHistory = (searchType: string): boolean => {
    const searchHistory = asSearchHistoryStringMapOpt(settings?.setSearchHistory)
    const searchHistoryOfSearchMode = searchHistory?.[searchType]
    if (searchHistoryOfSearchMode !== undefined && searchHistoryOfSearchMode.length > 0) {
      if (!anyEntryAddedAlready) {
        ClearCustomScrollableMenu()
      }
      for (const [, searchTerm] of ipairs(searchHistoryOfSearchMode)) {
        AddCustomScrollableMenuEntry(searchTerm, () => {
          this.SetSearchEditBoxValue(editBoxControl, searchTerm)
          ClearCustomScrollableMenu()
        })
      }
      AddCustomScrollableMenuDivider()
      AddCustomScrollableMenuEntry(clearSearchHistoryStr, () => {
        clearSearchHistory(searchType)
        ClearCustomScrollableMenu()
      })
      return true
    }
    return false
  }

  if (editBoxControl === this.searchEditBoxControl) {
    if (settings?.setSearchSaveNameHistory === true) {
      if (addHistory(SEARCH_TYPE_NAME)) {
        doShowMenu = true
      }
    }
  } else if (editBoxControl === this.bonusSearchEditBoxControl) {
    if (settings?.setSearchSaveBonusHistory === true) {
      if (addHistory(SEARCH_TYPE_BONUS)) {
        doShowMenu = true
      }
    }
  }
  if (doShowMenu) {
    ShowCustomScrollableMenu(editBoxControl, { visibleRowsDropdown: 15 })
  }
}
