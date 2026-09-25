import { blueprintShowCategory } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { drawCharacters } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-character-panel/craft-character-panel.module.code.ts"
import { recipeShowCategory } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import { runeSetValue } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { controlShow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-ui-updates/craft-ui-updates.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { runeShowMode } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-mode/rune-mode.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type CoordKey = "style" | "recipe" | "blueprint" | "rune" | "cook" | "overview"
type AnchorKey = "button" | "questbox" | "position"

export function saveCoords(control: Control, which: CoordKey): undefined {
  STATE.Account.coords[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function saveAnchor(control: Control, which: AnchorKey): undefined {
  STATE.Account[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function runeMode(key: number): undefined {
  runeSetValue(key)
  runeShowMode()
}

export function runeAspect(tier: number): undefined {
  runeSetValue(2, tier)
  runeShowMode()
}

export function runeCraftGlyph(itemType: number): undefined {
  runeSetValue(1, itemType)
  runeSetValue(6)
  runeShowMode()
}

export function openRecipeWindow(): undefined {
  controlShow(TemperItemsCrafting_Recipe_Window)
  recipeShowCategory(STATE.Character.recipe)
}

export function openBlueprintWindow(): undefined {
  controlShow(TemperItemsCrafting_Blueprint_Window)
  blueprintShowCategory(STATE.Character.furniture)
}

export function openCharacterPanel(): undefined {
  drawCharacters()
  controlShow(TemperItemsCrafting_CharacterPanel)
}

export function setTitleText(control: LabelControl): undefined {
  control.SetText(`|cFFAA33${STATE.Title}|r ${STATE.Version}`)
}

export function openSettings(): undefined {
  TemperAddonMenu.OpenToPanel(STATE.settingsPanel)
}
