import {
  asButtonGroupClass,
  asLsmCastButtonGroupButtonMOwnerUnknown,
  asLsmCastButtonGroupObjectOnStateChangedCallback,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastLuaMapButtonGroupButtonButtonGroupButtonData,
  asLsmCastLuaMapButtonGroupButtonUnknown,
  asLsmCastLuaMapButtonGroupButtonUnknownUndefined,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUndefined,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonIdU,
  asLsmCastThisVoidControlUnknownUndefined,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  lib.Util.getControlName
)
const checkIfContextMenuOpenedButOtherControlWasClicked =
  asLsmCastThisVoidControlUnknownComboBoxUnknownButtonIdU(
    lib.Util.checkIfContextMenuOpenedButOtherControlWasClicked
  )
const hideTooltip = asLsmCastThisVoidControlUnknownUndefined(lib.Util.hideTooltip)

function getButtons(self: ButtonGroupObject): LuaMap<ButtonGroupButton, ButtonGroupButtonData> {
  return asLsmCastLuaMapButtonGroupButtonButtonGroupButtonData(self.m_buttons)
}

const buttonGroupClass = asButtonGroupClass(ZO_RadioButtonGroup.Subclass())
classes.buttonGroupClass = buttonGroupClass

buttonGroupClass.Add = function (
  this: ButtonGroupObject,
  button: ButtonGroupButton | undefined,
  entryType: unknown
): boolean | undefined {
  if (button !== undefined) {
    const buttons = getButtons(this)
    if (buttons.get(button) === undefined) {
      const selfVar = this

      const originalHandler = button.GetHandler("OnClicked")
      buttons.set(button, { originalHandler, isValidOption: true, entryType })

      if (entryType === entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON) {
        const newHandler = function (
          this: void,
          control: ButtonGroupButton,
          buttonId: unknown,
          ignoreCallback: unknown
        ): undefined {
          const parent = asLsmCastButtonGroupButtonMOwnerUnknown(control.GetParent())
          if (
            checkIfContextMenuOpenedButOtherControlWasClicked(control, parent.m_owner, buttonId) ===
            true
          ) {
            return
          }
          selfVar.HandleClick(control, buttonId, ignoreCallback)
        }

        button.SetHandler("OnClicked", asLsmCastThisVoidArgsUnknownUndefined(newHandler))

        if (button.label !== undefined) {
          const [r, g, b] = this.labelColorEnabled.UnpackRGB()
          button.label.SetColor(r, g, b)
        }
      }
      return true
    }
  }
  return undefined
}

buttonGroupClass.Remove = function (this: ButtonGroupObject, button: ButtonGroupButton): undefined {
  const buttons = getButtons(this)
  const buttonData = buttons.get(button)
  if (buttonData !== undefined) {
    button.SetHandler("OnClicked", buttonData.originalHandler)
    if (this.m_clickedButton === button) {
      this.m_clickedButton = undefined
    }
    buttons.delete(button)
  }
}

buttonGroupClass.SetButtonState = function (
  this: ButtonGroupObject,
  button: ButtonGroupButton,
  clickedButton: ButtonGroupButton | undefined,
  enabled: unknown,
  ignoreCallback?: unknown
): undefined {
  if (enabled !== undefined && enabled !== false) {
    let checked = true
    if (button === clickedButton) {
      button.SetState(BSTATE_PRESSED, true)
    } else {
      button.SetState(BSTATE_NORMAL, false)
      checked = false
    }

    if (button.label !== undefined) {
      const [r, g, b] = this.labelColorEnabled.UnpackRGB()
      button.label.SetColor(r, g, b)
    }

    if (button.toggleFunction !== undefined && ignoreCallback !== true) {
      button.toggleFunction(checked)
    }
  } else {
    if (button === clickedButton) {
      button.SetState(BSTATE_DISABLED_PRESSED, true)
    } else {
      button.SetState(BSTATE_DISABLED, true)
    }
    if (button.label !== undefined) {
      const [r, g, b] = this.labelColorDisabled.UnpackRGB()
      button.label.SetColor(r, g, b)
    }
  }
}

