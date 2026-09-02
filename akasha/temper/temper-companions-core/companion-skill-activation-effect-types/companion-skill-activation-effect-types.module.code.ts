import type { EffectCondition as EffectConditionType } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type { CompanionEffect } from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionSkillLineId } from "../skill-lines-by-companion/skill-lines-by-companion.module.code.ts"

export interface ExtractedSkillTiming {
  cooldown: number
  castTime: number
  channelDuration: number
}

export function extractSkillTiming(effects: readonly CompanionEffect[]): ExtractedSkillTiming {
  let cooldown = 0
  let castTime = 0
  let channelDuration = 0

  for (const effect of effects) {
    if (effect.type === "cooldown") {
      cooldown = effect.duration
    } else if (effect.type === "cast-time") {
      castTime = effect.duration
    } else if (effect.type === "channel") {
      channelDuration = effect.duration
    }
  }

  return { cooldown, castTime, channelDuration }
}

export function getSkillCooldown(template: CompanionSkillTemplate): number {
  for (const effect of template.effects) {
    if (effect.type === "cooldown") {
      return effect.duration
    }
  }
  return 0
}

export function getSkillCastTime(template: CompanionSkillTemplate): number {
  for (const effect of template.effects) {
    if (effect.type === "cast-time") {
      return effect.duration
    }
  }
  return 0
}

export interface CompanionSkillTemplate {
  id: string
  abilityId: number
  name: string
  companionId: string
  skillLineId: CompanionSkillLineId
  skillType: "active" | "passive" | "ultimate"
  description: string
  icon: string | null

  effects: readonly CompanionEffect[]

  castConditions?: readonly EffectConditionType[]

  alternateAbilityIds?: readonly number[]

  tags?: readonly string[]

  validRoles: readonly CompanionSkillRoleTag[]
}

type CompanionSkillRoleTag = "dps" | "healer" | "tank" | "support"

export function getSkillUltimateCost(template: CompanionSkillTemplate): number {
  for (const effect of template.effects) {
    if (effect.type === "resource-cost" && effect.resource === "ultimate") {
      return effect.amount
    }
  }
  return 0
}
