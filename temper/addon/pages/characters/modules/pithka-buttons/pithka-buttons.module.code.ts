import type { TextureBundle } from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  newButton,
  tooltipCloseFn,
  tooltipOpenFn,
} from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import {
  type CallbackKey,
  getValue,
  registerCallback,
  setValue,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-5/eso-interface-extra-5.type-declaration.d.ts"

const BSTATE_NORMAL = 1

export type ButtonSettings = {
  readonly textureBundle: TextureBundle
  readonly parent?: Control
  readonly size?: number
  readonly tooltipText?: string
}

function basicButton(this: void, settings: ButtonSettings): ButtonControl {
  const size = settings.size ?? 30
  const control = newButton()
  control.SetDimensions(size, size)
  control.SetState(BSTATE_NORMAL)
  control.SetMouseOverBlendMode(0)
  control.SetHidden(false)
  control.SetEnabled(true)
  control.SetParent(settings.parent ?? TemperCharactersPithka_GUI)
  control.SetPressedTexture(settings.textureBundle.pressed)
  control.SetMouseOverTexture(settings.textureBundle.over)
  control.SetDisabledTexture(settings.textureBundle.disabled)
  if (settings.tooltipText !== undefined) {
    control.SetMouseEnabled(true)
    control.SetHandler("OnMouseEnter", tooltipOpenFn(settings.tooltipText, BOTTOM))
    control.SetHandler("OnMouseExit", tooltipCloseFn())
  }
  return control
}

function showOn(this: void, control: ButtonControl, bundle: TextureBundle, on: boolean): undefined {
  control.SetNormalTexture(on ? bundle.down : bundle.up)
  control.SetAlpha(on ? 1 : 0.5)
}

export type ToggleSettings = ButtonSettings & { readonly stateKey: CallbackKey }

export function toggleButton(this: void, settings: ToggleSettings): ButtonControl {
  const control = basicButton(settings)
  const key = settings.stateKey
  if (getValue(key) === undefined) setValue(key, true)
  const update = (): undefined => {
    showOn(control, settings.textureBundle, getValue(key) === true)
  }
  update()
  registerCallback(update)
  control.SetHandler("OnClicked", () => {
    setValue(key, !(getValue(key) === true))
    update()
  })
  return control
}

export type EnumToggleSettings = ButtonSettings & {
  readonly savedVarKey: "currentTray"
  readonly enumValue: string
}

export function enumToggleButton(this: void, settings: EnumToggleSettings): ButtonControl {
  const control = basicButton(settings)
  const update = (): undefined => {
    showOn(control, settings.textureBundle, getValue(settings.savedVarKey) === settings.enumValue)
  }
  update()
  registerCallback(update)
  control.SetHandler("OnClicked", () => {
    const on = getValue(settings.savedVarKey) === settings.enumValue
    setValue(settings.savedVarKey, on ? "NONE" : settings.enumValue)
    update()
  })
  return control
}
