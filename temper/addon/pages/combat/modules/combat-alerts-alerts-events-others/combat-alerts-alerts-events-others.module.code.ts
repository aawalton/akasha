import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type { OthersZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-ability-data/combat-alerts-alerts-ability-data.module.code.ts"
import {
  formatAbilityName,
  lookupString,
  resultStrings,
  sourceStrings,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-events/combat-alerts-alerts-events.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    Test: (this: void) => void
  }
}

const onCombatEventOthers: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  sourceType,
  _targetName,
  targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (
    CRUTCH.blacklist[abilityId] === true ||
    CRUTCH.savedOptions.general.blacklist[abilityId] === true
  ) {
    return
  }

  let targetName: string | undefined = GetUnitDisplayName(
    CRUTCH.groupIdToTag[targetUnitId] as string
  )
  if (targetName !== undefined) {
    targetName = " |cAAAAAAon " + zo_strformat("<<1>>", targetName) + "|r"
  } else {
    targetName = ""
  }

  if (
    CRUTCH.savedOptions.debugChatSpam &&
    abilityId !== 114578 &&
    abilityId !== 72057 &&
    (CRUTCH.zoneId === undefined || CRUTCH.noSpamZone[CRUTCH.zoneId] !== true)
  ) {
    const resultString = lookupString(resultStrings, result)
    CRUTCH.dbgSpam(
      string.format(
        "O %s(%d): %s(%d) in %d on %s (%d). %s %s",
        sourceName,
        sourceUnitId,
        formatAbilityName(abilityId),
        abilityId,
        hitValue,
        targetName,
        targetUnitId,
        lookupString(sourceStrings, sourceType),
        resultString
      )
    )
  }

  const filter = CRUTCH.filter[abilityId]
  if (filter !== undefined && !filter(hitValue, CRUTCH.groupIdToTag[targetUnitId])) {
    CRUTCH.dbgSpam(string.format("Skipping %s (%d) because of filter", abilityName, abilityId))
    return
  }

  if (CRUTCH.savedOptions.general.showGeneralAlerts) {
    CRUTCH.DisplayNotification(
      abilityId,
      formatAbilityName(abilityId) + targetName,
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

const OTHERS_CURRENTLY_REGISTERED: number[] = []

function registerOthersByZone(this: void, zoneData: OthersZone | undefined): undefined {
  for (const [abilityId, maybeFunc] of pairs(zoneData as OthersZone)) {
    if (typeof maybeFunc !== "function" || maybeFunc()) {
      OTHERS_CURRENTLY_REGISTERED.push(abilityId)

      let eventName = CRUTCH.name + "OthersBegin" + tostring(abilityId)
      EVENT_MANAGER.RegisterForEvent(eventName, EVENT_COMBAT_EVENT, onCombatEventOthers)
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_ABILITY_ID,
        abilityId
      )
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_BEGIN
      )

      eventName = CRUTCH.name + "OthersGained" + tostring(abilityId)
      EVENT_MANAGER.RegisterForEvent(eventName, EVENT_COMBAT_EVENT, onCombatEventOthers)
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_ABILITY_ID,
        abilityId
      )
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_EFFECT_GAINED
      )

      eventName = CRUTCH.name + "OthersGainedDuration" + tostring(abilityId)
      EVENT_MANAGER.RegisterForEvent(eventName, EVENT_COMBAT_EVENT, onCombatEventOthers)
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_ABILITY_ID,
        abilityId
      )
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_EFFECT_GAINED_DURATION
      )
    }
  }
}

const onFadedInterrupt: CombatEventCallback = (...args) => {
  CRUTCH.InterruptAbilityOnTarget(args[16], args[15])
}

function registerFadedInterrupt(this: void, register: boolean): undefined {
  for (const [abilityId] of pairs(CRUTCH.fadedInterrupt)) {
    const eventName = CRUTCH.name + "OthersFaded" + tostring(abilityId)
    if (register) {
      EVENT_MANAGER.RegisterForEvent(eventName, EVENT_COMBAT_EVENT, onFadedInterrupt)
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_ABILITY_ID,
        abilityId
      )
      EVENT_MANAGER.AddFilterForEvent(
        eventName,
        EVENT_COMBAT_EVENT,
        REGISTER_FILTER_COMBAT_RESULT,
        ACTION_RESULT_EFFECT_FADED
      )
    } else {
      EVENT_MANAGER.UnregisterForEvent(eventName, EVENT_COMBAT_EVENT)
    }
  }
}

