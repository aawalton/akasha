import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

CRUTCH.RegisterForEffectChanged = function (
  this: void,
  suffix,
  callback,
  abilityId,
  unitTagPrefix
) {
  const name = CRUTCH.name + suffix
  EVENT_MANAGER.RegisterForEvent(name, EVENT_EFFECT_CHANGED, callback)
  if (abilityId !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(
      name,
      EVENT_EFFECT_CHANGED,
      REGISTER_FILTER_ABILITY_ID,
      abilityId
    )
  }
  if (unitTagPrefix !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(
      name,
      EVENT_EFFECT_CHANGED,
      REGISTER_FILTER_UNIT_TAG_PREFIX,
      unitTagPrefix
    )
  }
}

CRUTCH.UnregisterForEffectChanged = function (this: void, suffix) {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + suffix, EVENT_EFFECT_CHANGED)
}

CRUTCH.RegisterForCombatEvent = function (
  this: void,
  suffix,
  callback,
  result,
  abilityId,
  sourceType,
  targetType
) {
  const name = CRUTCH.name + suffix
  EVENT_MANAGER.RegisterForEvent(name, EVENT_COMBAT_EVENT, callback)
  if (sourceType !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(
      name,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      sourceType
    )
  }
  if (targetType !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(
      name,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
      targetType
    )
  }
  if (result !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(name, EVENT_COMBAT_EVENT, REGISTER_FILTER_COMBAT_RESULT, result)
  }
  if (abilityId !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(name, EVENT_COMBAT_EVENT, REGISTER_FILTER_ABILITY_ID, abilityId)
  }
}

CRUTCH.UnregisterForCombatEvent = function (this: void, suffix) {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + suffix, EVENT_COMBAT_EVENT)
}
