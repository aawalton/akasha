import * as RecipeCooking from "akasha/temper/addon/pages/items/crafting-station/modules/craft-cooking/craft-cooking.module.code.ts"
import type { RuneGlyphDef } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune/craft-rune.module.code.ts"
import * as RuneCrafting from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { asCsCookButton } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-furniture-recipes/rune-furniture-recipes.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function runeSearch(): undefined {
  const search = TemperItemsCrafting_RuneSearch.GetText()
  let countRune = 0
  let countFurniture = 0
  let inc = 1
  if (search === "") {
    return
  }

  const numLists = GetNumRecipeLists()
  for (let cat = 17; cat <= numLists; cat++) {
    const [, num, , , , , sound] = GetRecipeListInfo(cat)
    for (let id = num; id >= 1; id--) {
      const [known, name, , , , , crafttype] = GetRecipeInfo(cat, id)
      if (crafttype === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS) {
        const [foundPos] = string.find(string.lower(name), string.lower(search))
        if (foundPos !== undefined && known) {
          const control = RuneCrafting.getRuneChild(inc)
          inc = RecipeCooking.cookShowRecipe(asCsCookButton(control), cat, id, inc, sound, true)
          countFurniture = countFurniture + 1
        }
      }
    }
  }
  for (const [, enchant] of pairs(STATE.Rune.glyph)) {
    for (const [, glyph] of ipairs<RuneGlyphDef>(enchant)) {
      const basename = zo_strformat(
        "<<C:1>>",
        GetItemLinkName(
          string.format("|H1:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", glyph[1])
        )
      )
      const [foundPos] = string.find(string.lower(basename), string.lower(search))
      if (foundPos !== undefined) {
        RuneCrafting.runeShow(
          inc + countRune,
          glyph[1],
          STATE.Character.aspect,
          STATE.Character.potency,
          glyph[2],
          glyph[3]
        )
        countRune = countRune + 1
      }
    }
  }
  TemperItemsCrafting_RuneGlyphSectionScrollChild.SetHeight(
    countRune * 24 + countFurniture * 30 + 20
  )
  TemperItemsCrafting_RuneInfo.SetText(`${STATE.Loc.searchfor} ${search}`)
}
