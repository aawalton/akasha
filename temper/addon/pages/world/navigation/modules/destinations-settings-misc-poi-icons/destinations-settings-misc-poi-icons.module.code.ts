import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  DEST_PIN_TEXT_COLOR_AYLEID,
  DEST_PIN_TINT_AYLEID,
  DEST_PIN_TINT_DWEMER,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-colors/destinations-colors.module.code.ts"
import { DEFAULTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TEXTURE_PATHS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-texture-paths/destinations-pin-texture-paths.module.code.ts"
import { PIN_TEXTURE_LISTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-textures/destinations-pin-textures.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import { togglePins } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  achHeaderName,
  choiceAt,
  colorDefaultRgb,
  colorDefaultRgba,
  filterDisabled,
  isFilterEnabled,
  perCharName,
  redrawAllPins,
  texturePathAt,
  tooltipWithPerChar,
  unpackRgb,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import { getIconPreviews } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { unpackRgba } from "akasha/temper/modules/unpack-color/unpack-color.module.code.ts"

export function appendAyleidControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_AYLEID_WELL_HEADER"),
  })
  controls.push({
    type: "checkbox",
    width: "half",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_AYLEID_WELL_TOGGLE"),
    tooltip: tooltipWithPerChar("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_AYLEID_WELL_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.AYLEID),
    setFunc: (state) => {
      togglePins(PIN_TYPES.AYLEID, state)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    default: DEFAULTS.filters[PIN_TYPES.AYLEID] ?? false,
  })
  controls.push({
    type: "dropdown",
    width: "half",
    name: "",
    reference: "previewpinTextureAyleid",
    choices: PIN_TEXTURE_LISTS.Ayleid,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Ayleid, sv.pins.pinTextureAyleid.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Ayleid.length; i++) {
        if (PIN_TEXTURE_LISTS.Ayleid[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureAyleid.type = index
          MAP_PINS.SetLayoutKey(
            PIN_TYPES.AYLEID,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.Ayleid, index)
          )
          getIconPreviews().ayleid.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.Ayleid, index))
          redrawAllPins(PIN_TYPES.AYLEID)
          break
        }
      }
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: choiceAt(PIN_TEXTURE_LISTS.Ayleid, DEFAULTS.pins.pinTextureAyleid.type),
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_AYLEID_WELL_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureAyleid.size,
    setFunc: (size) => {
      sv.pins.pinTextureAyleid.size = size
      getIconPreviews().ayleid.SetDimensions(size, size)
      MAP_PINS.SetLayoutKey(PIN_TYPES.AYLEID, "size", size)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: DEFAULTS.pins.pinTextureAyleid.size,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_AYLEID_WELL_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PIN_AYLEID_WELL_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureAyleid.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureAyleid.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_AYLEID.SetRGBA(r, g, b, a ?? 1)
      getIconPreviews().ayleid.SetColor(r, g, b, a)
      redrawAllPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureAyleid.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PINTEXT_AYLEID_WELL_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_PINTEXT_AYLEID_WELL_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureAyleid.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureAyleid.textcolor = [r, g, b]
      DEST_PIN_TEXT_COLOR_AYLEID.SetRGB(r, g, b)
      MAP_PINS.RefreshPins(PIN_TYPES.AYLEID)
    },
    disabled: filterDisabled(PIN_TYPES.AYLEID),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureAyleid.textcolor),
  })
}

export function appendDwemerControls(controls: LamControlData[]): undefined {
  const sv = getSavedVariables()
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_HEADER"),
  })
  controls.push({
    type: "checkbox",
    width: "half",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PIN_TOGGLE"),
    tooltip: tooltipWithPerChar("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PIN_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.DWEMER),
    setFunc: (state) => {
      togglePins(PIN_TYPES.DWEMER, state)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    default: DEFAULTS.filters[PIN_TYPES.DWEMER] ?? false,
  })
  controls.push({
    type: "dropdown",
    width: "half",
    name: "",
    reference: "previewpinTextureDwemer",
    choices: PIN_TEXTURE_LISTS.Dwemer,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Dwemer, sv.pins.pinTextureDwemer.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Dwemer.length; i++) {
        if (PIN_TEXTURE_LISTS.Dwemer[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureDwemer.type = index
          MAP_PINS.SetLayoutKey(
            PIN_TYPES.DWEMER,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.dwemer, index)
          )
          getIconPreviews().dwemer.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.dwemer, index))
          redrawAllPins(PIN_TYPES.DWEMER)
          break
        }
      }
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: choiceAt(PIN_TEXTURE_LISTS.Dwemer, DEFAULTS.pins.pinTextureDwemer.type),
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PIN_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureDwemer.size,
    setFunc: (size) => {
      sv.pins.pinTextureDwemer.size = size
      getIconPreviews().dwemer.SetDimensions(size, size)
      MAP_PINS.SetLayoutKey(PIN_TYPES.DWEMER, "size", size)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: DEFAULTS.pins.pinTextureDwemer.size,
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PIN_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PIN_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureDwemer.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureDwemer.tint = [r, g, b, a ?? 1]
      DEST_PIN_TINT_DWEMER.SetRGBA(r, g, b, a ?? 1)
      getIconPreviews().dwemer.SetColor(r, g, b, a)
      redrawAllPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureDwemer.tint),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PINTEXT_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_MISC_DWEMER_PINTEXT_COLOR_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureDwemer.textcolor)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureDwemer.textcolor = [r, g, b]
      MAP_PINS.RefreshPins(PIN_TYPES.DWEMER)
    },
    disabled: filterDisabled(PIN_TYPES.DWEMER),
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureDwemer.textcolor),
  })
}
