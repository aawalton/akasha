import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function createPlaceholderPanel(parentWindow: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parentWindow, CT_CONTROL)
  panel.SetAnchorFill()

  const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  label.SetAnchor(CENTER)
  styleText(label, "muted")
  label.SetText("Coming Soon")

  panel.SetHidden(true)

  return panel
}
