import { LIBMAPPINS_GLOBAL_MAPGROUP } from "../map-pins-constants/map-pins-constants.module.code.ts"
import {
  getCurrentGamepadMapFilterPanel,
  getCurrentMapFilterGroup,
  getPinTypeId,
} from "../map-pins-helpers/map-pins-helpers.module.code.ts"
import type { Lib } from "../map-pins-types/map-pins-types.module.code.ts"
import { refreshPins } from "../pin-types/pin-types.module.code.ts"

export function isEnabled(lib: Lib, pinType: number | string): boolean | undefined {
  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId !== undefined) {
    return lib.pinManager.IsCustomPinEnabled(pinTypeId)
  }
  return undefined
}

export function setEnabled(lib: Lib, pinType: number | string, state: unknown): undefined {
  const [mapGroup] = getCurrentMapFilterGroup()
  if (mapGroup === LIBMAPPINS_GLOBAL_MAPGROUP) {
    return
  }

  const pinTypeId = getPinTypeId(pinType)
  if (pinTypeId === undefined) {
    return
  }

  let enabled: boolean
  if (type(state) === "number") {
    enabled = (state as number) !== 0
  } else {
    enabled = state != null && state !== false
  }

  const filter = lib.filters[pinTypeId]
  if (filter) {
    const targetCheckbox = mapGroup !== undefined ? filter[mapGroup] : undefined
    if (targetCheckbox != null) {
      ZO_CheckButton_SetCheckState(targetCheckbox as Control, enabled)
    }

    const currentPanel = getCurrentGamepadMapFilterPanel()
    if (!currentPanel || !currentPanel.list) {
      return
    }
    currentPanel.SetPinFilter(pinTypeId, enabled)
  }

  const needsRefresh = lib.pinManager.IsCustomPinEnabled(pinTypeId) !== enabled
  lib.pinManager.SetCustomPinEnabled(pinTypeId, enabled)

  if (needsRefresh) {
    refreshPins(lib, pinType)
  }
}

export function enablePin(lib: Lib, pinType: number | string): undefined {
  setEnabled(lib, pinType, true)
}

export function disablePin(lib: Lib, pinType: number | string): undefined {
  setEnabled(lib, pinType, false)
}
