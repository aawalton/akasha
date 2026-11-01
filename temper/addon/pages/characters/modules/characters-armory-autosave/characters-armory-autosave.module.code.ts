import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import { liveTargetOf } from "akasha/temper/addon/pages/characters/modules/characters-armory-live/characters-armory-live.module.code.ts"
import {
  type ArmoryBuild,
  recordEdit,
} from "akasha/temper/addon/pages/characters/modules/characters-armory-pending/characters-armory-pending.module.code.ts"
import {
  currentCharacterBuild,
  savedPartsHeld,
} from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import { captureCharacterBuildHash } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-build/character-capture-build.module.code.ts"

const CHECK_NAME = "TemperCharactersArmoryAutosave"

const CHECK_MS = 2000

let armedFor: string | undefined

let driftedFor: string | undefined

function held(build: ArmoryBuild): boolean {
  const cursed = GetPlayerCurseType() !== CURSE_TYPE_NONE
  return (build.target.curseName !== "") === cursed && savedPartsHeld(build.target)
}

function autosave(build: ArmoryBuild): undefined {
  const buildHash = captureCharacterBuildHash().buildHash
  recordEdit(build, { buildHash, view: liveTargetOf(build.target) })
  const saved = currentCharacterBuild()
  if (saved === undefined || !held(saved)) armedFor = undefined
  d(`[Temper Armory] Saved ${build.title}.`)
  return undefined
}

function check(this: void): undefined {
  if (IsUnitInCombat("player") || IsUnitDead("player")) return undefined
  const build = currentCharacterBuild()
  if (build === undefined) return undefined
  if (held(build)) {
    armedFor = build.key
    driftedFor = undefined
    return undefined
  }
  if (armedFor !== build.key) return undefined
  if (driftedFor !== build.key) {
    driftedFor = build.key
    return undefined
  }
  driftedFor = undefined
  return autosave(build)
}

export function startArmoryAutosave(): undefined {
  EVENT_MANAGER.RegisterForUpdate(CHECK_NAME, CHECK_MS, check)
  return undefined
}
