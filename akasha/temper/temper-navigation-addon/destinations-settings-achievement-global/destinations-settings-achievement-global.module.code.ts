import {
  DEST_PIN_TINT_OTHER,
  DEST_PIN_TINT_OTHER_DONE,
} from "../destinations-colors/destinations-colors.module.code.ts"
import { DEFAULTS } from "../destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  colorDefaultRgb,
  colorDefaultRgba,
  compassPinLayout,
  DESTINATIONS_PIN_PRIORITY_OFFSET,
  isFilterEnabled,
  perCharName,
  perCharToggleTooltip,
  pinLayoutSettings,
  redrawAllAchievementPins,
  redrawAllPins,
  redrawCompassPinsOnly,
  unpackRgb,
  unpackRgba,
} from "../destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import type { IconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { getIconPreviews } from "../destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"

const LMP = LibMapPins

const ALL_ACH_FILTERS: readonly string[] = [
  PIN_TYPES.LB_GTTP_CP,
  PIN_TYPES.MAIQ,
  PIN_TYPES.PEACEMAKER,
  PIN_TYPES.NOSEDIVER,
  PIN_TYPES.EARTHLYPOS,
  PIN_TYPES.ON_ME,
  PIN_TYPES.BRAWL,
  PIN_TYPES.PATRON,
  PIN_TYPES.WROTHGAR_JUMPER,
  PIN_TYPES.RELIC_HUNTER,
  PIN_TYPES.CHAMPION,
  PIN_TYPES.LB_GTTP_CP_DONE,
  PIN_TYPES.MAIQ_DONE,
  PIN_TYPES.PEACEMAKER_DONE,
  PIN_TYPES.NOSEDIVER_DONE,
  PIN_TYPES.EARTHLYPOS_DONE,
  PIN_TYPES.ON_ME_DONE,
  PIN_TYPES.BRAWL_DONE,
  PIN_TYPES.PATRON_DONE,
  PIN_TYPES.WROTHGAR_JUMPER_DONE,
  PIN_TYPES.RELIC_HUNTER_DONE,
  PIN_TYPES.CHAMPION_DONE,
]

const UNDONE_TINT_FILTERS: readonly string[] = [
  PIN_TYPES.MAIQ,
  PIN_TYPES.LB_GTTP_CP,
  PIN_TYPES.PEACEMAKER,
  PIN_TYPES.NOSEDIVER,
  PIN_TYPES.EARTHLYPOS,
  PIN_TYPES.ON_ME,
  PIN_TYPES.BRAWL,
  PIN_TYPES.PATRON,
  PIN_TYPES.WROTHGAR_JUMPER,
  PIN_TYPES.CHAMPION,
  PIN_TYPES.RELIC_HUNTER,
  PIN_TYPES.BREAKING,
  PIN_TYPES.CUTPURSE,
]

const UNDONE_TEXT_FILTERS: readonly string[] = [
  PIN_TYPES.LB_GTTP_CP,
  PIN_TYPES.MAIQ,
  PIN_TYPES.PEACEMAKER,
  PIN_TYPES.NOSEDIVER,
  PIN_TYPES.EARTHLYPOS,
  PIN_TYPES.ON_ME,
  PIN_TYPES.BRAWL,
  PIN_TYPES.PATRON,
  PIN_TYPES.WROTHGAR_JUMPER,
  PIN_TYPES.RELIC_HUNTER,
  PIN_TYPES.CHAMPION,
]

const DONE_FILTERS: readonly string[] = [
  PIN_TYPES.LB_GTTP_CP_DONE,
  PIN_TYPES.MAIQ_DONE,
  PIN_TYPES.PEACEMAKER_DONE,
  PIN_TYPES.NOSEDIVER_DONE,
  PIN_TYPES.EARTHLYPOS_DONE,
  PIN_TYPES.ON_ME_DONE,
  PIN_TYPES.BRAWL_DONE,
  PIN_TYPES.PATRON_DONE,
  PIN_TYPES.WROTHGAR_JUMPER_DONE,
  PIN_TYPES.RELIC_HUNTER_DONE,
  PIN_TYPES.CHAMPION_DONE,
]

