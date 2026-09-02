import type { DamageType } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import { extractFormulaComponents } from "../companion-formula-extraction/companion-formula-extraction.module.code.ts"
import { calculateLightAttackDamage } from "../companion-light-attack/companion-light-attack.module.code.ts"
import { classifyHealingTarget } from "../companion-rotation-state/companion-rotation-state.module.code.ts"
import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import { calculateEffectiveMultiplier } from "../condition-evaluator/condition-evaluator.module.code.ts"
import type {
  DamageBreakdown,
  RotationConfig,
  RotationResult,
  RotationState,
  SkillUsageSummary,
} from "../rotation-types/rotation-types.module.code.ts"

export function createEmptyResult(config: RotationConfig): RotationResult {
  return {
    config,
    timeline: [],
    skillSummaries: [],
    dps: 0,
    directDamage: 0,
    dotDamage: 0,
    hps: 0,
    directHealing: 0,
    hotHealing: 0,
    selfHealing: 0,
    allyHealing: 0,
    selfHps: 0,
    allyHps: 0,
    selfShielding: 0,
    allyShielding: 0,
    selfSps: 0,
    allySps: 0,
    damageByType: [],
    totalActivations: 0,
    actionsPerSecond: 0,
    ultimatesUsed: 0,
    singleTargetDamage: 0,
    aoeDamage: 0,
  }
}

