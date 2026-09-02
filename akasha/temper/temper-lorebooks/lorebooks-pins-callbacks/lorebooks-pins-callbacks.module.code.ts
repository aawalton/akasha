import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
  SHALIDOR_LOCATION_X,
  SHALIDOR_LOCATION_Y,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreBookInfo } from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  getPinTextureBookshelf,
  shouldDisplayLoreBooks,
  updateBookshelfLorebooksData,
  updateEideticLorebooksData,
  updateShalidorLorebooksData,
} from "../lorebooks-pins/lorebooks-pins.module.code.ts"
import {
  asBookshelfRuntimeEntries,
  asEideticRuntimeEntries,
} from "../lorebooks-pins-tags/lorebooks-pins-tags.module.code.ts"
import { PIN_TOOLTIP_STATE } from "../lorebooks-pins-tooltips/lorebooks-pins-tooltips.module.code.ts"
import { STATE } from "../lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import { getSavedVariables } from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

function asMapPin(value: unknown): MapPin {
  return value as MapPin
}

function requireGps(): LibGps3 {
  if (LibGPS3 === undefined) {
    throw new Error("LoreBooks requires LibGPS3 (declared DependsOn)")
  }
  return LibGPS3
}
const GPS = requireGps()

export function shalidorCompassCallback(this: void): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const db = getSavedVariables()
  if (STATE.lorebooks !== undefined) {
    for (const [, pinData] of ipairs(STATE.lorebooks)) {
      const [, , known] = loreBooksGetNewLoreBookInfo(
        LORE_LIBRARY_SHALIDOR,
        pinData[SHALIDOR_COLLECTIONINDEX],
        pinData[SHALIDOR_BOOKINDEX]
      )
      if (!known && db.filters[PINS_COMPASS]) {
        COMPASS_PINS.pinManager.CreatePin(
          PINS_COMPASS,
          pinData,
          pinData[SHALIDOR_LOCATION_X],
          pinData[SHALIDOR_LOCATION_Y]
        )
      }
    }
  }
}

export function bookshelfCompassCallback(this: void): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const db = getSavedVariables()
  if (STATE.bookshelves !== undefined) {
    for (const [, pinData] of ipairs(STATE.bookshelves)) {
      if (db.filters[PINS_COMPASS_BOOKSHELF]) {
        COMPASS_PINS.pinManager.CreatePin(PINS_COMPASS_BOOKSHELF, pinData, pinData.x, pinData.y)
      }
    }
  }
}

export function eideticMemoryCompassCallback(this: void): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const db = getSavedVariables()
  const eideticBooks = asEideticRuntimeEntries(STATE.eideticBooks)
  if (eideticBooks !== undefined) {
    for (const [, pinData] of ipairs(eideticBooks)) {
      const [, , known] = loreBooksGetNewLoreBookInfo(
        LORE_LIBRARY_EIDETIC,
        pinData.c ?? 0,
        pinData.b ?? 0
      )
      const libgpsCoordinates = pinData.px !== undefined && pinData.py !== undefined
      const normalizedCoordinates = pinData.pnx !== undefined && pinData.pny !== undefined
      const usePrimaryLibgpsCoordinates = LibMapData.mapId === pinData.pm && libgpsCoordinates
      const usePrimaryNormalizedCoordinates =
        LibMapData.mapId === pinData.pm && normalizedCoordinates
      const fakePinInfo = pinData.fp === true && LibMapData.mapId !== pinData.pm

      let xLoc: number | undefined
      let yLoc: number | undefined
      if (usePrimaryLibgpsCoordinates && !usePrimaryNormalizedCoordinates) {
        ;[xLoc, yLoc] = GPS.GlobalToLocal(pinData.px ?? 0, pinData.py ?? 0)
      } else if (!usePrimaryLibgpsCoordinates && usePrimaryNormalizedCoordinates) {
        xLoc = pinData.pnx
        yLoc = pinData.pny
      }

      const hasQuestInfo = pinData.q !== undefined
      const hasRequiredQuestInProgress = pinData.qp === true
      const hasRequiredQuestCompleted = pinData.qc === true
      const questNotInProgress =
        hasQuestInfo && hasRequiredQuestInProgress && !HasQuest(pinData.q ?? 0)
      const questNotCompleted =
        hasQuestInfo && hasRequiredQuestCompleted && !HasCompletedQuest(pinData.q ?? 0)
      if (questNotInProgress || questNotCompleted) {
        xLoc = undefined
        yLoc = undefined
      }

      const hasLocation = xLoc !== undefined && yLoc !== undefined
      const displayPin = hasLocation && !fakePinInfo && !known && db.filters[PINS_COMPASS_EIDETIC]
      if (displayPin) {
        COMPASS_PINS.pinManager.CreatePin(PINS_COMPASS_EIDETIC, pinData, xLoc ?? 0, yLoc ?? 0)
      }
    }
  }
}

