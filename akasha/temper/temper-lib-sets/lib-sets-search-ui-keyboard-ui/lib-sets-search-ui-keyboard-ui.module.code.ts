import {
  asAnyObject,
  asNumberOpt,
  asString,
  asTyped,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asSearchUIControlOpt } from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import {
  getKeyboardSearchUIClass,
  getKeyboardSearchUIClassForOverride,
} from "../lib-sets-search-ui-keyboard-class/lib-sets-search-ui-keyboard-class.module.code.ts"
import { getKeyboardTopLevelOnResize } from "../lib-sets-search-ui-searchui-globals/lib-sets-search-ui-searchui-globals.module.code.ts"
import { getSharedSuper } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import {
  searchUI,
  searchUIName,
} from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const lib = LibSets
const libPrefix = lib.prefix

const searchUIKeyboardVars = searchUI.KeyboardVars
const TLC_SEARCH_UI_MIN_WIDTH = searchUIKeyboardVars.minWidth
const TLC_SEARCH_UI_MIN_HEIGHT = searchUIKeyboardVars.minHeight

const keyboardClass = getKeyboardSearchUIClass()
const keyboardOverride = getKeyboardSearchUIClassForOverride()
const sharedSuper = getSharedSuper()

interface SearchUISV {
  x: number
  y: number
  width: number
  height: number
}

type SearchUISVOpt = SearchUISV | undefined
function asSearchUISVOpt(value: unknown): SearchUISVOpt {
  return value as SearchUISVOpt
}

keyboardClass.LoadSearchUIPositionAndSize = function (
  this: LibSetsSearchUIKeyboardObject,
  tlcCtrlIn?: SearchUIControl
): undefined {
  const tlcCtrl = tlcCtrlIn ?? this.control
  if (tlcCtrl === undefined) {
    return
  }
  const settings = lib.svData
  if (settings === undefined) {
    return
  }
  const searchUISV = asSearchUISVOpt(settings.searchUI)
  if (searchUISV === undefined) {
    return
  }

  tlcCtrl.ClearAnchors()
  tlcCtrl.SetAnchor(TOPLEFT, asTyped<SearchUIControl>(GuiRoot), TOPLEFT, searchUISV.x, searchUISV.y)
  tlcCtrl.SetDimensions(searchUISV.width, searchUISV.height)
}

keyboardClass.SaveSearchUIPositionAndSize = function (
  this: LibSetsSearchUIKeyboardObject,
  tlcCtrlIn?: SearchUIControl
): undefined {
  const tlcCtrl = tlcCtrlIn ?? this.control
  if (tlcCtrl === undefined) {
    return
  }
  const settings = lib.svData
  if (settings === undefined) {
    return
  }
  const searchUISV = asSearchUISVOpt(settings.searchUI)
  if (searchUISV === undefined) {
    return
  }

  let x = tlcCtrl.GetLeft()
  let y = tlcCtrl.GetTop()
  if (x <= 0) {
    x = 0
  }
  if (y <= 0) {
    y = 0
  }
  searchUISV.x = x
  searchUISV.y = y

  const [widthRaw, heightRaw] = tlcCtrl.GetDimensions()
  let width = widthRaw
  let height = heightRaw
  if (width <= TLC_SEARCH_UI_MIN_WIDTH) {
    width = TLC_SEARCH_UI_MIN_WIDTH
  }
  if (height <= TLC_SEARCH_UI_MIN_HEIGHT) {
    height = TLC_SEARCH_UI_MIN_HEIGHT
  }
  searchUISV.width = width
  searchUISV.height = height
}

const DEFAULT_MIN_X_FOR_MULTI_SELECT_CONTROL = 50
keyboardClass.SetMultiSelectDropdownDimensionConstraints = function (
  this: LibSetsSearchUIKeyboardObject
): undefined {
  for (const [multiSelectControl, multiSelectMinAndMaxDataOfControl] of this
    .multiSelectMinAndMaxData) {
    if (multiSelectMinAndMaxDataOfControl !== undefined) {
      multiSelectControl.minX =
        multiSelectMinAndMaxDataOfControl.minX ?? DEFAULT_MIN_X_FOR_MULTI_SELECT_CONTROL
      const xmlGetDynamicWidth = lib.XMLGetDynamicWidth
      if (xmlGetDynamicWidth !== undefined) {
        xmlGetDynamicWidth(multiSelectControl, undefined, undefined, true)
      }

      const anchors = multiSelectMinAndMaxDataOfControl.anchors
      if (anchors !== undefined && !ZO_IsTableEmpty(anchors)) {
        multiSelectControl.ClearAnchors()
        for (const anchorData of anchors) {
          multiSelectControl.SetAnchor(
            anchorData.point,
            asSearchUIControlOpt(anchorData.relativeTo),
            anchorData.relativePoint,
            asNumberOpt(anchorData.offsetX),
            asNumberOpt(anchorData.offsetY)
          )
        }
      }
    }
  }
}

