import { PIN_TYPES } from "akasha/temper/addon/pages/world/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getCharacterSavedVariables,
  isSavedVarsInitialized,
} from "akasha/temper/addon/pages/world/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"

export function togglePins(this: void, pinType: string, value: boolean): undefined {
  getCharacterSavedVariables().filters[pinType] = value
  LibMapPins.SetEnabled(pinType, value)
  COMPASS_PINS.SetCompassPinEnabled(pinType, value)
}

export function updateCompassFilters(): undefined {
  if (!isSavedVarsInitialized()) return

  const filters = getCharacterSavedVariables().filters
  for (const pinName of Object.values(PIN_TYPES)) {
    const enabled = filters[pinName]
    if (enabled === true) {
      COMPASS_PINS.RefreshPins(pinName)
    }
  }
}
