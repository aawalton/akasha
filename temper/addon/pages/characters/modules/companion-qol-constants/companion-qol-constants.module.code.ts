import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import type {
  AddonVars,
  CompanionInfo,
} from "akasha/temper/addon/pages/characters/modules/companion-qol-types/companion-qol-types.module.code.ts"
import "akasha/temper/addon/pages/characters/companions-declarations/companions-declarations.type-declaration.d.ts"

const ADDON_VARS: AddonVars = {
  addonSavedVarsVersion: "0.04",
  addonSavedVarsVersionPerToon: "0.01",
  addonSavedVarsForAllTable: "SettingsForAll",
  addonSavedVarsNormalTable: "Settings",
  addonName: "TemperCharactersCompanionQol",
  addonNameMenu: "Temper Companion",
  addonNameMenuDisplay: "Temper Companion",
  addonSavedVariablesName: "FCOCompanion_Settings",
  addonSavedVariablesNamePerToon: "FCOCompanion_Settings_PerToon",
}
COMPANION_QOL.addonVars = ADDON_VARS

COMPANION_QOL.LAM = TemperAddonMenu

const COMPANION_INFO: CompanionInfo = {}
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = GetCompanionCollectibleId(i)
  if (typeof companionCollectibleId === "number" && companionCollectibleId > 0) {
    COMPANION_INFO[i] = companionCollectibleId
  }
}
COMPANION_QOL.companionInfo = COMPANION_INFO

let IS_COMPANION_UNLOCKED = false
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = COMPANION_INFO[i]
  if (companionCollectibleId !== undefined && IsCollectibleUnlocked(companionCollectibleId)) {
    IS_COMPANION_UNLOCKED = true
    break
  }
}
COMPANION_QOL.isCompanionUnlocked = IS_COMPANION_UNLOCKED

if (!IS_COMPANION_UNLOCKED) {
  d(GetString(COMPANION_QOL_NO_COMPANION_UNLOCKED_YET))
}
