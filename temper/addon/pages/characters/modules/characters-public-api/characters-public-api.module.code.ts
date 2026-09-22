import { toggleWindow } from "akasha/temper/addon/pages/characters/modules/characters-window/characters-window.module.code.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

function toggleCompanion(this: void, companionId?: number): undefined {
  if (!COMPANION_QOL.isCompanionUnlocked) return
  COMPANION_QOL.ToggleCompanion(companionId, undefined)
}

const PUBLISHED = {
  getSavedVariables,
  ToggleWindow: toggleWindow,
  ToggleCompanion: toggleCompanion,
}

interface CharactersGlobalTable {
  TemperCharacters: typeof PUBLISHED
}

function asGlobalTable(this: void, value: unknown): CharactersGlobalTable {
  return value as CharactersGlobalTable
}

asGlobalTable(globalThis).TemperCharacters = PUBLISHED