export function mapCallbackCreateShalidorPins(this: void, pinType: string): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const mapId = LibMapData.mapId ?? 0
  const zoneMapId = LibMapData.GetParentMapIdFromZoneId(LibMapData.zoneId)
  updateShalidorLorebooksData(mapId, zoneMapId)
  const shouldDisplay = shouldDisplayLoreBooks()

  if (STATE.lorebooks !== undefined) {
    for (const [, pinData] of ipairs(STATE.lorebooks)) {
      const [, , known] = loreBooksGetNewLoreBookInfo(
        LORE_LIBRARY_SHALIDOR,
        pinData[SHALIDOR_COLLECTIONINDEX],
        pinData[SHALIDOR_BOOKINDEX]
      )
      if (pinType === PINS_COLLECTED) {
        if (known && LibMapPins.IsEnabled(PINS_COLLECTED)) {
          LibMapPins.CreatePin(
            PINS_COLLECTED,
            pinData,
            pinData[SHALIDOR_LOCATION_X],
            pinData[SHALIDOR_LOCATION_Y]
          )
        }
      }
      if (pinType === PINS_UNKNOWN) {
        if (!known && shouldDisplay && LibMapPins.IsEnabled(PINS_UNKNOWN)) {
          LibMapPins.CreatePin(
            PINS_UNKNOWN,
            pinData,
            pinData[SHALIDOR_LOCATION_X],
            pinData[SHALIDOR_LOCATION_Y]
          )
        }
      }
    }
  }
}

export function mapCallbackCreateBookshelfPins(this: void, pinType: string): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const mapId = LibMapData.mapId ?? 0
  const zoneMapId = LibMapData.GetParentMapIdFromZoneId(LibMapData.zoneId)
  updateBookshelfLorebooksData(mapId, zoneMapId)

  if (pinType === PINS_BOOKSHELF && LibMapPins.IsEnabled(PINS_BOOKSHELF)) {
    const bookshelves = asBookshelfRuntimeEntries(STATE.bookshelves)
    if (bookshelves !== undefined) {
      for (const [, pinData] of ipairs(bookshelves)) {
        pinData.texture = getPinTextureBookshelf(asMapPin(pinData))
        pinData.pinName = GetString(LBOOKS_BOOKSHELF)
        LibMapPins.CreatePin(PINS_BOOKSHELF, pinData, pinData.x, pinData.y)
      }
    }
  }
}