function allFiltersDisabled(pinTypes: readonly string[]): boolean {
  const filters = getCharacterSavedVariables().filters
  for (const pinType of pinTypes) {
    if (isFilterEnabled(filters, pinType)) {
      return false
    }
  }
  return true
}

const UNDONE_PREVIEWS: readonly (keyof IconPreviews)[] = [
  "maiq",
  "other",
  "peacemaker",
  "nosediver",
  "earthlyPos",
  "onMe",
  "brawl",
  "patron",
  "wrothgarJumper",
  "champion",
  "relicHunter",
  "breaking",
  "cutpurse",
]

const DONE_PREVIEWS: readonly (keyof IconPreviews)[] = [
  "maiqDone",
  "otherDone",
  "peacemakerDone",
  "nosediverDone",
  "earthlyPosDone",
  "onMeDone",
  "brawlDone",
  "patronDone",
  "wrothgarJumperDone",
  "championDone",
  "relicHunterDone",
  "breakingDone",
  "cutpurseDone",
]

function colorPreviews(
  previewKeys: readonly (keyof IconPreviews)[],
  r: number,
  g: number,
  b: number,
  a: number | undefined
): undefined {
  const previews = getIconPreviews()
  for (const key of previewKeys) {
    previews[key].SetColor(r, g, b, a)
  }
}

function allPinLayerSlider(): LamSliderData {
  const sv = getSavedVariables()
  return {
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_ACH_ALL_PIN_LAYER"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureOther.level,
    setFunc: (level) => {
      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, pinName).level = level + DESTINATIONS_PIN_PRIORITY_OFFSET
        pinLayoutSettings(sv.pins, `${pinName}Done`).level = level
      }
      for (const pinName of DRTV.AchPins) {
        LMP.SetLayoutKey(PIN_TYPES[pinName], "level", level + DESTINATIONS_PIN_PRIORITY_OFFSET)
        LMP.SetLayoutKey(PIN_TYPES[`${pinName}_DONE`], "level", level)
      }
      sv.pins.pinTextureOther.level = level
      redrawAllAchievementPins()
    },
    disabled: () => allFiltersDisabled(ALL_ACH_FILTERS),
    default: DEFAULTS.pins.pinTextureOther.level,
  }
}

function undoneTintPicker(): LamColorpickerData {
  const sv = getSavedVariables()
  return {
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_COLOR_MISS"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_PIN_COLOR_MISS_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureOther.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureOther.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_OTHER.SetRGBA(r, g, b, a ?? 1)

      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, pinName).tint = [r, g, b, a ?? 1]
      }
      for (const pinName of DRTV.AchPins) {
        LMP.SetLayoutKey(PIN_TYPES[pinName], "tint", DEST_PIN_TINT_OTHER)
        redrawAllPins(PIN_TYPES[pinName])
      }

      colorPreviews(UNDONE_PREVIEWS, r, g, b, a)
    },
    disabled: () => allFiltersDisabled(UNDONE_TINT_FILTERS),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureOther.tint),
  }
}

function undoneTextColorPicker(): LamColorpickerData {
  const sv = getSavedVariables()
  return {
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_ACH_TXT_COLOR_MISS"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_TXT_COLOR_MISS_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureOther.textcolor)
    },
    setFunc: (r, g, b) => {
      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, pinName).textcolor = [r, g, b]
      }
      for (const pinSuffix of DRTV.AchPins) {
        const colorObj = DRTV.AchTextColorDefs[pinSuffix]
        colorObj.SetRGB(r, g, b)
      }
      for (const pinName of DRTV.AchPins) {
        LMP.RefreshPins(PIN_TYPES[pinName])
      }
    },
    disabled: () => allFiltersDisabled(UNDONE_TEXT_FILTERS),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureOther.textcolor),
  }
}