export function calculateResults(
  state: RotationState,
  metrics: Map<string, number>,
  critChance: number,
  scalingStat: number,
  armorDamageMultiplier: number,
  config: RotationConfig
): RotationResult {
  const skillSummaries: SkillUsageSummary[] = []
  const damageByTypeMap = new Map<DamageType, number>()
  const buffDurationMod = metrics.get("companion-buff-duration") ?? 0

  const tooltipDamageMult = 1 + (metrics.get("companion-damage-done") ?? 0)
  const tooltipHealingMult = 1 + (metrics.get("companion-healing-done") ?? 0)

  let totalDirectDamage = 0
  let totalDotDamage = 0
  let totalDirectHealing = 0
  let totalHotHealing = 0
  let totalSelfHealing = 0
  let totalAllyHealing = 0
  let totalSelfShielding = 0
  let totalAllyShielding = 0
  let ultimatesUsed = 0
  let totalSingleTargetDamage = 0
  let totalAoeDamage = 0

  for (const [skillId, skillState] of state.skillStates) {
    const skill = companionSkills.data[skillId]
    const components = skill
      ? extractFormulaComponents(skill, {
          damageTakenFrequency: config.damageTakenFrequency,
          playerDamageFrequency: config.playerDamageFrequency,
          synergyActivationRate: config.synergyActivationRate,
        })
      : []
    const effectDuration = skillState.baseEffectDuration * (1 + buffDurationMod)
    const category = skillState.category

    let skillDamage = 0
    let skillHealing = 0

    for (const component of components) {
      const componentBaseValue =
        component.coefficient !== undefined
          ? component.coefficient * scalingStat
          : component.baseValue
      const totalValue = componentBaseValue * skillState.usageCount

      const critDamage = metrics.get("companion-critical-damage") ?? 0
      const critHealing = metrics.get("companion-critical-healing") ?? 0

      const avgDamageCritMult = 1 + critChance * (0.5 + critDamage)
      const avgHealingCritMult = 1 + critChance * (0.5 + critHealing)

      let targetMultiplier = 1
      if (component.isAoe) {
        const maxTargets = component.maxTargets ?? config.targetCount
        targetMultiplier = Math.min(config.targetCount, maxTargets)
      }

      if (component.category === "direct-damage") {
        const effectiveMultiplier = calculateEffectiveMultiplier(
          component.conditions,
          component.conditionalMultiplier,
          config.enemyHealthStart
        )
        const dmg =
          totalValue *
          tooltipDamageMult *
          avgDamageCritMult *
          targetMultiplier *
          armorDamageMultiplier *
          effectiveMultiplier
        skillDamage += dmg
        totalDirectDamage += dmg

        const singleTargetPortion = dmg / targetMultiplier
        totalSingleTargetDamage += singleTargetPortion
        totalAoeDamage += dmg - singleTargetPortion

        if (component.damageType != null) {
          const current = damageByTypeMap.get(component.damageType) ?? 0
          damageByTypeMap.set(component.damageType, current + dmg)
        }
      } else if (component.category === "dot-damage") {
        const effectiveMultiplier = calculateEffectiveMultiplier(
          component.conditions,
          component.conditionalMultiplier,
          config.enemyHealthStart
        )
        const dmg =
          totalValue *
          tooltipDamageMult *
          avgDamageCritMult *
          targetMultiplier *
          armorDamageMultiplier *
          effectiveMultiplier
        skillDamage += dmg
        totalDotDamage += dmg

        const singleTargetPortion = dmg / targetMultiplier
        totalSingleTargetDamage += singleTargetPortion
        totalAoeDamage += dmg - singleTargetPortion

        if (component.damageType != null) {
          const current = damageByTypeMap.get(component.damageType) ?? 0
          damageByTypeMap.set(component.damageType, current + dmg)
        }
      } else if (component.category === "direct-heal") {
        const effectiveMultiplier = calculateEffectiveMultiplier(
          component.conditions,
          component.conditionalMultiplier,
          config.enemyHealthStart
        )
        const heal =
          totalValue *
          tooltipHealingMult *
          avgHealingCritMult *
          targetMultiplier *
          effectiveMultiplier
        skillHealing += heal
        totalDirectHealing += heal

        const [selfPortion, allyPortion] = classifyHealingTarget(component.targetType)
        totalSelfHealing += heal * selfPortion
        totalAllyHealing += heal * allyPortion
      } else if (component.category === "hot-heal") {
        const effectiveMultiplier = calculateEffectiveMultiplier(
          component.conditions,
          component.conditionalMultiplier,
          config.enemyHealthStart
        )
        const heal =
          totalValue *
          tooltipHealingMult *
          avgHealingCritMult *
          targetMultiplier *
          effectiveMultiplier
        skillHealing += heal
        totalHotHealing += heal

        const [selfPortion, allyPortion] = classifyHealingTarget(component.targetType)
        totalSelfHealing += heal * selfPortion
        totalAllyHealing += heal * allyPortion
      } else if (component.category === "shield") {
        const shieldValue = componentBaseValue * skillState.usageCount

        const [selfPortion, allyPortion] = classifyHealingTarget(component.targetType)
        totalSelfShielding += shieldValue * selfPortion
        totalAllyShielding += shieldValue * allyPortion
      }
    }

    if (category === "ultimate") {
      ultimatesUsed += skillState.usageCount
    }

    let uptime = 0
    if (effectDuration > 0 && skillState.effectActiveTime > 0) {
      let effectActiveTime = skillState.effectActiveTime
      if (skillState.effectEndsAt != null && skillState.effectEndsAt > config.cycleDuration) {
        effectActiveTime -= skillState.effectEndsAt - config.cycleDuration
      }
      uptime = Math.max(0, effectActiveTime) / config.cycleDuration
    }

    skillSummaries.push({
      skillId,
      usageCount: skillState.usageCount,
      totalDamage: skillDamage,
      totalHealing: skillHealing,
      averageDamage: skillState.usageCount > 0 ? skillDamage / skillState.usageCount : 0,
      uptime,
    })
  }

  if (state.lightAttackCount > 0) {
    const critDamage = metrics.get("companion-critical-damage") ?? 0
    const avgCritMult = 1 + critChance * (0.5 + critDamage)
    const weaponPower = metrics.get("companion-weapon-damage") ?? 2000
    const baseLightAttackDamage =
      calculateLightAttackDamage(weaponPower, tooltipDamageMult, false, armorDamageMultiplier) *
      avgCritMult

    const totalLightAttackDamage = baseLightAttackDamage * state.lightAttackDamageMultSum

    totalDirectDamage += totalLightAttackDamage
    totalSingleTargetDamage += totalLightAttackDamage

    const physicalDamage = damageByTypeMap.get("physical") ?? 0
    damageByTypeMap.set("physical", physicalDamage + totalLightAttackDamage)

    totalDirectHealing += state.lightAttackDirectHealing
    totalSelfHealing += state.lightAttackSelfHealing
    totalAllyHealing += state.lightAttackAllyHealing

    skillSummaries.push({
      skillId: "light-attack",
      usageCount: state.lightAttackCount,
      totalDamage: totalLightAttackDamage,
      totalHealing: state.lightAttackDirectHealing,
      averageDamage: totalLightAttackDamage / state.lightAttackCount,
      uptime: 0,
    })
  }

  const totalDamage = totalDirectDamage + totalDotDamage
  const damageByType: DamageBreakdown[] = []
  for (const [damageType, damage] of damageByTypeMap) {
    damageByType.push({
      damageType,
      totalDamage: damage,
      percentage: totalDamage > 0 ? damage / totalDamage : 0,
    })
  }

  damageByType.sort((a, b) => b.totalDamage - a.totalDamage)

  const totalHealing = totalDirectHealing + totalHotHealing

  return {
    config,
    timeline: [],
    skillSummaries,
    dps: totalDamage / config.cycleDuration,
    directDamage: totalDirectDamage,
    dotDamage: totalDotDamage,
    hps: totalHealing / config.cycleDuration,
    directHealing: totalDirectHealing,
    hotHealing: totalHotHealing,
    selfHealing: totalSelfHealing,
    allyHealing: totalAllyHealing,
    selfHps: totalSelfHealing / config.cycleDuration,
    allyHps: totalAllyHealing / config.cycleDuration,
    selfShielding: totalSelfShielding,
    allyShielding: totalAllyShielding,
    selfSps: totalSelfShielding / config.cycleDuration,
    allySps: totalAllyShielding / config.cycleDuration,
    damageByType,
    totalActivations: state.totalActivations,
    actionsPerSecond: state.totalActivations / config.cycleDuration,
    ultimatesUsed,
    singleTargetDamage: totalSingleTargetDamage,
    aoeDamage: totalAoeDamage,
  }
}
