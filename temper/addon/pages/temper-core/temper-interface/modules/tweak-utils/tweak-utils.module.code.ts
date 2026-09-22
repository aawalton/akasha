import { ADDON_NAME } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-constants/tweak-constants.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

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

interface TweakButtonControl extends ButtonControl {
  upTexture?: string
  mouseOver?: string
  clickedTexture?: string
  tooltipText?: string
  tooltipAlign?: number
}

interface HookableParent extends Control {
  tweakEffectivelyShownHooked?: boolean
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
): TweakButtonControl | undefined {
  if (
    buttonData.parentControl === undefined ||
    buttonData.buttonName === undefined ||
    buttonData.callback === undefined
  ) {
    return undefined
  }

  const parent: HookableParent = buttonData.parentControl
  const btnName = `${parent.GetName()}_${ADDON_NAME}_${buttonData.buttonName}`

  const button: TweakButtonControl = createOrGet(btnName, parent, CT_BUTTON)

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
    if (parent.tweakEffectivelyShownHooked !== true) {
      ZO_PostHookHandler(parent, "OnEffectivelyShown", () => {
        btn.SetHidden(!visible())
      })
      parent.tweakEffectivelyShownHooked = true
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
