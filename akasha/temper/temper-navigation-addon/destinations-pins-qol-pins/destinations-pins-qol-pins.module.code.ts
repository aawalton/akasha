import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  type QolPinData,
  QolStore,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import {
  DOCKS_HIGH_ISLE,
  PORTALS,
  STABLE,
} from "../destinations-shared-data/destinations-shared-data.module.code.ts"

function redrawMapPinsOnly(pinType: string): undefined {
  LibMapPins.RefreshPins(pinType)
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
  if (LibMapData.isWorld === true) {
    return
  }
  const mapData = qualityOfLifeMapPinData()
  if (mapData === undefined) {
    return
  }

  for (const pinData of mapData) {
    if (pinType === PIN_TYPES.QOLPINS_DOCK && pinData.pinsType === DOCKS_HIGH_ISLE) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_DOCK, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_STABLE && pinData.pinsType === STABLE) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_STABLE, pinData, pinData.x, pinData.y)
    }

    if (pinType === PIN_TYPES.QOLPINS_PORTAL && pinData.pinsType === PORTALS) {
      LibMapPins.CreatePin(PIN_TYPES.QOLPINS_PORTAL, pinData, pinData.x, pinData.y)
    }
  }
}
