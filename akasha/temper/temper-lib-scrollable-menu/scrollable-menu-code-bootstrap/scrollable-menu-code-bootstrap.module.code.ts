import {
  asEventManagerLike,
  asLsmCastArgsUnknownUnknown,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow,
  asLsmCastMDropdownObjectIsOwnedByComboBoxThisUnknownOw,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringNumber,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownSubmenuOrCurrentListRefresh,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsNeverUndefined,
  asLsmCastThisVoidArgsUnknownUndefined,
  asLsmCastThisVoidArgUnknownArgsUnknownUnknown,
  asLsmCastThisVoidBoolean,
  asLsmCastThisVoidContextMenuObjectUndefined,
  asLsmCastThisVoidControlRecordStringUnknownRecordString,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonIdU,
  asLsmCastThisVoidDropdownRecordStringUnknownEntryTypeUn,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
  asLsmCastThisVoidModeStringUndefined,
  asLsmCastThisVoidOwnerUnknownParentUnknownDataUnknownUn,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownAUnknownUndefined,
  asLsmCastThisVoidUndefined,
  asObject,
  asString,
  asUnknown,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const MAJOR = lib.name

const EM = asEventManagerLike(GetEventManager())
const tos = tostring
const sfor = string.format

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringNumber(constants.entryTypes)

const libXML = asLsmCastRecordStringUnknown(lib.XML)
const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlRecordStringUnknownRecordString(
  libUtil.getControlData
)
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)
const checkIfContextMenuOpenedButOtherControlWasClicked =
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonIdU(
    libUtil.checkIfContextMenuOpenedButOtherControlWasClicked
  )
const checkNextOnEntryMouseUpShouldExecute = asLsmCastThisVoidBoolean(
  libUtil.checkNextOnEntryMouseUpShouldExecute
)
const playSelectedSoundCheck = asLsmCastThisVoidDropdownRecordStringUnknownEntryTypeUn(
  libUtil.playSelectedSoundCheck
)

let clearCustomScrollableMenu: ((this: void) => unknown) | undefined

let libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const svConstants = lib.SVConstans

function hideCurrentlyOpenedLSMAndContextMenu(this: void): undefined {
  const openMenu = asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow(lib.openMenu)
  if (openMenu?.IsDropdownVisible()) {
    clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
    clearCustomScrollableMenu()
    openMenu.HideDropdown()
  }
}

function doMapEntries(
  this: void,
  entryTable: unknown,
  mapTable: Record<string, unknown>,
  entryTableType?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 23)
  }
  if (entryTableType === undefined) {
    entryTable = getValueOrCallback(entryTable) ?? {}
  }

  for (const [, entryValue] of pairs(asLsmCastRecordStringUnknown(entryTable))) {
    const entry = asLsmCastRecordStringUnknown(entryValue)
    if (entry.entries !== undefined) {
      doMapEntries(entry.entries, mapTable)
    }

    if (entry.callback !== undefined) {
      mapTable[asString(entry)] = entry
    }
  }
}

function mapEntries(
  this: void,
  entryTable: unknown,
  mapTable: unknown,
  blank?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 24)
  }

  if (blank !== undefined) {
    entryTable = mapTable
    mapTable = blank
    blank = undefined
  }

  let entryTableType = type(entryTable)
  const mapTableType = type(mapTable)
  let entryTableToMap = entryTable
  if (entryTableType === "function") {
    entryTableToMap = getValueOrCallback(entryTable)
    entryTableType = type(entryTableToMap)
  }

  if (!(entryTableType === "table" && mapTableType === "table")) {
    error(
      sfor(
        "[" + MAJOR + ".MapEntries] tables expected, got %q = %s, %q = %s",
        "entryTable",
        tos(entryTableType),
        "mapTable",
        tos(mapTableType)
      )
    )
  }

  doMapEntries(entryTableToMap, asLsmCastRecordStringUnknown(mapTable), entryTableType)
}
lib.MapEntries = mapEntries
libUtil.MapEntries = mapEntries

libXML.OnXMLControlEventHandler = function (
  this: void,
  owningWindowFunctionName: unknown,
  refVar: XmlHandlerControlLike | undefined,
  ...args: unknown[]
): undefined {
  if (refVar === undefined || owningWindowFunctionName === undefined) {
    return
  }

  const owningWindow = refVar.GetOwningWindow()
  const owningWindowObject = owningWindow?.object || undefined
  if (owningWindowObject !== undefined) {
    const owningFunctionNameType = type(owningWindowFunctionName)
    if (
      owningFunctionNameType === "string" &&
      type(owningWindowObject[asString(owningWindowFunctionName)]) === "function"
    ) {
      asLsmCastThisVoidSelfUnknownAUnknownUndefined(
        owningWindowObject[asString(owningWindowFunctionName)]
      )(owningWindowObject, ...args)
    } else if (owningFunctionNameType === "function") {
      asLsmCastThisVoidSelfUnknownAUnknownUndefined(owningWindowFunctionName)(
        owningWindowObject,
        ...args
      )
    }
  }
}

