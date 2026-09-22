import { asApiComboBoxObjectLike } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastIsDropdownVisibleThisUnknownBooleanUndefined } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgUnknownArgsUnknownUnknown,
  asLsmCastThisVoidComboBoxRecordStringUnknownGroupIndexU,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalContextMenuLikeUndefined = ContextMenuLike | undefined
function asLsmCastLocalContextMenuLikeUndefined(
  value: unknown
): LsmCastLocalContextMenuLikeUndefined {
  return value as LsmCastLocalContextMenuLikeUndefined
}

import { updateContextMenuRef } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-api-core/scrollable-menu-api-core.module.code.ts"
import {
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH,
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU,
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-api-shapes/scrollable-menu-api-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

const LSM_UPDATE_MODE_SUBMENU_local = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU
const LSM_UPDATE_MODE_MAINMENU_local = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU
const LSM_UPDATE_MODE_BOTH_local = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const libUtil = lib.Util
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const getButtonGroupOfEntryType = asLsmCastThisVoidComboBoxRecordStringUnknownGroupIndexU(
  libUtil.getButtonGroupOfEntryType
)

function lsmRefreshLibScrollableMenu(
  this: void,
  mocCtrl?: unknown,
  updateMode?: unknown,
  comboBox?: unknown
): undefined {
  if (mocCtrl === undefined) {
    mocCtrl = moc()
  }
  if (mocCtrl !== undefined) {
    const moc = asApiComboBoxObjectLike(mocCtrl)
    if (comboBox === undefined) {
      comboBox = (moc.m_comboBox ?? moc.m_owner?.m_comboBox) || undefined
    }
    if (comboBox === undefined) {
      return
    }
    if (
      updateMode === LSM_UPDATE_MODE_BOTH_local ||
      updateMode === LSM_UPDATE_MODE_MAINMENU_local
    ) {
      const mainMenuComboBox = moc.m_owner?.m_comboBox || undefined
      const mainMenuDropdown = mainMenuComboBox?.m_dropdownObject || undefined
      if (mainMenuDropdown !== undefined) {
        if (asApiComboBoxObjectLike(mainMenuComboBox).IsDropdownVisible?.() === true) {
          asApiComboBoxObjectLike(mainMenuDropdown).SubmenuOrCurrentListRefresh?.(
            mocCtrl,
            true,
            true
          )
        }
      }
    }

    if (updateMode === LSM_UPDATE_MODE_BOTH_local || updateMode === LSM_UPDATE_MODE_SUBMENU_local) {
      if (
        moc.m_dropdownObject &&
        comboBox &&
        asApiComboBoxObjectLike(comboBox).IsDropdownVisible?.() === true
      ) {
        asApiComboBoxObjectLike(moc.m_dropdownObject).SubmenuOrCurrentListRefresh?.(
          mocCtrl,
          true,
          false
        )
      }
    }
  }
}
RefreshCustomScrollableMenu = lsmRefreshLibScrollableMenu

function lsmIsContextMenuCurrentlyShown(this: void): boolean {
  const gContextMenu = asLsmCastLocalContextMenuLikeUndefined(updateContextMenuRef())
  if (gContextMenu === undefined) {
    return false
  }
  let isDropdownVisible = gContextMenu.IsDropdownVisible()
  if (!isDropdownVisible) {
    isDropdownVisible = gContextMenu.m_dropdownObject.control.IsHidden()
  }
  return isDropdownVisible
}
_G.TemperScrollableMenuIsContextMenuShown = lsmIsContextMenuCurrentlyShown

function lsmIsLsmCurrentlyShown(this: void): boolean {
  const lsmMenus = asLsmCastRecordStringUnknown(lib._objects)
  if (ZO_IsTableEmpty(lsmMenus)) {
    return false
  }
  for (const [, lsmMenuValue] of ipairs(asLsmCastUnknown(lsmMenus))) {
    const lsmMenu = asLsmCastIsDropdownVisibleThisUnknownBooleanUndefined(lsmMenuValue)
    if (lsmMenu !== undefined && lsmMenu.IsDropdownVisible !== undefined) {
      if (lsmMenu.IsDropdownVisible()) {
        return true
      }
    }
  }
  return lsmIsContextMenuCurrentlyShown()
}
IsCustomScrollableMenuShown = lsmIsLsmCurrentlyShown

function preventCustomScrollableContextMenuHideImpl(this: void): undefined {
  lib.preventLSMClosingZO_Menu = true
}
_G.TemperScrollableMenuPreventContextMenuHide = preventCustomScrollableContextMenuHideImpl
const preventCustomScrollableContextMenuHide = preventCustomScrollableContextMenuHideImpl

function preventCustomScrollableContextMenuEntryClickHideImpl(
  this: void,
  clickCount?: unknown
): undefined {
  if (clickCount !== undefined) {
    const preventerVars = asLsmCastRecordStringUnknown(TemperScrollableMenu.preventerVars)
    preventerVars.suppressNextOnEntryMouseUp = true
    preventerVars.suppressNextOnGlobalMouseUp = true
    preventerVars.suppressNextOnEntryMouseUpDisableCounter = clickCount
  }
}
PreventCustomScrollableContextMenuEntryClickHide =
  preventCustomScrollableContextMenuEntryClickHideImpl
const preventCustomScrollableContextMenuEntryClickHide =
  PreventCustomScrollableContextMenuEntryClickHide

function oneTimeSuppressLSMCLose(this: void): undefined {
  preventCustomScrollableContextMenuEntryClickHide(1)
}

function buttonGroupDefaultContextMenu(
  this: void,
  comboBox: Record<string, unknown>,
  control: unknown,
  data: Record<string, unknown>,
  useZoMenu?: unknown
): undefined {
  if (useZoMenu === undefined) {
    useZoMenu = lsmIsContextMenuCurrentlyShown()
  }
  const buttonGroup = comboBox.m_buttonGroup
  if (buttonGroup === undefined) {
    return
  }
  const groupIndex = getValueOrCallback(data.buttonGroup, data)
  if (groupIndex === undefined) {
    return
  }
  const entryType = getValueOrCallback(data.entryType, data)
  if (entryType === undefined) {
    return
  }

  if (useZoMenu === true) {
    ClearMenu()

    const buttonGroupSetAll = [
      {
        name: GetString(SI_LSM_CNTXT_CHECK_ALL),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, true, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_NONE),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, false, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_INVERT),
        callback: function (this: void): unknown {
          oneTimeSuppressLSMCLose()
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetInverse(control, data.ignoreCallback)
        },
      },
    ]
    for (const [, entryData] of ipairs(buttonGroupSetAll)) {
      AddMenuItem(entryData.name, entryData.callback)
    }

    preventCustomScrollableContextMenuHide()
    ShowMenu()
  } else {
    const buttonGroupSetAll = [
      {
        name: GetString(SI_LSM_CNTXT_CHECK_ALL),
        entryType: entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, true, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_NONE),
        entryType: entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetChecked(control, false, data.ignoreCallback)
        },
      },
      {
        name: GetString(SI_LSM_CNTXT_CHECK_INVERT),
        entryType: entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
        callback: function (this: void): unknown {
          const buttonGroupOfEntryType = getButtonGroupOfEntryType(comboBox, groupIndex, entryType)
          if (buttonGroupOfEntryType === undefined) {
            return
          }
          return buttonGroupOfEntryType.SetInverse(control, data.ignoreCallback)
        },
      },
    ]

    TemperScrollableMenuClear()
    const [addedEntriesIgnored] = AddCustomScrollableMenuEntries(buttonGroupSetAll)
    void addedEntriesIgnored
    ShowCustomScrollableMenu(undefined, undefined)
  }
}
lib.SetButtonGroupState = buttonGroupDefaultContextMenu
lib.ButtonGroupDefaultContextMenu = buttonGroupDefaultContextMenu
