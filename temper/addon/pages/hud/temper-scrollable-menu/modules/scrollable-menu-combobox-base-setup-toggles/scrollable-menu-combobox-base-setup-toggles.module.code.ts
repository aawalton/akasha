import {
  asBoolean,
  asComboBoxBaseClass,
  asControl,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidControlUnknownUndefined,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3c/scrollable-menu-casts-3c.module.code.ts"
import {
  asLsmRowControl,
  asNumber,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalButtonGroupSetClicked = ButtonGroupSetClicked
function asLsmCastLocalButtonGroupSetClicked(value: unknown): LsmCastLocalButtonGroupSetClicked {
  return value as LsmCastLocalButtonGroupSetClicked
}

import { addCheckButton } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-combobox-base-setup-helpers/scrollable-menu-combobox-base-setup-helpers.module.code.ts"
import { getValueOrCallback } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-combobox-base-shapes/scrollable-menu-combobox-base-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-filters/eso-world-map-filters.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON
)
const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const hideTooltip = asLsmCastThisVoidControlUnknownUndefined(libUtil.hideTooltip)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

interface ButtonGroupSetClicked {
  SetClickedButton: (this: void, button: unknown, ignoreCallback: unknown) => undefined
}

comboBox_base.SetupEntryRadioButton = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 118, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)

  const selfVar = this
  const toggleFunction = function (this: void, button: LsmRowControl, checked: boolean): undefined {
    const rowData = getControlData(button.GetParent())
    rowData.checked = checked

    if (checked) {
      if (libDebug.doDebug) {
        dlog(
          libDebug.LSM_LOGTYPE_VERBOSE,
          119,
          tos(getControlName(control)),
          tos(checked),
          tos(list)
        )
      }
      selfVar.RunItemCallback(data, dataTbl.ignoreCallback, checked)

      asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde(lib).FireCallbacks(
        "RadioButtonUpdated",
        control,
        data,
        checked
      )
      selfVar.Narrate("OnRadioButtonUpdated", asControl(button), data, undefined)
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 120, tos(getControlName(button)), tos(checked))
      }
    }
  }
  this.SetupEntryLabel(control, data, list)
  ctrl.isRadioButton = true
  ctrl.typeId = TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON

  this.UpdateHighlightTemplate(control, data, undefined, undefined)

  const [radioButton, radioButtonGroup] = addCheckButton(this, ctrl, dataTbl, toggleFunction)
  if (radioButtonGroup) {
    if (dataTbl.checked === true) {
      const ignoreCallback = true
      asLsmCastLocalButtonGroupSetClicked(radioButtonGroup).SetClickedButton(
        radioButton,
        ignoreCallback
      )
    }
  }
}

comboBox_base.SetupEntryCheckbox = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 121, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)

  const selfVar = this
  const toggleFunction = function (
    this: void,
    checkbox: LsmRowControl,
    checked: boolean
  ): undefined {
    const checkedData = getControlData(checkbox.GetParent())

    checkedData.checked = checked

    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 122, tos(getControlName(control)), tos(checked), tos(list))
    }
    selfVar.RunItemCallback(data, dataTbl.ignoreCallback, checked)

    asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde(lib).FireCallbacks(
      "CheckboxUpdated",
      control,
      data,
      checked
    )
    selfVar.Narrate("OnCheckboxUpdated", asControl(checkbox), data, undefined)
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 123, tos(getControlName(checkbox)), tos(checked))
    }

    hideTooltip(control)
  }

  this.SetupEntryLabel(control, data, list)
  ctrl.isCheckbox = true
  ctrl.typeId = TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX

  this.UpdateHighlightTemplate(control, data, undefined, undefined)

  const [checkbox] = addCheckButton(this, ctrl, dataTbl, toggleFunction)
  ZO_CheckButton_SetCheckState(
    asControl(checkbox),
    asBoolean(getValueOrCallback(dataTbl.checked, dataTbl))
  )
}
