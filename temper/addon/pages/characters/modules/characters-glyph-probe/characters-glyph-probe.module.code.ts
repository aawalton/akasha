import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

const CHEST = 215582
const PRISMATIC_DEFENSE_GLYPH = 68343
const SUBTYPES_TRIED = 400

export function captureGlyphProbe(): undefined {
  const rows: { subtype: number; enchant: string }[] = []
  for (let subtype = 1; subtype <= SUBTYPES_TRIED; subtype++) {
    const link = `|H1:item:${CHEST}:370:50:${PRISMATIC_DEFENSE_GLYPH}:${subtype}:50:0:0:0:0:0:0:0:0:1:34:1:1:0:0:0|h|h`
    const [, , enchant] = GetItemLinkEnchantInfo(link)
    if (enchant !== "") rows.push({ subtype, enchant })
  }
  getSavedVariables().glyphProbe = rows
}
