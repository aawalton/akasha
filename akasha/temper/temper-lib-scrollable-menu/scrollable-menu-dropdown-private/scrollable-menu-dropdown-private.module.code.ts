import {
  asBoolean,
  asControl,
  asDropdownClassPrivate,
  asDropdownObject,
  asDropdownRowControl,
  asDropdownRowHighlightData,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati,
  asLsmCastDropdownComboBoxUndefined,
  asLsmCastDropdownRowControlUndefined,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastMDropdownObjectControlBringWindowToTopThisUnk } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastReadonlyUnknown,
  asLsmCastReadonlyUnknownUndefined,
  asLsmCastRecordNumberBoolean,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUndefined,
  asLsmCastThisVoidArgsUnknownUnknown,
  asLsmCastThisVoidAUnknownBoolean,
  asLsmCastThisVoidAUnknownUnknown,
  asLsmCastThisVoidContextMenuObject,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring
const FUNCTION_TYPE = "function"

const classes = asLsmCastRecordStringUnknown(lib.classes)

let lsmIsContextMenuCurrentlyShown: ((this: void) => boolean) | undefined

const LSM_NORMAL_MENU_REFRESH_DONE = 1
const LSM_SUBMENU_REFRESH_DONE = 2

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const onEntryMouseUpExcludeEntryTypes = asLsmCastRecordNumberBoolean(
  entryTypeConstants.onEntryMouseUpExclude
)

const allowedEntryDataAutomaticUpdateRaise = asLsmCastReadonlyUnknown(
  entryTypeConstants.dataAllowedAutomaticUpdateRaise
)

const UPDATE_ENTRY_PATHS_DATA = asLsmCastRecordStringUnknown(
  entryTypeConstants.updateEntryPathsData
)
const updateEntryPath = UPDATE_ENTRY_PATHS_DATA.updateEntryPath
const updateIconPath = UPDATE_ENTRY_PATHS_DATA.updateIconPath
const updateEntryPathCheckFunc = UPDATE_ENTRY_PATHS_DATA.updateEntryPathCheckFunc

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(lib.Util.getContextMenuReference)
const dropdownClassPrivate = asDropdownClassPrivate({})
classes.dropdownClassPrivate = dropdownClassPrivate
dropdownClassPrivate.onEntryMouseUpExcludeEntryTypes = onEntryMouseUpExcludeEntryTypes

function checkIfContextMenuVisibleAndBringToTopAgain(
  this: void,
  _dropdown: unknown,
  _comboBox: unknown,
  delay?: number
): undefined {
  setContextMenu(getContextMenuReference())
  lsmIsContextMenuCurrentlyShown =
    lsmIsContextMenuCurrentlyShown ?? IsCustomScrollableContextMenuShown
  if (!lsmIsContextMenuCurrentlyShown()) {
    return
  }

  delay = delay ?? 10

  zo_callLater(function (this: void): undefined {
    const gContextMenu = asLsmCastMDropdownObjectControlBringWindowToTopThisUnk(getContextMenu())
    gContextMenu.m_dropdownObject.control.BringWindowToTop()
  }, delay)
}
dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain =
  checkIfContextMenuVisibleAndBringToTopAgain

function lsmCheckIfAnimationControlNeedsXmlTemplateChange(
  this: void,
  control: unknown,
  controlTemplate: unknown
): boolean {
  let retVar = false
  const ctrl = asLsmCastDropdownRowControlUndefined(control)
  if (ctrl !== undefined && controlTemplate !== undefined) {
    const rowHighlightData = ctrl.LSM_rowHighlightData
    const highlightControlXMLTemplate = rowHighlightData?.highlightXMLTemplate || undefined
    if (
      highlightControlXMLTemplate !== undefined &&
      highlightControlXMLTemplate !== controlTemplate
    ) {
      const animationFieldName = asDropdownRowHighlightData(rowHighlightData).animationFieldName
      if (
        animationFieldName !== undefined &&
        animationFieldName !== "" &&
        ctrl[animationFieldName] !== undefined
      ) {
        ctrl[animationFieldName] = undefined

        const highlightControlName =
          asDropdownRowHighlightData(rowHighlightData).highlightControlName
        if (highlightControlName !== undefined) {
          if (_G[highlightControlName] !== undefined) {
            _G[highlightControlName] = undefined
          }
        }
      }
      retVar = true
    }
  }

  if (ctrl !== undefined) {
    ctrl.LSM_rowHighlightData = undefined
  }
  return retVar
}
dropdownClassPrivate.LSM_CheckIfAnimationControlNeedsXMLTemplateChange =
  lsmCheckIfAnimationControlNeedsXmlTemplateChange

