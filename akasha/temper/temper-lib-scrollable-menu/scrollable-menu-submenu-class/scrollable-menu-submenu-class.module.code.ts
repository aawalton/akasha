import {
  asComboBoxBaseStatic,
  asComboBoxClassStatic,
  asContextMenuObject,
  asControl,
  asDropdownRowControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastControlControlLsmComboBoxOptionsUndefinedNumbe } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastIsOwnedByComboBoxThisVoidSelfUnknownBooleanSet,
  asLsmCastLsmMocControlUndefined,
  asLsmCastLuaMetatableSubmenuProxyObject,
  asLsmCastMComboBoxComboBoxObject,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordStringBoolean,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUnknown,
  asLsmCastThisVoidArgUnknownArgsUnknownUnknown,
  asLsmCastThisVoidComboBoxUnknownRestUnknownUnknown,
  asLsmCastThisVoidContextMenuObjectUndefined,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownUndefined,
  asLsmCastThisVoidUndefined,
  asNumber,
  asSubmenuClass,
  asSubmenuObject,
  asSubmenuProxyObject,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  getContextMenu,
  lib,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseStatic(classes.comboboxBaseClass)
const comboBoxClass = asComboBoxClassStatic(classes.comboBoxClass)

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const submenuConstants = asLsmCastRecordStringUnknown(constants.submenu)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)

const SUBMENU_CLASS_EXPOSED_VARIABLES = asLsmCastRecordStringBoolean(
  submenuConstants.submenuClass_exposedVariables
)
const SUBMENU_CLASS_EXPOSED_FUNCTIONS = asLsmCastRecordStringBoolean(
  submenuConstants.submenuClass_exposedFunctions
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const SubOrContextMenu_highlightControl = asLsmCastThisVoidSelfUnknownControlUnknownUndefined(
  libUtil.SubOrContextMenu_highlightControl
)
const checkIfHiddenForReasons = asLsmCastThisVoidArgsUnknownUnknown(libUtil.checkIfHiddenForReasons)
const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)

const submenuClass = asSubmenuClass(classes.submenuClass)

submenuClass.New = function (this: SubmenuClass, ...args: unknown[]): SubmenuObject {
  const newObject = setmetatable(
    asSubmenuProxyObject({}),
    asLsmCastLuaMetatableSubmenuProxyObject({
      __index: function (this: SubmenuProxyObject, key: string): unknown {
        if (SUBMENU_CLASS_EXPOSED_VARIABLES[key]) {
          const value = asLsmCastRecordStringUnknown(this.m_comboBox)[key]
          if (value !== undefined) {
            return value
          }
        }

        const value = asLsmCastRecordStringUnknown(submenuClass)[key]
        if (value) {
          if (SUBMENU_CLASS_EXPOSED_FUNCTIONS[key]) {
            return function (
              this: void,
              proxySelf: SubmenuProxyObject,
              ...rest: unknown[]
            ): unknown {
              return asLsmCastThisVoidComboBoxUnknownRestUnknownUnknown(value)(
                proxySelf.m_comboBox,
                ...rest
              )
            }
          }

          return value
        }
        return undefined
      },
    })
  )

  newObject.__parentClasses = [this]
  asSubmenuObject(newObject).Initialize(
    ...asLsmCastControlControlLsmComboBoxOptionsUndefinedNumbe(args)
  )
  return asSubmenuObject(newObject)
}

submenuClass.Initialize = function (
  this: SubmenuObject,
  parent: Control,
  comboBoxContainer: Control,
  options: LsmComboBoxOptions | undefined,
  depth: number
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      140,
      tos(getControlName(parent)),
      tos(getControlName(comboBoxContainer)),
      tos(depth)
    )
  }
  const container = asLsmCastMComboBoxComboBoxObject(comboBoxContainer)
  this.m_comboBox = container.m_comboBox
  this.isSubmenu = true
  this.m_parentMenu = parent

  comboBox_base.Initialize(this, parent, comboBoxContainer, options, depth, undefined)
  this.breadcrumbName = "SubmenuBreadcrumb"
}

