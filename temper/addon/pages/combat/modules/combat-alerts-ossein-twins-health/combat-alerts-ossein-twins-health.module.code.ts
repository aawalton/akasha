import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    SetAbilityOverlay: (this: void, abilityId: number) => void
    RemoveAbilityOverlay: (this: void, abilityId: number) => void
  }
}

export const JYNORAH_HEALTH_HM = 85320632
export const JYNORAH_HEALTH_VET = 37257920
export const JYNORAH_HEALTH_NORMAL = 10906420

export function isHM(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  return powerMax === JYNORAH_HEALTH_HM
}

export function isBaseVet(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  return powerMax === JYNORAH_HEALTH_VET
}

const SPOOFED_ABILITIES: Record<number, boolean> = {}

function spoofIconIfDangerous(this: void, abilityId: number): undefined {
  if (CRUTCH.savedOptions.osseincage.abilitiesToReplace[abilityId] !== true) return

  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "TwinsIconChange" + abilityId)
  SPOOFED_ABILITIES[abilityId] = true
  CRUTCH.SetAbilityOverlay(abilityId)
  CRUTCH.dbgOther("Changing " + GetAbilityName(abilityId))
}

export function unspoofAllIcons(this: void): undefined {
  for (const [abilityId] of pairs(SPOOFED_ABILITIES)) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "TwinsIconChange" + abilityId)
    CRUTCH.RemoveAbilityOverlay(abilityId)
  }
}

function spoofAllIcons(this: void): undefined {
  for (const i of $range(3, 8)) {
    spoofIconIfDangerous(GetSlotBoundId(i, HOTBAR_CATEGORY_PRIMARY))
    spoofIconIfDangerous(GetSlotBoundId(i, HOTBAR_CATEGORY_BACKUP))
    if (IsPlayerInWerewolfForm()) {
      spoofIconIfDangerous(GetSlotBoundId(i, HOTBAR_CATEGORY_WEREWOLF))
    }
  }
}

interface BossHealth {
  value?: number
  max?: number
}

export const BOSS_HEALTHS: Record<string, BossHealth> = {}
let prevTotalValue: number | undefined

export function onTwinsHealth(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  _powerType: number,
  powerValue: number,
  powerMax: number
): undefined {
  let health = BOSS_HEALTHS[unitTag]
  if (health === undefined) {
    health = {}
    BOSS_HEALTHS[unitTag] = health
  }
  health.value = powerValue
  health.max = powerMax

  let totalValue = 0
  let totalMax = 0
  for (const [, data] of pairs(BOSS_HEALTHS)) {
    totalValue = totalValue + (data.value as number)
    totalMax = totalMax + (data.max as number)
  }

  if (prevTotalValue === undefined) prevTotalValue = totalMax

  const targetPercent = CRUTCH.savedOptions.osseincage.portalPercentMargin

  let portalTarget = totalMax * (0.76 + targetPercent / 100)
  if (prevTotalValue >= portalTarget && portalTarget > totalValue) {
    CRUTCH.dbgOther("Reached target for portal 1")
    spoofAllIcons()
    prevTotalValue = totalValue
    return
  }

  portalTarget = totalMax * (0.36 + targetPercent / 100)
  if (prevTotalValue >= portalTarget && portalTarget > totalValue) {
    CRUTCH.dbgOther("Reached target for portal 2")
    spoofAllIcons()
    prevTotalValue = totalValue
    return
  }

  prevTotalValue = totalValue
}
