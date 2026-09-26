import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-c-declarations/combat-alerts-trials-c-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-sunspire-nahv-portal/combat-alerts-sunspire-nahv-portal.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  disableLokkIcons,
  onBossesChanged,
  onLokkBeam,
  onLokkFly,
  onPowerUpdate,
  registerStormBreath,
  unregisterStormBreath,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-sunspire-lokk/combat-alerts-sunspire-lokk.module.code.ts"
import {
  disableYolIcons,
  FOCUSED_FIRE_UNIQUE_NAME,
  onEnteredCombatYol,
  onFocusFireGained,
  onYolFly,
  onYolFly25,
  onYolFly50,
  onYolFly75,
  PANEL_FOCUS_FIRE_INDEX,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-sunspire-yol/combat-alerts-sunspire-yol.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    RegisterSunspire: (this: void) => void
    UnregisterSunspire: (this: void) => void
  }
}

const SS = CRUTCH.Sunspire
const C = CRUTCH.Constants

const effectResults = C.EFFECT_RESULTS

const GROUP_TIME_BREACH: Record<string, boolean> = {}

function onTimeBreachChanged(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number
): undefined {
  CRUTCH.dbgOther(
    string.format(
      "|c8C00FF%s(%s): %d %s|r",
      GetUnitDisplayName(unitTag),
      unitTag,
      stackCount,
      effectResults[changeType]
    )
  )

  let changed = false
  if (changeType === EFFECT_RESULT_GAINED) {
    GROUP_TIME_BREACH[unitTag] = true
    changed = true
  } else if (changeType === EFFECT_RESULT_FADED) {
    GROUP_TIME_BREACH[unitTag] = false
    changed = true
  }

  if (!changed) return

  if (AreUnitsEqual("player", unitTag)) {
    CRUTCH.Drawing.EvaluateAllSuppression()

    if (changeType === EFFECT_RESULT_GAINED) {
      SS.ShowNahvPortal()
    } else {
      SS.StopNahvPortal()
    }
  } else {
    CRUTCH.Drawing.EvaluateSuppressionFor(unitTag)
  }
}

function isInNahvPortal(this: void, unitTag?: string): boolean {
  const tag = unitTag ?? CRUTCH.playerGroupTag

  if (GROUP_TIME_BREACH[tag] === true) return true

  return false
}
CRUTCH.IsInNahvPortal = isInNahvPortal

const PORTAL_SUPPRESSION_FILTER = "CrutchAlertsNahvPortal"
function nahvPortalFilter(this: void, unitTag: string): boolean {
  return isInNahvPortal(unitTag) === isInNahvPortal(CRUTCH.playerGroupTag)
}

function onFireStormBegin(
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
  hitValue: number
): undefined {
  if (hitValue < 2000) {
    CRUTCH.DisplayDamageable(22.5)
  }
}

function cleanUp(this: void): undefined {
  CRUTCH.StopDamageable()

  SS.StopNahvPortal()

  CRUTCH.InfoPanel.StopCount(PANEL_FOCUS_FIRE_INDEX)
}

type OsiUnitErrorCheck = (this: void, unitTag: string, allowSelf?: boolean) => number

let origOSIUnitErrorCheck: OsiUnitErrorCheck | undefined