keyboardClass.UpdateSearchParamsFromSlashcommand = function (
  this: LibSetsSearchUIKeyboardObject,
  slashOptions: unknown
): undefined {
  if (slashOptions !== undefined && !ZO_IsTableEmpty(asAnyObject(slashOptions))) {
    this.ResetUI()

    const setNameSearchStr = this.GetSetNameSearchString(slashOptions)
    if (setNameSearchStr === undefined || setNameSearchStr === "") {
      return
    }

    const searchParams = this.searchParams ?? {}
    this.searchParams = searchParams
    const nameKey = this.editBoxFilterToSearchParamName.get(this.searchEditBoxControl)
    if (nameKey !== undefined) {
      searchParams[nameKey] = setNameSearchStr
    }

    this.ApplySearchParamsToUI()
  }
}

keyboardOverride.ShowUI = function (
  this: LibSetsSearchUIKeyboardObject,
  slashOptions?: unknown
): undefined {
  if (!this.tooltipKeyboardHookWasDone) {
    if (lib.RegisterCustomTooltipHook("LibSets_SearchUI_Tooltip", searchUIName) === true) {
      this.tooltipKeyboardHookWasDone = true
    }
  }

  sharedSuper.ShowUI(this)
  getKeyboardTopLevelOnResize()(this.control, false, true)

  this.UpdateSearchParamsFromSlashcommand(slashOptions)
}

keyboardOverride.ResetUI = function (this: LibSetsSearchUIKeyboardObject): undefined {
  sharedSuper.ResetUI()

  for (const editBoxControl of this.editBoxFilters) {
    this.SetSearchEditBoxValue(editBoxControl, "")
  }
  for (const dropdownControl of this.multiSelectFilterDropdowns) {
    this.ResetMultiSelectDropdown(dropdownControl)
  }

  this.UpdateSearchButtonEnabledState(false)
}

keyboardOverride.ApplySearchParamsToUI = function (this: LibSetsSearchUIKeyboardObject): undefined {
  if (!this.IsShown()) {
    return
  }

  const searchParams = this.searchParams
  if (searchParams === undefined || ZO_IsTableEmpty(searchParams)) {
    return
  }

  for (const dropdownControl of this.multiSelectFilterDropdowns) {
    const paramName = this.multiSelectFilterDropdownToSearchParamName.get(dropdownControl)
    const entriesToSelect = paramName === undefined ? undefined : searchParams[paramName]
    if (
      entriesToSelect !== undefined &&
      typeof entriesToSelect !== "string" &&
      !ZO_IsTableEmpty(entriesToSelect)
    ) {
      this.SetMultiSelectDropdownFilters(dropdownControl, entriesToSelect)
    }
  }

  for (const editBoxControl of this.editBoxFilters) {
    const paramName = this.editBoxFilterToSearchParamName.get(editBoxControl)
    const entryToSetText = paramName === undefined ? undefined : searchParams[paramName]
    if (entryToSetText !== undefined) {
      editBoxControl.SetText(asString(entryToSetText))
    }
  }
}

keyboardOverride.ValidateSearchParams = function (this: LibSetsSearchUIKeyboardObject): boolean {
  let searchWasValid = sharedSuper.ValidateSearchParams(this)
  if (searchWasValid === undefined) {
    searchWasValid = true
  }
  return searchWasValid
}

keyboardOverride.StartSearch = function (
  this: LibSetsSearchUIKeyboardObject,
  doNotShowUI: boolean | undefined,
  wasReset?: boolean
): boolean {
  const searchWasValid = sharedSuper.StartSearch(this, doNotShowUI, wasReset)
  if (!searchWasValid) {
    d(`${libPrefix}-StartSearch: Search parameters were not valid!`)
  }
  return searchWasValid
}
