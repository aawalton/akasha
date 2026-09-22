import {
  asAnyObject,
  asNumber,
  asString,
  asStringOpt,
  asTyped,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { sortFilterComboBox } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-kbf-sorting/sets-kbf-sorting.module.code.ts"
import {
  asComboBoxSortKey,
  asComboBoxSortKeyOpt,
  asNumberOrString,
  asSearchUIComboBox,
  asSetsSearchRowDataOpt,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import {
  getKeyboardSearchUIClass,
  getKeyboardSearchUIClassForOverride,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-keyboard-class/sets-search-ui-keyboard-class.module.code.ts"
import { getSharedSuper } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-class/sets-search-ui-shared-class.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import { SETS_SET_ITEMID_TABLE_VALUE_OK } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const sets_GetSetItemId = lib.GetSetItemId
const sets_GetSetItemIds = lib.GetSetItemIds

const keyboardClass = getKeyboardSearchUIClass()
const keyboardOverride = getKeyboardSearchUIClassForOverride()

function addToIndexTable(
  this: void,
  t: { [key: string]: boolean } | undefined
): number[] | undefined {
  if (t === undefined || ZO_IsTableEmpty(t)) {
    return undefined
  }
  const retTab: number[] = []
  for (const [k] of pairs(t)) {
    retTab[retTab.length] = asNumber(k)
  }
  return retTab
}

keyboardClass.UpdateDropdownSort = function (
  this: SetsSearchUIKeyboardObject,
  comboBoxType: string,
  sortType: unknown,
  suppressRebuild?: boolean
): undefined {
  const comboBox = this.multiSelectFilterTypeNameToDropdown[comboBoxType]
  if (comboBox === undefined) {
    return
  }
  const dropdown = asTyped<SearchUIComboBox>(
    ZO_ComboBox_ObjectFromContainer(asTyped<Control>(comboBox))
  )
  if (dropdown === undefined) {
    return
  }

  dropdown.SetSortsItems(true)
  const sortKey = sortType !== undefined ? asComboBoxSortKey(sortType) : dropdown._sortFunc
  sortFilterComboBox(dropdown, asComboBoxSortKeyOpt(sortKey), suppressRebuild)
}

keyboardClass.GetSelectedMultiSelectDropdownFilters = function (
  this: SetsSearchUIKeyboardObject,
  multiSelectDropdown: SearchUIControl
): { [filterType: string]: boolean } {
  const selectedFilterTypes: { [filterType: string]: boolean } = {}
  const dropdownComboBox = asSearchUIComboBox(multiSelectDropdown.m_comboBox)

  if (dropdownComboBox.GetNumSelectedEntries() === 0) {
    return selectedFilterTypes
  }

  for (const item of dropdownComboBox.GetItems()) {
    if (dropdownComboBox.IsItemSelected(item)) {
      const filterType = item.filterType
      if (filterType !== undefined) {
        selectedFilterTypes[asString(filterType)] = true
      }
    }
  }
  return selectedFilterTypes
}

keyboardClass.SetMultiSelectDropdownFilters = function (
  this: SetsSearchUIKeyboardObject,
  multiSelectDropdown: SearchUIControl,
  entriesToSelect: { [filterType: string]: boolean }
): undefined {
  this.ResetMultiSelectDropdown(multiSelectDropdown)
  const dropdownComboBox = asSearchUIComboBox(multiSelectDropdown.m_comboBox)

  for (const item of dropdownComboBox.GetItems()) {
    for (const [entry, shouldSelect] of pairs(entriesToSelect)) {
      if (shouldSelect === true && asNumberOrString(entry) === item.filterType) {
        dropdownComboBox.AddItemToSelected(item)
        break
      }
    }
  }

  dropdownComboBox.RefreshSelectedItemText()
}

keyboardClass.IsAnyItemIdRelevantFilterActive = function (
  this: SetsSearchUIKeyboardObject
): boolean {
  const searchParams = this.searchParams
  if (searchParams === undefined || ZO_IsTableEmpty(searchParams)) {
    return false
  }

  for (const dropdownControl of this.multiSelectFilterDropdowns) {
    if (this.isItemIdRelevantMultiSelectFilterDropdown.get(dropdownControl) === true) {
      const searchParamEntryKey =
        this.multiSelectFilterDropdownToSearchParamName.get(dropdownControl)
      const searchParamEntry =
        searchParamEntryKey === undefined ? undefined : searchParams[searchParamEntryKey]
      if (
        searchParamEntry !== undefined &&
        typeof searchParamEntry !== "string" &&
        !ZO_IsTableEmpty(searchParamEntry)
      ) {
        return true
      }
    }
  }

  return false
}

keyboardClass.GetItemIdRelevantFilterKeys = function (
  this: SetsSearchUIKeyboardObject
): { [searchParamKey: string]: boolean } | false {
  const searchParamKeysOfItemIdAffectingFilters: { [searchParamKey: string]: boolean } = {}
  const searchParams = this.searchParams
  if (searchParams === undefined || ZO_IsTableEmpty(searchParams)) {
    return false
  }

  for (const dropdownControl of this.multiSelectFilterDropdowns) {
    if (this.isItemIdRelevantMultiSelectFilterDropdown.get(dropdownControl) === true) {
      const searchParamKey = this.multiSelectFilterDropdownToSearchParamName.get(dropdownControl)
      const searchParamEntry =
        searchParamKey === undefined ? undefined : searchParams[searchParamKey]
      if (
        searchParamKey !== undefined &&
        searchParamEntry !== undefined &&
        typeof searchParamEntry !== "string" &&
        !ZO_IsTableEmpty(searchParamEntry)
      ) {
        searchParamKeysOfItemIdAffectingFilters[searchParamKey] = true
      }
    }
  }

  return searchParamKeysOfItemIdAffectingFilters
}

keyboardClass.GetItemIdsForSetIdRespectingFilters = function (
  this: SetsSearchUIKeyboardObject,
  setId: number,
  onlyOneItemIdIn?: boolean
): number[] | undefined {
  const onlyOneItemId = onlyOneItemIdIn ?? false
  let relevantItemIds: number[] = []
  let equipmentTypes: number[] | undefined
  const traitTypes: number[] | undefined = undefined
  let enchantSearchCategoryTypes: number[] | undefined
  let armorTypes: number[] | undefined
  let weaponTypesLocal: number[] | undefined

  const itemIdFilterKeys = this.itemIdRelevantFilterKeys
  if (itemIdFilterKeys === undefined || itemIdFilterKeys === false) {
    return undefined
  }
  const searchParams = this.searchParams

  for (const [filterKey] of pairs(itemIdFilterKeys)) {
    const searchParamEntries = searchParams === undefined ? undefined : searchParams[filterKey]
    if (searchParamEntries !== undefined && typeof searchParamEntries !== "string") {
      if (filterKey === "armorTypes") {
        armorTypes = addToIndexTable(searchParamEntries)
      } else if (filterKey === "weaponTypes") {
        weaponTypesLocal = addToIndexTable(searchParamEntries)
      } else if (filterKey === "equipmentTypes") {
        equipmentTypes = addToIndexTable(searchParamEntries)
      } else if (filterKey === "enchantSearchCategoryTypes") {
        enchantSearchCategoryTypes = addToIndexTable(searchParamEntries)
      }
    }
  }

  let itemIdsMatchingFilters: { [itemId: number]: number } | undefined
  if (onlyOneItemId === true) {
    const itemIdMatchingFilters = sets_GetSetItemId(
      setId,
      undefined,
      asTyped<number>(equipmentTypes ?? asAnyObject(undefined)),
      asTyped<number>(traitTypes ?? asAnyObject(undefined)),
      asTyped<number>(enchantSearchCategoryTypes ?? asAnyObject(undefined)),
      asTyped<number>(armorTypes ?? asAnyObject(undefined)),
      asTyped<number>(weaponTypesLocal ?? asAnyObject(undefined))
    )
    if (itemIdMatchingFilters !== undefined) {
      itemIdsMatchingFilters = {}
      itemIdsMatchingFilters[itemIdMatchingFilters] = asNumber(SETS_SET_ITEMID_TABLE_VALUE_OK)
    }
  } else {
    const [itemIds] = sets_GetSetItemIds(
      setId,
      undefined,
      asTyped<number>(equipmentTypes ?? asAnyObject(undefined)),
      asTyped<number>(traitTypes ?? asAnyObject(undefined)),
      asTyped<number>(enchantSearchCategoryTypes ?? asAnyObject(undefined)),
      asTyped<number>(armorTypes ?? asAnyObject(undefined)),
      asTyped<number>(weaponTypesLocal ?? asAnyObject(undefined))
    )
    itemIdsMatchingFilters = itemIds
  }

  if (itemIdsMatchingFilters !== undefined) {
    relevantItemIds = []
    for (const [itemId] of pairs(itemIdsMatchingFilters)) {
      relevantItemIds[relevantItemIds.length] = asNumber(itemId)
    }
    table.sort(relevantItemIds)
  }

  return relevantItemIds
}

keyboardOverride.OnFilterChanged = function (
  this: SetsSearchUIKeyboardObject,
  dropdownControl?: SearchUIControl,
  editControl?: SearchUIEditBox
): undefined {
  getSharedSuper().OnFilterChanged(this, dropdownControl)
  let didAnyFilterChange = false

  const searchParams: SetsSearchParams = {}
  if (editControl === undefined) {
    if (dropdownControl === undefined) {
      for (const lDropdownControl of this.multiSelectFilterDropdowns) {
        let selectedEntries: { [filterType: string]: boolean } | undefined =
          this.GetSelectedMultiSelectDropdownFilters(lDropdownControl)
        if (selectedEntries !== undefined) {
          if (ZO_IsTableEmpty(selectedEntries)) {
            selectedEntries = undefined
          }
          const paramName = this.multiSelectFilterDropdownToSearchParamName.get(lDropdownControl)
          if (paramName !== undefined) {
            searchParams[paramName] = selectedEntries
          }
          didAnyFilterChange = true
        }
      }
    } else {
      let selectedEntries: { [filterType: string]: boolean } | undefined =
        this.GetSelectedMultiSelectDropdownFilters(dropdownControl)
      if (selectedEntries !== undefined) {
        if (ZO_IsTableEmpty(selectedEntries)) {
          selectedEntries = undefined
        }
        const paramName = this.multiSelectFilterDropdownToSearchParamName.get(dropdownControl)
        const existing = this.searchParams ?? {}
        this.searchParams = existing
        if (paramName !== undefined) {
          existing[paramName] = selectedEntries
        }
        didAnyFilterChange = true
      }
    }
  }

  if (dropdownControl === undefined) {
    if (editControl === undefined) {
      for (const editBoxControl of this.editBoxFilters) {
        const paramName = this.editBoxFilterToSearchParamName.get(editBoxControl)
        if (paramName !== undefined) {
          searchParams[paramName] = editBoxControl.GetText()
        }
        didAnyFilterChange = true
      }
    } else {
      const paramName = this.editBoxFilterToSearchParamName.get(editControl)
      const existing = this.searchParams ?? {}
      this.searchParams = existing
      if (paramName !== undefined) {
        existing[paramName] = editControl.GetText()
      }
      didAnyFilterChange = true
    }
  }

  if (didAnyFilterChange) {
    if (dropdownControl === undefined && editControl === undefined) {
      this.searchParams = searchParams
    }

    const isSearchButtonEnabled = this.DidAnyFilterChange()
    this.UpdateSearchButtonEnabledState(isSearchButtonEnabled)
  }
}

keyboardClass.OnRowMouseEnter = function (
  this: SetsSearchUIKeyboardObject,
  rowControl: SearchUIControl
): undefined {
  this.resultsList.Row_OnMouseEnter(rowControl)
  const data = asSetsSearchRowDataOpt(rowControl.data)
  this.tooltipControl.data = data
  const shownLeftOfControl = this.ShowItemLinkTooltip(rowControl, data)

  this.ShowSetDropLocationTooltip(rowControl, data, shownLeftOfControl)
}

keyboardClass.OnRowMouseExit = function (
  this: SetsSearchUIKeyboardObject,
  rowControl: SearchUIControl
): undefined {
  this.resultsList.Row_OnMouseExit(rowControl)

  this.HideItemLinkTooltip()
  this.tooltipControl.data = undefined
}

keyboardClass.OnRowMouseUp = function (
  this: SetsSearchUIKeyboardObject,
  rowControl: SearchUIControl,
  mouseButton: number,
  upInside: boolean,
  _shift?: boolean,
  _alt?: boolean,
  _ctrl?: boolean,
  _command?: boolean
): undefined {
  if (upInside) {
    if (mouseButton === MOUSE_BUTTON_INDEX_LEFT) {
      const defaultLeftClickAction = asStringOpt(lib.svData?.setSearchUIRowLeftClickDefaultAction)
      const data = asSetsSearchRowDataOpt(rowControl.data)
      if (defaultLeftClickAction === "linkToChat") {
        this.ItemLinkToChat(data)
      } else if (defaultLeftClickAction === "popupTooltip") {
        this.ShowItemLinkPopupTooltip(rowControl.GetOwningWindow(), data)
      }
    } else if (mouseButton === MOUSE_BUTTON_INDEX_RIGHT) {
      this.ShowRowContextMenu(rowControl)
    }
  }
}

keyboardClass.OnDropdownMouseUp = function (
  this: SetsSearchUIKeyboardObject,
  dropdownControl: SearchUIControl,
  mouseButton: number,
  upInside: boolean,
  shift?: boolean,
  alt?: boolean,
  ctrl?: boolean,
  command?: boolean
): undefined {
  if (upInside) {
    if (mouseButton === MOUSE_BUTTON_INDEX_RIGHT) {
      this.ShowDropdownContextMenu(dropdownControl, shift, alt, ctrl, command)
    }
  }
}
