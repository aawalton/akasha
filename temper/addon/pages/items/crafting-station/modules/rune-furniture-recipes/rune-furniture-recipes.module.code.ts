import type { CsCookButton } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-cooking/craft-cooking.module.code.ts"
import * as RecipeCooking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-cooking/craft-cooking.module.code.ts"
import * as RuneCrafting from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
} from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-provisioner-station/eso-provisioner-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function asCsCookButton(c: Control): CsCookButton {
  return c as CsCookButton
}

export function runeShowFurniture(): undefined {
  const tt = STATE.Loc.TT
  let useCSRune: boolean = STATE.Account.options.userune
  if (STATE.Account.options.userune && STATE.Account.options.userunerecipe) {
    TemperItemsCrafting_RuneInfo.SetText(tt[23])
    let inc = 1
    let count = 0
    const numLists = GetNumRecipeLists()
    for (let cat = 17; cat <= numLists; cat++) {
      const [, num, , , , , sound] = GetRecipeListInfo(cat)
      for (let id = num; id >= 1; id--) {
        const [, , , , , , crafttype] = GetRecipeInfo(cat, id)
        if (crafttype === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS) {
          const control = RuneCrafting.getRuneChild(inc)
          inc = RecipeCooking.cookShowRecipe(
            asCsCookButton(control as Control),
            cat,
            id,
            inc,
            sound,
            true
          )
          count = count + 1
        }
      }
    }
    TemperItemsCrafting_RuneGlyphSectionScrollChild.SetHeight(inc * 30 + 20)
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar as Control, ENCHANTING_MODE_RECIPES)
    ZO_ProvisionerTopLevel.SetHidden(false)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(true)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(true)
    ZO_EnchantingTopLevelInventoryTabs.SetHidden(true)
    ZO_EnchantingTopLevelInventory.SetHidden(true)
  }
  runeHideVanillaUI(useCSRune)
  runeInitialize(useCSRune)
}
