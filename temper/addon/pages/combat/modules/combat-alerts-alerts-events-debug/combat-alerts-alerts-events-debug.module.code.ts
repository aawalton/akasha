import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import {
  formatAbilityName,
  lookupString,
  registerData,
  resultStrings,
  sourceStrings,
  unregisterData,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-events/combat-alerts-alerts-events.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    currentAttacks: Record<number, number>
    SpamDebugEffect: (
      this: void,
      changeType: number | undefined,
      unitTag: string | undefined,
      stackCount: number,
      unitName: string | undefined,
      unitId: number,
      abilityId: number,
      sourceType: number | undefined
    ) => void
    UnregisterTest: (this: void) => void
    RegisterUnitId: (this: void, unitId: number) => void
  }
}

CRUTCH.currentAttacks = {}

const effectResults = CRUTCH.Constants.EFFECT_RESULTS

const onCombatEventTest: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  abilityName,
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
  if (!CRUTCH.savedOptions.debugChatSpam) {
    return
  }

  CRUTCH.dbgSpam(
    string.format(
      "|cFF8888Test %s(%d): %s(%d) in %d on %s (%d). %s.%s %s|r",
      sourceName,
      sourceUnitId,
      formatAbilityName(abilityId),
      abilityId,
      hitValue,
      targetName,
      targetUnitId,
      lookupString(sourceStrings, sourceType),
      lookupString(sourceStrings, targetType),
      lookupString(resultStrings, result)
    )
  )

  if (result === ACTION_RESULT_BEGIN) {
    CRUTCH.currentAttacks[sourceUnitId] = GetGameTimeMilliseconds()
    CRUTCH.dbgSpam(
      string.format("|cFFFF88%s (%d) starting from %d|r", abilityName, abilityId, sourceUnitId)
    )
  } else if (result === ACTION_RESULT_DAMAGE || result === ACTION_RESULT_DODGED) {
    const beginTime = CRUTCH.currentAttacks[sourceUnitId]
    if (beginTime !== undefined) {
      CRUTCH.dbgSpam(
        string.format(
          "|cFFFF88%d %s from %d took %d|r",
          result,
          abilityName,
          sourceUnitId,
          GetGameTimeMilliseconds() - beginTime
        )
      )
    }
  }
}

function spamDebugEffect(
  this: void,
  changeType: number | undefined,
  unitTag: string | undefined,
  stackCount: number,
  unitName: string | undefined,
  unitId: number,
  abilityId: number,
  sourceType: number | undefined
): undefined {
  if (!CRUTCH.savedOptions.debugChatSpam) {
    return
  }

  const resultString = lookupString(effectResults, changeType)

  CRUTCH.dbgSpam(
    string.format(
      "|cFF8888TestEffect [%s] %s(%s)(%d): %s(%d) x%d %s %s|r",
      unitTag ?? "",
      unitName ?? "",
      GetUnitDisplayName(unitTag as string) ?? GetUnitName(unitTag) ?? "",
      unitId,
      formatAbilityName(abilityId),
      abilityId,
      stackCount,
      lookupString(sourceStrings, sourceType),
      resultString
    )
  )
}
CRUTCH.SpamDebugEffect = spamDebugEffect

const onEffectChangedTest: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  unitName,
  unitId,
  abilityId,
  sourceType
) => {
  spamDebugEffect(changeType, unitTag, stackCount, unitName, unitId, abilityId, sourceType)
}

CRUTCH.RegisterTest = function (this: void) {
  if (CRUTCH.registered.test) {
    return
  }
  CRUTCH.dbgOther("Registered Test")

  registerData(CRUTCH.testing, "Test", undefined, undefined, onCombatEventTest)

  for (const [abilityId] of pairs(CRUTCH.testing)) {
    const eventName = CRUTCH.name + "TestEffect" + tostring(abilityId)
    EVENT_MANAGER.RegisterForEvent(eventName, EVENT_EFFECT_CHANGED, onEffectChangedTest)
    EVENT_MANAGER.AddFilterForEvent(
      eventName,
      EVENT_EFFECT_CHANGED,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
  }

  CRUTCH.registered.test = true
}

CRUTCH.UnregisterTest = function (this: void) {
  if (!CRUTCH.registered.test) {
    return
  }

  unregisterData(CRUTCH.testing, "Test")

  for (const [abilityId] of pairs(CRUTCH.testing)) {
    EVENT_MANAGER.UnregisterForEvent(
      CRUTCH.name + "TestEffect" + tostring(abilityId),
      EVENT_EFFECT_CHANGED
    )
  }

  CRUTCH.dbgOther("Unregistered Test")
  CRUTCH.registered.test = false
}

const onStackChanged: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  unitName,
  unitId,
  abilityId
) => {
  const stacks = changeType === EFFECT_RESULT_FADED ? 0 : stackCount
  CRUTCH.dbgSpam(
    string.format(
      "|ca182ff%s(%s)(%d) has %d stacks of %s(%d)|r",
      unitName,
      unitTag,
      unitId,
      stacks,
      formatAbilityName(abilityId),
      abilityId
    )
  )
}

const onStackCombat: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  targetName,
  _targetType,
  stackCount,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (result !== ACTION_RESULT_EFFECT_GAINED && result !== ACTION_RESULT_EFFECT_FADED) {
    return
  }
  const stacks = result === ACTION_RESULT_EFFECT_FADED ? 0 : stackCount
  CRUTCH.dbgSpam(
    string.format(
      "|ca182ff%s(%d) has %d stacks of %s(%d)|r",
      targetName,
      targetUnitId,
      stacks,
      formatAbilityName(abilityId),
      abilityId
    )
  )
}

CRUTCH.RegisterStacks = function (this: void) {
  for (const [abilityId] of pairs(CRUTCH.stacks)) {
    const stacksName = CRUTCH.name + "Stacks" + abilityId
    EVENT_MANAGER.RegisterForEvent(stacksName, EVENT_EFFECT_CHANGED, onStackChanged)
    EVENT_MANAGER.AddFilterForEvent(
      stacksName,
      EVENT_EFFECT_CHANGED,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
    const combatName = CRUTCH.name + "StacksCombat" + abilityId
    EVENT_MANAGER.RegisterForEvent(combatName, EVENT_COMBAT_EVENT, onStackCombat)
    EVENT_MANAGER.AddFilterForEvent(
      combatName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
    EVENT_MANAGER.AddFilterForEvent(
      combatName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_COMBAT_RESULT,
      ACTION_RESULT_EFFECT_GAINED
    )
  }
}

CRUTCH.RegisterUnitId = function (this: void, unitId) {
  const handleTest: CombatEventCallback = (
    _eventCode,
    result,
    _isError,
    _abilityName,
    _abilityGraphic,
    _abilityActionSlotType,
    sourceName,
    sourceType,
    targetName,
    _targetType,
    hitValue,
    _powerType,
    _damageType,
    _log,
    sourceUnitId,
    targetUnitId,
    abilityId
  ) => {
    if (sourceUnitId !== unitId && targetUnitId !== unitId) {
      return
    }

    if (CRUTCH.savedOptions.debugChatSpam) {
      CRUTCH.dbgSpam(
        string.format(
          "|cFF8888Test %s(%d): %s(%d) in %d on %s (%d). %s %s|r",
          sourceName,
          sourceUnitId,
          formatAbilityName(abilityId),
          abilityId,
          hitValue,
          targetName,
          targetUnitId,
          lookupString(sourceStrings, sourceType),
          lookupString(resultStrings, result)
        )
      )
    }
  }
  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "RezStopped", EVENT_COMBAT_EVENT, handleTest)
}
