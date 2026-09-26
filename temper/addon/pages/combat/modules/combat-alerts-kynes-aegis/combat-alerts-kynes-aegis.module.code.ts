import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    RegisterKynesAegis: (this: void) => void
    UnregisterKynesAegis: (this: void) => void
  }
}

const C = CRUTCH.Constants

function onExplodingSpearBegin(
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
  if (unitTag !== undefined) {
    zo_callLater(function (this: void) {
      const [, x, y, z] = GetUnitRawWorldPosition(unitTag)
      const iconKey = CRUTCH.Drawing.CreatePlacedIcon(
        "/esoui/art/icons/death_recap_fire_ranged_arrow.dds",
        x,
        y + 30,
        z,
        60
      )
      const circleKey = CRUTCH.Drawing.CreateGroundCircle(x, y + 5, z, 4, [1, 0.5, 0])

      zo_callLater(function (this: void) {
        CRUTCH.Drawing.RemovePlacedIcon(iconKey)
        CRUTCH.Drawing.RemoveGroundCircle(circleKey)
      }, 4000)
    }, 500)
  }
}

const PRISONED: Record<string, boolean> = {}
const PRISON_UNIQUE_NAME = "CrutchAlertsKAPrison"

function onPrisonBegin(
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
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  if (hitValue !== 1500) return
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  if (unitTag !== undefined) {
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      PRISON_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      "/esoui/art/icons/death_recap_oblivion.dds"
    )
    zo_callLater(function (this: void) {
      if (PRISONED[unitTag] === undefined) {
        CRUTCH.RemoveAttachedIconForUnit(unitTag, PRISON_UNIQUE_NAME)
      }
    }, 2000)
  }
}

function onPrisonEffect(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    PRISONED[unitTag] = true
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      PRISON_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      "/esoui/art/icons/death_recap_oblivion.dds"
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete PRISONED[unitTag]
    CRUTCH.RemoveAttachedIconForUnit(unitTag, PRISON_UNIQUE_NAME)
  }
}

let falgravnEnabled = false

function enableFalgravnIcons(this: void): undefined {
  if (CRUTCH.savedOptions.kynesaegis.showFalgravnIcons) {
    falgravnEnabled = true
    CRUTCH.EnableIconGroup("Falgravn2ndFloor")
  }
}

function disableFalgravnIcons(this: void): undefined {
  falgravnEnabled = false
  CRUTCH.DisableIconGroup("Falgravn2ndFloor")
}

function tryEnablingFalgravnIcons(this: void): undefined {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (powerMax === 248386064 || powerMax === 124193032 || powerMax === 18177368) {
    if (!falgravnEnabled) {
      enableFalgravnIcons()
    }
  } else {
    if (falgravnEnabled) {
      disableFalgravnIcons()
    }
  }
}

CRUTCH.RegisterKynesAegis = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Kyne's Aegis")

  if (CRUTCH.savedOptions.kynesaegis.showPrisonIcon) {
    CRUTCH.RegisterForEffectChanged("PrisonEffect", onPrisonEffect, 132473)
    CRUTCH.RegisterForCombatEvent("PrisonCast", onPrisonBegin, ACTION_RESULT_BEGIN, 132468)
  }

  if (CRUTCH.savedOptions.kynesaegis.showSpearIcon) {
    CRUTCH.RegisterForCombatEvent(
      "ExplodingSpear",
      onExplodingSpearBegin,
      ACTION_RESULT_BEGIN,
      133936
    )
  }

  if (CRUTCH.savedOptions.kynesaegis.showFalgravnIcons) {
    tryEnablingFalgravnIcons()

    CRUTCH.RegisterBossChangedListener("CrutchKynesAegis", tryEnablingFalgravnIcons)
  }
}

CRUTCH.UnregisterKynesAegis = function (this: void) {
  CRUTCH.UnregisterForEffectChanged("PrisonEffect")
  CRUTCH.UnregisterForCombatEvent("PrisonCast")
  CRUTCH.UnregisterForCombatEvent("ExplodingSpear")

  CRUTCH.UnregisterBossChangedListener("CrutchKynesAegis")
  disableFalgravnIcons()

  CRUTCH.RemoveAllAttachedIcons(PRISON_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Kyne's Aegis")
}

registerZone(1196, CRUTCH.RegisterKynesAegis, CRUTCH.UnregisterKynesAegis)
