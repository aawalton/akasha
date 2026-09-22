import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  DEST_PIN_TINT_FISH,
  DEST_PIN_TINT_FISH_DONE,
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
  compassPinLayout,
  DESTINATIONS_PIN_PRIORITY_OFFSET,
  filterDisabled,
  isFilterEnabled,
  perCharName,
  redrawAllPins,
  redrawCompassPinsOnly,
  texturePathAt,
  tooltipWithPerChar,
  unpackRgb,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-helpers/destinations-settings-helpers.module.code.ts"
import { getIconPreviews } from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-icon-previews/destinations-settings-icon-previews.module.code.ts"
import { unpackRgba } from "akasha/temper/modules/unpack-color/unpack-color.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import {
  bothFishingFiltersDisabled,
  fishTextColorPicker,
  fishTextToggle,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-fishing-controls/destinations-settings-fishing-controls.module.code.ts"

export function buildFishingSubmenu(): LamSubmenuData {
  const sv = getSavedVariables()
  const controls: LamControlData[] = []
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SUBHEADER"),
  })
  controls.push({
    type: "checkbox",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_TOGGLE"),
    tooltip: tooltipWithPerChar("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.FISHING),
    setFunc: (state) => {
      togglePins(PIN_TYPES.FISHING, state)
      redrawAllPins(PIN_TYPES.FISHING)
      redrawAllPins(PIN_TYPES.FISHINGDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.FISHING] ?? false,
  })
  controls.push({
    type: "checkbox",
    width: "full",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE"),
    tooltip: tooltipWithPerChar("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_DONE_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.FISHINGDONE),
    setFunc: (state) => {
      togglePins(PIN_TYPES.FISHINGDONE, state)
      redrawAllPins(PIN_TYPES.FISHINGDONE)
    },
    default: DEFAULTS.filters[PIN_TYPES.FISHINGDONE] ?? false,
  })
  controls.push({
    type: "dropdown",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_STYLE"),
    reference: "previewpinTextureFish",
    choices: PIN_TEXTURE_LISTS.Fish,
    getFunc: () => choiceAt(PIN_TEXTURE_LISTS.Fish, sv.pins.pinTextureFish.type),
    setFunc: (selected) => {
      for (let i = 0; i < PIN_TEXTURE_LISTS.Fish.length; i++) {
        if (PIN_TEXTURE_LISTS.Fish[i] === selected) {
          const index = i + 1
          sv.pins.pinTextureFish.type = index
          sv.pins.pinTextureFishDone.type = index
          MAP_PINS.SetLayoutKey(
            PIN_TYPES.FISHING,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.fish, index)
          )
          MAP_PINS.SetLayoutKey(
            PIN_TYPES.FISHINGDONE,
            "texture",
            texturePathAt(PIN_TEXTURE_PATHS.fishdone, index)
          )
          getIconPreviews().fish.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.fish, index))
          getIconPreviews().fishDone.SetTexture(texturePathAt(PIN_TEXTURE_PATHS.fishdone, index))
          redrawAllPins(PIN_TYPES.FISHING)
          redrawAllPins(PIN_TYPES.FISHINGDONE)
          break
        }
      }
    },
    disabled: bothFishingFiltersDisabled,
    default: choiceAt(PIN_TEXTURE_LISTS.Fish, DEFAULTS.pins.pinTextureFish.type),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_TITLE_TT"),
    getFunc: () => {
      return unpackRgb(sv.pins.pinTextureFish.textcolortitle)
    },
    setFunc: (r, g, b) => {
      sv.pins.pinTextureFish.textcolortitle = [r, g, b]
      redrawAllPins(PIN_TYPES.FISHING)
      redrawAllPins(PIN_TYPES.FISHINGDONE)
    },
    disabled: bothFishingFiltersDisabled,
    default: colorDefaultRgb(DEFAULTS.pins.pinTextureFish.textcolortitle),
  })
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_TEXT_HEADER"),
  })
  controls.push(
    fishTextToggle({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_FISHNAME",
      filterType: PIN_TYPES.FISHING_SHOW_FISHNAME,
      redrawDoneToo: true,
    })
  )
  controls.push(
    fishTextToggle({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT",
      filterType: PIN_TYPES.FISHING_SHOW_BAIT,
      redrawDoneToo: true,
    })
  )
  controls.push(
    fishTextToggle({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_BAIT_LEFT",
      filterType: PIN_TYPES.FISHING_SHOW_BAIT_LEFT,
      redrawDoneToo: false,
    })
  )
  controls.push(
    fishTextToggle({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_SHOW_WATER",
      filterType: PIN_TYPES.FISHING_SHOW_WATER,
      redrawDoneToo: true,
    })
  )
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_HEADER"),
  })
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureFish.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureFish.tint = [r, g, b, a ?? 1]
      getIconPreviews().fish.SetColor(r, g, b, a)
      DEST_PIN_TINT_FISH.SetRGBA(r, g, b, a ?? 1)
      MAP_PINS.RefreshPins(PIN_TYPES.FISHING)
    },
    disabled: filterDisabled(PIN_TYPES.FISHING),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureFish.tint),
  })
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_UNDONE",
      getColor: () => sv.pins.pinTextureFish.textcolor,
      setColor: (color) => {
        sv.pins.pinTextureFish.textcolor = color
      },
      redrawPinType: PIN_TYPES.FISHING,
      disabledPinType: PIN_TYPES.FISHING,
      colorDefault: DEFAULTS.pins.pinTextureFish.textcolor,
    })
  )
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_UNDONE",
      getColor: () => sv.pins.pinTextureFish.textcolorBait,
      setColor: (color) => {
        sv.pins.pinTextureFish.textcolorBait = color
      },
      redrawPinType: PIN_TYPES.FISHING,
      disabledPinType: PIN_TYPES.FISHING,
      colorDefault: DEFAULTS.pins.pinTextureFish.textcolorBait,
    })
  )
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_UNDONE",
      getColor: () => sv.pins.pinTextureFish.textcolorWater,
      setColor: (color) => {
        sv.pins.pinTextureFish.textcolorWater = color
      },
      redrawPinType: PIN_TYPES.FISHING,
      disabledPinType: PIN_TYPES.FISHING,
      colorDefault: DEFAULTS.pins.pinTextureFish.textcolorWater,
    })
  )
  controls.push({
    type: "colorpicker",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_COLOR_DONE_TT"),
    getFunc: () => {
      return unpackRgba(sv.pins.pinTextureFishDone.tint)
    },
    setFunc: (r, g, b, a) => {
      sv.pins.pinTextureFishDone.tint = [r, g, b, a ?? 1]
      getIconPreviews().fishDone.SetColor(r, g, b, a)
      DEST_PIN_TINT_FISH_DONE.SetRGBA(r, g, b, a ?? 1)
      MAP_PINS.RefreshPins(PIN_TYPES.FISHINGDONE)
    },
    disabled: filterDisabled(PIN_TYPES.FISHINGDONE),
    default: colorDefaultRgba(DEFAULTS.pins.pinTextureFishDone.tint),
  })
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_DONE",
      getColor: () => sv.pins.pinTextureFishDone.textcolor,
      setColor: (color) => {
        sv.pins.pinTextureFishDone.textcolor = color
      },
      redrawPinType: PIN_TYPES.FISHINGDONE,
      disabledPinType: PIN_TYPES.FISHINGDONE,
      colorDefault: DEFAULTS.pins.pinTextureFishDone.textcolor,
    })
  )
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_BAIT_DONE",
      getColor: () => sv.pins.pinTextureFishDone.textcolorBait,
      setColor: (color) => {
        sv.pins.pinTextureFishDone.textcolorBait = color
      },
      redrawPinType: PIN_TYPES.FISHING,
      disabledPinType: PIN_TYPES.FISHINGDONE,
      colorDefault: DEFAULTS.pins.pinTextureFishDone.textcolorBait,
    })
  )
  controls.push(
    fishTextColorPicker({
      nameKey: "SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COLOR_WATER_DONE",
      getColor: () => sv.pins.pinTextureFishDone.textcolorWater,
      setColor: (color) => {
        sv.pins.pinTextureFishDone.textcolorWater = color
      },
      redrawPinType: PIN_TYPES.FISHING,
      disabledPinType: PIN_TYPES.FISHINGDONE,
      colorDefault: DEFAULTS.pins.pinTextureFishDone.textcolorWater,
    })
  )
  controls.push({
    type: "header",
    name: achHeaderName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_MISC_HEADER"),
  })
  controls.push({
    type: "checkbox",
    name: perCharName("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE"),
    tooltip: tooltipWithPerChar("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_TOGGLE_TT"),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.FISHING_COMPASS),
    setFunc: (state) => {
      togglePins(PIN_TYPES.FISHING_COMPASS, state)
      redrawCompassPinsOnly(PIN_TYPES.FISHING)
      redrawCompassPinsOnly(PIN_TYPES.FISHINGDONE)
    },
    disabled: bothFishingFiltersDisabled,
    default: DEFAULTS.filters[PIN_TYPES.FISHING_COMPASS] ?? false,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_COMPASS_DIST_TT"),
    min: 1,
    max: 100,
    getFunc: () => sv.pins.pinTextureFish.maxDistance * 1000,
    setFunc: (maxDistance) => {
      sv.pins.pinTextureFish.maxDistance = maxDistance / 1000
      sv.pins.pinTextureFishDone.maxDistance = maxDistance / 1000
      compassPinLayout(PIN_TYPES.FISHING).maxDistance = maxDistance / 1000
      compassPinLayout(PIN_TYPES.FISHINGDONE).maxDistance = maxDistance / 1000
      redrawCompassPinsOnly(PIN_TYPES.FISHING)
      redrawCompassPinsOnly(PIN_TYPES.FISHINGDONE)
    },
    width: "full",
    disabled: () =>
      bothFishingFiltersDisabled() ||
      !isFilterEnabled(getCharacterSavedVariables().filters, PIN_TYPES.FISHING_COMPASS),
    default: DEFAULTS.pins.pinTextureFish.maxDistance * 1000,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_SIZE"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_SIZE_TT"),
    min: 20,
    max: 70,
    getFunc: () => sv.pins.pinTextureFish.size,
    setFunc: (size) => {
      sv.pins.pinTextureFish.size = size
      sv.pins.pinTextureFishDone.size = size
      getIconPreviews().fish.SetDimensions(size, size)
      getIconPreviews().fishDone.SetDimensions(size, size)
      MAP_PINS.SetLayoutKey(PIN_TYPES.FISHING, "size", size)
      MAP_PINS.SetLayoutKey(PIN_TYPES.FISHINGDONE, "size", size)
      redrawAllPins(PIN_TYPES.FISHING)
      redrawAllPins(PIN_TYPES.FISHINGDONE)
    },
    disabled: bothFishingFiltersDisabled,
    default: DEFAULTS.pins.pinTextureFish.size,
  })
  controls.push({
    type: "slider",
    name: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER"),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_PIN_LAYER_TT"),
    min: 10,
    max: 200,
    step: 5,
    getFunc: () => sv.pins.pinTextureFish.level,
    setFunc: (level) => {
      sv.pins.pinTextureFish.level = level + DESTINATIONS_PIN_PRIORITY_OFFSET
      sv.pins.pinTextureFishDone.level = level
      MAP_PINS.SetLayoutKey(PIN_TYPES.FISHING, "level", level + DESTINATIONS_PIN_PRIORITY_OFFSET)
      MAP_PINS.SetLayoutKey(PIN_TYPES.FISHINGDONE, "level", level)
      redrawAllPins(PIN_TYPES.FISHING)
      redrawAllPins(PIN_TYPES.FISHINGDONE)
    },
    disabled: bothFishingFiltersDisabled,
    default: DEFAULTS.pins.pinTextureFish.level,
  })
  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextFish.Colorize(
      getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER")
    ),
    tooltip: getSettingsString("SI_TEMPER_DESTINATIONS_SETTINGS_FISHING_HEADER_TT"),
    controls,
  }
}
