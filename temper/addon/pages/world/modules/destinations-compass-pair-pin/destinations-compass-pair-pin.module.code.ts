import {
  AchIndex,
  type AchRow,
  rowNumber,
} from "akasha/temper/addon/pages/world/modules/destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { getCharacterSavedVariables } from "akasha/temper/addon/pages/world/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"

export function pairEnabled(undoneName: string, doneName: string): boolean {
  const filters = getCharacterSavedVariables().filters
  return (
    (LibMapPins.IsEnabled(undoneName) && filters[undoneName] === true) ||
    (LibMapPins.IsEnabled(doneName) && filters[doneName] === true)
  )
}

export function createCompassPairPin(
  undoneName: string,
  doneName: string,
  completed: number,
  required: number,
  pinData: AchRow
): undefined {
  const x = rowNumber(pinData, AchIndex.X)
  const y = rowNumber(pinData, AchIndex.Y)
  if (completed !== required) {
    COMPASS_PINS.pinManager.CreatePin(undoneName, pinData, x, y)
  } else if (
    LibMapPins.IsEnabled(doneName) &&
    getCharacterSavedVariables().filters[doneName] === true
  ) {
    COMPASS_PINS.pinManager.CreatePin(doneName, pinData, x, y)
  }
}
