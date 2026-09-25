import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { captureCharacterBuildHash } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-build/character-capture-build.module.code.ts"
import { buildHash as asBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function captureAndSaveCharacterStats(): undefined {
  const captured = captureCharacterBuildHash()
  const buildHash = asBuildHash(captured.buildHash)
  const curseState = captured.curseState
  const name = zo_strformat("<<1>>", GetRawUnitName("player"))

  const charEntry = currentCharacterEntry()
  if (charEntry !== undefined) {
    charEntry.name = name
    charEntry.buildHash = buildHash
    charEntry.curseState = curseState
  } else {
    getSavedVariables().characters[GetCurrentCharacterId()] = { name, buildHash, curseState }
  }

  CALLBACK_MANAGER.FireCallbacks("Temper_CharacterBuildCaptured", buildHash)
}
