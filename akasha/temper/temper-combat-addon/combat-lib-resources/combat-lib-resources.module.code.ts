import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ABILITY_RESOURCE_CACHE_SIZE,
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_QUICKSLOT,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_DEBUG, LOG_LEVEL_INFO, log } from "@akasha/temper-combat-addon/combat-lib-log"
import type { CombatEventHandler } from "@akasha/temper-combat-addon/combat-lib-message-types"
import { DATA, getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import { updateSingleStat } from "@akasha/temper-combat-addon/combat-lib-stats"
import {
  getUnitCache,
  updateUnitCacheResource,
} from "@akasha/temper-combat-addon/combat-lib-unit-cache"

function getStat(stat: number): number {
  return GetPlayerStat(stat, STAT_BONUS_OPTION_APPLY_BONUS)
}

const SPRINT_STATE_ACTIVE = 1
const SPRINT_STATE_NONE = 0

function getPlayerSprintState(): number {
  const hotbarCategory = GetActiveHotbarCategory()

  for (let slot = 3; slot <= 8; slot++) {
    const button = ZO_ActionBar_GetButton(slot, hotbarCategory)
    if (button !== undefined && button.usable === true) {
      return SPRINT_STATE_NONE
    }
  }

  return SPRINT_STATE_ACTIVE
}

function checkLastAbilities(
  timems: number,
  powerType: number,
  powerValueChange: number,
  powerValue: number
): LuaMultiReturn<[number, number | undefined]> {
  const lastabilities = DATA.lastabilities
  let abilityId = -1
  let adjustedPowerValueChange: number | undefined

  for (let i = lastabilities.length - 1; i >= 0; i--) {
    const values = lastabilities[i]
    if (values === undefined) {
      continue
    }

    if (powerType === values[3]) {
      const ratio = powerValueChange / values[2]
      const goodratio = ratio >= 0.98 && ratio <= 1.06

      if (goodratio) {
        abilityId = values[1]
        table.remove(lastabilities, i + 1)
        break
      } else if (values[1] === 58431 && GetAllyUnitBlockState("player") === BLOCK_STATE_ACTIVE) {
        const [, blockCost] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST)

        const combinedPowerValueChange = values[2] - (blockCost ?? 0)
        const combinedRatio = powerValueChange / combinedPowerValueChange
        const goodCombinedRatio = combinedRatio >= 0.98 && combinedRatio <= 1.06

        if (goodCombinedRatio) {
          abilityId = 23542
          adjustedPowerValueChange = -(blockCost ?? 0)
          table.remove(lastabilities, i + 1)

          fireCombatEvent(
            LIBCOMBAT_EVENT_RESOURCES,
            timems,
            values[1],
            values[2],
            powerType,
            powerValue - adjustedPowerValueChange
          )
          break
        }
      }
    }

    if (values[0] - timems > 1000) {
      break
    }
  }

  return $multi(abilityId, adjustedPowerValueChange)
}

function checkForCombatActions(powerValueChange: number): number | undefined {
  if (powerValueChange > 0) {
    return -1
  }

  if (GetAllyUnitBlockState("player") === BLOCK_STATE_ACTIVE) {
    const [, blockCost] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST)
    const blockRatio = (blockCost ?? 0) / -powerValueChange
    if (blockRatio >= 0.98 && blockRatio <= 1.02) {
      log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Block)", powerValueChange)
      return 23542
    }
  }

  const [, bashCost] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_BASH_COST)
  const bashRatio = (bashCost ?? 0) / -powerValueChange
  if (bashRatio >= 0.98 && bashRatio <= 1.02) {
    log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Bash)", powerValueChange)
    return 21970
  }

  const [, dodgeCost] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_DODGE_COST)
  const dodgeRatio = (dodgeCost ?? 0) / -powerValueChange
  if (dodgeRatio >= 0.98 && dodgeRatio <= 1.02) {
    log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Dodge)", powerValueChange)
    return 28549
  }

  const [, breakFreeCost] = GetAdvancedStatValue(ADVANCED_STAT_DISPLAY_TYPE_CC_BREAK_COST)
  const breakFreeRatio = (breakFreeCost ?? 0) / -powerValueChange
  if (breakFreeRatio >= 0.98 && breakFreeRatio <= 1.02) {
    log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Break Free)", powerValueChange)
    return 16565
  }

  if (
    GetUnitStealthState("player") === STEALTH_STATE_HIDING ||
    (GetUnitStealthState("player") === STEALTH_STATE_HIDDEN &&
      powerValueChange < 0 &&
      powerValueChange > -20)
  ) {
    log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Sneak)", powerValueChange)
    return 20299
  }

  if (
    getPlayerSprintState() === SPRINT_STATE_ACTIVE &&
    powerValueChange < 0 &&
    powerValueChange > -20
  ) {
    log("events", LOG_LEVEL_DEBUG, "Skill cost: %d Stamina (Sprint)", powerValueChange)
    return 15617
  }
  return undefined
}

