import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type { OptionColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"
import {
  JYNORAH_HEALTH_HM,
  JYNORAH_HEALTH_NORMAL,
  JYNORAH_HEALTH_VET,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-health/combat-alerts-ossein-twins-health.module.code.ts"
import {
  registerPanelEvents,
  unregisterPanelEvents,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-panel/combat-alerts-ossein-twins-panel.module.code.ts"

const C = CRUTCH.Constants

export const DAMAGE_TYPES: Record<number, string> = {
  [ACTION_RESULT_DAMAGE]: "",
  [ACTION_RESULT_CRITICAL_DAMAGE]: "",
  [ACTION_RESULT_DOT_TICK]: " |cAAAAAA(dot)|r",
  [ACTION_RESULT_DOT_TICK_CRITICAL]: " |cAAAAAA(dot)|r",
}

export const TITAN_MAX_HPS: Record<number, number> = {
  [JYNORAH_HEALTH_HM]: 242176464,
  [JYNORAH_HEALTH_VET]: 151360288,
  [JYNORAH_HEALTH_NORMAL]: 35445864,
}

const TITAN_ATTACKS: Record<string, Record<number, boolean>> = {
  Valneer: {
    [232242]: true,
    [232243]: true,
    [235806]: true,
  },
  Myrinax: {
    [232244]: true,
    [232254]: true,
    [235807]: true,
  },
}

interface TitanColors {
  fgColor: OptionColor
  bgColor: OptionColor
}

const TITANS: Record<string, TitanColors> = {
  Myrinax: {
    fgColor: [7 / 255, 87 / 255, 179 / 255],
    bgColor: [1 / 255, 11 / 255, 23 / 255],
  },
  Valneer: {
    fgColor: [230 / 255, 129 / 255, 34 / 255],
    bgColor: [18 / 255, 9 / 255, 1 / 255],
  },
}

export const TITAN_IDS: Record<number, string> = {}

export function unspoofTitans(this: void): undefined {
  for (const [id] of pairs(TITAN_IDS)) {
    CRUTCH.UntrackUnitForSpoofing(id)
  }
  ZO_ClearTable(TITAN_IDS)
}

function startTrackingTitan(this: void, unitId: number, bossTag: string, name: string): undefined {
  TITAN_IDS[unitId] = name

  if (CRUTCH.savedOptions.bossHealthBar.enabled && CRUTCH.savedOptions.osseincage.showTitansHp) {
    const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
    const titan = TITANS[name] as TitanColors
    CRUTCH.TrackUnitForSpoofing(
      unitId,
      name,
      bossTag,
      TITAN_MAX_HPS[powerMax] as number,
      titan.fgColor,
      titan.bgColor
    )
  }
}

function unregisterMyrinaxIdentification(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("IdentifyMyrinaxStunSelf")
  for (const [abilityId] of pairs(TITAN_ATTACKS.Myrinax as Record<number, boolean>)) {
    CRUTCH.UnregisterForCombatEvent("IdentifyMyrinax" + abilityId)
  }
}

function unregisterValneerIdentification(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("IdentifyValneerStunSelf")
  for (const [abilityId] of pairs(TITAN_ATTACKS.Valneer as Record<number, boolean>)) {
    CRUTCH.UnregisterForCombatEvent("IdentifyValneer" + abilityId)
  }
}

const onMyrinaxStunSelf: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) {
  CRUTCH.dbgOther(string.format("Identified Myrinax %d using Stun Self", targetUnitId))
  startTrackingTitan(targetUnitId, "boss3", "Myrinax")
  unregisterMyrinaxIdentification()
}

const onValneerStunSelf: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) {
  CRUTCH.dbgOther(string.format("Identified Valneer %d using Stun Self", targetUnitId))
  startTrackingTitan(targetUnitId, "boss4", "Valneer")
  unregisterValneerIdentification()
}

const onMyrinaxDamagedByValneer: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) {
  CRUTCH.dbgOther(
    string.format("Identified Myrinax %d using %s", targetUnitId, GetAbilityName(abilityId))
  )
  startTrackingTitan(targetUnitId, "boss3", "Myrinax")
  unregisterMyrinaxIdentification()
}

const onValneerDamagedByMyrinax: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) {
  CRUTCH.dbgOther(
    string.format("Identified Valneer %d using %s", targetUnitId, GetAbilityName(abilityId))
  )
  startTrackingTitan(targetUnitId, "boss4", "Valneer")
  unregisterValneerIdentification()
}

function registerTitanIdentification(this: void): undefined {
  CRUTCH.RegisterForCombatEvent(
    "IdentifyMyrinaxStunSelf",
    onMyrinaxStunSelf,
    ACTION_RESULT_EFFECT_GAINED,
    233486
  )
  for (const [abilityId] of pairs(TITAN_ATTACKS.Myrinax as Record<number, boolean>)) {
    CRUTCH.RegisterForCombatEvent(
      "IdentifyMyrinax" + abilityId,
      onMyrinaxDamagedByValneer,
      ACTION_RESULT_DAMAGE,
      abilityId
    )
  }

  CRUTCH.RegisterForCombatEvent(
    "IdentifyValneerStunSelf",
    onValneerStunSelf,
    ACTION_RESULT_EFFECT_GAINED,
    233497
  )
  for (const [abilityId] of pairs(TITAN_ATTACKS.Valneer as Record<number, boolean>)) {
    CRUTCH.RegisterForCombatEvent(
      "IdentifyValneer" + abilityId,
      onValneerDamagedByMyrinax,
      ACTION_RESULT_DAMAGE,
      abilityId
    )
  }
}

let exitKey: string | undefined

export function unregisterTwins(this: void): undefined {
  unspoofTitans()

  unregisterMyrinaxIdentification()
  unregisterValneerIdentification()

  CRUTCH.DisableIconGroup("OCAOCH")
  CRUTCH.DisableIconGroup("OCAlt")
  CRUTCH.DisableIconGroup("OCMiddle")

  if (exitKey !== undefined) {
    CRUTCH.Drawing.RemoveWorldTexture(exitKey)
    exitKey = undefined
  }

  unregisterPanelEvents()
}

export function registerTwins(this: void): undefined {
  unregisterTwins()

  if (
    (CRUTCH.savedOptions.bossHealthBar.enabled && CRUTCH.savedOptions.osseincage.showTitansHp) ||
    CRUTCH.savedOptions.osseincage.printHMReflectiveScales
  ) {
    registerTitanIdentification()
  }

  if (CRUTCH.savedOptions.osseincage.showTwinsIcons) {
    if (CRUTCH.savedOptions.osseincage.useAOCHIcons) {
      CRUTCH.EnableIconGroup("OCAOCH")
    } else {
      CRUTCH.EnableIconGroup("OCAlt")
    }
    if (CRUTCH.savedOptions.osseincage.useMiddleIcons) {
      CRUTCH.EnableIconGroup("OCMiddle")
    }

    if (exitKey !== undefined) {
      CRUTCH.Drawing.RemoveWorldTexture(exitKey)
    }
    exitKey = CRUTCH.Drawing.CreateSpaceLabel("Exit", 105100, 26400, 133400, 120, C.WHITE, false, [
      0,
      math.pi,
      0,
    ])
  }

  registerPanelEvents()
}
