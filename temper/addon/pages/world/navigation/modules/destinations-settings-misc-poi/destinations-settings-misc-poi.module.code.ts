import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { togglePins } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  achHeaderName,
  colorDefaultRgb,
  compassPinLayout,
  filterDisabled,
  isFilterEnabled,
  perCharName,
  perCharToggleTooltip,
  redrawAllPins,
  redrawCompassPinsOnly,
  tooltipWithPerChar,
  unpackRgb,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import {
  appendAyleidControls,
  appendDwemerControls,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-misc-poi-icons/destinations-settings-misc-poi-icons.module.code.ts"

const MISC_POI_TYPES: readonly string[] = [
  PIN_TYPES.AYLEID,
  PIN_TYPES.DEADLANDS,
  PIN_TYPES.HIGHISLE,
  PIN_TYPES.DWEMER,
]

function allMiscFiltersDisabled(): boolean {
  const filters = getCharacterSavedVariables().filters
  for (const pinType of MISC_POI_TYPES) {
    if (isFilterEnabled(filters, pinType)) {
      return false
    }
  }
  return true
}

function appendSimpleMiscPoiControls(
  controls: LamControlData[],
  spec: {
    headerKey: string
    toggleKey: string
    sizeKey: string
    textColorKey: string
    pinType: string
    pinSettings: { size: number; textcolor: number[] }
    sizeDefault: number
    textColorDefault: readonly number[]
  }
): undefined {
  controls.push({ type: "header", name: achHeaderName(spec.headerKey) })
  controls.push({
    type: "checkbox",
    name: perCharName(spec.toggleKey),
    tooltip: tooltipWithPerChar(`${spec.toggleKey}_TT`),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, spec.pinType),
    setFunc: (state) => {
      togglePins(spec.pinType, state)
      redrawAllPins(spec.pinType)
    },
    default: DEFAULTS.filters[spec.pinType] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString(spec.sizeKey),
    min: 20,
    max: 70,
    getFunc: () => spec.pinSettings.size,
    setFunc: (size) => {
      spec.pinSettings.size = size
      MAP_PINS.SetLayoutKey(spec.pinType, "size", size)
      redrawAllPins(spec.pinType)
    },
    disabled: filterDisabled(spec.pinType),
    default: spec.sizeDefault,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString(spec.textColorKey),
    tooltip: getSettingsString(`${spec.textColorKey}_TT`),
    getFunc: () => {
      return unpackRgb(spec.pinSettings.textcolor)
    },
    setFunc: (r, g, b) => {
      spec.pinSettings.textcolor = [r, g, b]
      MAP_PINS.RefreshPins(spec.pinType)
    },
    disabled: filterDisabled(spec.pinType),
    default: colorDefaultRgb(spec.textColorDefault),
  })
}

function appendCompassControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_COMPASS_HEADER"),
  })
  controls.push({
    type: "checkbox",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_COMPASS_PIN_TOGGLE"),
    tooltip: perCharToggleTooltip(),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.MISC_COMPASS),
    setFunc: (state) => {
      togglePins(PIN_TYPES.MISC_COMPASS, state)
      for (const pinType of MISC_POI_TYPES) {
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: allMiscFiltersDisabled,
    default: DEFAULTS.filters[PIN_TYPES.MISC_COMPASS] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_COMPASS_DIST"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureAyleid.maxDistance * 1000,
    setFunc: (maxDistance) => {
      sv.pins.pinTextureAyleid.maxDistance = maxDistance / 1000
      sv.pins.pinTextureDeadlands.maxDistance = maxDistance / 1000
      sv.pins.pinTextureHighIsle.maxDistance = maxDistance / 1000
      sv.pins.pinTextureDwemer.maxDistance = maxDistance / 1000
      for (const pinType of MISC_POI_TYPES) {
        compassPinLayout(pinType).maxDistance = maxDistance / 1000
        redrawCompassPinsOnly(pinType)
      }
    },
    disabled: () =>
      allMiscFiltersDisabled() ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.MISC_COMPASS),
    default: DEFAULTS.pins.pinTextureAyleid.maxDistance * 1000,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_LAYER"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureAyleid.level,
    setFunc: (level) => {
      sv.pins.pinTextureAyleid.level = level
      sv.pins.pinTextureDeadlands.level = level
      sv.pins.pinTextureHighIsle.level = level
      sv.pins.pinTextureDwemer.level = level
      for (const pinType of MISC_POI_TYPES) {
        MAP_PINS.SetLayoutKey(pinType, "level", level)
      }
      for (const pinType of MISC_POI_TYPES) {
        redrawAllPins(pinType)
      }
    },
    disabled: allMiscFiltersDisabled,
    default: DEFAULTS.pins.pinTextureAyleid.level,
  })
}

export function buildMiscPoiSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  appendAyleidControls(controls)
  appendSimpleMiscPoiControls(controls, {
    headerKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DEADLANDS_ENTRANCE_HEADER",
    toggleKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_DEADLANDS_ENTRANCE_TOGGLE",
    sizeKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_DEADLANDS_ENTRANCE_SIZE",
    textColorKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PINTEXT_DEADLANDS_ENTRANCE_COLOR",
    pinType: PIN_TYPES.DEADLANDS,
    pinSettings: sv.pins.pinTextureDeadlands,
    sizeDefault: DEFAULTS.pins.pinTextureDeadlands.size,
    textColorDefault: DEFAULTS.pins.pinTextureDeadlands.textcolor,
  })
  appendSimpleMiscPoiControls(controls, {
    headerKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_HIGHISLE_SHRINE_HEADER",
    toggleKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_HIGHISLE_DRUIDICSHRINES_TOGGLE",
    sizeKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_HIGHISLE_DRUIDICSHRINES_SIZE",
    textColorKey: "SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PINTEXT_HIGHISLE_DRUIDICSHRINES_COLOR",
    pinType: PIN_TYPES.HIGHISLE,
    pinSettings: sv.pins.pinTextureHighIsle,
    sizeDefault: DEFAULTS.pins.pinTextureHighIsle.size,
    textColorDefault: DEFAULTS.pins.pinTextureHighIsle.textcolor,
  })
  appendDwemerControls(controls)
  appendCompassControls(controls)
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextMiscellaneous.Colorize(
      getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_HEADER")
    ),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_HEADER_TT"),
    controls,
  }
}
