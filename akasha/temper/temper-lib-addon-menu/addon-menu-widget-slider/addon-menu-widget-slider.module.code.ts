import {
  asControl,
  asLamFactory,
  asNumber,
  asSliderData,
  asSliderDefault,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  em,
  LAMCC,
  lam,
  registerWidget,
  wm,
} from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { LamControl, SliderData } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  getDefaultValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const SLIDER_HANDLER_NAMESPACE = "LAM2_Slider"

function parseLuaCapture(this: void, captured: unknown): string | undefined {
  return typeof captured === "string" ? captured : undefined
}

function roundDecimalToPlace(this: void, d: number, place: number): number | undefined {
  return tonumber(string.format("%." + tostring(place) + "f", d))
}

function clampValue(this: void, value: number, min: number, max: number): number {
  return math.max(math.min(value, max), min)
}

function updateDisabled(this: LamControl): undefined {
  const data = asSliderData(this.data)
  let disable: boolean | undefined
  if (typeof data.disabled === "function") {
    disable = data.disabled()
  } else {
    disable = data.disabled
  }

  this.slider?.SetEnabled(!disable)
  this.slidervalue?.SetEditEnabled(!(data.readOnly === true || disable === true))
  if (disable) {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
    this.minText?.SetColor(r, g, b, a)
    this.maxText?.SetColor(r, g, b, a)
    const [mr, mg, mb, ma] = ZO_DEFAULT_DISABLED_MOUSEOVER_COLOR.UnpackRGBA()
    this.slidervalue?.SetColor(mr, mg, mb, ma)
  } else {
    const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
    this.minText?.SetColor(r, g, b, a)
    this.maxText?.SetColor(r, g, b, a)
    this.slidervalue?.SetColor(r, g, b, a)
  }
}

function updateValue(this: LamControl, forceDefault?: boolean, value?: unknown): undefined {
  const data = asSliderData(this.data)
  let resolved: number | undefined
  if (forceDefault) {
    resolved = getDefaultValue(asSliderDefault(data.default))
    data.setFunc(resolved)
  } else if (value !== undefined && value !== false) {
    let next = asNumber(value)
    if (data.decimals !== undefined) {
      next = asNumber(roundDecimalToPlace(next, data.decimals))
    }
    if (data.clampInput !== false) {
      const clamp = data.clampFunction ?? clampValue
      next = clamp(next, data.min, data.max)
    }
    resolved = next
    data.setFunc(resolved)
    requestRefreshIfNeeded(this)
  } else {
    resolved = asNumber(data.getFunc())
  }

  const out = resolved ?? 0
  this.slider?.SetValue(out)
  this.slidervalue?.SetText(tostring(out))
}

let index = 1

