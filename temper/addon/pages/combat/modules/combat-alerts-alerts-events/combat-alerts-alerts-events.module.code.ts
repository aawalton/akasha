import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchRegistered {
    gained?: boolean
  }

  interface CrutchHub {
    SpamEventDebug: (
      this: void,
      result: number | undefined,
      sourceName: string,
      sourceType: number | undefined,
      targetName: string,
      targetType: number | undefined,
      hitValue: number,
      sourceUnitId: number,
      targetUnitId: number,
      abilityId: number,
      prefix: string
    ) => void
    UnregisterBegin: (this: void) => void
    UnregisterGained: (this: void) => void
    UnregisterInterrupts: (this: void) => void
  }
}

export const resultStrings = CRUTCH.Constants.ACTION_RESULTS
export const sourceStrings = CRUTCH.Constants.UNIT_TYPES

function registerEvent(
  this: void,
  event: number,
  result: number | undefined,
  unitFilter: number | undefined,
  abilityId: number,
  eventHandler: CombatEventCallback,
  eventName: string
): undefined {
  const name = CRUTCH.name + eventName + tostring(abilityId)
  EVENT_MANAGER.RegisterForEvent(name, event, eventHandler)
  EVENT_MANAGER.AddFilterForEvent(name, event, REGISTER_FILTER_ABILITY_ID, abilityId)

  if (unitFilter !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(
      name,
      event,
      REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
      unitFilter
    )
  }

  if (result !== undefined) {
    EVENT_MANAGER.AddFilterForEvent(name, event, REGISTER_FILTER_COMBAT_RESULT, result)
  }
}

export function formatAbilityName(this: void, abilityId: number): string {
  return zo_strformat("<<C:1>>", GetAbilityName(abilityId))
}

export function registerData(
  this: void,
  data: Record<number, boolean>,
  eventName: string,
  resultFilter: number | undefined,
  unitFilter: number | undefined,
  eventHandler: CombatEventCallback
): undefined {
  for (const [id] of pairs(data)) {
    registerEvent(EVENT_COMBAT_EVENT, resultFilter, unitFilter, id, eventHandler, eventName)
  }
}

export function unregisterData(
  this: void,
  data: Record<number, boolean>,
  eventName: string
): undefined {
  for (const [id] of pairs(data)) {
    EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + eventName + tostring(id), EVENT_COMBAT_EVENT)
  }
}

export function lookupString(
  this: void,
  strings: Record<number, string>,
  value: number | undefined
): string {
  if (value !== undefined) {
    return strings[value] ?? tostring(value)
  }
  return ""
}

function spamDebug(
  this: void,
  result: number | undefined,
  sourceName: string,
  sourceType: number | undefined,
  targetName: string,
  targetType: number | undefined,
  hitValue: number,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  prefix: string
): undefined {
  if (
    CRUTCH.savedOptions.debugChatSpam &&
    (CRUTCH.zoneId === undefined || CRUTCH.noSpamZone[CRUTCH.zoneId] !== true)
  ) {
    const resultString = lookupString(resultStrings, result)
    const sourceString = lookupString(sourceStrings, sourceType)
    let targetString = ""
    if (targetType !== undefined) {
      targetString = sourceStrings[targetType] ?? tostring(targetType)
    } else {
      targetString = "nil"
    }

    CRUTCH.dbgSpam(
      string.format(
        "%s %s(%d): %s(%d) in %d on %s (%d). %s.%s %s",
        prefix,
        sourceName,
        sourceUnitId,
        formatAbilityName(abilityId),
        abilityId,
        hitValue,
        targetName,
        targetUnitId,
        sourceString,
        targetString,
        resultString
      )
    )
  }
}
CRUTCH.SpamEventDebug = spamDebug

function cacheUnitTag(
  this: void,
  _eventCode: number,
  _changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
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
  if (GetUnitDisplayName(unitTag) === GetUnitDisplayName("player")) {
    CRUTCH.playerGroupTag = unitTag
  }

  const oldId = CRUTCH.groupTagToId[unitTag]
  if (oldId !== undefined && oldId !== unitId) {
    delete CRUTCH.groupIdToTag[oldId]
  }
  CRUTCH.groupIdToTag[unitId] = unitTag
  CRUTCH.groupTagToId[unitTag] = unitId
}

