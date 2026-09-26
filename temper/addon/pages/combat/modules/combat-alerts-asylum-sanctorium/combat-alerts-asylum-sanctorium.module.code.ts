import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-asylum-mini-health-bars/combat-alerts-asylum-mini-health-bars.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-asylum-mini-panel/combat-alerts-asylum-mini-panel.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const AS = CRUTCH.AsylumSanctorium

const onCone: CombatEventCallback = (
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
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  if (hitValue !== 2000) {
    return
  }

  const targetName = GetUnitDisplayName(CRUTCH.groupIdToTag[targetUnitId] as string)
  if (targetName === undefined) return

  if (targetName === GetUnitDisplayName("player")) {
    if (CRUTCH.savedOptions.asylumsanctorium.dingSelfCone) {
      PlaySound(SOUNDS.DUEL_START)
    }
  } else {
    if (CRUTCH.savedOptions.asylumsanctorium.dingOthersCone) {
      PlaySound(SOUNDS.DUEL_START)
    }
  }
}

const MINI_HPS: Record<number, number> = {
  [26129964]: 2181284,
  [89263744]: 9314480,
}

const felmsName = crutchString("CRUTCH_BHB_SAINT_FELMS_THE_BOLD")

function onFelmsDetected(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("ASFelmsDetection")
  CRUTCH.UnregisterForEffectChanged("ASFelmsDetectionEffect")

  AS.OnFelmsDetectedBHB()
  AS.OnFelmsDetectedPanel()
}

const onMiniDetectionCombat: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  _sourceType,
  targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (sourceName === felmsName && sourceUnitId !== 0) {
    AS.felmsId = sourceUnitId
  } else if (targetName === felmsName && targetUnitId !== 0) {
    AS.felmsId = targetUnitId
  } else {
    return
  }

  CRUTCH.dbgSpam(
    string.format(
      "detected Felms %d from %s %d - %s %d - %s (%d)",
      AS.felmsId,
      sourceName,
      sourceUnitId,
      targetName,
      targetUnitId,
      GetAbilityName(abilityId),
      abilityId
    )
  )

  onFelmsDetected()
}

const onMiniDetectionEffect: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  _unitTag,
  _beginTime,
  _endTime,
  _stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  unitName,
  unitId,
  abilityId
) => {
  if (unitName === felmsName && unitId !== 0 && changeType === EFFECT_RESULT_GAINED) {
    AS.felmsId = unitId

    CRUTCH.dbgSpam(
      string.format(
        "detected Felms using effect %d from %s %d - %s (%d)",
        AS.felmsId,
        unitName,
        unitId,
        GetAbilityName(abilityId),
        abilityId
      )
    )

    onFelmsDetected()
  }
}

const onSpeedboost: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  _sourceType,
  targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  AS.llothisId = targetUnitId

  CRUTCH.UnregisterForCombatEvent("ASSpeedboost")
  CRUTCH.dbgSpam(
    string.format(
      "detected Llothis %d from %s %d - %s %d - %s (%d)",
      AS.llothisId,
      sourceName,
      sourceUnitId,
      targetName,
      targetUnitId,
      GetAbilityName(abilityId),
      abilityId
    )
  )

  AS.OnLlothisDetectedBHB()
  AS.OnLlothisDetectedPanel()
}

const onDormant: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  _unitTag,
  _beginTime,
  _endTime,
  _stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  _unitName,
  unitId
) => {
  if (unitId === AS.llothisId) {
    AS.OnLlothisDormantBHB(changeType)
    AS.OnLlothisDormantPanel(changeType)
  } else if (unitId === AS.felmsId) {
    AS.OnFelmsDormantBHB(changeType)
    AS.OnFelmsDormantPanel(changeType)
  }
}

function registerMiniDetection(this: void): undefined {
  CRUTCH.RegisterForCombatEvent("ASSpeedboost", onSpeedboost, undefined, 58246)

  CRUTCH.RegisterForCombatEvent("ASFelmsDetection", onMiniDetectionCombat)
  CRUTCH.RegisterForEffectChanged("ASFelmsDetectionEffect", onMiniDetectionEffect)

  CRUTCH.RegisterForEffectChanged("ASMiniDormant", onDormant, 99990)

  AS.RegisterMinisBHB()
  AS.RegisterMiniPanel()
}

function unregisterMiniDetection(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("ASSpeedboost")
  CRUTCH.UnregisterForCombatEvent("ASFelmsDetection")
  CRUTCH.UnregisterForEffectChanged("ASFelmsDetectionEffect")

  CRUTCH.UnregisterForEffectChanged("ASMiniDormant")

  AS.llothisId = undefined
  AS.felmsId = undefined

  AS.UnregisterMinisBHB()
  AS.UnregisterMiniPanel()
}

function maybeRegisterMiniDetection(this: void): undefined {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (MINI_HPS[powerMax] !== undefined && !IsUnitDead("boss1")) {
    registerMiniDetection()
  } else {
    unregisterMiniDetection()
  }
}

function registerAsylumSanctorium(this: void): undefined {
  CRUTCH.RegisterForCombatEvent("ASDefiledBlast", onCone, ACTION_RESULT_BEGIN, 95545)

  CRUTCH.RegisterBossChangedListener("CrutchAsylum", maybeRegisterMiniDetection)
  maybeRegisterMiniDetection()

  CRUTCH.RegisterExitedGroupCombatListener("ExitedCombatASMinis", () => {
    unregisterMiniDetection()
    maybeRegisterMiniDetection()
  })

  AS.RegisterMiniPanel()

  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Asylum Sanctorium")
}

function unregisterAsylumSanctorium(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("ASDefiledBlast")

  CRUTCH.UnregisterBossChangedListener("CrutchAsylum")
  unregisterMiniDetection()

  CRUTCH.UnregisterExitedGroupCombatListener("ExitedCombatASMinis")

  AS.UnregisterMiniPanel()

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Asylum Sanctorium")
}

registerZone(1000, registerAsylumSanctorium, unregisterAsylumSanctorium)
