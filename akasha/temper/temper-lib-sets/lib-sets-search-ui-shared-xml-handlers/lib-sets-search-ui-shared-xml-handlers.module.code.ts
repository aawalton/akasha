import {
  asGlobalTable,
  asStringOpt,
  asStrRecordOpt,
  asTyped,
  type StrRecordOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  getGamepadSearchUI,
  getKeyboardSearchUI,
} from "../lib-sets-search-ui-searchui-globals/lib-sets-search-ui-searchui-globals.module.code.ts"
import {
  brandSharedSearchUIClassGlobal,
  getSharedSearchUIClass,
} from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"

const lib = LibSets

const TT_Text = InformationTooltip

const sharedClass = getSharedSearchUIClass()

type SharedClassGlobalThis = { LibSets_SearchUI_Shared?: typeof LibSets_SearchUI_Shared }
function asSharedClassGlobalThis(value: unknown): SharedClassGlobalThis {
  return value as SharedClassGlobalThis
}

function settingsView(this: void): StrRecordOpt {
  return asStrRecordOpt(lib.svData)
}

const globalTable = asGlobalTable(globalThis)

function libSetsSearchUISharedControlTooltip(
  this: void,
  control: SearchUIControl | undefined,
  myAnchorPointIn?: number,
  anchorToIn?: SearchUIControl,
  toAnchorPointIn?: number,
  offsetXIn?: number,
  offsetYIn?: number
): undefined {
  const settings = settingsView()
  if (settings === undefined || settings.setSearchTooltipsAtFilters !== true) {
    return
  }
  const tooltipText = control === undefined ? undefined : asStringOpt(control.tooltipText)
  if (control === undefined || tooltipText === undefined || tooltipText === "") {
    return
  }
  const myAnchorPoint = myAnchorPointIn ?? BOTTOM
  const anchorTo = anchorToIn ?? control
  const toAnchorPoint = toAnchorPointIn ?? TOP
  const offsetX = offsetXIn ?? 0
  const offsetY = offsetYIn ?? 0
  InitializeTooltip(
    TT_Text,
    asTyped<Control>(anchorTo),
    myAnchorPoint,
    offsetX,
    offsetY,
    toAnchorPoint
  )
  SetTooltipText(TT_Text, tooltipText)
}

function libSetsSearchUISharedSortHeaderTooltip(
  this: void,
  sortHeaderColumn: SearchUIControl | undefined
): undefined {
  const headerName = sortHeaderColumn === undefined ? undefined : asStringOpt(sortHeaderColumn.name)
  if (sortHeaderColumn === undefined || headerName === undefined || headerName === "") {
    return
  }
  const nameLabel = sortHeaderColumn.GetNamedChild("Name")
  if (nameLabel?.WasTruncated() === true) {
    InitializeTooltip(TT_Text, asTyped<Control>(sortHeaderColumn), BOTTOM, 0, -10, TOP)
    SetTooltipText(TT_Text, headerName)
  }
}

function libSetsSearchUISharedDropdownOnMouseUp(
  this: void,
  dropdownControl: SearchUIControl,
  mouseButton: number,
  upInside: boolean,
  shift: boolean,
  alt: boolean,
  ctrl: boolean,
  command: boolean
): undefined {
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.OnDropdownMouseUp(dropdownControl, mouseButton, upInside, shift, alt, ctrl, command)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.OnDropdownMouseUp(dropdownControl, mouseButton, upInside, shift, alt, ctrl, command)
    }
  }
}

function libSetsSearchUISharedRowOnMouseUp(
  this: void,
  rowControl: SearchUIControl,
  mouseButton: number,
  upInside: boolean,
  shift: boolean,
  alt: boolean,
  ctrl: boolean,
  command: boolean
): undefined {
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.OnRowMouseUp(rowControl, mouseButton, upInside, shift, alt, ctrl, command)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.OnRowMouseUp(rowControl, mouseButton, upInside, shift, alt, ctrl, command)
    }
  }
}

function libSetsSearchUISharedRowOnMouseEnter(this: void, rowControl: SearchUIControl): undefined {
  if (settingsView()?.showSetSearchDropLocationTooltip !== true) {
    ZO_Tooltips_HideTextTooltip()
  }
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.OnRowMouseEnter(rowControl)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.OnRowMouseEnter(rowControl)
    }
  }
}

function libSetsSearchUISharedRowOnMouseExit(this: void, rowControl: SearchUIControl): undefined {
  ZO_Tooltips_HideTextTooltip()
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.OnRowMouseExit(rowControl)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.OnRowMouseExit(rowControl)
    }
  }
}

function libSetsSearchUISharedBringWindowToTop(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.control.BringWindowToTop()
    }
  }
}

function libSetsSearchUISharedToggleUI(this: void, slashOptions?: unknown): undefined {
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.ToggleUI(slashOptions)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.ToggleUI(slashOptions)
    }
  }
}

function libSetsSearchUISharedIsShown(this: void): boolean | undefined {
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      return gamepad.IsShown()
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      return keyboard.IsShown()
    }
  }
  return undefined
}

function libSetsSearchUISharedUpdateSearch(this: void, slashOptions?: unknown): undefined {
  if (IsInGamepadPreferredMode()) {
    const gamepad = getGamepadSearchUI()
    if (gamepad !== undefined) {
      gamepad.UpdateSearchParamsFromSlashcommand(slashOptions)
    }
  } else {
    const keyboard = getKeyboardSearchUI()
    if (keyboard !== undefined) {
      keyboard.UpdateSearchParamsFromSlashcommand(slashOptions)
    }
  }
}

globalTable.LibSets_SearchUI_Shared_ControlTooltip = libSetsSearchUISharedControlTooltip
globalTable.LibSets_SearchUI_Shared_SortHeaderTooltip = libSetsSearchUISharedSortHeaderTooltip
globalTable.LibSets_SearchUI_Shared_Dropdown_OnMouseUp = libSetsSearchUISharedDropdownOnMouseUp
globalTable.LibSets_SearchUI_Shared_Row_OnMouseUp = libSetsSearchUISharedRowOnMouseUp
globalTable.LibSets_SearchUI_Shared_Row_OnMouseEnter = libSetsSearchUISharedRowOnMouseEnter
globalTable.LibSets_SearchUI_Shared_Row_OnMouseExit = libSetsSearchUISharedRowOnMouseExit
globalTable.LibSets_SearchUI_Shared_BringWindowToTop = libSetsSearchUISharedBringWindowToTop
globalTable.LibSets_SearchUI_Shared_ToggleUI = libSetsSearchUISharedToggleUI
globalTable.LibSets_SearchUI_Shared_IsShown = libSetsSearchUISharedIsShown
globalTable.LibSets_SearchUI_Shared_UpdateSearch = libSetsSearchUISharedUpdateSearch

asSharedClassGlobalThis(globalThis).LibSets_SearchUI_Shared =
  brandSharedSearchUIClassGlobal(sharedClass)