CRUTCH.RegisterEffectChanged = function (this: void) {
  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "Effect", EVENT_EFFECT_CHANGED, cacheUnitTag)
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Effect",
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_GROUP
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Effect",
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "group"
  )

  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "EffectPet", EVENT_EFFECT_CHANGED, cacheUnitTag)
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "EffectPet",
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "player"
  )
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "EffectCompanion",
    EVENT_EFFECT_CHANGED,
    cacheUnitTag
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "EffectCompanion",
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "companion"
  )
}

function isOthersEnabledFor(this: void, zoneId: number | undefined, abilityId: number): boolean {
  const zoneData = zoneId !== undefined ? CRUTCH.others[zoneId] : undefined
  if (zoneData === undefined) {
    return false
  }
  const maybeFunc = zoneData[abilityId]
  if (maybeFunc === undefined || maybeFunc === false) {
    return false
  }
  if (typeof maybeFunc !== "function") {
    return true
  }
  return maybeFunc()
}

const onCombatEventAll: CombatEventCallback = (
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
  eventHitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  let hitValue = eventHitValue
  if (
    sourceUnitId === 0 &&
    (result === ACTION_RESULT_EFFECT_GAINED || result === ACTION_RESULT_EFFECT_GAINED_DURATION)
  ) {
    return
  }

  if (
    CRUTCH.blacklist[abilityId] === true ||
    CRUTCH.savedOptions.general.blacklist[abilityId] === true
  ) {
    return
  }

  spamDebug(
    result,
    sourceName,
    sourceType,
    targetName,
    targetType,
    hitValue,
    sourceUnitId,
    targetUnitId,
    abilityId,
    "A"
  )

  if (hitValue <= 75) {
    return
  }

  const filter = CRUTCH.filter[abilityId]
  if (filter !== undefined && !filter(hitValue, "player")) {
    CRUTCH.dbgSpam(string.format("Skipping %s (%d) because of filter", abilityName, abilityId))
    return
  }

  const aboveThreshold = CRUTCH.savedOptions.general.hitValueAboveThreshold
  if (hitValue >= aboveThreshold) {
    CRUTCH.dbgOther(
      string.format(
        "Capping hitValue for %s(%d) at %d from %d",
        abilityName,
        abilityId,
        aboveThreshold,
        hitValue
      )
    )
    hitValue = aboveThreshold
  }

  if (CRUTCH.savedOptions.general.showOthers && isOthersEnabledFor(CRUTCH.zoneId, abilityId)) {
    return
  }

  if (
    CRUTCH.savedOptions.general.beginHideSelf &&
    result === ACTION_RESULT_BEGIN &&
    sourceType === COMBAT_UNIT_TYPE_PLAYER
  ) {
    return
  }

  if (CRUTCH.savedOptions.general.showGeneralAlerts) {
    CRUTCH.DisplayNotification(
      abilityId,
      formatAbilityName(abilityId),
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

CRUTCH.RegisterBegin = function (this: void) {
  if (CRUTCH.registered.begin) {
    return
  }
  CRUTCH.dbgOther("Registered Begin")

  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "Begin", EVENT_COMBAT_EVENT, onCombatEventAll)
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Begin",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Begin",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_BEGIN
  )

  CRUTCH.registered.begin = true
}

CRUTCH.UnregisterBegin = function (this: void) {
  if (!CRUTCH.registered.begin) {
    return
  }
  CRUTCH.dbgOther("Unregistered Begin")

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "Begin", EVENT_COMBAT_EVENT)

  CRUTCH.registered.begin = false
}

const onGained: CombatEventCallback = (...args) => {
  const targetType = args[9]
  const hitValue = args[10]
  if (targetType === COMBAT_UNIT_TYPE_PLAYER && hitValue > 1) {
    onCombatEventAll(...args)
  }
}

const onGainedDuration: CombatEventCallback = (...args) => {
  if (args[9] === COMBAT_UNIT_TYPE_PLAYER) {
    onCombatEventAll(...args)
  }
}

const onGainedDurationDebug: CombatEventCallback = (
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
  if (targetType === COMBAT_UNIT_TYPE_PLAYER) {
    spamDebug(
      result,
      sourceName,
      sourceType,
      targetName,
      targetType,
      hitValue,
      sourceUnitId,
      targetUnitId,
      abilityId,
      "|c55FFFF[dur]|r"
    )
  }
}

