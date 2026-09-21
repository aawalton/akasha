import { currentCharacterEntry } from "akasha/temper/addon/characters-addon/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

export function collectBagSize(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  charEntry.bagSize = GetBagSize(BAG_BACKPACK)
}