CRUTCH.RegisterOthers = function (this: void) {
  CRUTCH.dbgOther("Registering Others")

  for (const id of OTHERS_CURRENTLY_REGISTERED) {
    EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "OthersBegin" + tostring(id), EVENT_COMBAT_EVENT)
    EVENT_MANAGER.UnregisterForEvent(
      CRUTCH.name + "OthersGained" + tostring(id),
      EVENT_COMBAT_EVENT
    )
    EVENT_MANAGER.UnregisterForEvent(
      CRUTCH.name + "OthersGainedDuration" + tostring(id),
      EVENT_COMBAT_EVENT
    )
  }
  ZO_ClearTable(OTHERS_CURRENTLY_REGISTERED)
  registerFadedInterrupt(false)

  if (!CRUTCH.savedOptions.general.showOthers) {
    return
  }

  const zoneId = GetZoneId(GetUnitZoneIndex("player"))
  const zoneData = CRUTCH.others[zoneId]
  if (zoneData !== undefined) {
    CRUTCH.dbgOther("Registering others for " + tostring(zoneId))
    registerOthersByZone(zoneData)
  }

  registerOthersByZone(CRUTCH.others["*"])

  registerFadedInterrupt(true)
}

function testOthers(
  this: void,
  result: number,
  abilityName: string,
  targetName: string,
  targetType: number,
  hitValue: number,
  targetUnitId: number,
  abilityId: number
): undefined {
  onCombatEventOthers(
    0,
    result,
    false,
    abilityName,
    0,
    0,
    "",
    COMBAT_UNIT_TYPE_NONE,
    targetName,
    targetType,
    hitValue,
    0,
    0,
    false,
    0,
    targetUnitId,
    abilityId,
    0
  )
}

CRUTCH.Test = function (this: void) {
  const none = COMBAT_UNIT_TYPE_NONE
  testOthers(ACTION_RESULT_EFFECT_GAINED, "Crush", "", none, 1, 0, 120890)
  testOthers(ACTION_RESULT_BEGIN, "Crush", "", none, 2000, 0, 120890)
  testOthers(ACTION_RESULT_EFFECT_GAINED_DURATION, "Crush", "", none, 2000, 0, 120890)

  testOthers(ACTION_RESULT_EFFECT_GAINED, "Crush", "", none, 1, 0, 120890)
  testOthers(ACTION_RESULT_BEGIN, "Crush", "", none, 2000, 0, 120890)
  testOthers(ACTION_RESULT_EFFECT_GAINED_DURATION, "Crush", "", none, 2000, 0, 120890)

  testOthers(ACTION_RESULT_BEGIN, "Focus Fire", "", none, 1333, 0, 121722)

  testOthers(ACTION_RESULT_BEGIN, "asdf", "", none, 1333, 0, 153517)
  testOthers(ACTION_RESULT_BEGIN, "asdf", "", none, 1333, 0, 153518)

  testOthers(
    ACTION_RESULT_BEGIN,
    "True Shot",
    "Kyrozan",
    COMBAT_UNIT_TYPE_PLAYER,
    2000,
    12345,
    54125
  )
  testOthers(
    ACTION_RESULT_BEGIN,
    "True Shot",
    "Not Kyzer",
    COMBAT_UNIT_TYPE_GROUP,
    2000,
    67890,
    54125
  )

  testOthers(
    ACTION_RESULT_BEGIN,
    "True Shot",
    "Kyrozan",
    COMBAT_UNIT_TYPE_PLAYER,
    2000,
    12345,
    184802
  )
  testOthers(
    ACTION_RESULT_BEGIN,
    "True Shot",
    "Not Kyzer",
    COMBAT_UNIT_TYPE_GROUP,
    2000,
    67890,
    184802
  )
}
