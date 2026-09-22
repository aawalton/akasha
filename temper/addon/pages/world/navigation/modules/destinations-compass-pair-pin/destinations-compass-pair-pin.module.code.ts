import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  AchIndex,
  type AchRow,
  rowNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { getCharacterSavedVariables } from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"

export function pairEnabled(undoneName: string, doneName: string): boolean {
  const filters = getCharacterSavedVariables().filters
  return (
    (MAP_PINS.IsEnabled(undoneName) === true && filters[undoneName] === true) ||
    (MAP_PINS.IsEnabled(doneName) === true && filters[doneName] === true)
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
    MAP_PINS.IsEnabled(doneName) === true &&
    getCharacterSavedVariables().filters[doneName] === true
  ) {
    COMPASS_PINS.pinManager.CreatePin(doneName, pinData, x, y)
  }
}
