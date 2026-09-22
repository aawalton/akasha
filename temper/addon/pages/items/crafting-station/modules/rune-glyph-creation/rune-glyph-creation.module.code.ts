import type { RuneGlyphDef } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune/craft-rune.module.code.ts"
import * as RuneCrafting from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
} from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type RuneGlyphList = RuneGlyphDef[]
function asRuneGlyphList(t: Record<number, RuneGlyphDef>): RuneGlyphList {
  return t as RuneGlyphList
}

export function runeShowCategory(): undefined {
  let useCSRune: boolean = STATE.Account.options.userune
  if ((STATE.Account.options.userune && STATE.Account.options.userunecreation) || STATE.Extern) {
    let count = 1
    TemperItemsCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_CREATION))
    const tsort = (a: RuneGlyphDef, b: RuneGlyphDef) => a[4] < b[4]
    const glyphList = asRuneGlyphList(STATE.Rune.glyph[STATE.Character.enchant] ?? {})
    table.sort(glyphList, tsort)
    for (const [, glyph] of ipairs(glyphList)) {
      RuneCrafting.runeShow(
        count,
        glyph[1],
        STATE.Character.aspect,
        STATE.Character.potency,
        glyph[2],
        glyph[3]
      )
      count = count + 1
    }
    TemperItemsCrafting_RuneGlyphSectionScrollChild.SetHeight(glyphList.length * 30 + 20)
    if (STATE.Extern) {
      STATE.Character.enchant = ITEMTYPE_GLYPH_ARMOR
    }
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar as Control, ENCHANTING_MODE_CREATION)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }
  if (!STATE.Extern) {
    runeHideVanillaUI(useCSRune)
  }
  runeInitialize(useCSRune)
}
