import {
  asComboBoxBaseStatic,
  asComboBoxClassStatic,
  asContextMenuClass,
  asControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastContextMenuDropdownUndefined,
  asLsmCastControlUndefined,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUnknown,
  asLsmCastThisVoidContextMenuTooUnknownBoolean,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownOwningMenuUnknownContext,
  asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownUndefined,
  asLsmCastUnknown,
  asObject,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const MAJOR = lib.name
const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseStatic(classes.comboboxBaseClass)
const comboBoxClass = asComboBoxClassStatic(classes.comboBoxClass)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)

const SubOrContextMenu_highlightControl = asLsmCastThisVoidSelfUnknownControlUnknownUndefined(
  libUtil.SubOrContextMenu_highlightControl
)
const checkIfHiddenForReasons = asLsmCastThisVoidArgsUnknownUnknown(libUtil.checkIfHiddenForReasons)
const getComboBox = asLsmCastThisVoidControlUnknownOwningMenuUnknownContext(libUtil.getComboBox)
const throttledCall = asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt(libUtil.throttledCall)
const libUtil_isAnyLSMDropdownVisible = asLsmCastThisVoidContextMenuTooUnknownBoolean(
  libUtil.isAnyLSMDropdownVisible
)

const contextMenuClass = asContextMenuClass(comboBoxClass.Subclass())
classes.contextMenuClass = contextMenuClass

function createContextMenuObject(this: void): undefined {
  const comboBoxContainer = CreateControlFromVirtual(MAJOR + "_ContextMenu", GuiRoot, "ZO_ComboBox")
  const gContextMenu = contextMenuClass.New(comboBoxContainer)
  setContextMenu(gContextMenu)
  lib.contextMenu = gContextMenu

  lib.CreateContextMenuObject = undefined
}
lib.CreateContextMenuObject = createContextMenuObject

contextMenuClass.Initialize = function (
  this: ContextMenuObject,
  comboBoxContainer: Control
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 149, tos(getControlName(comboBoxContainer)))
  }
  this.SetDefaults()
  comboBoxClass.Initialize(this, asControl(undefined), comboBoxContainer, undefined, 1)
  this.data = asLsmCastUnknown({})

  this.ClearItems()

  this.breadcrumbName = "ContextmenuBreadcrumb"
  this.isContextMenu = true
}

contextMenuClass.GetUniqueName = function (this: ContextMenuObject): string | undefined {
  if (this.openingControl) {
    return getControlName(this.openingControl)
  } else {
    return this.m_name
  }
}

contextMenuClass.AddContextMenuItem = function (
  this: ContextMenuObject,
  itemEntry: unknown
): number {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 150, tos(itemEntry))
  }
  asLsmCastUnknown(this.data).push(itemEntry)
  const indexAdded = asLsmCastUnknown(this.data).length

  return indexAdded
}

contextMenuClass.GetEntries = function (this: ContextMenuObject): unknown {
  return this.data
}

contextMenuClass.GetMenuPrefix = function (this: ContextMenuObject): string {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 153)
  }
  return "ContextMenu"
}

contextMenuClass.HighlightOpeningControl = function (this: ContextMenuObject): undefined {
  const openingControl = this.openingControl
  if (openingControl) {
    const highlightContextMenuOpeningControl =
      (this.options !== undefined &&
        asLsmCastRecordStringUnknown(this.options).highlightContextMenuOpeningControl) ||
      false
    if (highlightContextMenuOpeningControl === true) {
      SubOrContextMenu_highlightControl(this, openingControl)
    }
  }
}

contextMenuClass.SetContextMenuOptions = function (
  this: ContextMenuObject,
  options?: LsmComboBoxOptions
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 158, tos(options))
  }

  this.optionsChanged = this.contextMenuOptions !== options

  this.contextMenuOptions = options
}

contextMenuClass.AddMenuItems = function (
  this: ContextMenuObject,
  _parentControl?: Control,
  _comingFromFilters?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 151)
  }
  this.RefreshSortedItems()
  this.UpdateWidth()
  this.Show()
  this.m_dropdownObject.AnchorToMouse()
}

contextMenuClass.ClearItems = function (this: ContextMenuObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 152)
  }
  this.contextMenuIssuingControl = undefined

  this.SetContextMenuOptions(undefined)
  this.ResetToDefaults(undefined)

  ZO_ComboBox_HideDropdown(asControl(this))
  ZO_ClearNumericallyIndexedTable(asObject(this.data))

  this.SetSelectedItemText("")
  this.m_selectedItemData = undefined
  this.OnClearItems()
}

contextMenuClass.GetHiddenForReasons = function (
  this: ContextMenuObject,
  button: number
): (
  this: void,
  owningWindow: unknown,
  mocCtrl: unknown,
  comboBox: unknown,
  entry: unknown
) => unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 154, tos(button))
  }
  const selfVar = this
  return function (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ): unknown {
    return checkIfHiddenForReasons(selfVar, button, true, owningWindow, mocCtrl, comboBox, entry)
  }
}

contextMenuClass.HideDropdown = function (this: ContextMenuObject): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 155)
  }

  return comboBox_base.HideDropdown(this)
}

contextMenuClass.ShowSubmenu = function (
  this: ContextMenuObject,
  parentControl: Control
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 156, tos(getControlName(parentControl)))
  }
  const submenu = this.GetSubmenu()
  submenu.ShowDropdownOnMouseAction(parentControl)
}

contextMenuClass.ShowContextMenu = function (
  this: ContextMenuObject,
  parentControl?: Control
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 157, tos(getControlName(parentControl)))
  }
  const preventerVars = asLsmCastRecordStringUnknown(lib.preventerVars)
  preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = undefined
  preventerVars.suppressNextOnEntryMouseUp = undefined
  preventerVars.suppressNextOnEntryMouseUpDisableCounter = undefined
  preventerVars.suppressNextHideContextMenuClearItems = undefined

  const openingControlOld = this.openingControl
  if (parentControl === undefined) {
    parentControl = asLsmCastControlUndefined(this.contextMenuIssuingControl) || moc()
  }
  this.openingControl = parentControl

  const wasOpenedFromOtherLSMEntry = this.contextMenuIssuingControl !== undefined

  const comboBox = getComboBox(parentControl)
  if (comboBox?.m_submenu?.IsDropdownVisible()) {
    comboBox.m_submenu.HideDropdown()
  }

  if (this.IsDropdownVisible()) {
    this.HideDropdown()
  }
  this.UpdateOptions(this.contextMenuOptions, undefined, true, undefined)

  this.HighlightOpeningControl()

  const otherLSMDropdownNonContextMenuVisible = libUtil_isAnyLSMDropdownVisible(false)
  if (otherLSMDropdownNonContextMenuVisible === true) {
    preventerVars.suppressNextOnGlobalMouseUp = true
  }
  this.ShowDropdown()

  if (!wasOpenedFromOtherLSMEntry && otherLSMDropdownNonContextMenuVisible) {
    preventerVars.suppressNextHideContextMenuClearItems = 2
  }

  const selfVar = this
  throttledCall(
    function (this: void): undefined {
      if (openingControlOld !== parentControl) {
        if (selfVar.IsFilterEnabled()) {
          const dropdown = asLsmCastContextMenuDropdownUndefined(selfVar.m_dropdown)
          if (dropdown?.object) {
            dropdown.object.ResetFilters(dropdown)
          }
        }
      }
    },
    10,
    "_ContextMenuClass_ShowContextMenu"
  )
}

export { contextMenuClass }
