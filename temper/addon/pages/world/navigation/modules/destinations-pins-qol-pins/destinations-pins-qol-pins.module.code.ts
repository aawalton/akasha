import { MAP_DATA_STATE } from "akasha/temper/addon/pages/world/map-data/modules/map-data-public-api/map-data-public-api.module.code.ts"
import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { PIN_TYPES } from "akasha/temper/addon/pages/world/navigation/modules/destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  type QolPinData,
  QolStore,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-pins-stores/destinations-pins-stores.module.code.ts"
import {
  DOCKS_HIGH_ISLE,
  PORTALS,
  STABLE,
} from "akasha/temper/addon/pages/world/navigation/modules/destinations-shared-data/destinations-shared-data.module.code.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"

function redrawMapPinsOnly(pinType: string): undefined {
  MAP_PINS.RefreshPins(pinType)
}

export function redrawQolPins(): undefined {
  redrawMapPinsOnly(PIN_TYPES.QOLPINS_DOCK)
  redrawMapPinsOnly(PIN_TYPES.QOLPINS_STABLE)
  redrawMapPinsOnly(PIN_TYPES.QOLPINS_PORTAL)
}

function qualityOfLifeMapPinData(): QolPinData[] | undefined {
  MAP_STATE.mapTextureName = undefined
  MAP_STATE.zoneTextureName = undefined
  MAP_STATE.mapId = undefined
  MAP_STATE.zoneId = undefined
  getMapTextureName()
  return MAP_STATE.mapId !== undefined ? QolStore[MAP_STATE.mapId] : undefined
}

export function mapCallbackQolPins(pinType: string): undefined {
  if (MAP_DATA_STATE.isWorld === true) {
    return
  }
  const mapData = qualityOfLifeMapPinData()
  if (mapData === undefined) {
    return
  }

  for (const pinData of mapData) {
    if (pinType === PIN_TYPES.QOLPINS_DOCK && pinData.pinsType === DOCKS_HIGH_ISLE) {
      MAP_PINS.CreatePin(PIN_TYPES.QOLPINS_DOCK, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_STABLE && pinData.pinsType === STABLE) {
      MAP_PINS.CreatePin(PIN_TYPES.QOLPINS_STABLE, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_PORTAL && pinData.pinsType === PORTALS) {
      MAP_PINS.CreatePin(PIN_TYPES.QOLPINS_PORTAL, pinData, pinData.x, pinData.y)
    }
  }
}
