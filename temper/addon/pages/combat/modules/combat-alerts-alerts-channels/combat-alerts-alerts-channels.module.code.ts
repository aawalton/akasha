import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  lookupString,
  resultStrings,
  sourceStrings,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-events/combat-alerts-alerts-events.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    UnregisterChannels: (this: void) => void
  }
}

const ARCANIST_IDS: Record<number, boolean> = {
  185805: true,
  193331: true,
  183122: true,
  193397: true,
  186366: true,
  193398: true,
  183537: true,
  198309: true,
  186193: true,
  198330: true,
  186200: true,
  198537: true,
}

const JBEAM_IDS: Record<number, boolean> = {
  63029: true,
  63044: true,
  63046: true,
}

const onChannel: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  sourceType,
  targetName,
  targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (hitValue <= 75) {
    return
  }

  if (result === ACTION_RESULT_EFFECT_FADED) {
    CRUTCH.dbgSpam("channel faded (combat)")
    CRUTCH.Interrupted(targetUnitId)
    return
  }

  let targetString = ""
  if (targetType !== undefined) {
    targetString = sourceStrings[targetType] ?? tostring(targetType)
  } else {
    targetString = "nil"
  }

  CRUTCH.dbgSpam(
    string.format(
      "A %s(%d): %s(%d) in %d on %s (%d). %s.%s %s",
      sourceName,
      sourceUnitId,
      GetAbilityName(abilityId),
      abilityId,
      hitValue,
      targetName,
      targetUnitId,
      lookupString(sourceStrings, sourceType),
      targetString,
      lookupString(resultStrings, result)
    )
  )

  if (result === ACTION_RESULT_BEGIN) {
    CRUTCH.DisplayNotification(
      abilityId,
      GetAbilityName(abilityId),
      hitValue,
      sourceUnitId,
      sourceName,
      sourceType,
      targetUnitId,
      targetName,
      targetType,
      result
    )
  }
}

const onChannelFaded: EffectChangedCallback = (...args) => {
  if (args[1] !== EFFECT_RESULT_FADED) {
    return
  }
  if (args[16] !== COMBAT_UNIT_TYPE_PLAYER) {
    return
  }

  CRUTCH.dbgSpam("channel faded (effect)")
  CRUTCH.InterruptAbility(args[15])
}

CRUTCH.RegisterChannels = function (this: void) {
  if (!CRUTCH.savedOptions.general.beginHideArcanist) {
    CRUTCH.dbgOther("Registering Fatecarver/Remedy Cascade")
    for (const [abilityId] of pairs(ARCANIST_IDS)) {
      const eventName = "FC" + tostring(abilityId)

      CRUTCH.RegisterForCombatEvent(
        eventName + "Begin",
        onChannel,
        ACTION_RESULT_BEGIN,
        abilityId,
        undefined,
        COMBAT_UNIT_TYPE_PLAYER
      )
      CRUTCH.RegisterForCombatEvent(
        eventName + "Faded",
        onChannel,
        ACTION_RESULT_EFFECT_FADED,
        abilityId,
        undefined,
        COMBAT_UNIT_TYPE_PLAYER
      )
    }
  }

  if (CRUTCH.savedOptions.general.showJBeam) {
    CRUTCH.dbgOther("Registering Radiant Destruction")
    for (const [abilityId] of pairs(JBEAM_IDS)) {
      const eventName = "JB" + tostring(abilityId)

      CRUTCH.RegisterForCombatEvent(
        eventName + "Begin",
        onChannel,
        ACTION_RESULT_BEGIN,
        abilityId,
        COMBAT_UNIT_TYPE_PLAYER
      )
      CRUTCH.RegisterForEffectChanged(eventName + "Faded", onChannelFaded, abilityId)
    }
  }

  if (CRUTCH.savedOptions.general.showEngulfing) {
    CRUTCH.dbgOther("Registering Engulfing Dragonfire")

    CRUTCH.RegisterForCombatEvent(
      "EngulfingBegin",
      onChannel,
      ACTION_RESULT_BEGIN,
      20930,
      COMBAT_UNIT_TYPE_PLAYER
    )
    CRUTCH.RegisterForEffectChanged("EngulfingFaded", onChannelFaded, 20930)
  }

  if (CRUTCH.savedOptions.general.showClawFury) {
    CRUTCH.dbgOther("Registering Claw Fury")

    CRUTCH.RegisterForCombatEvent(
      "ClawFuryBegin",
      onChannel,
      ACTION_RESULT_BEGIN,
      58864,
      COMBAT_UNIT_TYPE_PLAYER
    )
    CRUTCH.RegisterForEffectChanged("ClawFuryFaded", onChannelFaded, 58864)
  }

  if (CRUTCH.savedOptions.general.showInsatiableHunger) {
    CRUTCH.RegisterForCombatEvent(
      "InsatiableHungerBegin",
      onChannel,
      ACTION_RESULT_BEGIN,
      33208,
      COMBAT_UNIT_TYPE_PLAYER
    )
    CRUTCH.RegisterForEffectChanged("InsatiableHungerFaded", onChannelFaded, 33208)
  }
}

CRUTCH.UnregisterChannels = function (this: void) {
  CRUTCH.dbgOther("Unregistering channeled attacks")
  for (const [abilityId] of pairs(ARCANIST_IDS)) {
    CRUTCH.UnregisterForCombatEvent("FC" + tostring(abilityId) + "Begin")
    CRUTCH.UnregisterForCombatEvent("FC" + tostring(abilityId) + "Faded")
  }

  for (const [abilityId] of pairs(JBEAM_IDS)) {
    CRUTCH.UnregisterForCombatEvent("JB" + tostring(abilityId) + "Begin")
    CRUTCH.UnregisterForEffectChanged("JB" + tostring(abilityId) + "Faded")
  }

  CRUTCH.UnregisterForCombatEvent("EngulfingBegin")
  CRUTCH.UnregisterForEffectChanged("EngulfingFaded")

  CRUTCH.UnregisterForCombatEvent("ClawFuryBegin")
  CRUTCH.UnregisterForEffectChanged("ClawFuryFaded")

  CRUTCH.UnregisterForCombatEvent("InsatiableHungerBegin")
  CRUTCH.UnregisterForEffectChanged("InsatiableHungerFaded")
}