function multiIconCheckFunc(
  this: void,
  _comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined
): boolean {
  let doRefresh = false
  let oldHasIcon: boolean | undefined
  let newHasIcon: boolean | undefined

  if (data !== undefined && data.icon !== undefined) {
    doRefresh = true
  } else {
    const multiIconControl = asDropdownRowControl(control).m_icon
    if (multiIconControl !== undefined) {
      oldHasIcon = multiIconControl.HasIcon()
      const newIconData = asLsmCastReadonlyUnknownUndefined(
        getValueOrCallback(data?.icon || undefined, data)
      )
      newHasIcon = (newIconData !== undefined && true) || false
      doRefresh = oldHasIcon !== newHasIcon
      if (!doRefresh && newIconData !== undefined) {
        doRefresh = multiIconControl.iconData.length !== newIconData.length
      }
    }
  }

  if (
    doRefresh === true ||
    (!doRefresh &&
      oldHasIcon !== undefined &&
      newHasIcon !== undefined &&
      oldHasIcon === false &&
      oldHasIcon === newHasIcon)
  ) {
    lib.FireCallbacks("IconUpdated", control, data)
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 195, tos(getControlName(control)))
    }
  }
  return doRefresh
}

function checkFuncOnMouseUpRunHandlerNoCurrentMenuUpdate(
  this: void,
  _comboBox: unknown,
  control: unknown,
  _data: unknown,
  isRecursiveCall: unknown,
  ...args: unknown[]
): boolean {
  isRecursiveCall = isRecursiveCall || false

  const [lsmMenuRefreshVar] = select(1, ...args)
  const [entryControlUsedForOnMouseUpRunHandler] = select(2, ...args)
  if (!lsmMenuRefreshVar || entryControlUsedForOnMouseUpRunHandler === undefined) {
    return true
  } else if (
    lsmMenuRefreshVar !== undefined &&
    entryControlUsedForOnMouseUpRunHandler !== undefined
  ) {
    if (lsmMenuRefreshVar === LSM_NORMAL_MENU_REFRESH_DONE) {
      return asBoolean(isRecursiveCall)
    } else if (lsmMenuRefreshVar === LSM_SUBMENU_REFRESH_DONE) {
      let allowRefresh = false
      allowRefresh = !isRecursiveCall
      if (!allowRefresh && control !== entryControlUsedForOnMouseUpRunHandler) {
        const owner = asLsmCastDropdownComboBoxUndefined(
          entryControlUsedForOnMouseUpRunHandler !== undefined &&
            asDropdownRowControl(entryControlUsedForOnMouseUpRunHandler).m_owner
        )
        if (owner !== undefined && owner.openingControl !== undefined) {
          allowRefresh = owner.openingControl !== control
        }
      }
      return allowRefresh
    }
  }
  return true
}
dropdownClassPrivate.checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate =
  checkFuncOnMouseUpRunHandlerNoCurrentMenuUpdate

