import { DEFAULTS } from "akasha/temper/addon/pages/world/navigation/modules/destinations-defaults/destinations-defaults.module.code.ts"
import { getSettingsString } from "akasha/temper/addon/pages/world/navigation/modules/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getCharacterSavedVariables,
  getSavedVariables,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import {
  colorDefaultRgb,
  filterDisabled,
  isFilterEnabled,
  redrawAllPins,
  unpackRgb,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-settings-helpers/destinations-settings-helpers.module.code.ts"

export function bothFishingFiltersDisabled(): boolean {
  const filters = getCharacterSavedVariables().filters
  return (
    !isFilterEnabled(filters, PIN_TYPES.FISHING) && !isFilterEnabled(filters, PIN_TYPES.FISHINGDONE)
  )
}

export function fishTextToggle(spec: {
  nameKey: string
  filterType: string
  redrawDoneToo: boolean
}): LamCheckboxData {
  const sv = getSavedVariables()
  return {
    type: "checkbox",
    width: "full",
    name: getSettingsString(spec.nameKey),
    tooltip: getSettingsString(`${spec.nameKey}_TT`),
    getFunc: () => isFilterEnabled(sv.filters, spec.filterType),
    setFunc: (state) => {
      sv.filters[spec.filterType] = state
      redrawAllPins(PIN_TYPES.FISHING)
      if (spec.redrawDoneToo) {
        redrawAllPins(PIN_TYPES.FISHINGDONE)
      }
    },
    default: DEFAULTS.filters[spec.filterType] ?? false,
    disabled: bothFishingFiltersDisabled,
  }
}

export function fishTextColorPicker(spec: {
  nameKey: string
  getColor: (this: void) => number[]
  setColor: (this: void, color: number[]) => void
  redrawPinType: string
  disabledPinType: string
  colorDefault: readonly number[]
}): LamColorpickerData {
  return {
    type: "colorpicker",
    name: getSettingsString(spec.nameKey),
    tooltip: getSettingsString(`${spec.nameKey}_TT`),
    getFunc: () => {
      return unpackRgb(spec.getColor())
    },
    setFunc: (r, g, b) => {
      spec.setColor([r, g, b])
      redrawAllPins(spec.redrawPinType)
    },
    disabled: filterDisabled(spec.disabledPinType),
    default: colorDefaultRgb(spec.colorDefault),
  }
}
