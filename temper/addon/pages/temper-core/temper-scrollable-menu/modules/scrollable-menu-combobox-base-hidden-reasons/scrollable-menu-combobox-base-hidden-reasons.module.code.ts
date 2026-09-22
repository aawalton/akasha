import { asComboBoxBaseClass } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetOwningWindowThisVoidUnknown,
  asLsmCastGetParentThisUnknownRecordStringUnknownUndefined,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1c/scrollable-menu-casts-1c.module.code.ts"
import { asLsmCastIsMouseEnabledThisVoidBoolean } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordNumberBoolean,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUnknownUndefined,
  asLsmCastThisVoidContextMenuObject,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidControlUnknownRecordStringUnknownUndef,
  asLsmCastThisVoidCtrlUnknownBoolean,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3c/scrollable-menu-casts-3c.module.code.ts"
import {
  asLsmCastThisVoidRecordStringUnknownUndefined,
  asLsmCastThisVoidScrollUnknownMocCtrlUnknownBoolean,
  asNumber,
  asString,
  asUnknown,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { contextMenuClickFlags } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-combobox-base-hidden-clicks/scrollable-menu-combobox-base-hidden-clicks.module.code.ts"

import {
  getContextMenu,
  lib,
  setContextMenu,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import {
  asBoolean,
  asLsmCastLocalContextMenuLike3,
  asLsmCastLocalDropdownObjectLike,
  asLsmCloseContextMenuAndSuppressClickCheck,
  asLsmWasTextSearchContextMenuEntryClickedCheck,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-combobox-base-hidden-shapes/scrollable-menu-combobox-base-hidden-shapes.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)
const debugPrefix = asString(libDebug.prefix)

const tos = tostring

const moc = asLsmCastThisVoidRecordStringUnknownUndefined(asLsmCastRecordStringUnknown(_G).moc)

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL = asLsmCastRecordNumberBoolean(
  entryTypeConstants.isEntryTypeWithParentMocCtrl
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const getComboBox = asLsmCastThisVoidControlUnknownRecordStringUnknownUndef(libUtil.getComboBox)
const belongsToContextMenuCheck = asLsmCastThisVoidCtrlUnknownBoolean(
  libUtil.belongsToContextMenuCheck
)
const isScrollBarClicked = asLsmCastThisVoidScrollUnknownMocCtrlUnknownBoolean(
  libUtil.isScrollBarClicked
)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(libUtil.getContextMenuReference)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

function getMouseOverHiddenForInfo(
  this: void
): LuaMultiReturn<
  [
    unknown,
    Record<string, unknown> | undefined,
    Record<string, unknown> | undefined,
    Record<string, unknown>,
  ]
> {
  const mocCtrl = moc()
  const owningWindow = mocCtrl && asLsmCastGetOwningWindowThisVoidUnknown(mocCtrl).GetOwningWindow()
  const comboBox = getComboBox(owningWindow || mocCtrl)

  return $multi(owningWindow, mocCtrl, comboBox, getControlData(mocCtrl))
}

comboBox_base.HiddenForReasons = function (
  this: ComboBoxBase,
  button: number,
  isMouseOverOwningDropdown: unknown
): unknown {
  setContextMenu(getContextMenuReference())
  const wasTextSearchContextMenuEntryClickedCheck = asLsmWasTextSearchContextMenuEntryClickedCheck(
    lib.lsmWasTextSearchContextMenuEntryClickedCheck
  )
  const closeContextMenuAndSuppressClickCheck = asLsmCloseContextMenuAndSuppressClickCheck(
    lib.lsmCloseContextMenuAndSuppressClickCheck
  )
  const gContextMenu = asLsmCastLocalContextMenuLike3(getContextMenu())
  const [owningWindow, mocCtrlInit, comboBox, mocEntry] = getMouseOverHiddenForInfo()
  let mocCtrl = mocCtrlInit
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 96, tos(button))
  }

  const mocCtrlOrig = mocCtrl
  if (mocCtrl !== undefined && mocCtrl.m_owner === undefined) {
    if (
      (mocCtrl.entryType !== undefined &&
        IS_ENTRY_TYPE_WITH_PARENT_MOC_CTRL[asNumber(mocCtrl.entryType)]) ||
      mocCtrl.toggleFunction
    ) {
      const parentCtrl =
        asLsmCastGetParentThisUnknownRecordStringUnknownUndefined(mocCtrl).GetParent()
      if (parentCtrl !== undefined) {
        mocCtrl = parentCtrl
      }
    }
  }

  const doDebugNow = false
  if (doDebugNow) {
    const tabEntryName = getControlName(mocCtrl) ?? "n/a"
    d(
      debugPrefix +
        "comboBox_base:HiddenForReasons - button: " +
        tos(button) +
        ", tabEntryName: " +
        tos(tabEntryName)
    )
    const globalTbl = asLsmCastRecordStringUnknown(_G)
    globalTbl.TemperScrollableMenuDebug =
      asLsmCastRecordStringUnknownUndefined(globalTbl.TemperScrollableMenuDebug) ?? {}
    const lsmDebug = asLsmCastRecordStringUnknown(globalTbl.TemperScrollableMenuDebug)
    lsmDebug.HiddenForReasons =
      asLsmCastRecordStringUnknownUndefined(lsmDebug.HiddenForReasons) ?? {}
    asLsmCastRecordStringUnknown(lsmDebug.HiddenForReasons)[tabEntryName] = {
      self: this,
      owningWindow,
      mocCtrlOrig,
      mocCtrl,
      mocEntry,
      comboBox,
      m_dropdownObject: this.m_dropdownObject,
      selfOwner: asLsmCastRecordStringUnknown(this).owner,
      dropdownObjectOwner: asLsmCastRecordStringUnknown(this.m_dropdownObject).owner,
    }
  }

  const dropdownObject = asLsmCastLocalDropdownObjectLike(this.m_dropdownObject)
  const isContextMenuVisible = gContextMenu.IsDropdownVisible()
  const isOwnedByComboBox = dropdownObject.IsOwnedByComboBox(comboBox)
  const [
    wasTextSearchContextMenuEntryClicked,
    wasFilterHeaderClicked,
    wasEditBoxClickedAtContextMenu,
    wasSliderClickedAtContextMenu,
    wasMultiIconClickedAtContextMenu,
  ] = contextMenuClickFlags(gContextMenu, dropdownObject, mocCtrl, isContextMenuVisible)

  if (
    isOwnedByComboBox === true ||
    wasTextSearchContextMenuEntryClicked === true ||
    wasFilterHeaderClicked === true ||
    wasEditBoxClickedAtContextMenu === true ||
    wasSliderClickedAtContextMenu === true ||
    wasMultiIconClickedAtContextMenu === true
  ) {
    const mocEntryTbl = asLsmCastRecordStringUnknown(mocEntry)
    if (
      type(mocEntry) === "table" &&
      (ZO_IsTableEmpty(mocEntry) ||
        (mocEntryTbl.enabled && mocEntryTbl.enabled !== false) ||
        (mocEntryTbl.IsMouseEnabled &&
          asLsmCastIsMouseEnabledThisVoidBoolean(mocEntryTbl).IsMouseEnabled()))
    ) {
      if (button === MOUSE_BUTTON_INDEX_LEFT) {
        if (isContextMenuVisible === true) {
          if (owningWindow !== gContextMenu.m_container) {
            if (wasTextSearchContextMenuEntryClicked === true) {
              return wasTextSearchContextMenuEntryClickedCheck(
                this,
                mocCtrl,
                wasTextSearchContextMenuEntryClicked,
                isContextMenuVisible
              )
            } else if (wasFilterHeaderClicked) {
              return false
            } else if (wasEditBoxClickedAtContextMenu) {
              return false
            } else if (wasSliderClickedAtContextMenu) {
              return false
            } else if (wasMultiIconClickedAtContextMenu) {
              return false
            } else {
              if (mocCtrl) {
                const mocOwner = asLsmCastRecordStringUnknownUndefined(mocCtrl.m_owner)
                const parentMenu =
                  mocOwner && asLsmCastRecordStringUnknownUndefined(mocOwner.m_parentMenu)
                const parentMenuDropdownObject =
                  parentMenu && asUnknown(parentMenu.m_dropdownObject)
                if (
                  mocOwner &&
                  parentMenu &&
                  parentMenuDropdownObject &&
                  parentMenuDropdownObject === this.m_dropdownObject
                ) {
                  return mocCtrl.closeOnSelect && !this.m_enableMultiSelect
                }
              }

              if (closeContextMenuAndSuppressClickCheck(false, undefined, undefined)) {
                return false
              }
            }
          } else {
            if (wasFilterHeaderClicked) {
              return false
            } else if (wasEditBoxClickedAtContextMenu) {
              return false
            } else if (wasSliderClickedAtContextMenu) {
              return false
            } else if (wasMultiIconClickedAtContextMenu) {
              return false
            }

            return asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect && !this.m_enableMultiSelect
          }
        } else {
          return wasTextSearchContextMenuEntryClickedCheck(
            this,
            mocCtrl,
            wasTextSearchContextMenuEntryClicked,
            isContextMenuVisible
          )
        }
      } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
        return false
      }
    } else {
      if (isContextMenuVisible === true) {
        if (wasEditBoxClickedAtContextMenu) {
          return false
        } else if (wasSliderClickedAtContextMenu) {
          return false
        } else if (wasMultiIconClickedAtContextMenu) {
          return false
        }

        if (comboBox !== undefined && mocCtrl !== undefined) {
          if (isScrollBarClicked(comboBox.m_scroll, mocCtrl)) {
            return false
          }

          const comboBoxSubmenu = asLsmCastRecordStringUnknownUndefined(comboBox.m_submenu)
          const submenuScroll =
            (comboBoxSubmenu && asLsmCastRecordStringUnknownUndefined(comboBoxSubmenu.m_scroll)) ||
            undefined
          if (submenuScroll !== undefined) {
            if (submenuScroll.contents === mocCtrl) {
              return false
            } else if (isScrollBarClicked(submenuScroll, mocCtrl)) {
              return false
            }
          }
        }
      } else {
        const mocEntryEntryType = mocEntryTbl.entryType
        if (mocEntryEntryType !== undefined) {
          if (mocEntryTbl.enabled === true) {
            return wasTextSearchContextMenuEntryClickedCheck(
              this,
              mocCtrl,
              wasTextSearchContextMenuEntryClicked,
              isContextMenuVisible
            )
          }
        }
      }
    }
  } else {
    if (button === MOUSE_BUTTON_INDEX_LEFT) {
      let clickedEntryBelongsToContextMenu = false
      if (isContextMenuVisible === true) {
        if (comboBox !== undefined && mocCtrl !== undefined) {
          if (isScrollBarClicked(comboBox.m_scroll, mocCtrl)) {
            return false
          }

          const comboBoxSubmenu = asLsmCastRecordStringUnknownUndefined(comboBox.m_submenu)
          const submenuScroll =
            (comboBoxSubmenu && asLsmCastRecordStringUnknownUndefined(comboBoxSubmenu.m_scroll)) ||
            undefined
          if (submenuScroll !== undefined) {
            if (submenuScroll.contents === mocCtrl) {
              return false
            } else if (isScrollBarClicked(submenuScroll, mocCtrl)) {
              return false
            }
          }
        }

        if (
          asBoolean(wasEditBoxClickedAtContextMenu) === true ||
          asBoolean(wasSliderClickedAtContextMenu) === true ||
          asBoolean(wasMultiIconClickedAtContextMenu) === true
        ) {
          clickedEntryBelongsToContextMenu = true
        } else {
          clickedEntryBelongsToContextMenu = belongsToContextMenuCheck(mocCtrl)
        }
      }
      if (
        closeContextMenuAndSuppressClickCheck(
          true,
          isMouseOverOwningDropdown,
          clickedEntryBelongsToContextMenu
        )
      ) {
        return false
      }
    }
  }

  let hiddenForReasons: ((this: void, ...args: unknown[]) => unknown) | undefined
  if (!this.GetHiddenForReasons) {
    return false
  }
  hiddenForReasons = asLsmCastThisVoidArgsUnknownUnknownUndefined(this.GetHiddenForReasons(button))

  if (hiddenForReasons === undefined) {
    return false
  }
  const isHiddenForReasons = hiddenForReasons(owningWindow, mocCtrl, comboBox, mocEntry)
  return isHiddenForReasons
}