buttonGroupClass.HandleClick = function (
  this: ButtonGroupObject,
  control: ButtonGroupButton,
  buttonId: unknown,
  ignoreCallback: unknown
): undefined {
  const doDebugNow = false
  if (doDebugNow) {
    d("HandleClick - button: " + getControlName(control))
  }
  if (
    this.m_enabled === undefined ||
    this.m_enabled === false ||
    this.m_clickedButton === control
  ) {
    if (doDebugNow) {
      d("<self.m_clickedButton == control: " + tos(this.m_clickedButton === control))
    }
    return
  }

  const buttons = getButtons(this)
  const controlData = buttons.get(control)
  if (doDebugNow) {
    const lsmDebug = asLsmCastRecordStringUnknown(
      asLsmCastRecordStringUnknownUndefined(_G.LSM_Debug) ?? {}
    )
    _G.LSM_Debug = lsmDebug
    const handleClickDbg =
      asLsmCastLuaMapButtonGroupButtonUnknownUndefined(lsmDebug._buttonGroupClass_HandleClick) ??
      asLsmCastLuaMapButtonGroupButtonUnknown(new LuaTable<ButtonGroupButton, unknown>())
    lsmDebug._buttonGroupClass_HandleClick = handleClickDbg
    handleClickDbg.set(control, {
      self: this,
      control,
      buttonId,
      ignoreCallback,
      controlData,
    })
  }
  if (controlData !== undefined && !controlData.isValidOption) {
    return
  }

  if (this.customClickHandler !== undefined) {
    const customResult = this.customClickHandler(control, buttonId, ignoreCallback)
    if (customResult !== undefined && customResult !== false) {
      return
    }
  }

  if (buttonId === MOUSE_BUTTON_INDEX_LEFT) {
    for (const [k, v] of buttons) {
      this.SetButtonState(k, control, v.isValidOption, ignoreCallback)
    }

    const previousControl = this.m_clickedButton
    this.m_clickedButton = control

    if (this.onSelectionChangedCallback !== undefined && ignoreCallback !== true) {
      this.onSelectionChangedCallback(control, previousControl)
      hideTooltip(control)
    }
  }

  if (controlData !== undefined && controlData.originalHandler !== undefined) {
    controlData.originalHandler(control, buttonId)
  }
}

buttonGroupClass.SetChecked = function (
  this: ButtonGroupObject,
  control: ButtonGroupButton,
  checked: boolean | undefined,
  ignoreCallback: unknown
): boolean {
  this.m_clickedButton = undefined

  const buttonId = MOUSE_BUTTON_INDEX_LEFT
  const updatedButtons: ButtonGroupButton[] = []

  const buttons = getButtons(this)
  let valueChanged = false
  for (const [button, controlData] of buttons) {
    if (button.enabled !== undefined && button.enabled !== false) {
      if (ZO_CheckButton_IsChecked(button) !== checked) {
        valueChanged = true
        button.checked = checked
        updatedButtons.push(button)
        if (controlData.originalHandler !== undefined) {
          const skipHiddenForReasonsCheck = true
          controlData.originalHandler(button, buttonId, ignoreCallback, skipHiddenForReasonsCheck)
        }
      }
    }
  }

  if (
    ignoreCallback !== true &&
    !ZO_IsTableEmpty(updatedButtons) &&
    this.onStateChangedCallback !== undefined
  ) {
    this.onStateChangedCallback(control, updatedButtons)
  }

  return valueChanged
}

buttonGroupClass.SetInverse = function (
  this: ButtonGroupObject,
  control: ButtonGroupButton,
  ignoreCallback: unknown
): boolean {
  return this.SetChecked(control, undefined, ignoreCallback)
}

buttonGroupClass.SetStateChangedCallback = function (
  this: ButtonGroupObject,
  callback: unknown
): undefined {
  this.onStateChangedCallback = asLsmCastButtonGroupObjectOnStateChangedCallback(callback)
}
