import type { CsCookButton } from "../craft-cooking/craft-cooking.module.code.ts"
import * as RecipeCooking from "../craft-cooking/craft-cooking.module.code.ts"
import * as RuneCrafting from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeHideVanillaUI, runeInitialize } from "../rune-panel/rune-panel.module.code.ts"

export function asCsCookButton(c: Control): CsCookButton {
  return c as CsCookButton
}

export function runeShowFurniture(): undefined {
  const tt = STATE.Loc.TT
  let useCSRune: boolean = STATE.Account.options.userune
  if (STATE.Account.options.userune && STATE.Account.options.userunerecipe) {
    TemperCrafting_RuneInfo.SetText(tt[23])
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
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(inc * 30 + 20)
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
