import {
  ABILITY_ADDITIONS,
  ABILITY_CONVERSIONS,
} from "@akasha/temper-combat-addon/combat-lib-ability-tables"
import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_MESSAGE_WEAPONSWAP,
  LIBCOMBAT_SKILLSTATUS_QUEUE,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
  log,
} from "@akasha/temper-combat-addon/combat-lib-log"
import type { SkillRegistrationData } from "@akasha/temper-combat-addon/combat-lib-message-types"
import {
  DATA,
  EVENT_GROUP_ACTIVE,
  getCurrentFight,
  IS_PROJECTILE,
  LAST_QUEUED_ABILITIES,
  setSlotSkills,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { getNewStats } from "@akasha/temper-combat-addon/combat-lib-stats"
import { getSlottedAbilityId } from "@akasha/temper-combat-addon/combat-lib-stats-boss"

export const ID_TO_REDUCED_SLOT: Record<number, number> = {}

let skillsGroupUpdateHook: ((this: void) => void) | undefined

export function setSkillsGroupUpdateHook(fn: (this: void) => void): undefined {
  skillsGroupUpdateHook = fn
}

function getSkillRegistrationData(abilityId: number): SkillRegistrationData {
  const [channeled, castTimeRaw] = GetAbilityCastInfo(abilityId, undefined, "player")
  const castTime = castTimeRaw ?? 0

  const conversion = ABILITY_CONVERSIONS[abilityId]

  const result =
    (conversion !== undefined ? conversion[1] : undefined) ??
    (castTime > 0 ? ACTION_RESULT_BEGIN : undefined)

  const result2 =
    (conversion !== undefined ? conversion[3] : undefined) ??
    (castTime > 0
      ? ACTION_RESULT_EFFECT_GAINED
      : channeled === true
        ? ACTION_RESULT_EFFECT_FADED
        : undefined)

  const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? abilityId
  const convertedId2 = (conversion !== undefined ? conversion[2] : undefined) ?? abilityId

  if (result2 !== undefined) {
    return [convertedId, result, convertedId2, result2]
  }
  return [convertedId, result]
}

function updateSlotSkillEvents(): undefined {
  if (EVENT_GROUP_ACTIVE["Skills"] !== true) {
    return undefined
  }

  const newSlotSkills: SkillRegistrationData[] = []
  setSlotSkills(newSlotSkills)

  const registeredIds: Record<number, boolean> = {}

  for (const [, bar] of pairs(DATA.skillBars)) {
    for (const [, abilityId] of pairs(bar)) {
      if (registeredIds[abilityId] === undefined) {
        registeredIds[abilityId] = true

        newSlotSkills[newSlotSkills.length] = getSkillRegistrationData(abilityId)

        const addition = ABILITY_ADDITIONS[abilityId]
        if (addition !== undefined) {
          newSlotSkills[newSlotSkills.length] = getSkillRegistrationData(addition)
        }
      }
    }
  }

  if (skillsGroupUpdateHook === undefined) {
    error("lib-combat: skills group update hook not wired")
  }
  skillsGroupUpdateHook()
  return undefined
}

export function getCurrentSkillBars(this: void): undefined {
  const skillBars = DATA.skillBars
  const scribedSkills = DATA.scribedSkills
  const bar = DATA.bar

  const currentbar: Record<number, number> = {}
  skillBars[bar] = currentbar
  const hotbarCategory = GetActiveHotbarCategory()

  for (let i = 1; i <= 8; i++) {
    const [id, scribedAbilityId] = getSlottedAbilityId(i, hotbarCategory)
    currentbar[i] = id
    const reducedslot = (bar - 1) * 10 + i
    const conversion = ABILITY_CONVERSIONS[id]
    const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? id

    ID_TO_REDUCED_SLOT[convertedId] = reducedslot

    const convertedId2 = conversion !== undefined ? conversion[2] : undefined
    if (convertedId2 !== undefined) {
      ID_TO_REDUCED_SLOT[convertedId2] = reducedslot
    }
    if (scribedAbilityId !== undefined && scribedSkills[id] === undefined) {
      const [primaryScriptId, secondaryScriptId, tertiaryScriptId] =
        GetCraftedAbilityActiveScriptIds(scribedAbilityId)
      const scripts = [primaryScriptId, secondaryScriptId, tertiaryScriptId]
      scribedSkills[id] = scripts
      log("debug", LOG_LEVEL_DEBUG, "ScribedSkill: ", scribedAbilityId, ...scripts)
    }
  }
  updateSlotSkillEvents()
  return undefined
}

export function onWeaponSwap(this: void, _eventCode: number, _isHotbarSwap: boolean): undefined {
  const newbar = GetActiveHotbarCategory() + 1
  if (DATA.bar === newbar) {
    return undefined
  }

  DATA.bar = newbar
  getCurrentSkillBars()
  const currentfight = getCurrentFight()
  const inCombat = currentfight.prepared

  if (inCombat === true) {
    const timems = GetGameTimeMilliseconds()
    fireCombatEvent(LIBCOMBAT_EVENT_MESSAGES, timems, LIBCOMBAT_MESSAGE_WEAPONSWAP, DATA.bar)

    getNewStats(currentfight, timems)
  }
  return undefined
}

export function onQueueEvent(
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
  _targetUnitId: number,
  abilityId: number
): undefined {
  if (DATA.inCombat === false) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  const conversion = ABILITY_CONVERSIONS[abilityId]
  const convertedId = (conversion !== undefined ? conversion[0] : undefined) ?? abilityId

  const reducedslot = ID_TO_REDUCED_SLOT[convertedId]

  if (reducedslot === undefined) {
    log(
      "events",
      LOG_LEVEL_WARNING,
      "reducedslot missing on queue event: [%.3f s] %s (%d)",
      (timems - getCurrentFight().combatstart) / 1000,
      GetAbilityName(abilityId),
      abilityId
    )
    return undefined
  }

  LAST_QUEUED_ABILITIES[abilityId] = timems

  fireCombatEvent(
    LIBCOMBAT_EVENT_SKILL_TIMINGS,
    timems,
    reducedslot,
    abilityId,
    LIBCOMBAT_SKILLSTATUS_QUEUE
  )
  return undefined
}

export function onProjectileEvent(
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
  targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  _targetUnitId: number,
  abilityId: number
): undefined {
  if (
    hitValue <= 1 ||
    targetType === COMBAT_UNIT_TYPE_PLAYER ||
    IS_PROJECTILE[abilityId] === true
  ) {
    return undefined
  }

  IS_PROJECTILE[abilityId] = true

  log(
    "events",
    LOG_LEVEL_VERBOSE,
    "[%.3f s] projectile: %s (%d)",
    (GetGameTimeMilliseconds() - getCurrentFight().combatstart) / 1000,
    GetAbilityName(abilityId),
    abilityId
  )

  return undefined
}
