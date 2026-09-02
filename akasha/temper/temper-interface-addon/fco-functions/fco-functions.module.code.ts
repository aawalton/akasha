import { STATE } from "../fco-state/fco-state.module.code.ts"
import { createOrGet } from "../fco-utils/fco-utils.module.code.ts"

const WM = WINDOW_MANAGER

interface FcoFnButtonControl extends ButtonControl {
  upTexture?: string
  downTexture?: string
  clickedTexture?: string
  tooltipText?: string
  tooltipAlign?: number
}

let LOOT_WINDOW_ON_SHOW_HOOK_DONE = false

export function snapCursor(this: void, snapType: string): undefined {
  if (snapType === "") {
    return
  }
  const settings = STATE.settingsVars.settings
  if (snapType === "lootwindow" || snapType === "-ALL-") {
    if (LOOT_WINDOW_ON_SHOW_HOOK_DONE === true) {
      return
    }

    LOOT_WINDOW.list.contents.SetHandler("OnEffectivelyShown", (): boolean | undefined => {
      if (settings.snapCursorToLootWindow !== true) {
        return false
      }
      const data = LOOT_WINDOW.list.data
      const firstRow = data !== undefined ? data[0] : undefined
      const firstRowControlButton = firstRow !== undefined ? firstRow.control : undefined
      if (firstRowControlButton !== undefined && firstRowControlButton.GetName !== undefined) {
        WM.SetMouseFocusByName(firstRowControlButton.GetName())
      }
      return undefined
    })
    LOOT_WINDOW_ON_SHOW_HOOK_DONE = true
  }
}

function addFnButton(
  this: void,
  parent: Control,
  name: string,
  callbackFunction: (this: void, ...args: unknown[]) => void,
  onMouseUpCallbackFunction: ((this: void, ...args: unknown[]) => void) | undefined,
  onMouseUpCallbackFunctionMouseButton: number | undefined,
  text: string | undefined,
  font: string | undefined,
  tooltipText: string | undefined,
  tooltipAlign: number | undefined,
  textureNormal: string | undefined,
  textureMouseOver: string | undefined,
  textureClicked: string | undefined,
  width: number,
  height: number,
  left: number,
  top: number,
  alignMain: number,
  alignBackup: number,
  alignControl: Control | undefined,
  hideButton: boolean
): Control | undefined {
  if ((width <= 0 || height <= 0) && (textureNormal === undefined || text === undefined)) {
    return undefined
  }
  const mouseUpButton = onMouseUpCallbackFunctionMouseButton ?? 1

  const button: FcoFnButtonControl = createOrGet(name, parent, CT_BUTTON)
  const btn = button

  btn.SetDimensions(width, height)
  btn.SetAnchor(alignMain, alignControl ?? parent, alignBackup, left, top)

  if (text !== undefined) {
    btn.SetFont(font ?? "ZoFontGameSmall")
    btn.SetText(text)
  } else {
    const texture = createOrGet(`${name}Texture`, btn, CT_TEXTURE)
    texture.SetAnchorFill()
    texture.SetTexture(textureNormal)
    btn.upTexture = textureNormal
    btn.downTexture = textureMouseOver ?? textureNormal
    btn.clickedTexture = textureClicked ?? textureNormal
  }

  const align = tooltipAlign ?? TOP
  if (tooltipText !== undefined) {
    btn.tooltipText = tooltipText
    btn.tooltipAlign = align
    btn.SetHandler("OnMouseEnter", () => {
      btn.GetChild<TextureControl>(1)?.SetTexture(btn.downTexture)
      ZO_Tooltips_ShowTextTooltip(btn, btn.tooltipAlign ?? TOP, btn.tooltipText)
    })
    btn.SetHandler("OnMouseExit", () => {
      btn.GetChild<TextureControl>(1)?.SetTexture(btn.upTexture)
      ZO_Tooltips_HideTextTooltip()
    })
  } else {
    btn.SetHandler("OnMouseEnter", () => {
      btn.GetChild<TextureControl>(1)?.SetTexture(btn.downTexture)
    })
    btn.SetHandler("OnMouseExit", () => {
      btn.GetChild<TextureControl>(1)?.SetTexture(btn.upTexture)
    })
  }

  btn.SetHandler("OnClicked", (clickedControl, mouseButton, upInside) => {
    callbackFunction(clickedControl, mouseButton, upInside)
  })
  if (onMouseUpCallbackFunction !== undefined) {
    btn.SetHandler("OnMouseUp", (clickedControl, mouseButton, upInside) => {
      if (upInside === true && mouseButton === mouseUpButton) {
        onMouseUpCallbackFunction(clickedControl, mouseButton, upInside)
      }
    })
  }
  btn.SetHandler("OnMouseDown", () => {
    btn.GetChild<TextureControl>(1)?.SetTexture(btn.clickedTexture)
  })

  btn.SetHidden(hideButton)
  btn.SetMouseEnabled(!hideButton)
  return btn
}

export function createButton(
  this: void,
  parent: Control,
  name: string,
  callbackFunction: (this: void, ...args: unknown[]) => void,
  onMouseUpCallbackFunction: ((this: void, ...args: unknown[]) => void) | undefined,
  onMouseUpCallbackFunctionMouseButton: number | undefined,
  text: string | undefined,
  font: string | undefined,
  tooltipText: string | undefined,
  tooltipAlign: number | undefined,
  textureNormal: string | undefined,
  textureMouseOver: string | undefined,
  textureClicked: string | undefined,
  width: number,
  height: number,
  left: number,
  top: number,
  alignMain: number,
  alignBackup: number,
  alignControl: Control | undefined,
  hideButton: boolean
): Control | undefined {
  return addFnButton(
    parent,
    name,
    callbackFunction,
    onMouseUpCallbackFunction,
    onMouseUpCallbackFunctionMouseButton,
    text,
    font,
    tooltipText,
    tooltipAlign,
    textureNormal,
    textureMouseOver,
    textureClicked,
    width,
    height,
    left,
    top,
    alignMain,
    alignBackup,
    alignControl,
    hideButton
  )
}
