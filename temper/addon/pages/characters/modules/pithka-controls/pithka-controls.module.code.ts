import { paintSurface } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import { frameWindow } from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

let uidCurrent = 10000

function uid(this: void): number {
  uidCurrent = uidCurrent + 1
  return uidCurrent
}

export function setWindowDimensions(this: void, width: number, height: number): undefined {
  TemperCharactersPithka_GUI.SetDimensions(width, height)
}

const TRACKER_TITLE = "Pithka Achievement Tracker"

const SIDE_PANELS: readonly string[] = ["NavPanel", "QRContainer"]

export function setWindowTitle(this: void, title: string): undefined {
  TemperCharactersPithka_GUI.GetNamedChild<LabelControl>("FrameTitle")?.SetText(
    `${TRACKER_TITLE} — ${title}`
  )
}

export function toggleTracker(this: void): undefined {
  SCENE_MANAGER.ToggleTopLevel(TemperCharactersPithka_GUI)
}

export function frameTracker(this: void): undefined {
  frameWindow(TemperCharactersPithka_GUI, TRACKER_TITLE, toggleTracker)
  for (const name of SIDE_PANELS) {
    const backdrop =
      TemperCharactersPithka_GUI.GetNamedChild(name)?.GetNamedChild<BackdropControl>("BG")
    if (backdrop !== undefined) paintSurface(backdrop, 1)
  }
}

export function newLabel(this: void): LabelControl {
  const control = WINDOW_MANAGER.CreateControl(
    `$(parent)${uid()}`,
    TemperCharactersPithka_GUI,
    CT_LABEL
  )
  control.SetDrawTier(DT_HIGH)
  return control
}

export function newIcon(this: void): TextureControl {
  const control = WINDOW_MANAGER.CreateControl(
    `$(parent)_Icon${uid()}`,
    TemperCharactersPithka_GUI,
    CT_TEXTURE
  )
  control.SetDrawTier(DT_HIGH)
  return control
}

export function newButton(this: void): ButtonControl {
  const control = WINDOW_MANAGER.CreateControl(
    `$(parent)_Icon${uid()}`,
    TemperCharactersPithka_GUI,
    CT_BUTTON
  )
  control.SetDrawTier(DT_HIGH)
  return control
}

export function newTexture(this: void): TextureControl {
  const control = WINDOW_MANAGER.CreateControl(
    `$(parent)_Texture${uid()}`,
    TemperCharactersPithka_GUI,
    CT_TEXTURE
  )
  control.SetDrawTier(DT_LOW)
  return control
}

export function tooltipOpenFn(
  this: void,
  text: string,
  anchor: number
): (this: void, control: Control) => undefined {
  return (control) => {
    ZO_Tooltips_ShowTextTooltip(control, anchor, text)
  }
}

export function tooltipCloseFn(this: void): (this: void) => undefined {
  return () => {
    ClearTooltip(InformationTooltip)
    ClearTooltip(ItemTooltip)
    ZO_Tooltips_HideTextTooltip()
  }
}
