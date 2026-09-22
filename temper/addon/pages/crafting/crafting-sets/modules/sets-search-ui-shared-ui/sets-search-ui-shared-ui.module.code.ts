const CM = CALLBACK_MANAGER

import {
  asNumberOrString,
  asSearchUIComboBox,
  asSetsSearchRowData,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import { getSharedSearchUIClass } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-class/sets-search-ui-shared-class.module.code.ts"
import { updateSetsInfoWithDataAndNames } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-helpers/sets-search-ui-shared-helpers.module.code.ts"
import {
  getComboBoxFromDropdownControl,
  isItemFilterTypeMatching,
  searchUI,
  searchUIName,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

const sharedClass = getSharedSearchUIClass()

sharedClass.Initialize = function (this: SetsSearchUISharedObject, control: SearchUIControl) {
  this.control = control
  control._object = this

  const filters = this.control.GetNamedChild("Filters")
  this.filtersControl = filters
  const content = this.control.GetNamedChild("Content")
  this.contentControl = content

  this.lastSearchParams = undefined
  this.searchParams = undefined

  this.stringSearch = ZO_StringSearch.New()
  this.stringSearch.AddProcessor(
    searchUI.searchTypeDefault,
    (stringSearch, data, searchTerm, cache) =>
      this.ProcessItemEntry(stringSearch, asSetsSearchRowData(data), searchTerm, cache)
  )
}

sharedClass.SetSearchCallbacks = function (
  this: SetsSearchUISharedObject,
  searchDoneCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void,
  searchErrorCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void,
  searchCanceledCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void
) {
  this.searchDoneCallback = searchDoneCallback
  this.searchErrorCallback = searchErrorCallback
  this.searchCanceledCallback = searchCanceledCallback
}

sharedClass.ResetInternal = function (this: SetsSearchUISharedObject) {
  this.searchParams = undefined
}

sharedClass.ResetUI = function (this: SetsSearchUISharedObject) {}

sharedClass.Reset = function (this: SetsSearchUISharedObject) {
  this.ResetInternal()
  this.ResetUI()
  this.StartSearch(undefined, true)
}

sharedClass.ResetMultiSelectDropdown = function (
  this: SetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  if (comboBox.GetNumSelectedEntries() === 0) {
    return
  }
  comboBox.ClearAllSelections()
}

sharedClass.SelectAllAtMultiSelectDropdown = function (
  this: SetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  comboBox.ClearAllSelections()
  for (const [index] of ipairs(comboBox.GetItems())) {
    comboBox.SetSelected(index, true)
  }
}

sharedClass.SelectInvertMultiSelectDropdown = function (
  this: SetsSearchUISharedObject,
  dropdownControl: SearchUIControl
) {
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  for (const [index, item] of ipairs(comboBox.GetItems())) {
    const isCurrentlySelected = comboBox.IsItemSelected(item)
    comboBox.SetSelected(index, !isCurrentlySelected)
  }
}

sharedClass.SelectMultiSelectDropdownEntries = function (
  this: SetsSearchUISharedObject,
  dropdownControl: SearchUIControl,
  entriesToSelect: unknown[],
  refreshResultsListAfterwards?: boolean
) {
  const refresh = refreshResultsListAfterwards ?? false
  if (ZO_IsTableEmpty(entriesToSelect)) {
    return
  }
  const comboBox = getComboBoxFromDropdownControl(dropdownControl)
  comboBox.ClearAllSelections()
  for (const [, filterType] of ipairs(entriesToSelect)) {
    const index = comboBox.GetIndexByEval((item) =>
      isItemFilterTypeMatching(item, asNumberOrString(filterType))
    )
    if (index !== undefined) {
      asSearchUIComboBox(dropdownControl.m_comboBox).SetSelected(index, true)
    }
  }

  if (refresh === true) {
    this.OnFilterChanged(dropdownControl)
    this.StartSearch(undefined, false)
  }
}

sharedClass.IsShown = function (this: SetsSearchUISharedObject): boolean {
  return !this.control.IsHidden()
}

sharedClass.ShowUI = function (this: SetsSearchUISharedObject) {
  if (this.IsShown()) {
    return
  }
  updateSetsInfoWithDataAndNames(this)

  this.control.SetHidden(false)

  CM.FireCallbacks(`${searchUIName}_IsShown`, this)
}

sharedClass.HideUI = function (this: SetsSearchUISharedObject) {
  if (!this.IsShown()) {
    return
  }
  this.control.SetHidden(true)

  CM.FireCallbacks(`${searchUIName}_IsHidden`, this)
}

sharedClass.Show = function (
  this: SetsSearchUISharedObject,
  searchParams?: SetsSearchParams,
  searchDoneCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void,
  searchErrorCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void,
  searchCanceledCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void
) {
  if (searchParams !== undefined && !ZO_IsTableEmpty(searchParams)) {
    this.searchParams = searchParams
    this.ApplySearchParamsToUI()
  }

  this.SetSearchCallbacks(searchDoneCallback, searchErrorCallback, searchCanceledCallback)

  this.ShowUI()
}

sharedClass.ToggleUI = function (this: SetsSearchUISharedObject, slashOptions?: unknown) {
  if (this.IsShown()) {
    this.HideUI()
  } else {
    this.ShowUI(slashOptions)
  }
}

sharedClass.UpdateSearchButtonEnabledState = function (
  this: SetsSearchUISharedObject,
  isEnabled: boolean | undefined
) {
  if (isEnabled === undefined) {
    return
  }
  const searchButton = this.searchButton
  if (searchButton === undefined) {
    return
  }
  searchButton.SetEnabled(isEnabled)
  searchButton.SetMouseEnabled(isEnabled)
}
