import {
  asComboBoxBaseClass,
  asLsmCastComboBoxBaseUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastIsHiddenThisUnknownBoolean,
  asLsmCastIsMouseOverControlThisVoidBoolean,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.OnGlobalMouseUp = function (
  this: ComboBoxBase,
  _eventId: number,
  button: number
): boolean | undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      90,
      tos(button),
      tos(lib.preventerVars.suppressNextOnGlobalMouseUp)
    )
  }

  let abortEarly = false
  const suppressNextOnGlobalMouseUp = lib.preventerVars.suppressNextOnGlobalMouseUp
  const suppressNextOnGlobalMouseUpType =
    (suppressNextOnGlobalMouseUp !== undefined && type(suppressNextOnGlobalMouseUp)) || undefined
  if (suppressNextOnGlobalMouseUpType !== undefined) {
    if (suppressNextOnGlobalMouseUpType === "boolean" && suppressNextOnGlobalMouseUp === true) {
      abortEarly = true
    } else if (
      suppressNextOnGlobalMouseUpType === "number" &&
      suppressNextOnGlobalMouseUp === button
    ) {
      abortEarly = true
    }
  }
  if (abortEarly) {
    lib.preventerVars.suppressNextOnGlobalMouseUp = undefined
    return false
  }

  if (this.IsDropdownVisible()) {
    const dropdownObject = asLsmCastIsMouseOverControlThisVoidBoolean(this.m_dropdownObject)
    const isMouseOverOwningDropdown = dropdownObject.IsMouseOverControl()
    if (!isMouseOverOwningDropdown) {
      if (this.HiddenForReasons(button, isMouseOverOwningDropdown)) {
        return this.HideDropdown()
      }
    }
  } else {
    const container = asLsmCastIsHiddenThisUnknownBoolean(this.m_container)
    if (container.IsHidden()) {
      this.HideDropdown()
    } else {
      lib.openMenu = this
      this.ShowDropdownOnMouseUp()
    }
  }
  return undefined
}

comboBox_base.ShouldHideDropdown = function (this: ComboBoxBase): boolean {
  const submenu = asLsmCastComboBoxBaseUndefined(this.m_submenu)
  if (submenu?.ShouldHideDropdown()) {
    submenu.HideDropdown()
  }
  return this.IsDropdownVisible() && !this.IsMouseOverControl()
}
