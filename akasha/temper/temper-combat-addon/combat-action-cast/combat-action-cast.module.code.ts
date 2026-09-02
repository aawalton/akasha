import { getNewest } from "@akasha/temper-combat-addon/combat-action-build"
import {
  enqueueAction,
  nextSn,
  purgeQueue,
  removeAction,
  STATE,
} from "@akasha/temper-combat-addon/combat-action-queue"
import {
  buildActionFromSlot,
  getActiveHotbarCategory,
} from "@akasha/temper-combat-addon/combat-action-slots"
import { getActionByNewAction, saveAction } from "@akasha/temper-combat-addon/combat-action-store"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

const INHERIT_EFFECT_TAIL_MS = 500

function acceptRelatedAbility(incoming: Action, abilityId: number): undefined {
  if (abilityId === incoming.ability.id) {
    return undefined
  }
  for (const existing of incoming.relatedAbilityList) {
    if (existing === abilityId) {
      return undefined
    }
  }
  incoming.relatedAbilityList.push(abilityId)
  return undefined
}

function inheritFrom(incoming: Action, priorMatch: Action): undefined {
  const prior = getNewest(priorMatch)

  prior.newAction = incoming
  incoming.oldAction = prior

  incoming.effectList = []
  for (const effect of prior.effectList) {
    if (effect.endTime > incoming.startTime + INHERIT_EFFECT_TAIL_MS) {
      effect.ignored = false
      incoming.effectList.push(effect)
    }
  }
  prior.effectList = []

  incoming.lastEffectTime = prior.lastEffectTime
  incoming.stackEffect = prior.stackEffect
  incoming.stackEffect2 = prior.stackEffect2
  incoming.tickEffect = prior.tickEffect
  prior.stackEffect = undefined

  if (prior.oldAction?.fake) {
    prior.fake = true
  }

  if (incoming.duration === 0 && prior.duration > 0) {
    incoming.inheritDuration = prior.duration
  } else if (incoming.duration === 0 && (prior.inheritDuration ?? 0) > 0) {
    incoming.inheritDuration = prior.inheritDuration
  } else if (
    incoming.duration === 0 &&
    prior.descriptionDuration != null &&
    prior.descriptionDuration > 0
  ) {
    incoming.inheritDuration = prior.descriptionDuration
  }

  acceptRelatedAbility(incoming, prior.ability.id)
  for (const relatedId of prior.relatedAbilityList) {
    acceptRelatedAbility(incoming, relatedId)
  }

  removeAction(prior)
  saveAction(incoming)
  return undefined
}

export function handleAbilityUsed(slotNum: number, now: number): undefined {
  if (slotNum < 3 || slotNum > 8) {
    return undefined
  }

  const hotbarCategory = getActiveHotbarCategory()
  const incoming = buildActionFromSlot(slotNum, hotbarCategory, nextSn(), now)
  if (incoming === undefined) {
    return undefined
  }

  purgeQueue(now)
  STATE.lastAction = incoming
  enqueueAction(incoming)

  if (incoming.flags.forGround) {
    return undefined
  }

  const inCombat = IsUnitInCombat("player")
  const priorMatch = getActionByNewAction(incoming, inCombat)
  if (priorMatch !== undefined) {
    inheritFrom(incoming, priorMatch)
  }
  return undefined
}