CRUTCH.RegisterSunspire = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Sunspire")

  CRUTCH.RegisterExitedGroupCombatListener("CrutchSunspire", cleanUp)

  CRUTCH.RegisterForCombatEvent("FocusFireBegin", onFocusFireGained, ACTION_RESULT_BEGIN, 121722)

  CRUTCH.RegisterForEffectChanged("TimeBreachEffect", onTimeBreachChanged, 121216, "group")

  if (CRUTCH.savedOptions.sunspire.showLokkIcons) {
    CRUTCH.RegisterBossChangedListener("CrutchSunspire", onBossesChanged)
    CRUTCH.RegisterEnteredGroupCombatListener("CrutchSunspireEnteredCombatLokk", disableLokkIcons)

    EVENT_MANAGER.RegisterForEvent(
      CRUTCH.name + "SunspireHealthUpdate",
      EVENT_POWER_UPDATE,
      onPowerUpdate
    )
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + "SunspireHealthUpdate",
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_UNIT_TAG_PREFIX,
      "boss1"
    )
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + "SunspireHealthUpdate",
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_POWER_TYPE,
      COMBAT_MECHANIC_FLAGS_HEALTH
    )

    CRUTCH.RegisterForCombatEvent("Gravechill80", onLokkFly, undefined, 122820)
    CRUTCH.RegisterForCombatEvent("Gravechill50", onLokkFly, undefined, 122821)
    CRUTCH.RegisterForCombatEvent("Gravechill20", onLokkFly, undefined, 122822)

    CRUTCH.RegisterForCombatEvent(
      "StormFury",
      onLokkBeam,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      115702
    )

    onBossesChanged()
  }

  if (CRUTCH.savedOptions.sunspire.telegraphStormBreath) {
    registerStormBreath()
  }

  CRUTCH.RegisterForCombatEvent("Takeoff75", onYolFly75, undefined, 124910)
  CRUTCH.RegisterForCombatEvent("Takeoff50", onYolFly50, undefined, 124915)
  CRUTCH.RegisterForCombatEvent("Takeoff25", onYolFly25, undefined, 124916)
  CRUTCH.RegisterForCombatEvent("TurnOffAim", onYolFly, ACTION_RESULT_EFFECT_GAINED, 125693)

  if (CRUTCH.savedOptions.sunspire.panel.showFocusFire) {
    CRUTCH.RegisterEnteredGroupCombatListener("CrutchSunspireEnteredCombatYol", onEnteredCombatYol)
  }

  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.RegisterForCombatEvent("FireStorm", onFireStormBegin, ACTION_RESULT_BEGIN, 118884)
  }

  SS.RegisterNahvPortal()

  if (OSI !== undefined && OSI.UnitErrorCheck !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Overriding OSI.UnitErrorCheck")
    origOSIUnitErrorCheck = OSI.UnitErrorCheck
    OSI.UnitErrorCheck = function (this: void, unitTag: string, allowSelf?: boolean): number {
      const check = origOSIUnitErrorCheck as OsiUnitErrorCheck
      const errorCode = check(unitTag, allowSelf)
      if (errorCode !== 0) {
        return errorCode
      }
      if (isInNahvPortal() !== isInNahvPortal(unitTag)) {
        return 8
      } else {
        return 0
      }
    }
  }

  CRUTCH.Drawing.RegisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER, nahvPortalFilter)
}

CRUTCH.UnregisterSunspire = function (this: void) {
  CRUTCH.UnregisterForCombatEvent("FocusFireBegin")
  CRUTCH.UnregisterForEffectChanged("TimeBreachEffect")

  CRUTCH.UnregisterBossChangedListener("CrutchSunspire")
  CRUTCH.UnregisterEnteredGroupCombatListener("CrutchSunspireEnteredCombatLokk")
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "SunspireHealthUpdate", EVENT_POWER_UPDATE)
  CRUTCH.UnregisterForCombatEvent("Gravechill80")
  CRUTCH.UnregisterForCombatEvent("Gravechill50")
  CRUTCH.UnregisterForCombatEvent("Gravechill20")
  CRUTCH.UnregisterForCombatEvent("StormFury")

  unregisterStormBreath()

  CRUTCH.UnregisterForCombatEvent("Takeoff75")
  CRUTCH.UnregisterForCombatEvent("Takeoff50")
  CRUTCH.UnregisterForCombatEvent("Takeoff25")
  CRUTCH.UnregisterForCombatEvent("TurnOffAim")
  CRUTCH.UnregisterEnteredGroupCombatListener("CrutchSunspireEnteredCombatYol")

  CRUTCH.UnregisterForCombatEvent("FireStorm")

  SS.UnregisterNahvPortal()

  if (OSI !== undefined && origOSIUnitErrorCheck !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Restoring OSI.UnitErrorCheck")
    OSI.UnitErrorCheck = origOSIUnitErrorCheck
  }

  CRUTCH.Drawing.UnregisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER)

  cleanUp()
  disableLokkIcons()
  disableYolIcons()

  CRUTCH.RemoveAllAttachedIcons(FOCUSED_FIRE_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Sunspire")
}

registerZone(1121, CRUTCH.RegisterSunspire, CRUTCH.UnregisterSunspire)
