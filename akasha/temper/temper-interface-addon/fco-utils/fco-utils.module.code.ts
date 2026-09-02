import { ADDON_NAME } from "../fco-constants/fco-constants.module.code.ts"

export interface AddButtonData {
  parentControl: Control
  buttonName: string
  callback: (this: void, ...args: unknown[]) => void
  width?: number
  height?: number
  normal?: string
  highlight?: string
  pressed?: string
  tooltip?: string
  visible?: boolean | ((this: void) => boolean)
}

interface FcoButtonControl extends ButtonControl {
  upTexture?: string
  mouseOver?: string
  clickedTexture?: string
  tooltipText?: string
  tooltipAlign?: number
}

interface HookableParent extends Control {
  fcocsEffectivelyShownHooked?: boolean
}

export function createOrGet(
  name: string,
  parent: Control | undefined,
  controlType: CtButton
): ButtonControl
export function createOrGet(
  name: string,
  parent: Control | undefined,
  controlType: CtTexture
): TextureControl
export function createOrGet(
  this: void,
  name: string,
  parent: Control | undefined,
  controlType: CtButton | CtTexture
): ButtonControl | TextureControl {
  const existing = WINDOW_MANAGER.GetControlByName<ButtonControl | TextureControl>(name)
  if (existing !== undefined) {
    return existing
  }
  if (controlType === CT_BUTTON) {
    return WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  }
  return WINDOW_MANAGER.CreateControl(name, parent, CT_TEXTURE)
}

export function addButton(
  this: void,
  myAnchorPoint: number,
  relativeTo: Control | undefined,
  relativePoint: number,
  offsetX: number,
  offsetY: number,
  buttonData: AddButtonData
): FcoButtonControl | undefined {
  if (
    buttonData.parentControl === undefined ||
    buttonData.buttonName === undefined ||
    buttonData.callback === undefined
  ) {
    return undefined
  }

  const parent: HookableParent = buttonData.parentControl
  const btnName = `${parent.GetName()}_${ADDON_NAME}_${buttonData.buttonName}`

  const button: FcoButtonControl = createOrGet(btnName, parent, CT_BUTTON)

  button.SetDimensions(buttonData.width ?? 32, buttonData.height ?? 32)
  button.SetAnchor(myAnchorPoint, relativeTo, relativePoint, offsetX, offsetY)

  const texture = createOrGet(`${btnName}Texture`, button, CT_TEXTURE)
  texture.SetAnchorFill()
  texture.SetTexture(buttonData.normal)

  button.upTexture = buttonData.normal
  button.mouseOver = buttonData.highlight
  button.clickedTexture = buttonData.pressed
  button.tooltipText = buttonData.tooltip
  button.tooltipAlign = TOP

  const btn = button
  btn.SetHandler("OnMouseEnter", () => {
    btn.GetChild<TextureControl>(1)?.SetTexture(btn.mouseOver)
    ZO_Tooltips_ShowTextTooltip(btn, btn.tooltipAlign ?? TOP, btn.tooltipText)
  })
  btn.SetHandler("OnMouseExit", () => {
    btn.GetChild<TextureControl>(1)?.SetTexture(btn.upTexture)
    ZO_Tooltips_HideTextTooltip()
  })
  btn.SetHandler("OnClicked", (clickedControl, mouseButton, upInside) => {
    buttonData.callback(clickedControl, mouseButton, upInside)
  })
  btn.SetHandler("OnMouseUp", (_self, _mouseButton, upInside) => {
    if (upInside === true) {
      btn.GetChild<TextureControl>(1)?.SetTexture(btn.upTexture)
    }
  })
  btn.SetHandler("OnMouseDown", () => {
    btn.GetChild<TextureControl>(1)?.SetTexture(btn.clickedTexture)
  })

  let isHidden = false
  const visible = buttonData.visible
  if (typeof visible === "function") {
    isHidden = !visible()
    if (parent.fcocsEffectivelyShownHooked !== true) {
      ZO_PostHookHandler(parent, "OnEffectivelyShown", () => {
        btn.SetHidden(!visible())
      })
      parent.fcocsEffectivelyShownHooked = true
    }
  } else if (typeof visible === "boolean") {
    isHidden = visible
  }

  btn.SetHidden(isHidden)
  btn.SetMouseEnabled(true)
  return btn
}

export function throttledUpdate(
  this: void,
  callbackName: string,
  timerMs: number,
  callback: (this: void) => void
): undefined {
  if (callbackName === "" || callback === undefined) {
    return
  }
  const interval = timerMs > 0 ? timerMs : 1
  const update = (): undefined => {
    EVENT_MANAGER.UnregisterForUpdate(callbackName)
    callback()
  }
  EVENT_MANAGER.UnregisterForUpdate(callbackName)
  EVENT_MANAGER.RegisterForUpdate(callbackName, interval, update)
}