CRUTCH.RegisterGained = function (this: void) {
  if (CRUTCH.registered.gained === true) {
    return
  }
  CRUTCH.dbgOther("Registered Gained")

  EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "Gained", EVENT_COMBAT_EVENT, onGained)
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Gained",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_NONE
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "Gained",
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_EFFECT_GAINED
  )

  registerData(
    CRUTCH.gainedDuration,
    "Duration",
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    undefined,
    onGainedDuration
  )

  if (CRUTCH.savedOptions.debugChatSpam) {
    const debugName = CRUTCH.name + "GainedDurationDebug"
    EVENT_MANAGER.RegisterForEvent(debugName, EVENT_COMBAT_EVENT, onGainedDurationDebug)
    EVENT_MANAGER.AddFilterForEvent(
      debugName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_NONE
    )
    EVENT_MANAGER.AddFilterForEvent(
      debugName,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_COMBAT_RESULT,
      ACTION_RESULT_EFFECT_GAINED_DURATION
    )
  }

  CRUTCH.registered.gained = true
}

CRUTCH.UnregisterGained = function (this: void) {
  if (CRUTCH.registered.gained !== true) {
    return
  }
  CRUTCH.dbgOther("Unregistered Gained")

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "Gained", EVENT_COMBAT_EVENT)
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "GainedDuration", EVENT_COMBAT_EVENT)

  CRUTCH.registered.gained = false
}

const INTERRUPTED_RESULTS: Record<number, string> = {
  [ACTION_RESULT_FEARED]: "FEARED",
  [ACTION_RESULT_STUNNED]: "STUNNED",
  [ACTION_RESULT_INTERRUPT]: "INTERRUPT",
  [ACTION_RESULT_DIED]: "DIED",
  [ACTION_RESULT_DIED_XP]: "DIED_XP",
}

const onInterrupted: CombatEventCallback = (
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
  if (CRUTCH.savedOptions.debugChatSpam && (abilityId === 103531 || abilityId === 110431)) {
    const resultString = lookupString(INTERRUPTED_RESULTS, result)
    CRUTCH.dbgSpam(
      string.format(
        "Interrupted %s(%d): %s(%d) on %s (%d) HitValue %d %s %s",
        sourceName,
        sourceUnitId,
        formatAbilityName(abilityId),
        abilityId,
        targetName,
        targetUnitId,
        hitValue,
        lookupString(sourceStrings, sourceType),
        resultString
      )
    )
  }

  CRUTCH.Interrupted(targetUnitId)
}

CRUTCH.RegisterInterrupts = function (this: void) {
  if (CRUTCH.registered.interrupts) {
    return
  }
  CRUTCH.dbgOther("Registered Interrupts")

  for (const [result, name] of pairs(INTERRUPTED_RESULTS)) {
    EVENT_MANAGER.RegisterForEvent(CRUTCH.name + name, EVENT_COMBAT_EVENT, onInterrupted)
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + name,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_TARGET_COMBAT_UNIT_TYPE,
      COMBAT_UNIT_TYPE_NONE
    )
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + name,
      EVENT_COMBAT_EVENT,
      REGISTER_FILTER_COMBAT_RESULT,
      result
    )
  }

  const spheresName = CRUTCH.name + "SeekingSpheresFaded"
  EVENT_MANAGER.RegisterForEvent(spheresName, EVENT_COMBAT_EVENT, () => {
    CRUTCH.InterruptAbility(192517)
  })
  EVENT_MANAGER.AddFilterForEvent(
    spheresName,
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_COMBAT_RESULT,
    ACTION_RESULT_EFFECT_FADED
  )
  EVENT_MANAGER.AddFilterForEvent(
    spheresName,
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_ABILITY_ID,
    192517
  )

  CRUTCH.registered.interrupts = true
}

CRUTCH.UnregisterInterrupts = function (this: void) {
  if (!CRUTCH.registered.interrupts) {
    return
  }
  CRUTCH.dbgOther("Unregistered Interrupts")

  for (const [, name] of pairs(INTERRUPTED_RESULTS)) {
    EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + name, EVENT_COMBAT_EVENT)
  }

  CRUTCH.registered.interrupts = false
}
