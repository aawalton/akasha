import {
  DEST_PIN_TEXT_COLOR_ENGLISH_KEEP,
  DEST_PIN_TEXT_COLOR_ENGLISH_POI,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-colors/destinations-colors.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-defaults/destinations-defaults.module.code.ts"
import {
  getClientLanguage,
  getSettingsString,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import {
  getAccountWideSavedVariables,
  getSavedVariables,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  accountWideColored,
  reloadWarningColored,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"

function buildAccountWideToggle(): LamCheckboxData {
  return {
    type: "checkbox",
    name: accountWideColored("SI_TEMPER_DESTINATIONS_SETTINGS_USE_ACCOUNTWIDE"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_USE_ACCOUNTWIDE_TT"),
    getFunc: () => getAccountWideSavedVariables().settings.useAccountWide,
    setFunc: (state) => {
      getAccountWideSavedVariables().settings.useAccountWide = state
      ReloadUI("ingame")
    },
    warning: reloadWarningColored("SI_TEMPER_DESTINATIONS_SETTINGS_RELOAD_WARNING"),
    default: DEFAULTS.settings.useAccountWide,
  }
}

function buildPoiImprovementsSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_SHOW_ENGLISH"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_SHOW_ENGLISH_TT"),
    getFunc: () => sv.settings.AddEnglishOnUnknwon,
    setFunc: (state) => {
      sv.settings.AddEnglishOnUnknwon = state
    },
    default: DEFAULTS.settings.AddEnglishOnUnknwon,
    disabled: () => getClientLanguage() === "en",
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_COLOR_TT"),
    getFunc: () => {
      return DEST_PIN_TEXT_COLOR_ENGLISH_POI.UnpackRGBA()
    },
    setFunc: (r, g, b, a) => {
      DEST_PIN_TEXT_COLOR_ENGLISH_POI.SetRGBA(r, g, b, a ?? 1)
      sv.settings.EnglishColorPOI = DEST_PIN_TEXT_COLOR_ENGLISH_POI.ToHex()
    },
    default: ZO_HIGHLIGHT_TEXT,
    disabled: () => !sv.settings.AddEnglishOnUnknwon,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_SHOW_ENGLISH_KEEPS"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_SHOW_ENGLISH_KEEPS_TT"),
    getFunc: () => sv.settings.AddEnglishOnKeeps,
    setFunc: (state) => {
      sv.settings.AddEnglishOnKeeps = state
    },
    default: DEFAULTS.settings.AddEnglishOnKeeps,
    disabled: () => getClientLanguage() === "en",
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_COLOR_TT"),
    getFunc: () => {
      return DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.UnpackRGBA()
    },
    setFunc: (r, g, b, a) => {
      DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.SetRGBA(r, g, b, a ?? 1)
      sv.settings.EnglishColorKeeps = DEST_PIN_TEXT_COLOR_ENGLISH_KEEP.ToHex()
    },
    default: ZO_HIGHLIGHT_TEXT,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_HA"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_HA_TT"),
    getFunc: () => sv.settings.HideAllianceOnKeeps,
    setFunc: (value) => {
      sv.settings.HideAllianceOnKeeps = value
    },
    default: DEFAULTS.settings.HideAllianceOnKeeps,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_NL"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_ENGLISH_KEEPS_NL_TT"),
    getFunc: () => sv.settings.AddNewLineOnKeeps,
    setFunc: (value) => {
      sv.settings.AddNewLineOnKeeps = value
    },
    default: DEFAULTS.settings.AddNewLineOnKeeps,
    disabled: () => !sv.settings.AddEnglishOnKeeps,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_IMPROVE_MUNDUS"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_IMPROVE_MUNDUS_TT"),
    getFunc: () => sv.settings.ImproveMundus,
    setFunc: (state) => {
      sv.settings.ImproveMundus = state
    },
    default: DEFAULTS.settings.ImproveMundus,
  })
  controls.push({
    type: "checkbox",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_IMPROVE_CRAFTING"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_POI_IMPROVE_CRAFTING_TT"),
    getFunc: () => sv.settings.ImproveCrafting,
    setFunc: (state) => {
      sv.settings.ImproveCrafting = state
    },
    default: DEFAULTS.settings.ImproveCrafting,
  })
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextImprove.Colorize(
      getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_IMPROVEMENT_HEADER")
    ),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_IMPROVEMENT_HEADER_TT"),
    controls,
  }
}

export function buildGeneralOptions(): LamControlData[] {
  const options: LamControlData[] = [buildAccountWideToggle()]
  if (getAccountWideSavedVariables().settings.useAccountWide) {
    options.push({
      type: "description",
      text: accountWideColored("SI_TEMPER_DESTINATIONS_SETTINGS_PER_CHAR_HEADER"),
    })
  }
  options.push(buildPoiImprovementsSubmenu())
  return options
}
