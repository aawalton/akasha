import {
  asComboBoxBaseClass,
  asEventManagerLike,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastUnknown,
  asScreenNarrationManagerLike,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const EM = asEventManagerLike(GetEventManager())
const SNM = asScreenNarrationManagerLike(SCREEN_NARRATION_MANAGER)
const tos = tostring

const constants = lib.constants
const handlerNames = asLsmCastRecordStringString(constants.handlerNames)

const classes = asLsmCastRecordStringUnknown(lib.classes)

const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  lib.Util.getControlName
)

function isAccessibilitySettingEnabled(this: void, settingId: number): boolean {
  const isSettingEnabled = GetSetting_Bool(SETTING_TYPE_ACCESSIBILITY, settingId)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 40, tos(settingId), tos(isSettingEnabled))
  }
  return isSettingEnabled
}

function isAccessibilityModeEnabled(this: void): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 41)
  }
  return isAccessibilitySettingEnabled(ACCESSIBILITY_SETTING_ACCESSIBILITY_MODE)
}

function isAccessibilityUIReaderEnabled(this: void): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 42)
  }
  return (
    isAccessibilityModeEnabled() &&
    isAccessibilitySettingEnabled(ACCESSIBILITY_SETTING_SCREEN_NARRATION)
  )
}

function canNarrate(this: void): boolean {
  return true
}

function addNewUINarrationText(this: void, newText: string, stopCurrent?: boolean): undefined {
  if (isAccessibilityUIReaderEnabled() === false) {
    return
  }
  stopCurrent = stopCurrent || false
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 43, tos(newText), tos(stopCurrent))
  }
  if (stopCurrent === true) {
    ClearActiveNarration()
  }

  const addOnNarationData = {
    canNarrate: function (this: void): boolean {
      return canNarrate()
    },
    selectedNarrationFunction: function (this: void): unknown {
      return SNM.CreateNarratableObject(newText)
    },
  }
  const customNarrateEntryName = asString(handlerNames.UINarrationName)
  SNM.RegisterCustomObject(customNarrateEntryName, addOnNarationData)
  SNM.QueueCustomEntry(customNarrateEntryName)
  RequestReadPendingNarrationTextToClient(NARRATION_TYPE_UI_SCREEN)
}

function onUpdateDoNarrate(
  this: void,
  uniqueId: string,
  delay: number,
  callbackFunc?: (this: void) => undefined
): undefined {
  const updaterName = asString(handlerNames.UINarrationUpdaterName) + tos(uniqueId)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 44, tos(updaterName), tos(delay))
  }

  EM.UnregisterForUpdate(updaterName)
  if (isAccessibilityUIReaderEnabled() === false || callbackFunc === undefined) {
    return
  }
  delay = delay ?? 1000
  EM.RegisterForUpdate(updaterName, delay, function (this: void): undefined {
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 45, tos(updaterName))
    }
    if (isAccessibilityUIReaderEnabled() === false) {
      EM.UnregisterForUpdate(updaterName)
      return
    }
    callbackFunc()
    EM.UnregisterForUpdate(updaterName)
  })
}

function onMouseEnterOrExitNarrate(
  this: void,
  narrateText: string,
  stopCurrent?: boolean
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 46, tos(narrateText), tos(stopCurrent))
  }
  onUpdateDoNarrate("OnMouseEnterExit", 25, function (this: void): undefined {
    addNewUINarrationText(narrateText, stopCurrent)
  })
}

function onSelectedNarrate(this: void, narrateText: string, stopCurrent?: boolean): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 47, tos(narrateText), tos(stopCurrent))
  }
  onUpdateDoNarrate("OnEntryOrButtonSelected", 25, function (this: void): undefined {
    addNewUINarrationText(narrateText, stopCurrent)
  })
}

function onMouseMenuOpenOrCloseNarrate(
  this: void,
  narrateText: string,
  stopCurrent?: boolean
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 48, tos(narrateText), tos(stopCurrent))
  }
  onUpdateDoNarrate("OnMenuOpenOrClose", 25, function (this: void): undefined {
    addNewUINarrationText(narrateText, stopCurrent)
  })
}
export const NARRATION_EVENT_TO_LIBRARY_NARRATE_FUNCTION: Record<
  string,
  (this: void, narrateText: string, stopCurrent?: boolean) => undefined
> = {
  ["OnComboBoxMouseEnter"]: onMouseEnterOrExitNarrate,
  ["OnComboBoxMouseExit"]: onMouseEnterOrExitNarrate,
  ["OnMenuShow"]: onMouseEnterOrExitNarrate,
  ["OnMenuHide"]: onMouseEnterOrExitNarrate,
  ["OnSubMenuShow"]: onMouseMenuOpenOrCloseNarrate,
  ["OnSubMenuHide"]: onMouseMenuOpenOrCloseNarrate,
  ["OnEntryMouseEnter"]: onMouseEnterOrExitNarrate,
  ["OnEntryMouseExit"]: onMouseEnterOrExitNarrate,
  ["OnEntrySelected"]: onSelectedNarrate,
  ["OnCheckboxUpdated"]: onSelectedNarrate,
  ["OnRadioButtonUpdated"]: onSelectedNarrate,
}

export { isAccessibilityUIReaderEnabled }

const comboBox_base = asComboBoxBaseClass(ZO_ComboBox.Subclass())
classes.comboboxBaseClass = comboBox_base

const submenuClass = comboBox_base.Subclass()
classes.submenuClass = submenuClass

comboBox_base.Initialize = function (
  this: ComboBoxBase,
  parent: Control,
  comboBoxContainer: Control,
  options: LsmComboBoxOptions | undefined,
  depth: number,
  initExistingComboBox?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      84,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(depth)
    )
  }
  this.m_sortedItems = asLsmCastUnknown({})
  this.m_unsortedItems = asLsmCastUnknown({})

  this.m_container = comboBoxContainer
  const dropdownObject = this.GetDropdownObject(comboBoxContainer, depth)
  this.SetDropdownObject(dropdownObject)

  const objects = asLsmCastUnknown(lib._objects)
  objects[objects.length] = this

  this.UpdateOptions(options, true, undefined, initExistingComboBox)
  this.SetSortData()

  this.SetupDropdownHeader()
  this.UpdateWidth()
  this.UpdateHeight()
}