function onBaseResourceChanged(
  powerType: number,
  powerValue: number,
  powerValueChange: number
): undefined {
  const timems = GetGameTimeMilliseconds()
  let abilityId: number | undefined

  if (powerType === COMBAT_MECHANIC_FLAGS_MAGICKA) {
    const regenerationTick = getStat(STAT_MAGICKA_REGEN_COMBAT)

    log("events", LOG_LEVEL_DEBUG, "Magicka change: %d", powerValueChange)

    const [matchedId] = checkLastAbilities(timems, powerType, powerValueChange, powerValue)
    abilityId = matchedId

    if (
      (abilityId === -1 && powerValueChange === regenerationTick) ||
      (powerValueChange > 0 &&
        powerValueChange <= regenerationTick &&
        powerValue === DATA.stats[LIBCOMBAT_STAT_MAXMAGICKA])
    ) {
      abilityId = 0
      log("events", LOG_LEVEL_DEBUG, "Magicka Regeneration  (%d)", powerValueChange)
    } else if (abilityId === -1) {
      const [combinedId] = checkLastAbilities(
        timems,
        powerType,
        powerValueChange + regenerationTick,
        powerValue
      )
      abilityId = combinedId

      if (abilityId !== -1) {
        fireCombatEvent(
          LIBCOMBAT_EVENT_RESOURCES,
          timems,
          0,
          regenerationTick,
          powerType,
          powerValue + regenerationTick
        )
        powerValueChange = powerValueChange - regenerationTick
      }
    }
  } else if (powerType === COMBAT_MECHANIC_FLAGS_STAMINA) {
    const regenerationTick = getStat(STAT_STAMINA_REGEN_COMBAT)
    log("events", LOG_LEVEL_DEBUG, "Stamina change: %d", powerValueChange)

    const [matchedId, adjusted] = checkLastAbilities(
      timems,
      powerType,
      powerValueChange,
      powerValue
    )
    abilityId = matchedId
    if (adjusted !== undefined) {
      powerValueChange = adjusted
    }

    if (
      (abilityId === -1 && powerValueChange === regenerationTick) ||
      (powerValueChange > 0 &&
        powerValueChange <= regenerationTick &&
        powerValue === DATA.stats[LIBCOMBAT_STAT_MAXMAGICKA])
    ) {
      abilityId = 0
      log("events", LOG_LEVEL_DEBUG, "Stamina Regeneration (%d)", powerValueChange)
    } else if (abilityId === -1) {
      abilityId = checkForCombatActions(powerValueChange)

      if (abilityId === -1) {
        const [combinedId, combinedAdjusted] = checkLastAbilities(
          timems,
          powerType,
          powerValueChange + regenerationTick,
          powerValue
        )
        abilityId = combinedId
        if (combinedAdjusted !== undefined) {
          powerValueChange = combinedAdjusted
        }
        if (abilityId !== -1) {
          fireCombatEvent(
            LIBCOMBAT_EVENT_RESOURCES,
            timems,
            0,
            regenerationTick,
            powerType,
            powerValue + regenerationTick
          )
          powerValueChange = powerValueChange - regenerationTick
        }
      }
    }
  } else if (powerType === COMBAT_MECHANIC_FLAGS_ULTIMATE) {
    abilityId = 0
  } else if (powerType === COMBAT_MECHANIC_FLAGS_HEALTH) {
    abilityId = -1

    if (powerValueChange === getStat(STAT_HEALTH_REGEN_COMBAT) && DATA.playerid != null) {
      abilityId = 0
      fireCombatEvent(
        LIBCOMBAT_EVENT_HEAL_SELF,
        timems,
        ACTION_RESULT_HOT_TICK,
        DATA.playerid,
        DATA.playerid,
        abilityId,
        powerValueChange,
        powerType,
        0
      )
      return undefined
    }
  }

  log(
    "events",
    LOG_LEVEL_DEBUG,
    "Resource: %s (%d): %d (%d) --> %d",
    getFormattedAbilityName(abilityId),
    abilityId ?? -100,
    powerValueChange,
    powerType,
    powerValue
  )
  fireCombatEvent(
    LIBCOMBAT_EVENT_RESOURCES,
    timems,
    abilityId,
    powerValueChange,
    powerType,
    powerValue
  )
  return undefined
}

