import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

interface PadCoords {
  x: number
  y: number
  z: number
}

const PAD_COORDS: Record<number, PadCoords> = {
  [1]: { x: 104179, y: 45954, z: 130168 },
  [2]: { x: 105015, y: 45967, z: 128699 },
  [3]: { x: 104093, y: 45967, z: 126869 },
  [4]: { x: 102971, y: 45967, z: 126115 },
  [5]: { x: 100987, y: 45967, z: 126379 },
  [6]: { x: 100543, y: 45959, z: 128344 },
}

let padIdToIndex: Record<number, number> = {}
let padIndexToId: Record<number, number> = {}

const PAD_END_TIME: Record<number, number> = {}

export function padLabel(this: void, index: number): LabelControl {
  return TemperCombatAlertsMawOfLorkhaj.GetNamedChild(`Pad${tostring(index)}Label`) as LabelControl
}

export function updatePadsDisplay(this: void): undefined {
  const currTime = GetGameTimeMilliseconds()
  let hasTimers = false
  for (let index = 1; index <= 6; index++) {
    const label = padLabel(index)
    const endTime = PAD_END_TIME[index]
    if (endTime !== undefined && endTime - currTime > 0) {
      const seconds = (endTime - currTime) / 1000
      label.SetHidden(false)
      label.SetText(string.format("%.1f", seconds))
      hasTimers = true
    } else {
      label.SetHidden(true)
    }
  }

  if (!hasTimers) {
    EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}MoLPoll`)
    CRUTCH.dbgSpam("stop polling pads display")
  }
}

function startPadCountdown(this: void, index: number | undefined): undefined {
  if (index === undefined) {
    return
  }
  PAD_END_TIME[index] = GetGameTimeMilliseconds() + 25000
  updatePadsDisplay()

  EVENT_MANAGER.RegisterForUpdate(`${CRUTCH.name}MoLPoll`, 100, updatePadsDisplay)
  CRUTCH.dbgSpam("start polling pads display")
}

function endPadCountdown(this: void, index: number | undefined): undefined {
  if (index === undefined) {
    return
  }
  delete PAD_END_TIME[index]
  updatePadsDisplay()
}

function findPad(
  this: void,
  padUnitId: number,
  findNew: boolean,
  skipRetry?: boolean
): number | undefined {
  const existing = padIdToIndex[padUnitId]
  if (existing !== undefined) {
    CRUTCH.dbgSpam(string.format("existing pad %d -> %d", padUnitId, existing))
    return existing
  }

  if (!findNew) {
    CRUTCH.dbgSpam(
      string.format("|cFF0000No existing pad for %d, and not finding new|r", padUnitId)
    )
    return undefined
  }

  let lowestDistance = 1000000000
  let lowestDistanceIndex = 0
  let lowestDistanceTag = ""
  for (const [i, coords] of pairs(PAD_COORDS)) {
    if (padIndexToId[i] === undefined) {
      for (let j = 1; j <= GetGroupSize(); j++) {
        const groupTag = GetGroupUnitTagByIndex(j) as string
        const [, x, y, z] = GetUnitRawWorldPosition(groupTag)
        const dist = CRUTCH.GetSquaredDistance(x, y, z, coords.x, coords.y, coords.z)
        if (dist < lowestDistance) {
          lowestDistance = dist
          lowestDistanceTag = groupTag
          lowestDistanceIndex = i
        }
      }
    }
  }

  if (lowestDistance < 360000) {
    padIdToIndex[padUnitId] = lowestDistanceIndex
    padIndexToId[lowestDistanceIndex] = padUnitId
    CRUTCH.dbgSpam(
      string.format(
        "newly found pad %d -> %d used by %s",
        padUnitId,
        lowestDistanceIndex,
        GetUnitDisplayName(lowestDistanceTag)
      )
    )
    return lowestDistanceIndex
  }

  CRUTCH.dbgOther(string.format("|cFF0000Couldn't find close enough pad for %d!|r", padUnitId))
  CRUTCH.dbgOther(
    string.format(
      "lowestDistance %d lowestDistanceIndex %d lowestDistanceTag %s",
      lowestDistance,
      lowestDistanceIndex,
      lowestDistanceTag
    )
  )

  CRUTCH.dbgOther("RESETTING")
  padIdToIndex = {}
  padIndexToId = {}

  if (skipRetry !== true) {
    return findPad(padUnitId, findNew, true)
  }
  return undefined
}

function onPadChanged(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  _unitTag: string,
  _beginTime: number,
  _endTime: number,
  _stackCount: number,
  _iconName: string,
  _buffType: string,
  _effectType: number,
  _abilityType: number,
  _statusEffectType: number,
  _unitName: string,
  unitId: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    const padIndex = findPad(unitId, false)
    endPadCountdown(padIndex)
  } else if (changeType === EFFECT_RESULT_FADED) {
    const padIndex = findPad(unitId, true)
    startPadCountdown(padIndex)
  }
}

function isZhajhassa(this: void): boolean | undefined {
  if (!DoesUnitExist("boss1")) {
    return undefined
  }
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 41915160 || powerMax === 10906420) {
    return true
  }
  return false
}

export function registerZhajhassa(this: void): undefined {
  if (CRUTCH.savedOptions.mawoflorkhaj.showPads && isZhajhassa() === true) {
    TemperCombatAlertsMawOfLorkhaj.SetHidden(false)
    updatePadsDisplay()
  } else {
    TemperCombatAlertsMawOfLorkhaj.SetHidden(true)
  }

  EVENT_MANAGER.RegisterForEvent(
    `${CRUTCH.name}MoLCombatState`,
    EVENT_PLAYER_COMBAT_STATE,
    (_eventCode: number, inCombat: boolean) => {
      if (!inCombat) {
        CRUTCH.dbgSpam("resetting because combat state")
        padIdToIndex = {}
        padIndexToId = {}
      }
    }
  )

  CRUTCH.RegisterBossChangedListener("CrutchMawOfLorkhaj", () => {
    if (CRUTCH.savedOptions.mawoflorkhaj.showPads && isZhajhassa() === true) {
      TemperCombatAlertsMawOfLorkhaj.SetHidden(false)
    } else {
      TemperCombatAlertsMawOfLorkhaj.SetHidden(true)
    }
  })

  CRUTCH.RegisterForEffectChanged("JonesBlessing", onPadChanged, 57525)
}

export function unregisterZhajhassa(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}MoLCombatState`, EVENT_PLAYER_COMBAT_STATE)

  CRUTCH.UnregisterBossChangedListener("CrutchMawOfLorkhaj")

  CRUTCH.UnregisterForEffectChanged("JonesBlessing")
}
