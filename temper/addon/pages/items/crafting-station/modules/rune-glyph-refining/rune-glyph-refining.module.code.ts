import type { RgbColor } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import type { RefineButton } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-refining/craft-rune-refining.module.code.ts"
import * as runeRefining from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-refining/craft-rune-refining.module.code.ts"
import * as Tooltips from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltips/craft-tooltips.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
} from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function asRefineButton(c: ButtonControl): RefineButton {
  return c as RefineButton
}

export function runeShowRefine(): undefined {
  const tt = STATE.Loc.TT
  let useCSRune: boolean = STATE.Account.options.userune
  if (STATE.Account.options.userune && STATE.Account.options.useruneextraction) {
    TemperItemsCrafting_RuneInfo.SetText(GetString(SI_ENCHANTING_EXTRACTION))
    TemperItemsCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(false)
    TemperItemsCrafting_RuneRefineAllButton.SetHidden(false)
    const numChildren = TemperItemsCrafting_RuneGlyphSectionScrollChildRefine.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      TemperItemsCrafting_RuneGlyphSectionScrollChildRefine.GetChild(x)?.SetHidden(true)
    }
    let count = 0
    let crafted: string
    for (const [x, glyph] of ipairs(runeRefining.runeGetGylphs())) {
      let c = WINDOW_MANAGER.GetControlByName<RefineButton>(`TemperItemsCrafting_GlyphControl${x}`)
      if (c === undefined) {
        c = asRefineButton(
          WINDOW_MANAGER.CreateControl(
            `TemperItemsCrafting_GlyphControl${x}`,
            TemperItemsCrafting_RuneGlyphSectionScrollChildRefine,
            CT_BUTTON
          )
        )
        c.SetAnchor(
          TOPLEFT,
          TemperItemsCrafting_RuneGlyphSectionScrollChild,
          TOPLEFT,
          8,
          5 + (x - 1) * 30
        )
        c.SetDimensions(508, 30)
        c.SetFont("ZoFontGame")
        c.SetClickSound("Click")
        c.SetMouseOverFontColor(1, 0.66, 0.2, 1)
        c.EnableMouseButton(2, true)
        c.SetHorizontalAlignment(0)
        c.SetVerticalAlignment(1)
        c.SetHandler("OnMouseEnter", (ctrl: RefineButton) => {
          Tooltips.tooltip(ctrl, true, false, TemperItemsCrafting_Rune, "tl")
        })
        c.SetHandler("OnMouseExit", (ctrl: RefineButton) => {
          Tooltips.tooltip(ctrl, false)
        })
        c.SetHandler("OnMouseDown", (ctrl: RefineButton, button: number) => {
          runeRefining.runeRefine(ctrl, button)
        })
      }
      if (glyph.crafted) {
        crafted = "|t22:22:esoui/art/treeicons/achievements_indexicon_crafting_up.dds|t "
      } else {
        crafted = ""
      }
      c.SetHidden(false)
      c.SetText(
        `${crafted}|t24:24:${glyph.icon}|t ${glyph.name} |c666666(${glyph.location.length})|r`
      )
      const color: RgbColor = STATE.Quality[glyph.quality] ?? { 1: 0, 2: 0, 3: 0 }
      c.SetNormalFontColor(color[1], color[2], color[3], 1)
      c.data = {
        link: glyph.link,
        location: glyph.location,
        buttons: [tt[7], tt[27]],
      }
      count = count + 1
    }
    TemperItemsCrafting_RuneGlyphSectionScrollChild.SetHeight(count * 30 + 20)
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar as Control, ENCHANTING_MODE_EXTRACTION)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(false)
    ZO_EnchantingTopLevelInventory.SetHidden(false)
    ZO_EnchantingTopLevelModeMenu.SetHidden(false)
  }

  runeHideVanillaUI(useCSRune)
  runeInitialize(useCSRune)
}