function createSlider(
  this: void,
  parent: LamControl,
  sliderData: SliderData,
  controlName?: string
): LamControl {
  const control = lam.util.CreateLabelAndContainerControl(parent, sliderData, controlName)
  const isInputOnRight = sliderData.inputLocation === "right"

  const slider = wm.CreateControl(undefined, control.container, CT_SLIDER)
  control.slider = slider
  slider.SetAnchor(TOPLEFT)
  slider.SetHeight(14)
  if (isInputOnRight) {
    slider.SetAnchor(TOPRIGHT, undefined, undefined, -60)
  } else {
    slider.SetAnchor(TOPRIGHT)
  }
  slider.SetMouseEnabled(true)
  slider.SetOrientation(ORIENTATION_HORIZONTAL)
  slider.SetThumbTexture(
    "EsoUI\\Art\\Miscellaneous\\scrollbox_elevator.dds",
    "EsoUI\\Art\\Miscellaneous\\scrollbox_elevator_disabled.dds",
    undefined,
    8,
    16
  )
  const minValue = sliderData.min
  const maxValue = sliderData.max
  slider.SetMinMax(minValue, maxValue)
  slider.SetHandler("OnMouseEnter", (): undefined => {
    ZO_Options_OnMouseEnter(asControl(control))
  })
  slider.SetHandler("OnMouseExit", (): undefined => {
    ZO_Options_OnMouseExit(asControl(control))
  })

  const bg = wm.CreateControl(undefined, slider, CT_BACKDROP)
  bg.SetCenterColor(0, 0, 0)
  bg.SetAnchor(TOPLEFT, slider, TOPLEFT, 0, 4)
  bg.SetAnchor(BOTTOMRIGHT, slider, BOTTOMRIGHT, 0, -4)
  bg.SetEdgeTexture("EsoUI\\Art\\Tooltips\\UI-SliderBackdrop.dds", 32, 4, 0)

  const minText = wm.CreateControl(undefined, slider, CT_LABEL)
  control.minText = minText
  minText.SetFont("ZoFontGameSmall")
  minText.SetAnchor(TOPLEFT, slider, BOTTOMLEFT)
  minText.SetText(sliderData.min)

  const maxText = wm.CreateControl(undefined, slider, CT_LABEL)
  control.maxText = maxText
  maxText.SetFont("ZoFontGameSmall")
  maxText.SetAnchor(TOPRIGHT, slider, BOTTOMRIGHT)
  maxText.SetText(sliderData.max)

  const slidervalueBG = wm.CreateControlFromVirtual<BackdropControl>(
    undefined,
    slider,
    "ZO_EditBackdrop"
  )
  control.slidervalueBG = slidervalueBG
  if (isInputOnRight) {
    slidervalueBG.SetDimensions(60, 26)
    slidervalueBG.SetAnchor(LEFT, slider, RIGHT, 5, 0)
  } else {
    slidervalueBG.SetDimensions(50, 16)
    slidervalueBG.SetAnchor(TOP, slider, BOTTOM, 0, 0)
  }
  const slidervalue = wm.CreateControlFromVirtual<EditControl>(
    undefined,
    slidervalueBG,
    "ZO_DefaultEditForBackdrop"
  )
  control.slidervalue = slidervalue
  slidervalue.ClearAnchors()
  slidervalue.SetAnchor(TOPLEFT, slidervalueBG, TOPLEFT, 3, 1)
  slidervalue.SetAnchor(BOTTOMRIGHT, slidervalueBG, BOTTOMRIGHT, -3, -1)
  slidervalue.SetTextType(TEXT_TYPE_NUMERIC)
  if (isInputOnRight) {
    slidervalue.SetFont("ZoFontGameLarge")
  } else {
    slidervalue.SetFont("ZoFontGameSmall")
  }

  let isHandlingChange = false
  const handleValueChanged = (value: number): undefined => {
    let next = value
    if (isHandlingChange) {
      return
    }
    if (sliderData.decimals !== undefined) {
      next = asNumber(roundDecimalToPlace(next, sliderData.decimals))
    }
    isHandlingChange = true
    slider.SetValue(next)
    slidervalue.SetText(tostring(next))
    isHandlingChange = false
  }

  slidervalue.SetHandler("OnEscape", (): undefined => {
    handleValueChanged(asNumber(sliderData.getFunc()))
    slidervalue.LoseFocus()
  })
  slidervalue.SetHandler("OnEnter", (): undefined => {
    slidervalue.LoseFocus()
  })
  slidervalue.SetHandler("OnFocusLost", (): undefined => {
    const value = tonumber(slidervalue.GetText())
    control.UpdateValue?.(false, value)
  })
  slidervalue.SetHandler("OnTextChanged", (): undefined => {
    const input = slidervalue.GetText()
    const [lastCharDigit] = string.match(string.sub(input, -1), "[0-9]")
    if (input.length > 1 && parseLuaCapture(lastCharDigit) === undefined) {
      return
    }
    const value = tonumber(input)
    if (value !== undefined) {
      handleValueChanged(value)
    }
  })
  if (sliderData.autoSelect === true) {
    ZO_PreHookHandler(slidervalue, "OnFocusGained", (): undefined => {
      slidervalue.SelectAll()
    })
  }

  slider.SetValueStep(sliderData.step ?? 1)
  slider.SetHandler("OnValueChanged", (...args: unknown[]): undefined => {
    const value = asNumber(args[1])
    const eventReason = args[2]
    if (eventReason === EVENT_REASON_SOFTWARE) {
      return
    }
    handleValueChanged(value)
  })
  slider.SetHandler("OnSliderReleased", (...args: unknown[]): undefined => {
    const value = asNumber(args[1])
    if (slider.GetEnabled()) {
      control.UpdateValue?.(false, value)
    }
  })

  const onMouseWheel = (...args: unknown[]): undefined => {
    const value = asNumber(args[1])
    if (!slider.GetEnabled()) {
      return
    }
    const newValue =
      (tonumber(slidervalue.GetText()) ?? sliderData.min ?? 0) + (sliderData.step ?? 1) * value
    control.UpdateValue?.(false, newValue)
  }

  let sliderHasFocus = false
  let scrollEventInstalled = false
  const updateScrollEventHandler = (): undefined => {
    const needsScrollEvent = sliderHasFocus || slidervalue.HasFocus()
    if (needsScrollEvent !== scrollEventInstalled) {
      const callback = needsScrollEvent ? onMouseWheel : undefined
      slider.SetHandler("OnMouseWheel", callback, SLIDER_HANDLER_NAMESPACE)
      scrollEventInstalled = needsScrollEvent
    }
  }

  em.RegisterForEvent(
    "LAM_Slider_OnGlobalMouseUp_" + tostring(index),
    EVENT_GLOBAL_MOUSE_UP,
    (): undefined => {
      sliderHasFocus = wm.GetMouseOverControl() === slider
      updateScrollEventHandler()
    }
  )
  slidervalue.SetHandler("OnFocusGained", updateScrollEventHandler, SLIDER_HANDLER_NAMESPACE)
  slidervalue.SetHandler("OnFocusLost", updateScrollEventHandler, SLIDER_HANDLER_NAMESPACE)
  index = index + 1

  if (sliderData.warning !== undefined || sliderData.requiresReload === true) {
    const warning = wm.CreateControlFromVirtual<TextureControl>(
      undefined,
      asControl(control),
      "ZO_Options_WarningIcon"
    )
    control.warning = warning
    warning.SetAnchor(RIGHT, slider, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  control.UpdateValue = updateValue
  control.UpdateValue()

  if (sliderData.disabled !== undefined) {
    control.UpdateDisabled = updateDisabled
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("slider", WIDGET_VERSION.slider)) {
  LAMCC.slider = asLamFactory(createSlider)
}
