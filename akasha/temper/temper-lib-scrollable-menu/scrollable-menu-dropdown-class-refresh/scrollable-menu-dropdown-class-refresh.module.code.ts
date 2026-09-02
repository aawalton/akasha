import {
  asControl,
  asDropdownClass,
  asDropdownClassPrivate,
  asDropdownComboBox,
  asDropdownRowControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastHideDropdownThisUnknownUndefined,
  asLsmCastIsAutomaticRefreshEnabledThisUnknownLuaMultiRe,
  asLsmCastIsDropdownVisibleThisUnknownBoolean,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastShowSubmenuThisUnknownControlUnknownUndefined,
  asLsmCastShowThisUnknownUndefined,
  asLsmCastThisVoidArgsUnknownUndefined,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidListControlSelectedDataUnknownUndefine,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownDataUnknownHa,
  asLsmCastThisVoidSelfUnknownScrollControlUnknownItemUnk,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const LSM_NORMAL_MENU_REFRESH_DONE = 1
const LSM_SUBMENU_REFRESH_DONE = 2

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const showTooltip = asLsmCastThisVoidSelfUnknownControlUnknownDataUnknownHa(lib.Util.showTooltip)
const compareDropdownDataList = asLsmCastThisVoidSelfUnknownScrollControlUnknownItemUnk(
  lib.Util.compareDropdownDataList
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

dropdownClass.ShowSubmenu = function (this: DropdownObject, control: unknown): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 80, tos(getControlName(control)))
  }
  if (this.owner) {
    dropdownClassPrivate.clearTimeout()
    asLsmCastShowSubmenuThisUnknownControlUnknownUndefined(this.owner).ShowSubmenu(control)
  }
}

dropdownClass.ShowTooltip = function (
  this: DropdownObject,
  control: unknown,
  data: { hasSubmenu?: unknown; [key: string]: unknown }
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 81, tos(getControlName(control)), tos(data.hasSubmenu))
  }
  showTooltip(this, control, data, data.hasSubmenu)
}

dropdownClass.HideDropdown = function (this: DropdownObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 82)
  }
  if (this.owner) {
    asLsmCastHideDropdownThisUnknownUndefined(this.owner).HideDropdown()
  }
}

dropdownClass.IsAutomaticRefreshEnabled = function (
  this: DropdownObject
): LuaMultiReturn<[unknown, unknown]> {
  if (this.m_comboBox) {
    return asLsmCastIsAutomaticRefreshEnabledThisUnknownLuaMultiRe(
      this.m_comboBox
    ).IsAutomaticRefreshEnabled()
  }
  return $multi(undefined, undefined)
}

dropdownClass.SubmenuOrCurrentListRefresh = function (
  this: DropdownObject,
  control: unknown,
  override?: unknown,
  refreshMainMenuOrSubmenu?: unknown
): unknown {
  override = override || false
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 192, tos(getControlName(control)))
  }
  const comboBox = this.m_comboBox
  if (!comboBox || !asLsmCastIsDropdownVisibleThisUnknownBoolean(comboBox).IsDropdownVisible()) {
    return
  }

  let [automaticRefresh, automaticSubmenuRefresh] = this.IsAutomaticRefreshEnabled()
  if (override === true) {
    automaticRefresh = true
    automaticSubmenuRefresh = true
  }

  if (
    automaticRefresh === true &&
    (!this.m_parentMenu ||
      (refreshMainMenuOrSubmenu !== undefined && refreshMainMenuOrSubmenu === true))
  ) {
    zo_callLater(function (this: void): undefined {
      asLsmCastShowThisUnknownUndefined(comboBox).Show()
    }, 15)
    dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain(this, comboBox, 25)
    return LSM_NORMAL_MENU_REFRESH_DONE
  } else if (
    automaticSubmenuRefresh === true &&
    (this.m_parentMenu !== undefined ||
      (refreshMainMenuOrSubmenu !== undefined && refreshMainMenuOrSubmenu === false))
  ) {
    const owner = (control !== undefined && asDropdownRowControl(control).m_owner) || this.owner
    if (owner !== undefined && asDropdownComboBox(owner).openingControl !== undefined) {
      dropdownClassPrivate.clearTimeout()
      this.ShowSubmenu(asDropdownComboBox(owner).openingControl)
      dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain(this, comboBox, 10)
      return LSM_SUBMENU_REFRESH_DONE
    }
  }
  return false
}

dropdownClass.Refresh = function (
  this: DropdownObject,
  item?: { m_owner?: { m_scroll?: Control }; [key: string]: unknown }
): undefined {
  let entryData: unknown
  let scrollControl: Control | undefined = asControl(this.scrollControl)

  if (item) {
    scrollControl = item.m_owner?.m_scroll || undefined
    if (scrollControl !== undefined) {
      entryData = compareDropdownDataList(this, scrollControl, item)
    }

    if (entryData === undefined) {
      scrollControl = asControl(this.scrollControl)
      entryData = compareDropdownDataList(this, scrollControl, item)
    }
  }
  const refreshVisible = asLsmCastThisVoidListControlSelectedDataUnknownUndefine(
    ZO_ScrollList_RefreshVisible
  )
  refreshVisible(asControl(scrollControl), entryData)
}