export function mapCallbackCreateEideticPins(this: void, pinType: string): undefined {
  if (LibMapData.isMacroMap === true) {
    return
  }

  const zoneMapId = LibMapData.GetParentMapIdFromZoneId(LibMapData.zoneId)
  updateEideticLorebooksData(LibMapData.mapId ?? 0, zoneMapId)
  const isDungeon = LibMapData.isDungeon === true
  const shouldDisplay = shouldDisplayLoreBooks()

  const eideticBooks = asEideticRuntimeEntries(STATE.eideticBooks)
  if (eideticBooks !== undefined) {
    for (const [, pinData] of ipairs(eideticBooks)) {
      const fakePinInfo = pinData.fp === true
      const [, , known] = loreBooksGetNewLoreBookInfo(
        LORE_LIBRARY_EIDETIC,
        pinData.c ?? 0,
        pinData.b ?? 0
      )
      const libgpsCoordinates = pinData.px !== undefined && pinData.py !== undefined
      const libgpsZoneCoordinates = pinData.zx !== undefined && pinData.zy !== undefined
      const normalizedCoordinates = pinData.pnx !== undefined && pinData.pny !== undefined
      const normalizedZoneCoordinates = pinData.znx !== undefined && pinData.zny !== undefined
      const hasSourceMapId = pinData.sm !== undefined
      let modifiedLibGpsCoordinateX: number | undefined
      let modifiedLibGpsCoordinateY: number | undefined
      if (hasSourceMapId) {
        const measurement = GPS.GetMapMeasurementByMapId(pinData.sm ?? 0)
        if (measurement !== undefined && libgpsCoordinates) {
          ;[modifiedLibGpsCoordinateX, modifiedLibGpsCoordinateY] = measurement.ToLocal(
            pinData.px ?? 0,
            pinData.py ?? 0
          )
        } else if (measurement !== undefined && libgpsZoneCoordinates) {
          ;[modifiedLibGpsCoordinateX, modifiedLibGpsCoordinateY] = measurement.ToLocal(
            pinData.zx ?? 0,
            pinData.zy ?? 0
          )
        }
      }
      const hasZoneMapId = pinData.zm !== undefined
      const usePrimaryMapId = LibMapData.mapId === pinData.pm
      const useZoneMapId = LibMapData.mapId === zoneMapId && pinData.zm === zoneMapId
      const dualMapIds =
        zoneMapId === pinData.zm &&
        LibMapData.mapId !== pinData.pm &&
        !libgpsZoneCoordinates &&
        !normalizedZoneCoordinates
      const usePrimaryLibgpsCoordinates =
        LibMapData.mapId === pinData.pm &&
        hasZoneMapId &&
        zoneMapId !== pinData.zm &&
        libgpsCoordinates
      const usePrimaryNormalizedCoordinates =
        LibMapData.mapId === pinData.pm &&
        hasZoneMapId &&
        zoneMapId !== pinData.zm &&
        normalizedCoordinates

      const useZoneLibgpsCoordinates =
        hasZoneMapId &&
        LibMapData.mapId === pinData.zm &&
        LibMapData.mapId !== pinData.pm &&
        libgpsZoneCoordinates
      const useZoneNormalizedCoordinates =
        hasZoneMapId &&
        LibMapData.mapId === pinData.zm &&
        LibMapData.mapId !== pinData.pm &&
        normalizedZoneCoordinates

      const usePrimaryNormalizedSingleMapId =
        LibMapData.mapId === pinData.pm && normalizedCoordinates

      const dualMapIdsDungeonPin =
        pinData.pm !== undefined &&
        hasZoneMapId &&
        !isDungeon &&
        pinData.d === true &&
        hasZoneMapId &&
        LibMapData.mapId === pinData.zm

      pinData.xLoc = undefined
      pinData.yLoc = undefined
      if ((usePrimaryMapId || dualMapIds || usePrimaryLibgpsCoordinates) && libgpsCoordinates) {
        if (hasSourceMapId) {
          pinData.xLoc = modifiedLibGpsCoordinateX
          pinData.yLoc = modifiedLibGpsCoordinateY
        } else {
          ;[pinData.xLoc, pinData.yLoc] = GPS.GlobalToLocal(pinData.px ?? 0, pinData.py ?? 0)
        }
      } else if (
        (usePrimaryMapId ||
          dualMapIds ||
          usePrimaryNormalizedCoordinates ||
          usePrimaryNormalizedSingleMapId) &&
        normalizedCoordinates
      ) {
        pinData.xLoc = pinData.pnx
        pinData.yLoc = pinData.pny
      } else if ((useZoneMapId || useZoneLibgpsCoordinates) && libgpsZoneCoordinates) {
        if (hasSourceMapId) {
          pinData.xLoc = modifiedLibGpsCoordinateX
          pinData.yLoc = modifiedLibGpsCoordinateY
        } else {
          ;[pinData.xLoc, pinData.yLoc] = GPS.GlobalToLocal(pinData.zx ?? 0, pinData.zy ?? 0)
        }
      } else if ((useZoneMapId || useZoneNormalizedCoordinates) && normalizedZoneCoordinates) {
        pinData.xLoc = pinData.znx
        pinData.yLoc = pinData.zny
      }

      const hasQuestInfo = pinData.q !== undefined
      const hasRequiredQuestInProgress = pinData.qp === true
      const hasRequiredQuestCompleted = pinData.qc === true
      const questNotInProgress =
        hasQuestInfo && hasRequiredQuestInProgress && !HasQuest(pinData.q ?? 0)
      const questNotCompleted =
        hasQuestInfo && hasRequiredQuestCompleted && !HasCompletedQuest(pinData.q ?? 0)
      if ((questNotInProgress && !known) || questNotCompleted) {
        pinData.xLoc = undefined
        pinData.yLoc = undefined
      }
      const hasLocation = pinData.xLoc !== undefined && pinData.yLoc !== undefined
      const meetsPinCriteria =
        (isDungeon && pinData.d === true) ||
        (!isDungeon && !(pinData.d === true)) ||
        fakePinInfo ||
        dualMapIdsDungeonPin
      const displayKnownPin =
        hasLocation &&
        meetsPinCriteria &&
        pinType === PINS_EIDETIC_COLLECTED &&
        known &&
        LibMapPins.IsEnabled(PINS_EIDETIC_COLLECTED)
      const displayUnnownPin =
        hasLocation &&
        meetsPinCriteria &&
        pinType === PINS_EIDETIC &&
        !known &&
        shouldDisplay &&
        LibMapPins.IsEnabled(PINS_EIDETIC)

      if (displayKnownPin) {
        LibMapPins.CreatePin(PINS_EIDETIC_COLLECTED, pinData, pinData.xLoc ?? 0, pinData.yLoc ?? 0)
      }
      if (displayUnnownPin) {
        LibMapPins.CreatePin(PINS_EIDETIC, pinData, pinData.xLoc ?? 0, pinData.yLoc ?? 0)
      }
    }
  }
}

export function onGamepadPreferredModeChanged(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
    PIN_TOOLTIP_STATE.informationTooltip = ZO_MapLocationTooltip_Gamepad
  } else {
    PIN_TOOLTIP_STATE.informationTooltip = InformationTooltip
  }
}
