import type { SavedCharacterEntry } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function currentCharacterEntry(this: void): SavedCharacterEntry | undefined {
  return getSavedVariables().characters[GetCurrentCharacterId()]
}
