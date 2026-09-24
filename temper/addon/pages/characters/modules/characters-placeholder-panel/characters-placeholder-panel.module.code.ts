import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function createPlaceholderPanel(parentWindow: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parentWindow, CT_CONTROL)
  panel.SetAnchorFill()

  const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  label.SetAnchor(CENTER)
  label.SetFont("ZoFontGame")
  label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  label.SetText("Coming Soon")

  panel.SetHidden(true)

  return panel
}
