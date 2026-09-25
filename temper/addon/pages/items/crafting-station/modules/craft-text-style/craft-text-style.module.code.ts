import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  fontPathOf,
  styleText,
  type TextRole,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { styleTab } from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import { paintPanel } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const TIME_WIDTH = 88

const OPAQUE = 1

const OVERLAY_LEVEL: SurfaceLevel = 1

const FIT_PADDING = 8

const UNFITTED_WIDTH = 1000

function roleOf(this: void, control: Control): TextRole {
  const name = control.GetName()
  if (name.endsWith("Data")) return "heading"
  if (name.endsWith("Time") || name.endsWith("Slot")) return "number"
  return "body"
}

function styleButtonText(this: void, button: ButtonControl): undefined {
  const [red, green, blue] = TEXT_PRIMARY
  button.SetFont(fontPathOf(roleOf(button)))
  button.SetNormalFontColor(red, green, blue, OPAQUE)
  button.SetMouseOverFontColor(red, green, blue, OPAQUE)
  return undefined
}

export function styleCraftText(this: void, root: Control): undefined {
  for (let at = 1; at <= root.GetNumChildren(); at += 1) {
    const child = root.GetChild<Control>(at)
    if (child === undefined) continue
    const kind = child.GetType()
    if (kind === CT_LABEL) {
      styleText(child as LabelControl, roleOf(child))
      if (child.GetName().endsWith("Time")) child.SetWidth(TIME_WIDTH)
    }
    if (kind === CT_BUTTON) styleButtonText(child as ButtonControl)
    if (kind === CT_BACKDROP && root.GetType() === CT_TOPLEVELCONTROL) {
      if (child.GetName().endsWith("Panel")) paintSurface(child as BackdropControl, OVERLAY_LEVEL)
      else paintPanel(child as BackdropControl)
    }
    styleCraftText(child)
  }
  return undefined
}

export function styleCraftRows(this: void, root: Control): undefined {
  styleCraftText(root)
  for (let at = 1; at <= root.GetNumChildren(); at += 1) {
    const child = root.GetChild<Control>(at)
    if (child !== undefined && child.GetType() === CT_BUTTON) styleTab(child)
  }
  return undefined
}

export function fitButtonToText(this: void, button: ButtonControl): ButtonControl {
  button.SetWidth(UNFITTED_WIDTH)
  button.SetWidth((button.GetLabelControl()?.GetTextWidth() ?? 0) + FIT_PADDING)
  return button
}

export function styleCraftButton(this: void, button: ButtonControl): ButtonControl {
  styleButtonText(button)
  styleTab(button)
  return button
}
