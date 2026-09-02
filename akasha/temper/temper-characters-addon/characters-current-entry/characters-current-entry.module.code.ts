import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"

export function currentCharacterEntry(this: void): SavedCharacterEntry | undefined {
  return getSavedVariables().characters[GetCurrentCharacterId()]
}
