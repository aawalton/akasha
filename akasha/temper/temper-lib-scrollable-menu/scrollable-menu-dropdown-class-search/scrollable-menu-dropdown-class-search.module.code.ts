import {
  asDropdownClass,
  asDropdownClassPrivate,
  asDropdownComboBox,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastContextMenuObjectContextMenuIssuingControlUnkn,
  asLsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo,
  asLsmCastEntryTypeNumberKeyStringUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastIsContextMenuBooleanUndefined } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastRunItemCallbackThisUnknownItemUnknownIgnoreCal,
  asLsmCastRunSpecialCallbackThisUnknownCallbackNameStrin,
  asLsmCastSelectItemByIndexThisUnknownIndexNumberIgnoreC,
  asLsmCastThisVoidArgsUnknownUndefined,
  asLsmCastThisVoidBoolean,
  asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno,
  asLsmCastThisVoidContextMenuObject,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonUnk,
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownEntryTypeUnknownUndefined,
  asLsmCastUpdateHeightThisUnknownControlUnknownUndefined,
  asLsmCastUpdateWidthThisUnknownControlUnknownUndefined,
  asNumber,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(lib.Util.getContextMenuReference)
const playSelectedSoundCheck = asLsmCastThisVoidSelfUnknownEntryTypeUnknownUndefined(
  lib.Util.playSelectedSoundCheck
)
const throttledCall = asLsmCastThisVoidFnThisVoidUndefinedDelayNumberSuffixSt(
  lib.Util.throttledCall
)
const checkIfContextMenuOpenedButOtherControlWasClicked =
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonUnk(
    lib.Util.checkIfContextMenuOpenedButOtherControlWasClicked
  )
const checkNextOnEntryMouseUpShouldExecute = asLsmCastThisVoidBoolean(
  lib.Util.checkNextOnEntryMouseUpShouldExecute
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

const onEntryMouseUpExcludeEntryTypes = dropdownClassPrivate.onEntryMouseUpExcludeEntryTypes
const runHandler = dropdownClassPrivate.runHandler
const HANDLER_FUNCTIONS = dropdownClassPrivate.handlerFunctions

asLsmCastRecordStringUnknown(dropdownClass).OnEntryMouseUp = function (
  this: DropdownObject,
  control: DropdownRowControl,
  button: number,
  upInside: boolean,
  ignoreHandler?: unknown,
  ctrl?: unknown,
  alt?: unknown,
  shift?: unknown,
  lsmEntryType?: number
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 71, tos(getControlName(control)), tos(button), tos(upInside))
  }
  lib.preventerVars.suppressNextOnGlobalMouseUp = undefined
  lib.preventerVars.suppressNextOnEntryMouseUp = undefined
  lib.preventerVars.suppressNextHideContextMenuClearItems = undefined

  if (upInside) {
    const data = getControlData(control)
    const comboBox = asLsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo(control.m_owner)
    if (data.enabled) {
      if (button === MOUSE_BUTTON_INDEX_LEFT) {
        if (onEntryMouseUpExcludeEntryTypes[asNumber(lsmEntryType)] === true) {
          return
        }

        if (checkIfContextMenuOpenedButOtherControlWasClicked(control, comboBox, button) === true) {
          lib.preventerVars.suppressNextOnGlobalMouseUp = true
          return
        }

        const isMultiSelectionEnabledAtParentMenu = comboBox.m_parentMenu?.m_enableMultiSelect
        const isMultiSelectionEnabled = comboBox.m_enableMultiSelect

        const isSubmenu = comboBox.isSubmenu
        if (isSubmenu) {
          if (isMultiSelectionEnabledAtParentMenu === true && isMultiSelectionEnabled === false) {
            const owner = asDropdownComboBox(this.owner)
            owner.m_enableMultiSelect = true
          }
        }

        if (checkNextOnEntryMouseUpShouldExecute()) {
          if (
            isSubmenu &&
            !isMultiSelectionEnabled &&
            lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed
          ) {
            lib.preventerVars.suppressNextOnGlobalMouseUp = true
          }
          lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = undefined
          return
        }

        if (
          !ignoreHandler &&
          runHandler(
            this,
            asLsmCastRecordNumberUnknown(HANDLER_FUNCTIONS["onMouseUp"]),
            control,
            data,
            button,
            upInside,
            ctrl,
            alt,
            shift
          )
        ) {
          this.OnEntrySelected(control)
        } else {
          this.RunItemCallback(asLsmCastEntryTypeNumberKeyStringUnknown(data), data.ignoreCallback)
        }
      } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
        const gContextMenu = asLsmCastContextMenuObjectContextMenuIssuingControlUnkn(
          getContextMenuReference()
        )
        setContextMenu(gContextMenu)
        gContextMenu.contextMenuIssuingControl = undefined
        const rightClickCallback =
          asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno(data.contextMenuCallback) ??
          asLsmCastThisVoidComboBoxUnknownControlUnknownDataUnkno(data.rightClickCallback)
        if (rightClickCallback && !gContextMenu.m_dropdownObject.IsOwnedByComboBox(comboBox)) {
          if (libDebug.doDebug) {
            dlog(libDebug.LSM_LOGTYPE_VERBOSE, 72)
          }
          gContextMenu.contextMenuIssuingControl = control
          rightClickCallback(comboBox, control, data)
        }
      }
    } else {
      if (comboBox.isSubmenu) {
        lib.preventerVars.suppressNextOnGlobalMouseUp = true
      }
    }
  }
}

