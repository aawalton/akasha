import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { COMPANION_QOL } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function registerUiStrings(this: void): undefined {
  const companionStr = GetString(SI_UNIT_FRAME_NAME_COMPANION)
  const companionKeybindBaseStr = `Show/hide ${companionStr}`

  const stringsEN: Record<string, string> = {
    SI_TEMPER_COMPANION_NO_COMPANION_UNLOCKED_YET: `[Temper] You did not unlock any ${GetString(
      SI_UNIT_FRAME_NAME_COMPANION
    )} yet. Please finish and turn in any of the unlock quests first and reload the UI afterwards!`,
    SI_TEMPER_COMPANION_TOGGLE_COMPANION: `${companionKeybindBaseStr} (last)`,

    SI_TEMPER_COMPANION_LAM_SV_MODE: "Settings save mode",
    SI_TEMPER_COMPANION_LAM_SV_MODE_TT:
      "Use account wide settings (the same for all your characters) or save them individually for each character?",
    SI_TEMPER_COMPANION_LAM_SV_EACH_CHARACTER: "Each character",
    SI_TEMPER_COMPANION_LAM_SV_ACCOUNT_WIDE: "Account wide",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_CRAFTING: GetString(SI_SKILLTYPE8),
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE: "Dismiss at crafting table",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE_TT:
      "Hide your active companion if you interact with a crafting table",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE: "Re-summon after crafting table",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE_TT:
      "Summon your last active companion again after leaving the crafting table",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_BANKS: GetString(SI_CURRENCYLOCATION1),
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_BANK: "Dismiss at bank",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_BANK_TT:
      "Hide your active companion if you interact with a bank",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_BANK: "Re-summon after bank",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_BANK_TT:
      "Summon your last active companion again after leaving the bank",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_VENDORS: GetString(SI_MAPDISPLAYFILTER2),
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_VENDOR: "Dismiss at vendor/fence",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_VENDOR_TT:
      "Hide your active companion if you interact with a vendor/fence",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_VENDOR: "Re-summon after vendor/fence",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_VENDOR_TT:
      "Summon your last active companion again after leaving the vendor/fence",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_FISHING: GetString(SI_GUILDACTIVITYATTRIBUTEVALUE9),
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_FISHING: "Dismiss at Fish hole",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_FISHING_TT:
      "Hide your active companion if you interact with a fish hole",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_FISHING: "Re-summon after fishing",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_FISHING_TT:
      "Summon your last active companion again after leaving the fish hole.\n'Leaving the fish hole' means at the end of a fishing attempt, after the delay of milliseconds you setup below. If a new fishing attempt is started before the delay was met, the re-summon will be aborted.",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY: "Re-summon delay after fishing",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY_TT:
      "Delay the re-summoning after ending the fishing hole interaction with this milliseconds value (1000 = 1 second)",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_CROUCH: GetString(SI_BINDING_NAME_SPECIAL_MOVE_CROUCH),
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CROUCHING: "Dismiss at crouching",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CROUCHING_TT:
      "Hide your active companion if you start to crouch",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT: "Not in combat",
    SI_TEMPER_COMPANION_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT_TT:
      "Only hide the companion if you are not in combat, as you start to crouch",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CROUCHING: "Re-summon after crouching",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CROUCHING_TT:
      "Summon your last active companion again after leaving the crouched state.\n'Leaving the crouched state' means as you get unhidden or stop to crouch the delay of milliseconds you setup below will be waited until the re-summon takes place. If you start to crouch again before the delay was met, the re-summon will be aborted.",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY:
      "Re-summon delay after crouching",
    SI_TEMPER_COMPANION_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY_TT:
      "Delay the re-summoning after end of crouching with this milliseconds value (1000 = 1 second)",

    SI_TEMPER_COMPANION_LAM_SETTING_HEADER_COMPASS: GetString(
      SI_CUSTOMERSERVICESUBMITFEEDBACKSUBCATEGORIES1304
    ),
    SI_TEMPER_COMPANION_LAM_SETTING_DISABLE_PIN_AT_COMPASS: "Disable pin at compass",
    SI_TEMPER_COMPANION_LAM_SETTING_DISABLE_PIN_AT_COMPASS_TT:
      "Disable the companion's pin at the compass",
  }

  const companionInfo = COMPANION_QOL.companionInfo
  for (let companionDefId = 1; companionDefId <= 30; companionDefId += 1) {
    const companionCollectibleId = companionInfo[companionDefId]
    if (companionCollectibleId !== undefined) {
      const companionName = GetCollectibleName(companionCollectibleId)
      const companionNameClean = ZO_CachedStrFormat(SI_UNIT_NAME, companionName)
      stringsEN[`SI_TEMPER_COMPANION_TOGGLE_COMPANION_${tostring(companionDefId)}`] =
        `${companionKeybindBaseStr}: '${companionNameClean}'`
    }
  }

  for (const stringId in stringsEN) {
    const stringValue = stringsEN[stringId]
    if (stringValue !== undefined) {
      ZO_CreateStringId(stringId, stringValue)
      SafeAddVersion(stringId, 1)
    }
  }
}
