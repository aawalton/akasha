import {
  asBooleanOpt,
  asPresent,
  asStrRecordOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asAnyObjectOpt,
  asCategoryRecordOpt,
  asSearchHistoryStringMapOpt,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const lib = LibSets

const tos = tostring
const zoite = ZO_IsTableEmpty

const clientLang = lib.clientLang
const fallbackLang = lib.fallbackLang
const getLocalizedText = lib.GetLocalizedText
const libSets_showSettingsMenu = lib.ShowSettingsMenu
const libSets_getsetIdsOfCurrentZone = lib.GetSetIdsOfCurrentZone
const libSets_getCurrentZoneName = lib.GetCurrentZoneName
const checkLSM = lib.CheckLSM

import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import { clearSearchHistory } from "../lib-sets-search-ui-shared-helpers/lib-sets-search-ui-shared-helpers.module.code.ts"
import {
  autoStr,
  bottomStr,
  clearSearchHistoryStr,
  defaultActionLeftClickStr,
  favoriteIconWithNameTexts,
  favoritesStr,
  getComboBoxFromDropdownControl,
  invertSelectionStr,
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
} from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategories = lib.possibleSetSearchFavoriteCategories

function settingsView(this: void): { [key: string]: unknown } | undefined {
  return asStrRecordOpt(lib.svData)
}

sharedClass.ShowSettingsMenu = function (
  this: LibSetsSearchUISharedObject,
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
    libSets_showSettingsMenu()
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

sharedClass.ShowDropdownContextMenu = function (
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl,
  _shift?: boolean,
  _alt?: boolean,
  _ctrl?: boolean,
  _command?: boolean
) {
  if (!checkLSM()) {
    return
  }

  const comboBox = getComboBoxFromDropdownControl(dropdownControl)

  if (
    this.multiSelectFilterDropdowns !== undefined &&
    ZO_IsElementInNumericallyIndexedTable(this.multiSelectFilterDropdowns, dropdownControl)
  ) {
    ClearCustomScrollableMenu()
    const numEntries = comboBox.GetNumItems()
    const numSelectedEntries = comboBox.GetNumSelectedEntries()
    const notAllSelected = numSelectedEntries < numEntries

    if (notAllSelected) {
      AddCustomScrollableMenuEntry(GetString(SI_ITEMFILTERTYPE0), () => {
        this.SelectAllAtMultiSelectDropdown(dropdownControl)
        this.OnFilterChanged(dropdownControl)
      })
    }

    if (numSelectedEntries > 0) {
      if (notAllSelected) {
        AddCustomScrollableMenuEntry(invertSelectionStr, () => {
          this.SelectInvertMultiSelectDropdown(dropdownControl)
          this.OnFilterChanged(dropdownControl)
        })
      }

      AddCustomScrollableMenuEntry(GetString(SI_ATTRIBUTEPOINTALLOCATIONMODE_CLEARKEYBIND1), () => {
        this.ResetMultiSelectDropdown(dropdownControl)
        this.OnFilterChanged(dropdownControl)
      })
    }

    if (dropdownControl === this.favoritesFiltersControl) {
      AddCustomScrollableMenuDivider()
      for (const [, favoriteCategoryData] of ipairs(possibleSetSearchFavoriteCategories)) {
        const favoriteCategory = favoriteCategoryData.category
        const entriesToSelect = [favoriteCategory]
        AddCustomScrollableMenuEntry(
          `${asPresent(favoriteIconWithNameTexts[favoriteCategory])} '${zo_strformat("<<C:1>>", favoriteCategory)}'`,
          () => {
            this.SelectMultiSelectDropdownEntries(dropdownControl, entriesToSelect, true)
          }
        )
      }
    } else if (dropdownControl === this.dropZoneFiltersControl) {
      AddCustomScrollableMenuDivider()
      const [setIdsOfCurrentZone, currentZoneId, currentParentZoneId] =
        libSets_getsetIdsOfCurrentZone()
      if (!zoite(asAnyObjectOpt(setIdsOfCurrentZone) ?? {})) {
        const [currentZoneName, currentParentZoneName] = libSets_getCurrentZoneName()
        const currentZoneSetStr = `${getLocalizedText("showCurrentZoneSets")} '${currentZoneName}' (${tos(currentZoneId)})`

        const entriesToSelect = [currentZoneId]
        AddCustomScrollableMenuEntry(currentZoneSetStr, () => {
          this.SelectMultiSelectDropdownEntries(dropdownControl, entriesToSelect, true)
        })
        if (currentParentZoneId !== undefined && currentParentZoneId !== currentZoneId) {
          const currentParentZoneSetStr = `${getLocalizedText("showCurrentZoneSets")} '${currentParentZoneName}' (${tos(currentParentZoneId)})`
          const entriesForParentZoneToSelect = [currentParentZoneId]
          AddCustomScrollableMenuEntry(currentParentZoneSetStr, () => {
            this.SelectMultiSelectDropdownEntries(
              dropdownControl,
              entriesForParentZoneToSelect,
              true
            )
          })
        }
      }
    }

    ShowCustomScrollableMenu(dropdownControl)
  }
}

sharedClass.OnSearchEditBoxContextMenu = function (
  this: LibSetsSearchUISharedObject,
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