dropdownClass.SelectItemByIndex = function (
  this: DropdownObject,
  index: number,
  ignoreCallback?: unknown
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 73, tos(index), tos(ignoreCallback))
  }
  if (this.owner) {
    playSelectedSoundCheck(this, undefined)
    return asLsmCastSelectItemByIndexThisUnknownIndexNumberIgnoreC(this.owner).SelectItemByIndex(
      index,
      ignoreCallback
    )
  }
}

dropdownClass.RunItemCallback = function (
  this: DropdownObject,
  item: { entryType?: number; [key: string]: unknown },
  ignoreCallback?: unknown
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 74, tos(item), tos(ignoreCallback))
  }
  if (this.owner) {
    playSelectedSoundCheck(this, item.entryType)
    return asLsmCastRunItemCallbackThisUnknownItemUnknownIgnoreCal(this.owner).RunItemCallback(
      item,
      ignoreCallback
    )
  }
}

dropdownClass.UpdateHeight = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 77)
  }
  if (this.owner) {
    asLsmCastUpdateHeightThisUnknownControlUnknownUndefined(this.owner).UpdateHeight(this.control)
  }
}

dropdownClass.UpdateWidth = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 178)
  }
  if (this.owner) {
    asLsmCastUpdateWidthThisUnknownControlUnknownUndefined(this.owner).UpdateWidth(this.control)
  }
}

dropdownClass.OnShow = function (this: DropdownObject, formattedEventName?: string): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 78)
  }

  if (formattedEventName !== undefined) {
    const anchorRight = this.anchorRight ? "Right" : "Left"
    const ctrl = this.control
    lib.FireCallbacks(formattedEventName, ctrl, this)

    const self = this
    throttledCall(
      function (this: void): undefined {
        self.Narrate(formattedEventName, ctrl, undefined, undefined, anchorRight)
      },
      100,
      "_DropdownClassOnShow"
    )
  }
}

dropdownClass.OnHide = function (this: DropdownObject, formattedEventName?: string): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 79)
  }

  const comboBox = asLsmCastIsContextMenuBooleanUndefined(this.m_comboBox)
  const isContextMenu = comboBox?.isContextMenu || false
  if (isContextMenu === true) {
    const owner = asLsmCastRunSpecialCallbackThisUnknownCallbackNameStrin(this.owner)
    if (owner?.RunSpecialCallback) {
      owner.RunSpecialCallback("onHideCallback")
    }
  }

  if (formattedEventName !== undefined) {
    const ctrl = this.control
    lib.FireCallbacks(formattedEventName, ctrl, this)
    this.Narrate(formattedEventName, ctrl)
  }
}

dropdownClass.XMLHandler = function (
  this: DropdownObject,
  selfVar: unknown,
  handlerName: string
): undefined {
  if (selfVar === undefined || handlerName === undefined) {
    return
  }

  if (handlerName === "OnEffectivelyHidden") {
    this.HideDropdown()
  } else if (handlerName === "OnMouseEnter") {
    this.OnMouseExitTimeout(selfVar)
  } else if (handlerName === "OnShow") {
    this.OnShow(this.GetFormattedNarrateEvent("Show"))
  } else if (handlerName === "OnHide") {
    this.OnHide(this.GetFormattedNarrateEvent("Hide"))
  }
}