function updateParentEntryRecursively(
  this: void,
  comboBox: unknown,
  control: unknown,
  checkFunc: unknown,
  ...args: unknown[]
): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 194)
  }

  const data = getControlData(control)

  let doRefresh = true
  if (type(checkFunc) === FUNCTION_TYPE) {
    doRefresh = asLsmCastThisVoidAUnknownBoolean(checkFunc)(comboBox, control, data, true, ...args)
  }

  if (doRefresh === true) {
    ZO_ScrollList_RefreshVisible(
      asControl(asDropdownObject(asDropdownRowControl(control).m_dropdownObject).scrollControl)
    )

    asDropdownObject(asDropdownRowControl(control).m_dropdownObject).SubmenuOrCurrentListRefresh(
      control,
      true
    )
  }

  const parent = data.m_parentControl
  if (parent) {
    updateParentEntryRecursively(comboBox, parent, checkFunc, ...args)
  }
  return doRefresh
}

function onEntryCallbackUpdateEntryPath(
  this: void,
  comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined,
  checkFunc?: unknown,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 196, tos(getControlName(control)))
  }
  if (comboBox === undefined || control === undefined) {
    return
  }
  if (data === undefined) {
    data = getControlData(control)
  }

  let doRefresh = true
  if (type(checkFunc) === FUNCTION_TYPE) {
    doRefresh = asLsmCastThisVoidAUnknownBoolean(checkFunc)(comboBox, control, data, false, ...args)
  }

  if (data !== undefined && doRefresh === true) {
    asDropdownObject(asDropdownRowControl(control).m_dropdownObject).Refresh(data)
  }

  const parent = asLsmCastRecordStringUnknown(data).m_parentControl
  if (parent) {
    updateParentEntryRecursively(comboBox, parent, checkFunc, ...args)
  }
  return doRefresh
}
UpdateCustomScrollableMenuEntryPath = asLsmCastThisVoidArgsUnknownUnknown(
  onEntryCallbackUpdateEntryPath
)

function onEntryCallbackUpdateIconsPath(
  this: void,
  comboBox: unknown,
  control: unknown,
  data?: Record<string, unknown>
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 193, tos(getControlName(control)))
  }
  return onEntryCallbackUpdateEntryPath(comboBox, control, data, multiIconCheckFunc)
}
UpdateCustomScrollableMenuEntryIconPath = asLsmCastThisVoidArgsUnknownUnknown(
  onEntryCallbackUpdateIconsPath
)

const callbacksForRefresh = new LuaTable<object, unknown>()
callbacksForRefresh.set(asObject(updateEntryPathCheckFunc), onEntryCallbackUpdateEntryPath)
callbacksForRefresh.set(asObject(updateIconPath), onEntryCallbackUpdateIconsPath)

function checkIfEntryRaisesAutomaticUpdate(
  this: void,
  comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined,
  checkFuncForRefresh: unknown,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 197, tos(getControlName(checkFuncForRefresh)))
  }
  if (comboBox === undefined || control === undefined) {
    return
  }
  if (data === undefined) {
    data = getControlData(control)
  }
  if (data === undefined) {
    return false
  }

  for (const [, automaticUpdateData] of ipairs(allowedEntryDataAutomaticUpdateRaise)) {
    if (automaticUpdateData !== undefined) {
      const autoUpdateNow = getValueOrCallback(data[asString(automaticUpdateData)], data)
      if (autoUpdateNow !== undefined && autoUpdateNow === true) {
        const callbackFuncForRefresh = callbacksForRefresh.get(automaticUpdateData)
        if (type(callbackFuncForRefresh) === FUNCTION_TYPE) {
          if (automaticUpdateData === updateEntryPath) {
            const checkFuncForRefreshBackup = checkFuncForRefresh
            checkFuncForRefresh = data[asString(updateEntryPathCheckFunc)]
            if (checkFuncForRefresh === undefined) {
              checkFuncForRefresh = checkFuncForRefreshBackup
            } else {
            }
          }
          return asLsmCastThisVoidAUnknownUnknown(callbackFuncForRefresh)(
            comboBox,
            control,
            data,
            checkFuncForRefresh,
            ...args
          )
        }
      }
    }
  }
  return false
}
dropdownClassPrivate.checkIfEntryRaisesAutomaticUpdate =
  asLsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati(checkIfEntryRaisesAutomaticUpdate)

dropdownClassPrivate.debugPrefix = debugPrefix
