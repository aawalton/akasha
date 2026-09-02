import { asControl, asLamFactory } from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, lam, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { CheckboxData, LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

function updateDisabled(this: void, control: LamControl): undefined {
  let disable: boolean | undefined
  if (typeof control.data.disabled === "function") {
    disable = control.data.disabled()
  } else {
    disable = control.data.disabled
  }

  const labelColor = disable
    ? ZO_DEFAULT_DISABLED_COLOR
    : control.value
      ? ZO_DEFAULT_ENABLED_COLOR
      : ZO_DEFAULT_DISABLED_COLOR
  const [lr, lg, lb, la] = labelColor.UnpackRGBA()
  control.label?.SetColor(lr, lg, lb, la)

  const checkboxColor = disable ? ZO_DEFAULT_DISABLED_COLOR : ZO_NORMAL_TEXT
  const [cr, cg, cb, ca] = checkboxColor.UnpackRGBA()
  control.checkbox?.SetColor(cr, cg, cb, ca)

  control.isDisabled = disable
}

function toggleCheckbox(this: void, control: LamControl): undefined {
  if (control.value) {
    const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
    control.label?.SetColor(r, g, b, a)
    control.checkbox?.SetText(control.checkedText ?? "")
  } else {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
    control.label?.SetColor(r, g, b, a)
    control.checkbox?.SetText(control.uncheckedText ?? "")
  }
}

function updateValue(this: LamControl, forceDefault?: boolean, value?: unknown): undefined {
  const data = this.data
  if (forceDefault) {
    value = getDefaultValue(data.default)
    data.setFunc?.(value)
  } else if (value !== undefined) {
    data.setFunc?.(value)
    requestRefreshIfNeeded(this)
  } else {
    value = data.getFunc?.()
  }
  this.value = value

  toggleCheckbox(this)
}

function onMouseEnter(this: void, control: LamControl): undefined {
  ZO_Options_OnMouseEnter(asControl(control))

  if (control.isDisabled) {
    return
  }

  const label = control.label
  if (control.value) {
    const [r, g, b, a] = ZO_HIGHLIGHT_TEXT.UnpackRGBA()
    label?.SetColor(r, g, b, a)
  } else {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_MOUSEOVER_COLOR.UnpackRGBA()
    label?.SetColor(r, g, b, a)
  }
  const [r, g, b, a] = ZO_HIGHLIGHT_TEXT.UnpackRGBA()
  control.checkbox?.SetColor(r, g, b, a)
}

function onMouseExit(this: void, control: LamControl): undefined {
  ZO_Options_OnMouseExit(asControl(control))

  if (control.isDisabled) {
    return
  }

  const label = control.label
  if (control.value) {
    const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
    label?.SetColor(r, g, b, a)
  } else {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
    label?.SetColor(r, g, b, a)
  }
  const [r, g, b, a] = ZO_NORMAL_TEXT.UnpackRGBA()
  control.checkbox?.SetColor(r, g, b, a)
}

function createCheckbox(
  this: void,
  parent: LamControl,
  checkboxData: CheckboxData,
  controlName?: string
): LamControl {
  const control = lam.util.CreateLabelAndContainerControl(parent, checkboxData, controlName)
  control.SetHandler("OnMouseEnter", (): undefined => onMouseEnter(control))
  control.SetHandler("OnMouseExit", (): undefined => onMouseExit(control))
  control.SetHandler("OnMouseUp", (): undefined => {
    if (control.isDisabled) {
      return
    }
    PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
    control.value = !control.value
    control.UpdateValue?.(false, control.value)
  })

  const checkbox = wm.CreateControl(undefined, control.container, CT_LABEL)
  control.checkbox = checkbox
  checkbox.SetAnchor(LEFT, control.container, LEFT, 0, 0)
  checkbox.SetFont("ZoFontGameBold")
  const [r, g, b, a] = ZO_NORMAL_TEXT.UnpackRGBA()
  checkbox.SetColor(r, g, b, a)
  control.checkedText = GetString(SI_CHECK_BUTTON_ON).toUpperCase()
  control.uncheckedText = GetString(SI_CHECK_BUTTON_OFF).toUpperCase()

  if (checkboxData.warning !== undefined || checkboxData.requiresReload) {
    control.warning = wm.CreateControlFromVirtual<TextureControl>(
      undefined,
      asControl(control),
      "ZO_Options_WarningIcon"
    )
    control.warning.SetAnchor(RIGHT, checkbox, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  control.data.tooltipText = getStringFromValue(checkboxData.tooltip ?? "")

  control.UpdateValue = updateValue
  control.UpdateValue()
  if (checkboxData.disabled !== undefined) {
    control.UpdateDisabled = function (this: LamControl): undefined {
      updateDisabled(this)
    }
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("checkbox", WIDGET_VERSION.checkbox)) {
  LAMCC.checkbox = asLamFactory(createCheckbox)
}
