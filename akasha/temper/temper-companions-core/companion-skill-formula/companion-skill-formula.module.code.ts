import { assertNever } from "@akasha/utils-narrow/assert-never"
import { badTruncate } from "../bad-truncate/bad-truncate.module.code.ts"
import type { CompanionEffectSource } from "../companion-effect-sources/companion-effect-sources.module.code.ts"
import type {
  CompanionScalingMetricId,
  CompanionValueFormula,
} from "../companion-value-formula/companion-value-formula.module.code.ts"

const EQUIPMENT_CATEGORIES = new Set(["companion-armor", "companion-jewelry", "companion-weapons"])

export function extractNonSoothingHealingDoneSources(
  sources: readonly CompanionEffectSource[]
): readonly number[] {
  const hdSources: number[] = []
  for (const source of sources) {
    if (EQUIPMENT_CATEGORIES.has(source.categoryId)) continue
    for (const effect of source.effects) {
      if (
        effect.metricId === "companion-healing-done" &&
        effect.effectType === "fractional-change" &&
        effect.effectValue !== 0
      ) {
        hdSources.push(effect.effectValue)
      }
    }
  }
  return hdSources
}

export interface CompanionFormulaStats {
  metrics: Map<CompanionScalingMetricId, number>
  tooltipDamageMultiplier: number
  damageDone: number
  healingSoothingHD: number
  healingOtherSources: readonly number[]
  abilityCooldown: number
  buffDuration: number
  playerMaxHealth?: number
}

export function applyHealingDone(base: number, stats: CompanionFormulaStats): number {
  let total = base
  if (stats.healingSoothingHD > 0) {
    total += Math.floor(base * stats.healingSoothingHD)
  }
  const combinedOther = stats.healingOtherSources.reduce((sum, v) => sum + v, 0)
  if (combinedOther > 0) {
    total += Math.round(base * combinedOther)
  }
  return total
}

export function evaluateSkillFormula(
  formula: CompanionValueFormula,
  stats: CompanionFormulaStats,
  effectType?: "damage" | "heal",
  coefficientMultiplier?: number
): number {
  let baseValue: number

  switch (formula.type) {
    case "metric-scaling": {
      const metricValue = stats.metrics.get(formula.metricId) ?? 0
      if (coefficientMultiplier != null) {
        const coeff = badTruncate(formula.coefficient * coefficientMultiplier)
        baseValue = badTruncate(coeff * metricValue)
      } else {
        baseValue = Math.floor(formula.coefficient * metricValue)
      }
      break
    }
    case "metric-percent": {
      const metricValue = stats.metrics.get(formula.metricId) ?? 0
      if (coefficientMultiplier != null) {
        let coeff = badTruncate(formula.percent / 100)
        coeff = badTruncate(coeff * coefficientMultiplier)
        baseValue = badTruncate(coeff * (metricValue / 100)) * 100
      } else if (effectType == null) {
        const coeff = badTruncate(formula.percent / 100)
        baseValue = badTruncate(coeff * (metricValue / 100)) * 100
      } else {
        baseValue = Math.round((formula.percent / 100) * metricValue)
      }
      break
    }
    case "player-health-percent": {
      const playerHealth = stats.playerMaxHealth ?? 25000
      if (coefficientMultiplier != null) {
        let coeff = badTruncate(formula.percent / 100)
        coeff = badTruncate(coeff * coefficientMultiplier)
        baseValue = badTruncate(coeff * (playerHealth / 100)) * 100
      } else if (effectType == null) {
        const coeff = badTruncate(formula.percent / 100)
        baseValue = badTruncate(coeff * (playerHealth / 100)) * 100
      } else {
        baseValue = Math.round((formula.percent / 100) * playerHealth)
      }
      break
    }
    case "fixed":
      baseValue = formula.value
      break
    default:
      assertNever(formula)
  }

  if (effectType === "damage") {
    return Math.round(baseValue * stats.tooltipDamageMultiplier)
  }
  if (effectType === "heal") {
    return applyHealingDone(baseValue, stats)
  }

  return baseValue
}
