import { asLsmEntryCallback } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"

import "../scrollable-menu-api-core/scrollable-menu-api-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const libDivider = lib.DIVIDER

const addCustomScrollableMenuEntry = AddCustomScrollableMenuEntry

AddCustomScrollableSubMenuEntry = function (
  this: void,
  text: unknown,
  entries: unknown,
  callbackFunc?: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 163, tos(text), tos(entries))
  }
  return addCustomScrollableMenuEntry(
    text,
    asLsmEntryCallback(callbackFunc),
    entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU,
    entries,
    additionalData
  )
}

AddCustomScrollableMenuDivider = function (
  this: void
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 164)
  }
  return addCustomScrollableMenuEntry(
    libDivider,
    undefined,
    entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER,
    undefined,
    undefined
  )
}

AddCustomScrollableMenuHeader = function (
  this: void,
  text: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 165, tos(text))
  }
  return addCustomScrollableMenuEntry(
    text,
    undefined,
    entryTypeConstants.LSM_ENTRY_TYPE_HEADER,
    undefined,
    additionalData
  )
}

AddCustomScrollableMenuCheckbox = function (
  this: void,
  text: unknown,
  callback: unknown,
  checked?: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 166, tos(text), tos(checked))
  }
  if (checked !== undefined) {
    additionalData = additionalData ?? {}
    asLsmCastRecordStringUnknown(additionalData).checked = checked
  }
  return addCustomScrollableMenuEntry(
    text,
    asLsmEntryCallback(callback),
    entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX,
    undefined,
    additionalData
  )
}

AddCustomScrollableMenuRadioButton = function (
  this: void,
  text: unknown,
  callback: unknown,
  checked?: unknown,
  buttonGroup?: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 189, tos(text), tos(checked), tos(buttonGroup))
  }
  if (checked !== undefined || buttonGroup !== undefined) {
    buttonGroup = buttonGroup ?? 1
    additionalData = additionalData ?? {}
    asLsmCastRecordStringUnknown(additionalData).checked = checked
    asLsmCastRecordStringUnknown(additionalData).buttonGroup = buttonGroup
  }
  return addCustomScrollableMenuEntry(
    text,
    asLsmEntryCallback(callback),
    entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON,
    undefined,
    additionalData
  )
}

AddCustomScrollableMenuEditBox = function (
  this: void,
  text: unknown,
  callback: unknown,
  editBoxData?: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 188, tos(text), tos(editBoxData))
  }
  if (editBoxData !== undefined) {
    additionalData = additionalData ?? {}
    asLsmCastRecordStringUnknown(additionalData).editBoxData = editBoxData
  }
  return addCustomScrollableMenuEntry(
    text,
    asLsmEntryCallback(callback),
    entryTypeConstants.LSM_ENTRY_TYPE_EDITBOX,
    undefined,
    additionalData
  )
}

AddCustomScrollableMenuSlider = function (
  this: void,
  text: unknown,
  callback: unknown,
  sliderData?: unknown,
  additionalData?: unknown
): LuaMultiReturn<[number | undefined, Record<string, unknown> | undefined]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 191, tos(text), tos(sliderData))
  }
  if (sliderData !== undefined) {
    additionalData = additionalData ?? {}
    asLsmCastRecordStringUnknown(additionalData).sliderData = sliderData
  }
  return addCustomScrollableMenuEntry(
    text,
    asLsmEntryCallback(callback),
    entryTypeConstants.LSM_ENTRY_TYPE_SLIDER,
    undefined,
    additionalData
  )
}
