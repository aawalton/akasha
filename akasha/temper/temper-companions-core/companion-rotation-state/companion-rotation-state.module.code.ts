import type { TargetType } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import { extractFormulaComponents } from "../companion-formula-extraction/companion-formula-extraction.module.code.ts"
import {
  getSkillCastTime,
  getSkillCooldown,
  getSkillUltimateCost,
} from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import type {
  RotationCategory,
  RotationState,
  SkillState,
} from "../rotation-types/rotation-types.module.code.ts"

function classifySkill(skillId: CompanionSkillId): RotationCategory {
  const skill = companionSkills.data[skillId]
  if (skill?.skillType === "ultimate") {
    return "ultimate"
  }
  return "spammable"
}

const UPTIME_EFFECT_TYPES = new Set([
  "dot",
  "hot",
  "shield",
  "retaliation",
  "periodic-trigger",
  "apply-buff",
  "apply-debuff",
])

function getSkillEffectDuration(skillId: CompanionSkillId, buffDurationMod = 0): number {
  const skill = companionSkills.data[skillId]
  if (!skill) return 0

  let maxDuration = 0
  for (const effect of skill.effects) {
    if (!("type" in effect) || !UPTIME_EFFECT_TYPES.has(effect.type)) continue

    if (effect.type === "apply-buff" && "buff" in effect && (effect.buff?.duration ?? 0) > 0) {
      maxDuration = Math.max(maxDuration, effect.buff.duration)
    } else if (
      effect.type === "apply-debuff" &&
      "debuff" in effect &&
      (effect.debuff?.duration ?? 0) > 0
    ) {
      maxDuration = Math.max(maxDuration, effect.debuff.duration)
    } else if ("duration" in effect && typeof effect.duration === "number") {
      maxDuration = Math.max(maxDuration, effect.duration)
    }
  }

  return maxDuration * (1 + buffDurationMod)
}

type SkillHealType = "heals-ally" | "heals-self-only" | "no-heal"
const skillHealTypeCache = new Map<CompanionSkillId, SkillHealType>()

function getSkillHealType(skillId: CompanionSkillId): SkillHealType {
  let healType = skillHealTypeCache.get(skillId)
  if (healType !== undefined) return healType

  const skill = companionSkills.data[skillId]
  if (!skill) {
    skillHealTypeCache.set(skillId, "no-heal")
    return "no-heal"
  }

  const components = extractFormulaComponents(skill)
  healType = "no-heal"
  for (const component of components) {
    if (component.category === "direct-heal" || component.category === "hot-heal") {
      const [, allyPortion] = classifyHealingTarget(component.targetType)
      if (allyPortion > 0) {
        healType = "heals-ally"
        break
      }
      healType = "heals-self-only"
    }
  }

  skillHealTypeCache.set(skillId, healType)
  return healType
}

export function classifyHealingTarget(
  targetType: TargetType | undefined
): readonly [self: number, ally: number] {
  switch (targetType) {
    case "self":
      return [1, 0]
    case "self-or-ally":
      return [1, 1]
    case "self-and-ally":
    case "ground":
      return [1, 1]
    default:
      return [0, 1]
  }
}

export function initializeState(skillIds: readonly CompanionSkillId[]): RotationState {
  const skillStates = new Map<CompanionSkillId, SkillState>()

  for (const skillId of skillIds) {
    const skill = companionSkills.data[skillId]
    const category = classifySkill(skillId)
    const castConditions = skill && "castConditions" in skill ? (skill.castConditions ?? []) : []
    let ultimateCost = 0
    if (category === "ultimate") {
      const cost = skill ? getSkillUltimateCost(skill) : 100
      ultimateCost = cost !== 0 ? cost : 100
    }
    skillStates.set(skillId, {
      skillId,
      cooldownEndsAt: 0,
      effectEndsAt: null,
      effectActiveTime: 0,
      usageCount: 0,
      category,
      baseCooldown: skill ? getSkillCooldown(skill) : 6,
      castTime: skill ? getSkillCastTime(skill) : 0,
      ultimateCost,
      castConditions,
      baseEffectDuration: getSkillEffectDuration(skillId),
      healType: getSkillHealType(skillId),
    })
  }

  return {
    currentTime: 0,
    globalCooldownEndsAt: 0,
    castEndsAt: 0,
    ultimateAmount: 0,
    ultimateWindowExpiresAt: 0,
    skillStates,
    totalActivations: 0,
    lightAttackCount: 0,
    lightAttackDamageMultSum: 0,
    lightAttackDirectHealing: 0,
    lightAttackSelfHealing: 0,
    lightAttackAllyHealing: 0,
    lightAttackHealBuffs: [],
    lightAttackDamageBuffs: [],
    nextAttackDamageBuffs: [],
  }
}
