import {
  asComboBoxBaseStatic,
  asComboBoxClass,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastStringUndefined,
  asLsmCastThisVoidArgsUnknownUnknown,
  asLsmCastThisVoidComboBoxUnknownItemUnknownIsSelectedUn,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidUndefined,
  asLsmCastUnknown,
  asLsmComboBoxContainer,
  asNumber,
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring
const strlow = string.lower
const STRING_TYPE = "string"

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseStatic(classes.comboboxBaseClass)

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const hideContextMenu = asLsmCastThisVoidUndefined(libUtil.hideContextMenu)
const checkIfHiddenForReasons = asLsmCastThisVoidArgsUnknownUnknown(libUtil.checkIfHiddenForReasons)
const recursiveMultiSelectSubmenuOpeningControlUpdate =
  asLsmCastThisVoidComboBoxUnknownItemUnknownIsSelectedUn(
    libUtil.recursiveMultiSelectSubmenuOpeningControlUpdate
  )

const comboBoxClass = asComboBoxClass(comboBox_base.Subclass())
classes.comboBoxClass = comboBoxClass

comboBoxClass.Initialize = function (
  this: ComboBoxObject,
  parent: Control,
  comboBoxContainer: Control,
  options: LsmComboBoxOptions | undefined,
  depth: number,
  initExistingComboBox?: unknown
): ComboBoxObject {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      126,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(depth)
    )
  }
  const container = asLsmComboBoxContainer(comboBoxContainer)
  container.m_comboBox = this

  this.SetDefaults()

  this.ResetToDefaults(initExistingComboBox)

  this.m_name = container.GetName()
  this.m_openDropdown = container.GetNamedChild("OpenDropdown")
  this.m_containerWidth = container.GetWidth()
  this.containerMinWidth = undefined
  this.m_selectedItemText = container.GetNamedChild("SelectedItemText")
  this.m_multiSelectItemData = asLsmCastUnknown({})
  comboBox_base.Initialize(this, parent, comboBoxContainer, options, depth, initExistingComboBox)

  return this
}

comboBoxClass.UpdateMetatable = function (
  this: ComboBoxObject,
  parent: Control,
  comboBoxContainer: Control,
  options: LsmComboBoxOptions | undefined
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      137,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(options)
    )
  }

  setmetatable(this, asObject(comboBoxClass))
  ApplyTemplateToControl(comboBoxContainer, "LibScrollableMenu_ComboBox_Behavior")

  lib.FireCallbacks("OnDropdownMenuAdded", this, options)
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_DEBUG_CALLBACK,
      138,
      tos(getControlName(this.m_container)),
      tos(options)
    )
  }

  this.Initialize(parent, comboBoxContainer, options, 1, true)
}

comboBoxClass.GetUniqueName = function (this: ComboBoxObject): string | undefined {
  return this.m_name
}

comboBoxClass.AddMenuItems = function (this: ComboBoxObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 127)
  }
  this.UpdateItems()
  this.m_dropdownObject.AnchorToComboBox(this)
  this.Show()
}

comboBoxClass.GetMaxRows = function (this: ComboBoxObject): number {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      128,
      tos(this.visibleRows ?? DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS)
    )
  }
  return (
    asLsmCastNumberUndefined(this.visibleRows) ?? asNumber(DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS)
  )
}

comboBoxClass.GetMenuPrefix = function (this: ComboBoxObject): string {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 129)
  }
  return "Menu"
}

comboBoxClass.GetSubMenuOpeningSide = function (this: ComboBoxObject): string | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 186)
  }
  const options = this.GetOptions()
  const submenuOpenToSide =
    (options && getValueOrCallback(options.submenuOpenToSide, options)) || undefined
  return type(submenuOpenToSide) === STRING_TYPE ? strlow(asString(submenuOpenToSide)) : undefined
}

comboBoxClass.GetHiddenForReasons = function (
  this: ComboBoxObject,
  button: number
): (
  this: void,
  owningWindow: unknown,
  mocCtrl: unknown,
  comboBox: unknown,
  entry: unknown
) => unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 130, tos(button))
  }
  const selfVar = this
  return function (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ): unknown {
    return checkIfHiddenForReasons(selfVar, button, false, owningWindow, mocCtrl, comboBox, entry)
  }
}

comboBoxClass.HideDropdown = function (this: ComboBoxObject): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 131)
  }
  hideContextMenu()
  return comboBox_base.HideDropdown(this)
}

comboBoxClass.HideOnMouseEnter = function (this: ComboBoxObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 132)
  }
  const submenu = this.m_submenu
  if (submenu && !submenu.IsMouseOverControl() && !this.IsMouseOverControl()) {
    submenu.HideDropdown()
  }
}

comboBoxClass.HideOnMouseExit = function (
  this: ComboBoxObject,
  _mocCtrl?: unknown
): boolean | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 133)
  }
  const submenu = this.m_submenu
  if (submenu?.ShouldHideDropdown()) {
    submenu.HideDropdown()
    return true
  }
  return undefined
}

comboBoxClass.IsFilterEnabled = function (this: ComboBoxObject): unknown {
  const options = this.GetOptions()
  const enableFilter = (options && getValueOrCallback(options.enableFilter, options)) || false
  if (!enableFilter) {
    this.filterString = ""
  } else {
    this.filterString = asLsmCastStringUndefined(this.filterString) ?? ""
  }

  return enableFilter
}

comboBoxClass.SetFilterString = function (
  this: ComboBoxObject,
  filterBox: LsmFilterBoxControl,
  newText?: string
): undefined {
  ZO_Tooltips_HideTextTooltip()
  this.filterString =
    newText !== undefined ? zo_strlower(newText) : zo_strlower(filterBox.GetText())
  this.UpdateResults(true)
}

comboBoxClass.IsAutomaticRefreshEnabled = function (
  this: ComboBoxObject
): LuaMultiReturn<[unknown, unknown]> | undefined {
  const options = this.GetOptions()
  if (options !== undefined) {
    const automaticRefreshEnabled = getValueOrCallback(options.automaticRefresh, options) || false
    const automaticSubmenuRefreshEnabled =
      getValueOrCallback(options.automaticSubmenuRefresh, options) || false
    return $multi(automaticRefreshEnabled, automaticSubmenuRefreshEnabled)
  }
  return undefined
}

comboBoxClass.AddItemToSelected = function (this: ComboBoxObject, item: unknown): undefined {
  if (!this.m_enableMultiSelect) {
    return
  }

  asLsmCastUnknown(this.m_multiSelectItemData).push(item)
  recursiveMultiSelectSubmenuOpeningControlUpdate(this, item, true)
}

comboBoxClass.RemoveItemFromSelected = function (this: ComboBoxObject, item: unknown): undefined {
  if (!this.m_enableMultiSelect) {
    return
  }

  for (const [i, itemData] of ipairs(asLsmCastUnknown(this.m_multiSelectItemData))) {
    if (itemData === item) {
      asLsmCastUnknown(this.m_multiSelectItemData).splice(i - 1, 1)
      recursiveMultiSelectSubmenuOpeningControlUpdate(this, item, undefined)
      return
    }
  }
}

comboBoxClass.IsSortEnabled = function (this: ComboBoxObject): unknown {
  const options = this.GetOptions()
  const enableFilter = (options && getValueOrCallback(options.enableFilter, options)) || false
  const enableSort =
    (enableFilter === true && options && getValueOrCallback(options.enableSort, options)) || false
  return enableSort
}

export { comboBoxClass }
