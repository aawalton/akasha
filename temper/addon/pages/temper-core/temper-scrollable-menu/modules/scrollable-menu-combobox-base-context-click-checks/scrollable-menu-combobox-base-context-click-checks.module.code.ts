import { asLsmCastGetParentThisUnknownUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1c/scrollable-menu-casts-1c.module.code.ts"
import {
  asLsmCastRecordNumberString,
  asLsmCastRecordStringUnknown,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asNumber } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  getContextMenu,
  lib,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-combobox-base-shapes/scrollable-menu-combobox-base-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const ENTRY_TYPE_TO_BUTTON_CHILD_NAME = asLsmCastRecordNumberString(
  entryTypeConstants.entryTypeToButtonChildName
)

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)

function wasTextSearchContextMenuEntryClickedCheck(
  this: void,
  selfVar: ComboBoxBase,
  mocCtrl: Record<string, unknown> | undefined,
  wasTextSearchContextMenuEntryClicked: unknown,
  isContextMenu: unknown
): unknown {
  if (wasTextSearchContextMenuEntryClicked === true) {
    lib.preventerVars.suppressNextOnEntryMouseUpDisableCounter = undefined

    if (mocCtrl === undefined || mocCtrl.closeOnSelect === undefined) {
      if (mocCtrl && asLsmCastGetParentThisUnknownUnknown(mocCtrl).GetParent() !== ZO_Menu) {
        if (isContextMenu) {
          lib.preventerVars.suppressNextOnEntryMouseUp = true
        }
        return true
      }
    } else if (mocCtrl !== undefined && mocCtrl.closeOnSelect !== undefined) {
      if (isContextMenu && wasTextSearchContextMenuEntryClicked) {
        lib.preventerVars.suppressNextOnEntryMouseUp = true

        const data = getControlData(mocCtrl)
        if (data?.entryType) {
          const buttonChildName = ENTRY_TYPE_TO_BUTTON_CHILD_NAME[asNumber(data.entryType)]
          if (buttonChildName !== undefined) {
            lib.preventerVars.suppressNextOnEntryMouseUpDisableCounter = 2
          }
        }
      }
    }
  }

  if (isContextMenu) {
    if (wasTextSearchContextMenuEntryClicked) {
      lib.preventerVars.suppressNextOnGlobalMouseUp = true
    }
    return false
  } else {
    return (mocCtrl?.closeOnSelect || undefined) && !selfVar.m_enableMultiSelect
  }
}

lib.lsmWasTextSearchContextMenuEntryClickedCheck = wasTextSearchContextMenuEntryClickedCheck

interface ContextMenuLike {
  IsDropdownVisible: (this: void) => boolean
}

type LsmCastLocalContextMenuLike3 = ContextMenuLike
function asLsmCastLocalContextMenuLike3(value: unknown): LsmCastLocalContextMenuLike3 {
  return value as LsmCastLocalContextMenuLike3
}

let clearCustomScrollableMenu: typeof ClearCustomScrollableMenu | undefined

function closeContextMenuAndSuppressClickCheck(
  this: void,
  checkOnlyMultiSelectionAtContextMenu: unknown,
  isMouseOverOwningDropdown: unknown,
  clickedEntryBelongsToContextMenu: unknown
): boolean | undefined {
  lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = undefined
  lib.preventerVars.suppressNextOnEntryMouseUp = undefined
  const gContextMenu = asLsmCastLocalContextMenuLike3(getContextMenu())
  if (!gContextMenu.IsDropdownVisible()) {
    return
  }
  if (
    !checkOnlyMultiSelectionAtContextMenu ||
    (checkOnlyMultiSelectionAtContextMenu &&
      asLsmCastRecordStringUnknown(gContextMenu).m_enableMultiSelect === true)
  ) {
    if (!isMouseOverOwningDropdown && !clickedEntryBelongsToContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
      lib.preventerVars.suppressNextOnEntryMouseUp = true

      if (
        checkOnlyMultiSelectionAtContextMenu === true &&
        isMouseOverOwningDropdown === undefined &&
        clickedEntryBelongsToContextMenu === false
      ) {
        lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = true
      }
    }
    return true
  } else {
    if (!isMouseOverOwningDropdown && !clickedEntryBelongsToContextMenu) {
      clearCustomScrollableMenu = clearCustomScrollableMenu ?? ClearCustomScrollableMenu
      clearCustomScrollableMenu()
      lib.preventerVars.suppressNextOnEntryMouseUp = true

      if (
        checkOnlyMultiSelectionAtContextMenu === true &&
        isMouseOverOwningDropdown === undefined &&
        clickedEntryBelongsToContextMenu === false
      ) {
        lib.preventerVars.wasContextMenuOpenedAsOnMouseUpWasSuppressed = true
      }
      return true
    }
  }
  return undefined
}

lib.lsmCloseContextMenuAndSuppressClickCheck = closeContextMenuAndSuppressClickCheck
