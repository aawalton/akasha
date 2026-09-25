import { buildDataState } from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const NOT_BUILT = "Nothing is shown here yet."

const WINDOW_LEVEL = 1

export function createPlaceholderPanel(parentWindow: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parentWindow, CT_CONTROL)
  panel.SetAnchorFill()
  buildDataState(panel, { empty: NOT_BUILT, level: WINDOW_LEVEL }).show("empty")
  panel.SetHidden(true)
  return panel
}
