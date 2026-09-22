import * as RuneSelection from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-selection/craft-rune-selection.module.code.ts"
import { hideControl } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  runeShowFavorites,
  runeShowFurnitureFavorites,
} from "akasha/temper/addon/pages/items/crafting-station/modules/rune-favorites/rune-favorites.module.code.ts"
import { runeShowFurniture } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-furniture-recipes/rune-furniture-recipes.module.code.ts"
import { runeShowCategory } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-glyph-creation/rune-glyph-creation.module.code.ts"
import { runeShowRefine } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-glyph-refining/rune-glyph-refining.module.code.ts"
import { runeSearch } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-search/rune-search.module.code.ts"
import { runeShowWrit } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-writs/rune-writs.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function runeShowMode(atStationOnly?: boolean): undefined {
  if (atStationOnly === undefined) {
    atStationOnly = false
  }
  if ((atStationOnly && !STATE.Extern) || !atStationOnly) {
    TemperItemsCrafting_RuneGlyphDivider.SetHidden(true)
    TemperItemsCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(true)
    TemperItemsCrafting_RuneGlyphSectionScrollChildSelection.SetHidden(true)
    TemperItemsCrafting_RuneRefineAllButton.SetHidden(true)
    const numChildren = TemperItemsCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperItemsCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
    if (STATE.Character.runemode === "craft") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_CREATION
      runeShowCategory()
    } else if (STATE.Character.runemode === "search") {
      runeSearch()
    } else if (STATE.Character.runemode === "refine") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_EXTRACTION
      runeShowRefine()
    } else if (STATE.Character.runemode === "selection") {
      RuneSelection.runeShowSelection()
    } else if (STATE.Character.runemode === "favorites") {
      runeShowFavorites()
    } else if (STATE.Character.runemode === "furniturefavorites") {
      runeShowFurnitureFavorites()
    } else if (STATE.Character.runemode === "writ") {
      runeShowWrit()
    } else if (STATE.Character.runemode === "furniture") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_RECIPES
      runeShowFurniture()
    }
  }
}
