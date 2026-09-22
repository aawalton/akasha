import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import {
  asCompanionQolSettings,
  asNumber,
} from "akasha/temper/addon/pages/characters/modules/companion-qol-casts/companion-qol-casts.module.code.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import type {
  CompanionQolDefaultSettings,
  CompanionQolSettings,
} from "akasha/temper/addon/pages/characters/modules/companion-qol-types/companion-qol-types.module.code.ts"

COMPANION_QOL.getSettings = function (this: void): undefined {
  const addonVars = COMPANION_QOL.addonVars
  const serverName = GetWorldName()
  const svName = addonVars.addonSavedVariablesName
  const svPerToonName = addonVars.addonSavedVariablesNamePerToon
  const svVersion = addonVars.addonSavedVarsVersion
  const svVersionPerToon = addonVars.addonSavedVarsVersionPerToon
  const svForAllTable = addonVars.addonSavedVarsForAllTable
  const svNormalTable = addonVars.addonSavedVarsNormalTable

  const defaultsSettings: CompanionQolDefaultSettings = {
    language: 1,
    saveMode: 2,
  }

  const defaults: CompanionQolSettings = {
    alwaysUseClientLanguage: true,

    companionIsSummoned: false,
    lastCompanionId: 1,
    unSummonAtCraftingTables: true,
    reSummonAfterCraftingTables: true,
    unSummonAtBanks: false,
    reSummonAfterBanks: false,
    unSummonAtVendors: false,
    reSummonAfterVendors: false,
    unSummonAtFishing: false,
    reSummonAfterFishing: false,
    reSummonAfterFishingDelay: 5000,
    disableCompanionAtCompass: false,
    unSummonAtCrouching: false,
    unSummonAtCrouchingNoCombat: false,
    reSummonAfterCrouching: false,
    reSummonAfterCrouchingDelay: 5000,
  }
  COMPANION_QOL.settingsVars.defaults = defaults

  const defaultsPerToon: CompanionQolSettings = asCompanionQolSettings({})
  COMPANION_QOL.settingsVars.defaultsPerToon = defaultsPerToon

  COMPANION_QOL.settingsVars.defaultSettings = ZO_SavedVars.NewAccountWide(
    svName,
    999,
    svForAllTable,
    defaultsSettings,
    serverName
  )

  if (COMPANION_QOL.settingsVars.defaultSettings.saveMode === 1) {
    COMPANION_QOL.settingsVars.settings = ZO_SavedVars.NewCharacterIdSettings(
      svName,
      asNumber(svVersion),
      svNormalTable,
      defaults,
      serverName
    )
  } else {
    COMPANION_QOL.settingsVars.settings = ZO_SavedVars.NewAccountWide(
      svName,
      asNumber(svVersion),
      svNormalTable,
      defaults,
      serverName
    )
  }
  COMPANION_QOL.settingsVars.settingsPerToon = ZO_SavedVars.NewCharacterIdSettings(
    svPerToonName,
    asNumber(svVersionPerToon),
    svNormalTable,
    defaultsPerToon,
    serverName
  )
  return undefined
}
