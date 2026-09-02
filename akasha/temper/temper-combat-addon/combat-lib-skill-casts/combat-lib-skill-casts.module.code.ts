import {
  ABILITY_ADDITIONS_REVERSE,
  ABILITY_CONVERSIONS,
  DIRECT_HEAVY_ATTACKS,
  VALID_NON_PROJECTILE_SKILL_START_RESULTS,
  VALID_SKILL_END_RESULTS,
  VALID_SKILL_START_RESULTS,
} from "@akasha/temper-combat-addon/combat-lib-ability-tables"
import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ABILITY_RESOURCE_CACHE_SIZE,
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL,
  LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION,
  LIBCOMBAT_SKILLSTATUS_INSTANT,
  LIBCOMBAT_SKILLSTATUS_REGISTERED,
  LIBCOMBAT_SKILLSTATUS_SUCCESS,
  maxSkillDelay,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_VERBOSE, log } from "@akasha/temper-combat-addon/combat-lib-log"
import {
  getCurrentSkillBars,
  ID_TO_REDUCED_SLOT,
} from "@akasha/temper-combat-addon/combat-lib-skill-bars"
import {
  DATA,
  EVENT_GROUP_ACTIVE,
  IS_PROJECTILE,
  LAST_ABILITY_ACTIVATIONS,
  LAST_QUEUED_ABILITIES,
  USED_CAST_TIME_ABILITY,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { getSlottedAbilityId } from "@akasha/temper-combat-addon/combat-lib-stats-boss"

let heavyAttackCharging: number | undefined

function getReducedSlotId(reducedslot: number): number | undefined {
  const bar = zo_floor(reducedslot / 10) + 1
  const slot = reducedslot % 10

  const barTable = DATA.skillBars[bar]
  return barTable !== undefined ? barTable[slot] : undefined
}

function getReducedSlot(abilityId: number): number | undefined {
  let reducedslot = ID_TO_REDUCED_SLOT[abilityId]
  if (reducedslot === undefined) {
    const reverseId = ABILITY_ADDITIONS_REVERSE[abilityId]
    if (reverseId !== undefined) {
      reducedslot = ID_TO_REDUCED_SLOT[reverseId]
    }
  }
  return reducedslot
}

export function onAbilityUsed(
  this: void,
  _eventCode: number,
  result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  targetName: string,
  _targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  const validStart =
    VALID_SKILL_START_RESULTS[result] === true ||
    (VALID_NON_PROJECTILE_SKILL_START_RESULTS[result] === true && IS_PROJECTILE[abilityId] !== true)

  if (EVENT_GROUP_ACTIVE["Skills"] !== true || DATA.inCombat === false || !validStart) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  const lasttime = LAST_ABILITY_ACTIVATIONS[abilityId]
  if (lasttime === undefined || timems - lasttime > maxSkillDelay) {
    return undefined
  }

  delete LAST_ABILITY_ACTIVATIONS[abilityId]

  const reducedslot = getReducedSlot(abilityId)
  if (reducedslot === undefined) {
    error("lib-combat: ability used without slot mapping")
  }

  const origId = getReducedSlotId(reducedslot)
  if (origId === undefined) {
    error("lib-combat: ability used without slotted origin skill")
  }

  const [channeled, castTimeRaw] = GetAbilityCastInfo(origId, undefined, "player")
  const castTime = castTimeRaw ?? 0

  log(
    "events",
    LOG_LEVEL_VERBOSE,
    "[%.3f] Skill fired: %s (%d), Duration: %ds Target: %s",
    timems / 1000,
    GetAbilityName(origId),
    origId,
    castTime / 1000,
    tostring(targetName)
  )

  heavyAttackCharging = DIRECT_HEAVY_ATTACKS[origId] === true ? origId : undefined

  const lastQ = LAST_QUEUED_ABILITIES[origId]
  delete LAST_QUEUED_ABILITIES[origId]

  if (lastQ !== undefined) {
    log(
      "events",
      LOG_LEVEL_VERBOSE,
      "%s: act: %d, Q: %d, Diff: %d",
      getFormattedAbilityName(origId),
      timems - lasttime,
      timems - lastQ,
      lastQ - lasttime
    )
  }

  const skillExecution = lastQ !== undefined ? math.max(lastQ, lasttime) : lasttime
  let skillDelay: number | undefined = timems - skillExecution

  if (skillDelay >= maxSkillDelay) {
    skillDelay = undefined
  }

  if (castTime > 0) {
    const status =
      channeled === true
        ? LIBCOMBAT_SKILLSTATUS_BEGIN_CHANNEL
        : LIBCOMBAT_SKILLSTATUS_BEGIN_DURATION

    fireCombatEvent(
      LIBCOMBAT_EVENT_SKILL_TIMINGS,
      timems,
      reducedslot,
      origId,
      status,
      skillDelay,
      hitValue
    )

    const conversion = ABILITY_CONVERSIONS[origId]
    const convertedId = (conversion !== undefined ? conversion[2] : undefined) ?? abilityId

    USED_CAST_TIME_ABILITY[convertedId] = true
  } else {
    fireCombatEvent(
      LIBCOMBAT_EVENT_SKILL_TIMINGS,
      timems,
      reducedslot,
      origId,
      LIBCOMBAT_SKILLSTATUS_INSTANT,
      skillDelay
    )
  }
  return undefined
}

export function onAbilityFinished(
  this: void,
  _eventCode: number,
  result: number,
  _isError: boolean | undefined,
  _abilityName: string | undefined,
  _abilityGraphic: number | undefined,
  _abilityActionSlotType: number,
  _sourceName: string | undefined,
  _sourceType: number | undefined,
  _targetName: string | undefined,
  _targetType: number | undefined,
  hitValue: number | undefined,
  _powerType: number | undefined,
  _damageType: number | undefined,
  _log: boolean | undefined,
  _sourceUnitId: number | undefined,
  _targetUnitId: number | undefined,
  abilityId: number
): undefined {
  const timems = GetGameTimeMilliseconds()

  const reducedslot = getReducedSlot(abilityId)
  if (reducedslot === undefined) {
    error("lib-combat: ability finished without slot mapping")
  }

  const origId = getReducedSlotId(reducedslot)

  const conversion = origId !== undefined ? ABILITY_CONVERSIONS[origId] : undefined
  const specialResult = (conversion !== undefined ? conversion[3] : undefined) ?? false

  if (
    (VALID_SKILL_END_RESULTS[result] !== true && result !== specialResult) ||
    (abilityId === 46324 && hitValue !== undefined && hitValue > 1)
  ) {
    return undefined
  }

  if (USED_CAST_TIME_ABILITY[abilityId] === true) {
    log(
      "events",
      LOG_LEVEL_VERBOSE,
      "Skill finished: %s (%d, R: %d)",
      GetAbilityName(origId ?? 0),
      origId,
      result
    )

    fireCombatEvent(
      LIBCOMBAT_EVENT_SKILL_TIMINGS,
      timems,
      reducedslot,
      origId,
      LIBCOMBAT_SKILLSTATUS_SUCCESS
    )
  }
  return undefined
}

const POWER_TYPE_CACHE: Record<number, Record<number, number>> = {}

function getPowerTypes(abilityId: number): Record<number, number> {
  let cached = POWER_TYPE_CACHE[abilityId]

  if (cached === undefined) {
    const newData: Record<number, number> = {}
    let lastPowerType: number | undefined

    for (let i = 1; i <= 4; i++) {
      const powerType = GetNextAbilityMechanicFlag(abilityId, lastPowerType)

      if (
        powerType !== undefined &&
        (powerType === COMBAT_MECHANIC_FLAGS_HEALTH ||
          powerType === COMBAT_MECHANIC_FLAGS_MAGICKA ||
          powerType === COMBAT_MECHANIC_FLAGS_STAMINA)
      ) {
        newData[powerType] = GetAbilityCost(abilityId, powerType, undefined, "player")
        lastPowerType = powerType
      } else if (powerType === undefined) {
        break
      }
    }

    POWER_TYPE_CACHE[abilityId] = newData
    cached = newData
  }

  return cached
}

export function onSlotUsed(this: void, _eventCode: number, slot: number): undefined {
  if (DATA.inCombat === false || slot > 8) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()
  const [abilityId] = getSlottedAbilityId(slot)

  const powerTypes = getPowerTypes(abilityId)
  const lastabilities = DATA.lastabilities

  if (EVENT_GROUP_ACTIVE["Resources"] === true && slot > 2 && NonContiguousCount(powerTypes) > 0) {
    for (const [powerType, cost] of pairs(powerTypes)) {
      lastabilities[lastabilities.length] = [timems, abilityId, -cost, powerType]
    }

    if (lastabilities.length > ABILITY_RESOURCE_CACHE_SIZE) {
      table.remove(lastabilities, 1)
    }
  }

  if (EVENT_GROUP_ACTIVE["Skills"] === true) {
    const conversion = ABILITY_CONVERSIONS[abilityId]
    const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? abilityId

    if (heavyAttackCharging === abilityId) {
      onAbilityFinished(
        EVENT_COMBAT_EVENT,
        ACTION_RESULT_EFFECT_FADED,
        undefined,
        undefined,
        undefined,
        ACTION_SLOT_TYPE_HEAVY_ATTACK,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        convertedId
      )
      heavyAttackCharging = undefined
    } else {
      LAST_ABILITY_ACTIVATIONS[convertedId] = timems
      heavyAttackCharging = undefined

      const reducedslot = (DATA.bar - 1) * 10 + slot

      fireCombatEvent(
        LIBCOMBAT_EVENT_SKILL_TIMINGS,
        timems,
        reducedslot,
        abilityId,
        LIBCOMBAT_SKILLSTATUS_REGISTERED
      )
    }
  }
  return undefined
}

let LAST_SKILL_BAR_UPDATE = 0

export function getCurrentSkillBarsDelayed(this: void): undefined {
  const timems = GetGameTimeMilliseconds()
  if (timems - LAST_SKILL_BAR_UPDATE < 400) {
    return undefined
  }
  LAST_SKILL_BAR_UPDATE = timems

  zo_callLater(getCurrentSkillBars, 400)
  return undefined
}

export function onSlotUpdate(this: void, _eventCode: number, slotNum: number): undefined {
  if (slotNum === 1 || slotNum === 2) {
    return undefined
  }
  getCurrentSkillBarsDelayed()
  return undefined
}
