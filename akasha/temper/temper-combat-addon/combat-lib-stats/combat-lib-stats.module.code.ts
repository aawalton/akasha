import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED,
  LIBCOMBAT_STAT_CRITICALRESISTANCE,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
  LIBCOMBAT_STAT_PHYSICALRESISTANCE,
  LIBCOMBAT_STAT_SPELLCRIT,
  LIBCOMBAT_STAT_SPELLCRITBONUS,
  LIBCOMBAT_STAT_SPELLPENETRATION,
  LIBCOMBAT_STAT_SPELLPOWER,
  LIBCOMBAT_STAT_SPELLRESISTANCE,
  LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE,
  LIBCOMBAT_STAT_WEAPONCRIT,
  LIBCOMBAT_STAT_WEAPONCRITBONUS,
  LIBCOMBAT_STAT_WEAPONPENETRATION,
  LIBCOMBAT_STAT_WEAPONPOWER,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  DATA,
  EVENT_GROUP_ACTIVE,
  getCurrentFight,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { getShadowBonus } from "@akasha/temper-combat-addon/combat-lib-stats-boss"
import type { Fight } from "@akasha/temper-combat-addon/combat-lib-types"

function getStat(stat: number | undefined): number {
  if (stat === undefined) {
    error("lib-combat: missing derived stat id")
  }
  return GetPlayerStat(stat, STAT_BONUS_OPTION_APPLY_BONUS)
}

let TFS_BONUS = 0

function getPenetrationStat(stat: number | undefined): number {
  return getStat(stat) + TFS_BONUS
}

function getCritStat(stat: number | undefined): number {
  const maxcrit = zo_floor(100 / GetCriticalStrikeChance(1))
  return zo_min(getStat(stat), maxcrit)
}

function getCritbonus(): number {
  const [, , valueFromZos] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE)
  if (valueFromZos === undefined) {
    error("lib-combat: critical damage advanced stat has no percent value")
  }
  const total = 50 + valueFromZos + DATA.backstabber + DATA.critBonusMundus

  return total
}

function getStatusEffectChance(): number {
  const seBonus = DATA.statusEffectBonus
  if (seBonus === undefined) {
    error("lib-combat: statusEffectBonus accessed before initStatusEffectBonuses")
  }
  const weaponPair = GetHeldWeaponPair()
  const hotBar = weaponPair >= 1 ? weaponPair - 1 : undefined
  const arcanistBonus = (hotBar !== undefined ? seBonus.arcanistBonus[hotBar] : undefined) ?? 0
  const chargedBonus = (hotBar !== undefined ? seBonus.charged[hotBar] : undefined) ?? 0
  const destroBonus = (hotBar !== undefined ? seBonus.destro[hotBar] : undefined) ?? 0
  const cpBonus = seBonus.CP
  const feBonus = seBonus.focusedEfforts

  let wealdBonus = 0
  if (seBonus.wealdBonus > 0) {
    const [, , , numEquipped] = GetItemSetInfo(757)
    if (numEquipped >= 5) {
      const [current, maxHealth] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)
      if (current / maxHealth > 0.5) {
        wealdBonus = seBonus.wealdBonus
      }
    }
  }

  const totalBonus = arcanistBonus + chargedBonus + destroBonus + wealdBonus + feBonus + cpBonus

  return totalBonus
}