libXML.XMLButtonOnInitialize = function (
  this: void,
  control: XmlHandlerControlLike,
  entryType: number
): undefined {
  const isCheckbox = entryType === entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX
  const isRadioButton = !isCheckbox && entryType === entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON

  control.GetParent().SetHandler(
    "OnMouseUp",
    asLsmCastArgsUnknownUnknown(function (
      this: void,
      parent: XmlHandlerControlLike,
      buttonId: number,
      upInside: boolean,
      ..._rest: unknown[]
    ): undefined {
      if (upInside) {
        if (
          checkIfContextMenuOpenedButOtherControlWasClicked(control, parent.m_owner, buttonId) ===
          true
        ) {
          return
        }
        if (buttonId === MOUSE_BUTTON_INDEX_LEFT) {
          if (checkNextOnEntryMouseUpShouldExecute()) {
            return
          }

          const data = getControlData(asLsmCastRecordStringUnknown(parent))
          const dropdown = asLsmCastRecordStringUnknownSubmenuOrCurrentListRefresh(
            parent.m_dropdownObject
          )
          playSelectedSoundCheck(dropdown, data.entryType)

          const onClickedHandler = control.GetHandler("OnClicked")
          if (onClickedHandler !== undefined) {
            onClickedHandler(control, buttonId)

            dropdown.SubmenuOrCurrentListRefresh(control)
          }
        } else if (buttonId === MOUSE_BUTTON_INDEX_RIGHT) {
          const gContextMenu = getContextMenuReference()
          setContextMenu(gContextMenu)

          const owner = parent.m_owner
          const data = getControlData(asLsmCastRecordStringUnknown(parent))
          const rightClickCallback = asLsmCastThisVoidOwnerUnknownParentUnknownDataUnknownUn(
            data.contextMenuCallback ?? data.rightClickCallback
          )
          const cm = asLsmCastMDropdownObjectIsOwnedByComboBoxThisUnknownOw(gContextMenu)
          if (
            rightClickCallback !== undefined &&
            cm !== undefined &&
            !cm.m_dropdownObject.IsOwnedByComboBox(owner)
          ) {
            if (libDebug.doDebug) {
              dlog(libDebug.LSM_LOGTYPE_VERBOSE, 173)
            }
            rightClickCallback(owner, parent, data)
          }
        }
      }
    })
  )

  if (!isRadioButton) {
    const originalClicked = control.GetHandler("OnClicked")
    control.SetHandler(
      "OnClicked",
      asLsmCastArgsUnknownUnknown(function (
        this: void,
        clickedControl: XmlHandlerControlLike,
        buttonId: number,
        ignoreCallback: unknown,
        skipHiddenForReasonsCheck?: unknown,
        ..._rest: unknown[]
      ): undefined {
        skipHiddenForReasonsCheck = skipHiddenForReasonsCheck ?? false
        if (skipHiddenForReasonsCheck === false) {
          const comboBox =
            (clickedControl.toggleFunction !== undefined &&
              asUnknown(clickedControl.GetParent().m_owner)) ||
            clickedControl.m_owner
          if (
            checkIfContextMenuOpenedButOtherControlWasClicked(
              clickedControl,
              comboBox,
              buttonId
            ) === true
          ) {
            return
          }
        }
        if (checkNextOnEntryMouseUpShouldExecute()) {
          return
        }
        if (originalClicked !== undefined) {
          originalClicked(clickedControl, buttonId, ignoreCallback)
        }
        clickedControl.checked = undefined
      })
    )
  }
}

function onAddonLoaded(this: void, _eventId: number, name: string): undefined {
  const [zoPrefixStart] = string.find(name, "^ZO_")
  if (zoPrefixStart !== undefined) {
    return
  }
  EM.UnregisterForEvent(MAJOR, EVENT_ADD_ON_LOADED)

  asLsmCastThisVoidUndefined(lib.Debug.LoadLogger)()
  libDebug = lib.Debug
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 174)
  }

  lib.SV = ZO_SavedVars.NewAccountWide(
    svConstants.name,
    svConstants.version,
    svConstants.profile,
    svConstants.defaults
  )

  asLsmCastThisVoidUndefined(lib.CreateContextMenuObject)()

  SecurePostHook(
    asObject(SCENE_MANAGER),
    "SetInUIMode",
    asLsmCastThisVoidArgsNeverUndefined(function (
      this: void,
      _self: unknown,
      inUIMode: boolean,
      _bypassHideSceneConfirmationReason?: unknown
    ): undefined {
      if (!inUIMode) {
        clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
        clearCustomScrollableMenu()
      }
    })
  )

  SecurePostHook(
    asObject(SCENE_MANAGER),
    "Show",
    asLsmCastThisVoidArgsNeverUndefined(function (
      this: void,
      _self: unknown,
      ..._args: unknown[]
    ): undefined {
      hideCurrentlyOpenedLSMAndContextMenu()
    })
  )

  ZO_PreHook(
    "ShowMenu",
    function (
      this: void,
      _owner?: unknown,
      _initialRefCount?: unknown,
      menuType?: unknown
    ): unknown {
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_VERBOSE, 175, tos(ZO_Menu.items.length), tos(menuType))
      }
      if (menuType !== undefined && menuType !== MENU_TYPE_DEFAULT) {
        return
      }

      const [firstMenuKey] = next(ZO_Menu.items)
      if (firstMenuKey === undefined) {
        return false
      }
      if (lib.preventLSMClosingZO_Menu !== undefined && lib.preventLSMClosingZO_Menu !== false) {
        lib.preventLSMClosingZO_Menu = undefined
        return
      }
      hideCurrentlyOpenedLSMAndContextMenu()
      return false
    }
  )

  SLASH_COMMANDS["/lsmdebug"] = function (this: void): undefined {
    asLsmCastThisVoidModeStringUndefined(libDebug.debugLoggingToggle)("debug")
  }
  SLASH_COMMANDS["/lsmdebugverbose"] = function (this: void): undefined {
    asLsmCastThisVoidModeStringUndefined(libDebug.debugLoggingToggle)("debugVerbose")
  }
}
EM.UnregisterForEvent(MAJOR, EVENT_ADD_ON_LOADED)
EM.RegisterForEvent(
  MAJOR,
  EVENT_ADD_ON_LOADED,
  asLsmCastThisVoidArgsUnknownUndefined(onAddonLoaded)
)