submenuClass.UpdateOptions = function (
  this: SubmenuObject,
  options?: LsmComboBoxOptions,
  onInit?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 141, tos(options), tos(onInit))
  }

  this.AddCustomEntryTemplates(this.GetOptions())
}

submenuClass.AddMenuItems = function (this: SubmenuObject, parentControl: Control): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 142, tos(getControlName(parentControl)))
  }
  this.openingControl = parentControl
  this.RefreshSortedItems(parentControl)
  this.UpdateWidth()
  this.UpdateHeight()
  this.m_dropdownObject.AnchorToControl(asDropdownRowControl(parentControl))
}

submenuClass.GetEntries = function (this: SubmenuObject): unknown {
  const data = getControlData(this.openingControl)

  const entries = getValueOrCallback(data.entries, data)
  return entries
}

submenuClass.GetMaxRows = function (this: SubmenuObject): number {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      143,
      tos(this.visibleRowsSubmenu ?? DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS)
    )
  }
  return (
    asLsmCastNumberUndefined(this.visibleRowsSubmenu) ??
    asNumber(DROPDOWN_DEFAULTS.DEFAULT_VISIBLE_ROWS)
  )
}

submenuClass.GetMenuPrefix = function (this: SubmenuObject): string {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 144)
  }
  return "SubMenu"
}

submenuClass.ShowDropdownInternal = function (this: SubmenuObject): undefined {
  if (this.openingControl) {
    SubOrContextMenu_highlightControl(this, this.openingControl)
  }
}

submenuClass.HideDropdownInternal = function (this: SubmenuObject): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 145)
  }

  const dropdownObject = asLsmCastIsOwnedByComboBoxThisVoidSelfUnknownBooleanSet(
    this.m_dropdownObject
  )
  if (dropdownObject.IsOwnedByComboBox(this)) {
    dropdownObject.SetHidden(true)
  }
  this.SetVisible(false)
  if (this.onHideDropdownCallback) {
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 146)
    }
    asLsmCastThisVoidUndefined(this.onHideDropdownCallback)()
  }
}

submenuClass.HideDropdown = function (this: SubmenuObject): boolean {
  return comboBox_base.HideDropdown(this)
}

submenuClass.HideOnMouseExit = function (
  this: SubmenuObject,
  mocCtrl?: LsmMocControl
): boolean | undefined {
  mocCtrl = mocCtrl || asLsmCastLsmMocControlUndefined(moc())
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 147, tos(getControlName(mocCtrl)))
  }
  if (mocCtrl?.m_dropdownObject) {
    if (comboBoxClass.HideOnMouseExit(this)) {
      if (this.ShouldHideDropdown()) {
        return this.HideDropdown()
      }
    }
  }
  return undefined
}

submenuClass.ShouldHideDropdown = function (this: SubmenuObject): boolean {
  let isMouseOverAnyRelevantControl = false
  let gContextMenu = getContextMenu()
  gContextMenu = gContextMenu || getContextMenuReference()
  const ctxMenu = asContextMenuObject(gContextMenu)
  if (ctxMenu.IsDropdownVisible() && ctxMenu.m_container === this.m_container) {
    isMouseOverAnyRelevantControl = this.IsMouseOverControl() || this.IsMouseOverOpeningControl()
  } else {
    isMouseOverAnyRelevantControl = this.IsMouseOverControl() || this.IsMouseOverOpeningControl()
  }
  return this.IsDropdownVisible() && isMouseOverAnyRelevantControl === false
}

submenuClass.IsMouseOverOpeningControl = function (this: SubmenuObject): boolean {
  return MouseIsOver(asControl(this.openingControl))
}

submenuClass.GetHiddenForReasons = function (
  this: SubmenuObject,
  button: number
): (
  this: void,
  owningWindow: unknown,
  mocCtrl: unknown,
  comboBox: unknown,
  entry: unknown
) => unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 148, tos(button))
  }
  const selfVar = this
  return function (
    this: void,
    owningWindow: unknown,
    mocCtrl: unknown,
    comboBox: unknown,
    entry: unknown
  ): unknown {
    return checkIfHiddenForReasons(
      selfVar,
      button,
      false,
      owningWindow,
      mocCtrl,
      comboBox,
      entry,
      true
    )
  }
}

export { submenuClass }
