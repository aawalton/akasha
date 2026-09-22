import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  AchIndex,
  AchStore,
  rowNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "akasha/temper/addon/pages/world/navigation/modules/destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import { getCharacterSavedVariables } from "akasha/temper/addon/pages/world/navigation/modules/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

export function addMiscCompassPins(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  const cssv = getCharacterSavedVariables()
  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  getMapTextureName()
  const mapData =
    MAP_STATE.mapTextureName !== undefined ? AchStore[MAP_STATE.mapTextureName] : undefined
  if (mapData === undefined) return
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    const x = rowNumber(pinData, AchIndex.X)
    const y = rowNumber(pinData, AchIndex.Y)
    if (DRTV.pinType === 20) {
      if (!MAP_PINS.IsEnabled(PIN_TYPES.AYLEID) || cssv.filters[PIN_TYPES.MISC_COMPASS] !== true) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.AYLEID, pinData, x, y)
    } else if (DRTV.pinType === 25) {
      if (
        !MAP_PINS.IsEnabled(PIN_TYPES.DEADLANDS) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DEADLANDS, pinData, x, y)
    } else if (DRTV.pinType === 26) {
      if (
        !MAP_PINS.IsEnabled(PIN_TYPES.HIGHISLE) ||
        cssv.filters[PIN_TYPES.MISC_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.HIGHISLE, pinData, x, y)
    } else if (DRTV.pinType === 21) {
      if (!MAP_PINS.IsEnabled(PIN_TYPES.WWVAMP) || cssv.filters[PIN_TYPES.VWW_COMPASS] !== true) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.WWVAMP, pinData, x, y)
    } else if (DRTV.pinType === 22) {
      if (
        !MAP_PINS.IsEnabled(PIN_TYPES.VAMPIRE_ALTAR) ||
        cssv.filters[PIN_TYPES.VWW_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.VAMPIRE_ALTAR, pinData, x, y)
    } else if (DRTV.pinType === 23) {
      if (!MAP_PINS.IsEnabled(PIN_TYPES.DWEMER) || cssv.filters[PIN_TYPES.MISC_COMPASS] !== true) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.DWEMER, pinData, x, y)
    } else if (DRTV.pinType === 24) {
      if (
        !MAP_PINS.IsEnabled(PIN_TYPES.WEREWOLF_SHRINE) ||
        cssv.filters[PIN_TYPES.VWW_COMPASS] !== true
      ) {
        return
      }
      COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.WEREWOLF_SHRINE, pinData, x, y)
    }
  }
}
