import { requireGet } from "akasha/code/type/narrowing/modules/require-get/require-get.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { activateLightAttack } from "akasha/temper/catalog/companion/companions-core/modules/companion-light-attack/companion-light-attack.module.code.ts"
import {
  type CompanionMetricValue,
  companionMetrics,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import {
  calculateResults,
  createEmptyResult,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-rotation-results/companion-rotation-results.module.code.ts"
import { initializeState } from "akasha/temper/catalog/companion/companions-core/modules/companion-rotation-state/companion-rotation-state.module.code.ts"
import {
  activateSkill,
  selectNextSkill,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-executor/companion-skill-executor.module.code.ts"
import type { CompanionScalingStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-value-formula/companion-value-formula.module.code.ts"
import type {
  HealthSamples,
  RotationConfig,
  RotationResult,
} from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"
import {
  DEFAULT_ROTATION_CONFIG,
  SIMULATION_TICK_INTERVAL,
  ULTIMATE_GENERATION_RATE,
} from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"
import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"

export function simulateCompanionRotation(
  skillIds: readonly CompanionSkillId[],
  metrics: readonly CompanionMetricValue[],
  config: RotationConfig = DEFAULT_ROTATION_CONFIG
): RotationResult {
  const skills = companionSkills()
  const validSkillIds = skillIds.filter(
    (id) =>
      id !== "no-skill" && skills.data[id] !== undefined && skills.data[id]?.skillType !== "passive"
  )

  if (validSkillIds.length === 0) {
    return createEmptyResult(config)
  }

  const metricsMap = new Map<string, number>()
  for (const metric of metrics) {
    metricsMap.set(metric.id, metric.value)
  }

  const stats: CompanionScalingStats = {
    "companion-weapon-damage": requireGet(metricsMap, "companion-weapon-damage", "metrics"),
    "companion-health-maximum": requireGet(metricsMap, "companion-health-maximum", "metrics"),
  }
  const weaponPower = stats["companion-weapon-damage"]

  const critRating = metricsMap.get("companion-critical-chance") ?? 0
  const critMetric = companionMetrics.data["companion-critical-chance"]
  const critChance =
    critMetric.valueType === "rating"
      ? convertRatingToChance(
          critRating,
          critMetric.divisor,
          critMetric.cap,
          critMetric.ratingFloorIncrement
        )
      : 0

  const penetration = metricsMap.get("companion-penetration") ?? 0
  const targetArmor = config.targetArmor
  const remainingArmor = Math.max(0, targetArmor - penetration)
  const armorMitigation = Math.min(remainingArmor / 50000, 0.5)
  const armorDamageMultiplier = 1 - armorMitigation

  const state = initializeState(validSkillIds, stats)

  const orderedSkillStates = validSkillIds.map((id) =>
    requireGet(state.skillStates, id, "state.skillStates")
  )

  const abilityCooldownMod = metricsMap.get("companion-ability-cooldown") ?? 0
  const buffDurationMod = metricsMap.get("companion-buff-duration") ?? 0
  const ultimateGenMod = metricsMap.get("companion-ultimate-generation") ?? 0
  const ultimateGenPerTick =
    ULTIMATE_GENERATION_RATE * (1 + ultimateGenMod) * SIMULATION_TICK_INTERVAL

  const healingDone = metricsMap.get("companion-healing-done") ?? 0
  const tooltipHealingMult = 1 + healingDone
  const critHealing = metricsMap.get("companion-critical-healing") ?? 0
  const avgHealingCritMult = 1 + critChance * (0.5 + critHealing)
  const healingMult = tooltipHealingMult * avgHealingCritMult
  const targetCount = config.targetCount

  const healthSamples: HealthSamples = { self: 100, ally: 100, enemy: 100 }

  while (state.currentTime < config.cycleDuration) {
    if (config.includePassiveUltimate && state.ultimateWindowExpiresAt >= state.currentTime) {
      state.ultimateAmount += ultimateGenPerTick
    }

    if (state.currentTime < state.globalCooldownEndsAt || state.currentTime < state.castEndsAt) {
      state.currentTime += SIMULATION_TICK_INTERVAL
      continue
    }

    state.ultimateAmount = Math.min(state.ultimateAmount, 500)

    const healthStart = config.enemyHealthStart ?? 100
    const health = healthStart * (1 - state.currentTime / config.cycleDuration)
    healthSamples.self = health
    healthSamples.ally = health
    healthSamples.enemy = health

    const nextSkill = selectNextSkill(state, orderedSkillStates, healthSamples)

    if (nextSkill) {
      activateSkill(state, nextSkill, abilityCooldownMod, buffDurationMod, weaponPower)
    } else {
      activateLightAttack(state, healingMult, targetCount)
    }

    state.currentTime += SIMULATION_TICK_INTERVAL
  }

  return calculateResults(state, metricsMap, critChance, stats, armorDamageMultiplier, config)
}
