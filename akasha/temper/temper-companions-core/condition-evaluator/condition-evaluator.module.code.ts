import type { EffectCondition } from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type { HealthSamples } from "../rotation-types/rotation-types.module.code.ts"

export function evaluateCondition(
  condition: EffectCondition,
  healthSamples: HealthSamples
): boolean {
  switch (condition.type) {
    case "health-threshold": {
      const targetType = condition.targetType ?? "self"
      const healthValue = healthSamples[targetType]

      if (condition.below !== undefined && healthValue >= condition.below) {
        return false
      }

      if (condition.above !== undefined && healthValue <= condition.above) {
        return false
      }

      return true
    }

    case "ally-health": {
      let selfSatisfies = true
      if (condition.below !== undefined && healthSamples.self >= condition.below) {
        selfSatisfies = false
      }
      if (condition.above !== undefined && healthSamples.self <= condition.above) {
        selfSatisfies = false
      }

      let allySatisfies = true
      if (condition.below !== undefined && healthSamples.ally >= condition.below) {
        allySatisfies = false
      }
      if (condition.above !== undefined && healthSamples.ally <= condition.above) {
        allySatisfies = false
      }

      return selfSatisfies || allySatisfies
    }

    case "any": {
      return condition.conditions.some((c) => evaluateCondition(c, healthSamples))
    }

    case "all": {
      return condition.conditions.every((c) => evaluateCondition(c, healthSamples))
    }

    case "enemy-type":
    case "range":
    case "status":
    case "casting":
    case "movable":
    case "weapon-type":
    case "nearby":
      return true

    default:
      return true
  }
}

export function calculateEffectiveMultiplier(
  conditions: readonly EffectCondition[] | undefined,
  conditionalMultiplier: number | undefined,
  enemyHealthStart?: number
): number {
  if (conditions == null || conditionalMultiplier == null) return 1

  const healthStart = enemyHealthStart ?? 100

  let conditionUptime = 0

  for (const condition of conditions) {
    if (condition.type === "health-threshold") {
      if (condition.below !== undefined) {
        const uptime = condition.below >= healthStart ? 1 : condition.below / healthStart
        conditionUptime = Math.max(conditionUptime, uptime)
      }
      if (condition.above !== undefined) {
        const uptime = condition.above >= healthStart ? 0 : 1 - condition.above / healthStart
        conditionUptime = Math.max(conditionUptime, uptime)
      }
    }
  }

  if (conditionUptime === 0) return 1

  const bonusMultiplier = conditionalMultiplier - 1
  return 1 + bonusMultiplier * conditionUptime
}
