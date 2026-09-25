import { closeBlueprintWindow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { closeRecipeWindow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import { closeStyle } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-style-tracking/craft-style-tracking.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const STYLE_TITLE = "Styles"

const RECIPE_TITLE = "Recipes"

const BLUEPRINT_TITLE = "Blueprints"

function frameCraftWindow(
  this: void,
  window: TopLevelWindow,
  content: Control,
  titled: string,
  onClose: (this: void) => undefined
): undefined {
  const { body } = frameWindow(window, titled, onClose)
  content.ClearAnchors()
  content.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  window.SetDimensions(
    content.GetWidth() + FRAME_PADDING * 2,
    content.GetHeight() + FRAME_TOP + FRAME_PADDING
  )
  return undefined
}

export function frameCraftWindows(this: void): undefined {
  frameCraftWindow(TemperItemsCrafting_Style_Window, TemperItemsCrafting_Style, STYLE_TITLE, () =>
    closeStyle()
  )
  frameCraftWindow(
    TemperItemsCrafting_Recipe_Window,
    TemperItemsCrafting_Recipe,
    RECIPE_TITLE,
    () => closeRecipeWindow()
  )
  frameCraftWindow(
    TemperItemsCrafting_Blueprint_Window,
    TemperItemsCrafting_Blueprint,
    BLUEPRINT_TITLE,
    () => closeBlueprintWindow()
  )
  return undefined
}