const STAT_DATA: Record<number, number> = {
  [LIBCOMBAT_STAT_MAXMAGICKA]: 0,
  [LIBCOMBAT_STAT_SPELLPOWER]: 0,
  [LIBCOMBAT_STAT_SPELLCRIT]: 0,
  [LIBCOMBAT_STAT_SPELLCRITBONUS]: 0,
  [LIBCOMBAT_STAT_SPELLPENETRATION]: 0,

  [LIBCOMBAT_STAT_MAXSTAMINA]: 0,
  [LIBCOMBAT_STAT_WEAPONPOWER]: 0,
  [LIBCOMBAT_STAT_WEAPONCRIT]: 0,
  [LIBCOMBAT_STAT_WEAPONCRITBONUS]: 0,
  [LIBCOMBAT_STAT_WEAPONPENETRATION]: 0,

  [LIBCOMBAT_STAT_MAXHEALTH]: 0,
  [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: 0,
  [LIBCOMBAT_STAT_SPELLRESISTANCE]: 0,
  [LIBCOMBAT_STAT_CRITICALRESISTANCE]: 0,
  [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: 0,
}

const STAT_SOURCE_FUNCTIONS: Record<number, (this: void, zoStat: number | undefined) => number> = {
  [LIBCOMBAT_STAT_MAXMAGICKA]: getStat,
  [LIBCOMBAT_STAT_SPELLPOWER]: getStat,
  [LIBCOMBAT_STAT_SPELLCRIT]: getCritStat,
  [LIBCOMBAT_STAT_SPELLCRITBONUS]: getCritbonus,
  [LIBCOMBAT_STAT_SPELLPENETRATION]: getPenetrationStat,

  [LIBCOMBAT_STAT_MAXSTAMINA]: getStat,
  [LIBCOMBAT_STAT_WEAPONPOWER]: getStat,
  [LIBCOMBAT_STAT_WEAPONCRIT]: getCritStat,
  [LIBCOMBAT_STAT_WEAPONCRITBONUS]: getCritbonus,
  [LIBCOMBAT_STAT_WEAPONPENETRATION]: getPenetrationStat,

  [LIBCOMBAT_STAT_MAXHEALTH]: getStat,
  [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: getStat,
  [LIBCOMBAT_STAT_SPELLRESISTANCE]: getStat,
  [LIBCOMBAT_STAT_CRITICALRESISTANCE]: getStat,
  [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: getStatusEffectChance,
}

const ZO_DERIVED_STAT_IDS: Record<number, number> = {
  [LIBCOMBAT_STAT_MAXMAGICKA]: STAT_MAGICKA_MAX,
  [LIBCOMBAT_STAT_SPELLPOWER]: STAT_SPELL_POWER,
  [LIBCOMBAT_STAT_SPELLCRIT]: STAT_SPELL_CRITICAL,
  [LIBCOMBAT_STAT_SPELLPENETRATION]: STAT_SPELL_PENETRATION,

  [LIBCOMBAT_STAT_MAXSTAMINA]: STAT_STAMINA_MAX,
  [LIBCOMBAT_STAT_WEAPONPOWER]: STAT_POWER,
  [LIBCOMBAT_STAT_WEAPONCRIT]: STAT_CRITICAL_STRIKE,
  [LIBCOMBAT_STAT_WEAPONPENETRATION]: STAT_PHYSICAL_PENETRATION,

  [LIBCOMBAT_STAT_MAXHEALTH]: STAT_HEALTH_MAX,
  [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: STAT_PHYSICAL_RESIST,
  [LIBCOMBAT_STAT_SPELLRESISTANCE]: STAT_SPELL_RESIST,
  [LIBCOMBAT_STAT_CRITICALRESISTANCE]: STAT_CRITICAL_RESISTANCE,
}

function getSingleStat(statId: number): number {
  const source = STAT_SOURCE_FUNCTIONS[statId]
  if (source === undefined) {
    error("lib-combat: unknown stat id")
  }
  return source(ZO_DERIVED_STAT_IDS[statId])
}

function getStats(): Record<number, number> {
  for (const [statId] of pairs(STAT_DATA)) {
    STAT_DATA[statId] = getSingleStat(statId)
  }
  return STAT_DATA
}

export function onTFSChanged(
  this: void,
  _eventCode: number | undefined,
  changeType: number,
  _effectSlot: number | undefined,
  _effectName: string | undefined,
  _unitTag: string | undefined,
  _beginTime: number | undefined,
  _endTime: number | undefined,
  stackCount: number
): undefined {
  if (
    (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) &&
    stackCount > 1
  ) {
    TFS_BONUS = (stackCount - 1) * 544
  } else {
    TFS_BONUS = 0
  }
  getNewStats(getCurrentFight())
  return undefined
}

export function initAdvancedStats(): undefined {
  return undefined
}

function getAdvancedStats(): Record<number, Record<number, number>> {
  return {}
}

let LAST_UPDATE_SINGLE_STATS_CALL = 0

export function updateSingleStat(fight: Fight, statId: number, timems?: number): undefined {
  if (EVENT_GROUP_ACTIVE["Stats"] !== true) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForUpdate(`${LIB_EVENT_NAMESPACE}_Stats_Single`)

  const now = timems ?? GetGameTimeMilliseconds()
  const lastcalldelta = now - LAST_UPDATE_SINGLE_STATS_CALL

  if (lastcalldelta < 100) {
    EVENT_MANAGER.RegisterForUpdate(
      `${LIB_EVENT_NAMESPACE}_Stats_Single`,
      100 - lastcalldelta,
      () => {
        updateSingleStat(fight, statId, undefined)
      }
    )
    return undefined
  }

  LAST_UPDATE_SINGLE_STATS_CALL = now
  const stats = DATA.stats
  const oldValue = stats[statId]
  const newValue = getSingleStat(statId)
  const delta = oldValue !== undefined ? newValue - oldValue : 0
  if (oldValue === undefined || delta !== 0) {
    fireCombatEvent(LIBCOMBAT_EVENT_PLAYERSTATS, now, delta, newValue, statId)
    stats[statId] = newValue
  }
  return undefined
}

let LAST_GET_NEW_STATS_CALL = 0

export function getNewStats(fight: Fight, timems?: number): undefined {
  if (EVENT_GROUP_ACTIVE["Stats"] !== true) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForUpdate(`${LIB_EVENT_NAMESPACE}_Stats`)

  const now = timems ?? GetGameTimeMilliseconds()
  const lastcalldelta = now - LAST_GET_NEW_STATS_CALL

  if (lastcalldelta < 100) {
    EVENT_MANAGER.RegisterForUpdate(`${LIB_EVENT_NAMESPACE}_Stats`, 100 - lastcalldelta, () => {
      getNewStats(fight)
    })
    return undefined
  }

  LAST_GET_NEW_STATS_CALL = now
  const stats = DATA.stats

  for (const [statId, newValue] of pairs(getStats())) {
    const oldValue = stats[statId]
    const delta = oldValue !== undefined ? newValue - oldValue : 0
    if (oldValue === undefined || delta !== 0) {
      fireCombatEvent(LIBCOMBAT_EVENT_PLAYERSTATS, now, delta, newValue, statId)
      stats[statId] = newValue
    }
  }

  if (EVENT_GROUP_ACTIVE["AdvancedStats"] !== true) {
    return undefined
  }
  const advancedStats = DATA.advancedStats

  for (const [statId, values] of pairs(getAdvancedStats())) {
    let oldValues = advancedStats[statId]
    if (oldValues === undefined) {
      oldValues = {}
      advancedStats[statId] = oldValues
    }
    const newValue1 = values[1]
    const newValue2 = values[2]

    if (newValue1 !== undefined) {
      const oldValue = oldValues[1]
      const delta = oldValue !== undefined ? newValue1 - oldValue : 0

      if (oldValue === undefined || delta !== 0) {
        fireCombatEvent(LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED, now, delta, newValue1, statId)
        oldValues[1] = newValue1
      }
    }

    if (newValue2 !== undefined) {
      const oldValue = oldValues[2]
      const delta = oldValue !== undefined ? newValue2 - oldValue : 0

      if (oldValue === undefined || delta !== 0) {
        fireCombatEvent(LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED, now, delta, newValue2, statId + 2048)
        oldValues[2] = newValue2
      }
    }
  }
  return undefined
}

export function onShadowMundus(
  this: void,
  _eventCode: number,
  changeType: number,
  effectSlot: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    getShadowBonus(effectSlot)
  } else if (changeType === EFFECT_RESULT_FADED) {
    DATA.critBonusMundus = 0
  }

  const currentfight = getCurrentFight()
  if (currentfight.prepared === true) {
    getNewStats(currentfight)
  }
  return undefined
}