export function onBaseResourceChangedDelayed(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  powerType: number,
  powerValue: number,
  _powerMax: number,
  _powerEffectiveMax: number
): undefined {
  if (unitTag !== "player" || DATA.inCombat === false) {
    return undefined
  }
  if (
    powerType !== COMBAT_MECHANIC_FLAGS_HEALTH &&
    powerType !== COMBAT_MECHANIC_FLAGS_MAGICKA &&
    powerType !== COMBAT_MECHANIC_FLAGS_STAMINA &&
    powerType !== COMBAT_MECHANIC_FLAGS_ULTIMATE
  ) {
    return undefined
  }

  const newValue = powerValue
  const oldValue = DATA.resources[powerType]
  DATA.resources[powerType] = newValue
  if (oldValue === undefined || oldValue === newValue) {
    return undefined
  }

  const powerValueChange = newValue - oldValue
  if (
    powerType === COMBAT_MECHANIC_FLAGS_HEALTH &&
    DATA.statusEffectBonus !== undefined &&
    DATA.statusEffectBonus.wealdBonus > 0
  ) {
    updateSingleStat(getCurrentFight(), LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE)
  }

  log(
    "events",
    LOG_LEVEL_DEBUG,
    "onBaseResourceChangedDelayed: %s, %d, %d",
    unitTag,
    powerType,
    powerValueChange
  )
  zo_callLater(() => {
    onBaseResourceChanged(powerType, newValue, powerValueChange)
  }, 0)
  return undefined
}

export function onResourceChanged(this: void, ...args: Parameters<CombatEventHandler>): undefined {
  const [, result, , , , , , , targetName, , hitValue, powerType, , , , targetUnitId, abilityId] =
    args
  let powerValueChange = hitValue

  if (DATA.playerid === undefined && targetName === DATA.rawPlayername) {
    DATA.playerid = targetUnitId
  }
  if (
    (powerType !== COMBAT_MECHANIC_FLAGS_MAGICKA && powerType !== COMBAT_MECHANIC_FLAGS_STAMINA) ||
    DATA.inCombat === false ||
    powerValueChange < 1
  ) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()
  const lastabilities = DATA.lastabilities

  if (result === ACTION_RESULT_POWER_DRAIN) {
    powerValueChange = -powerValueChange
  }
  lastabilities[lastabilities.length] = [timems, abilityId, powerValueChange, powerType]
  if (lastabilities.length > ABILITY_RESOURCE_CACHE_SIZE) {
    table.remove(lastabilities, 1)
  }
  return undefined
}

export function onBaseResourceChangedGroup(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  powerType: number,
  powerValue: number,
  powerMax: number,
  _powerEffectiveMax: number
): undefined {
  const unitId = unitTag === "player" ? DATA.playerid : DATA.groupInfo.tagToId[unitTag]

  const cache = getUnitCache(unitId)
  if (cache !== undefined) {
    updateUnitCacheResource(cache, powerType, powerValue, powerMax)
  }
  return undefined
}

export function onQuickSlotChanged(
  this: void,
  _eventCode: number,
  actionSlotIndex: number
): undefined {
  DATA.currentQuickslotIndex = actionSlotIndex
  const itemLink = GetSlotItemLink(DATA.currentQuickslotIndex, HOTBAR_CATEGORY_QUICKSLOT_WHEEL)
  log("debug", LOG_LEVEL_INFO, "Quickslot New: %s", itemLink, actionSlotIndex)
  return undefined
}

export function onQuickSlotUsed(
  this: void,
  _eventCode: number,
  itemSoundCategory: number
): undefined {
  const timems = GetGameTimeMilliseconds()
  const itemLink = GetSlotItemLink(DATA.currentQuickslotIndex, HOTBAR_CATEGORY_QUICKSLOT_WHEEL)
  log("debug", LOG_LEVEL_INFO, "Used: %s", itemLink)
  if (
    itemSoundCategory !==
    GetSlotItemSound(DATA.currentQuickslotIndex, HOTBAR_CATEGORY_QUICKSLOT_WHEEL)
  ) {
    return undefined
  }
  fireCombatEvent(LIBCOMBAT_EVENT_QUICKSLOT, timems, itemLink)
  return undefined
}
