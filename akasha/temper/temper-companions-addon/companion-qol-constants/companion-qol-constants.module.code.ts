import "@akasha/temper-addon-library-types/lib-addon-menu"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"
import type {
  AddonVars,
  CompanionInfo,
} from "../companion-qol-types/companion-qol-types.module.code.ts"

const ADDON_VARS: AddonVars = {
  addonVersion: 0.17,
  addonSavedVarsVersion: "0.04",
  addonSavedVarsVersionPerToon: "0.01",
  addonSavedVarsForAllTable: "SettingsForAll",
  addonSavedVarsNormalTable: "Settings",
  addonName: "FCOCompanion",
  addonNameMenu: "FCO Companion",
  addonNameMenuDisplay: "|c00FF00FCO |cFFFF00 Companion|r",
  addonSavedVariablesName: "FCOCompanion_Settings",
  addonSavedVariablesNamePerToon: "FCOCompanion_Settings_PerToon",
  settingsName: "FCO Companion",
  addonAuthor: "Baertram",
  addonWebsite: "https://www.esoui.com/downloads/info3044-FCOCompanion.html",
  addonFeedback: "https://www.esoui.com/portal.php?uid=2028",
  addonDonation: "https://www.esoui.com/portal.php?id=136&a=faq&faqid=131",
}
FCOCO.addonVars = ADDON_VARS

FCOCO.LAM = LibAddonMenu2

const COMPANION_INFO: CompanionInfo = {}
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = GetCompanionCollectibleId(i)
  if (typeof companionCollectibleId === "number" && companionCollectibleId > 0) {
    COMPANION_INFO[i] = companionCollectibleId
  }
}
FCOCO.companionInfo = COMPANION_INFO

let IS_COMPANION_UNLOCKED = false
for (let i = 1; i <= 30; i += 1) {
  const companionCollectibleId = COMPANION_INFO[i]
  if (companionCollectibleId !== undefined && IsCollectibleUnlocked(companionCollectibleId)) {
    IS_COMPANION_UNLOCKED = true
    break
  }
}
FCOCO.isCompanionUnlocked = IS_COMPANION_UNLOCKED

if (!IS_COMPANION_UNLOCKED) {
  d(GetString(FCOCO_NO_COMPANION_UNLOCKED_YET))
}