function doneTintPicker(): LamColorpickerData {
  const sv = getSavedVariables()
  return {
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_COLOR_DONE"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_PIN_COLOR_DONE_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureOtherDone.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureOtherDone.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_OTHER_DONE.SetRGBA(r, g, b, a ?? 1)

      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, `${pinName}Done`).tint = [r, g, b, a ?? 1]
      }
      for (const pinName of DRTV.AchPins) {
        LMP.SetLayoutKey(PIN_TYPES[`${pinName}_DONE`], "tint", DEST_PIN_TINT_OTHER_DONE)
        redrawAllPins(PIN_TYPES[`${pinName}_DONE`])
      }

      colorPreviews(DONE_PREVIEWS, r, g, b, a)
    },
    disabled: () => allFiltersDisabled(DONE_FILTERS),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureOtherDone.tint),
  }
}

function doneTextColorPicker(): LamColorpickerData {
  const sv = getSavedVariables()
  return {
    type: "colorpicker",
    name: getSettingsString("DEST_SETTINGS_ACH_TXT_COLOR_DONE"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_TXT_COLOR_DONE_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureOtherDone.textcolor)
    },
    setFunc: (r, g, b) => {
      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, `${pinName}Done`).textcolor = [r, g, b]
      }
      for (const pinSuffix of DRTV.AchPins) {
        const colorObj = DRTV.AchTextColorDefsDone[pinSuffix]
        colorObj.SetRGB(r, g, b)
      }
      for (const pinName of DRTV.AchPins) {
        LMP.RefreshPins(PIN_TYPES[`${pinName}_DONE`])
      }
    },
    disabled: () => allFiltersDisabled(DONE_FILTERS),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureOtherDone.textcolor),
  }
}

function compassToggle(): LamCheckboxData {
  return {
    type: "checkbox",
    name: perCharName("DEST_SETTINGS_ACH_ALL_COMPASS_TOGGLE"),
    tooltip: perCharToggleTooltip(),
    getFunc: () =>
      isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.ACHIEVEMENTS_COMPASS),
    setFunc: (state) => {
      getCharacterSavedVariables().filters[PIN_TYPES.ACHIEVEMENTS_COMPASS] = state
      for (const pinName of DRTV.AchPins) {
        redrawCompassPinsOnly(PIN_TYPES[pinName])
        redrawCompassPinsOnly(PIN_TYPES[`${pinName}_DONE`])
      }
    },
    disabled: () => allFiltersDisabled(ALL_ACH_FILTERS),
    default: DEFAULTS.filters[PIN_TYPES.ACHIEVEMENTS_COMPASS] ?? false,
  }
}

function compassDistanceSlider(): LamSliderData {
  const sv = getSavedVariables()
  return {
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_ACH_ALL_COMPASS_DIST"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureOther.maxDistance * 1000,
    setFunc: (maxDistance) => {
      for (const pinName of DRTV.AchPinTex) {
        pinLayoutSettings(sv.pins, pinName).maxDistance = maxDistance / 1000
        pinLayoutSettings(sv.pins, `${pinName}Done`).maxDistance = maxDistance / 1000
      }
      for (const pinName of DRTV.AchPins) {
        compassPinLayout(PIN_TYPES[pinName]).maxDistance = maxDistance / 1000
        redrawCompassPinsOnly(PIN_TYPES[pinName])
        compassPinLayout(PIN_TYPES[`${pinName}_DONE`]).maxDistance = maxDistance / 1000
        redrawCompassPinsOnly(PIN_TYPES[`${pinName}_DONE`])
      }
    },
    width: "full",
    disabled: () =>
      allFiltersDisabled(ALL_ACH_FILTERS) ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.ACHIEVEMENTS_COMPASS),
    default: DEFAULTS.pins.pinTextureOther.maxDistance * 1000,
  }
}

export function buildAchievementGlobalSubmenu(): LamSubmenuData {
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextMiscellaneous.Colorize(
      getSettingsString("DEST_SETTINGS_ACH_GLOBAL_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_GLOBAL_HEADER_TT"),
    controls: [
      allPinLayerSlider(),
      undoneTintPicker(),
      undoneTextColorPicker(),
      doneTintPicker(),
      doneTextColorPicker(),
      compassToggle(),
      compassDistanceSlider(),
    ],
  }
}
