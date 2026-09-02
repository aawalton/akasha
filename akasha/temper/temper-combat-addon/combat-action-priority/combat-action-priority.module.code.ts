import {
  LEVEL_CRUX,
  LEVEL_DURATION_LONGER,
  LEVEL_DURATION_MATCH,
  LEVEL_EXACT,
  LEVEL_LOW_THRESHOLD,
  LEVEL_ROLE,
  LEVEL_SIDE_BUFF,
  LEVEL_STACK,
  LEVEL_STACK_LOW,
  LEVEL_TAIL,
} from "@akasha/temper-combat-addon/combat-action-levels"
import { compactAndSort } from "@akasha/temper-combat-addon/combat-action-safe-sort"
import type { Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

export type LfgRole = "dps" | "tank" | "heal"

function isOnPlayer(effect: Effect): boolean {
  return effect.unitTag === "player"
}

function isMajorMinorBuff(effect: Effect): boolean {
  const icon = effect.ability.icon
  return icon.includes("ability_buff_ma") || icon.includes("ability_buff_mi")
}

export function calcLevel(action: Action, effect: Effect, role: LfgRole): number {
  const level = computeLevel(action, effect, role)
  effect.level = level
  effect.levelIsLow = level >= LEVEL_LOW_THRESHOLD
  return level
}

function computeLevel(action: Action, effect: Effect, role: LfgRole): number {
  if (effect.isCrux) {
    return LEVEL_CRUX
  }

  let duration = action.duration > 0 ? action.duration : (action.inheritDuration ?? 0)
  if (duration === 0) {
    duration = action.descriptionDuration ?? 0
  }

  if (effect.ability.id === action.ability.id && effect.duration === duration) {
    return LEVEL_EXACT
  }

  if (isMajorMinorBuff(effect)) {
    if (action.duration === 0 || effect.duration !== action.duration) {
      return LEVEL_SIDE_BUFF
    }
  }

  if (action.stackEffect !== undefined && effect.ability.id === action.stackEffect.ability.id) {
    return LEVEL_STACK
  }

  if (action.stackEffect2 !== undefined && effect.ability.id === action.stackEffect2.ability.id) {
    return LEVEL_STACK_LOW
  }

  if ((role === "dps" || action.flags.forEnemy) && !action.flags.forArea) {
    if (!isOnPlayer(effect) && effect.duration > 0) {
      return LEVEL_ROLE
    }
  } else if (role === "tank") {
    if (isOnPlayer(effect)) {
      return LEVEL_ROLE
    }
  } else if (role === "heal" && !action.flags.forArea) {
    if (isOnPlayer(effect)) {
      return LEVEL_ROLE
    }
  }

  if (duration > 0 && effect.duration === duration) {
    return LEVEL_DURATION_MATCH
  }

  if (duration > 0 && effect.duration > duration * 2 && effect.duration > 10000) {
    return LEVEL_TAIL
  }

  return LEVEL_DURATION_LONGER
}

export function sortEffectList(action: Action): undefined {
  action.effectList = compactAndSort(action.effectList, effectSortsBefore)
  return undefined
}

function effectSortsBefore(a: Effect, b: Effect): boolean {
  if (a.level !== b.level) {
    return a.level < b.level
  }
  if (a.duration !== b.duration) {
    return a.duration > b.duration
  }
  return a.endTime > b.endTime
}

export function recalcEffectLevels(action: Action, role: LfgRole): undefined {
  for (const effect of action.effectList) {
    effect.level = calcLevel(action, effect, role)
    effect.levelIsLow = effect.level >= LEVEL_LOW_THRESHOLD
  }
  sortEffectList(action)
  return undefined
}
