import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    ShowArcingCleave: (
      this: void,
      overrideX?: number,
      overrideY?: number,
      overrideZ?: number,
      overrideRadius?: number,
      overrideAngle?: number
    ) => void
  }
}

let tankTag: string | undefined = "player"

function onArcingCleave(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  if (unitTag !== tankTag) {
    CRUTCH.dbgSpam(
      zo_strformat("tank changed to |cFFFF00<<1>>", GetUnitDisplayName(unitTag as string))
    )
    tankTag = unitTag
  }
}

let centerX = 169731
let cleaveY = 36126
let centerZ = 29956
let cleaveRadius = 3600
const INNER_RADIUS = 1500
let cleaveAngle = (25 / 180) * math.pi

function getArcingCleavePoints(
  this: void,
  sign: number
): LuaMultiReturn<[number, number, number, number]> {
  const [, tankX, , tankZ] = GetUnitRawWorldPosition(tankTag as string)

  const originTankX = tankX - centerX
  const originTankZ = tankZ - centerZ

  const angle = math.atan2(originTankZ, originTankX)

  const newAngle = angle + sign * cleaveAngle
  const x1 = cleaveRadius * math.cos(newAngle)
  const z1 = cleaveRadius * math.sin(newAngle)

  const x2 = INNER_RADIUS * math.cos(newAngle)
  const z2 = INNER_RADIUS * math.sin(newAngle)

  return $multi(x1 + centerX, z1 + centerZ, x2 + centerX, z2 + centerZ)
}

let cleaveEnabled = false

function uncleave(this: void): undefined {
  cleaveEnabled = false
  CRUTCH.RemoveLine(1)
  CRUTCH.RemoveLine(2)
  CRUTCH.UnregisterForCombatEvent("ArcingCleaveTarget")
}

function showArcingCleave(
  this: void,
  overrideX?: number,
  overrideY?: number,
  overrideZ?: number,
  overrideRadius?: number,
  overrideAngle?: number
): undefined {
  uncleave()
  if (!CRUTCH.savedOptions.dreadsailreef.showArcingCleave) {
    return
  }
  cleaveEnabled = true

  if (overrideX !== undefined) {
    centerX = overrideX
  }
  if (overrideY !== undefined) {
    cleaveY = overrideY
  }
  if (overrideZ !== undefined) {
    centerZ = overrideZ
  }
  if (overrideRadius !== undefined) {
    cleaveRadius = overrideRadius
  }
  if (overrideAngle !== undefined) {
    cleaveAngle = overrideAngle
  }

  CRUTCH.RegisterForCombatEvent("ArcingCleaveTarget", onArcingCleave, undefined, 163901)

  CRUTCH.SetLineColor(1, 1, 0, 0.8, 0, false, 1)
  CRUTCH.DrawLineWithProvider(() => {
    const [startX, startZ, endX, endZ] = getArcingCleavePoints(1)
    return $multi(startX, cleaveY, startZ, endX, cleaveY, endZ)
  }, 1)

  CRUTCH.SetLineColor(1, 1, 0, 0.8, 0, false, 2)
  CRUTCH.DrawLineWithProvider(() => {
    const [startX, startZ, endX, endZ] = getArcingCleavePoints(-1)
    return $multi(startX, cleaveY, startZ, endX, cleaveY, endZ)
  }, 2)
}
CRUTCH.ShowArcingCleave = showArcingCleave

const TALERIA_HM_HP = 181632304

export function isTaleria(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === TALERIA_HM_HP || powerMax === 100906840 || powerMax === 29538220) {
    return true
  }
  return false
}

export function isTaleriaHM(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  return powerMax === TALERIA_HM_HP
}

export function tryEnablingTaleriaCleave(this: void): undefined {
  if (isTaleria()) {
    if (!cleaveEnabled) {
      showArcingCleave()
    }
  } else {
    if (cleaveEnabled) {
      uncleave()
    }
  }
}
CRUTCH.TryEnablingTaleriaCleave = tryEnablingTaleriaCleave

export function uncleaveIfEnabled(this: void): undefined {
  if (cleaveEnabled) {
    uncleave()
  }
}
