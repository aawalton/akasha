import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

const CHEST = 215582
const AMULET = 194512
const WEAPON = 166196
const ITEM_IDS_SCANNED = 240000
const SUBTYPES_TRIED = 400

function hostFor(itemType: number): number | undefined {
  if (itemType === ITEMTYPE_GLYPH_ARMOR) return CHEST
  if (itemType === ITEMTYPE_GLYPH_JEWELRY) return AMULET
  if (itemType === ITEMTYPE_GLYPH_WEAPON) return WEAPON
  return undefined
}

export function captureGlyphProbe(): undefined {
  const rows: { glyph: number; subtype: number; enchant: string }[] = []
  for (let glyph = 1; glyph <= ITEM_IDS_SCANNED; glyph++) {
    const [itemType] = GetItemLinkItemType(
      `|H1:item:${glyph}:0:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h`
    )
    const host = hostFor(itemType)
    if (host === undefined) continue
    for (let subtype = 1; subtype <= SUBTYPES_TRIED; subtype++) {
      const link = `|H1:item:${host}:370:50:${glyph}:${subtype}:50:0:0:0:0:0:0:0:0:1:34:1:1:0:0:0|h|h`
      const [, , enchant] = GetItemLinkEnchantInfo(link)
      if (enchant !== "") rows.push({ glyph, subtype, enchant })
    }
  }
  getSavedVariables().glyphProbe = rows
}
