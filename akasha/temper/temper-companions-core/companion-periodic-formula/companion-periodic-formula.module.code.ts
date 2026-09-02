import { assertNever } from "@akasha/utils-narrow/assert-never"
import { badTruncate } from "../bad-truncate/bad-truncate.module.code.ts"
import type { CompanionFormulaStats } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import {
  applyHealingDone,
  evaluateSkillFormula,
} from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import type { CompanionValueFormula } from "../companion-value-formula/companion-value-formula.module.code.ts"
import { getFormulaCoefficientType } from "../companion-value-formula/companion-value-formula.module.code.ts"

function evaluatePeriodicTotalPerTick(
  formula: Extract<CompanionValueFormula, { type: "metric-scaling" }>,
  stats: CompanionFormulaStats,
  effectType: "damage" | "heal",
  numberOfTicks: number,
  tickInterval: number
): number {
  const metricValue = stats.metrics.get(formula.metricId) ?? 0
  const rawPerSecond = Math.fround(formula.coefficient / numberOfTicks / tickInterval)
  const perTickCoeff = rawPerSecond * tickInterval
  const base = badTruncate(Math.floor(perTickCoeff * metricValue))
  if (effectType === "heal") {
    return applyHealingDone(base, stats)
  }
  const bonus = Math.round(base * stats.damageDone)
  return base + bonus
}

function evaluatePeriodicTotalPerTickBase(
  formula: Extract<CompanionValueFormula, { type: "metric-scaling" }>,
  stats: CompanionFormulaStats,
  numberOfTicks: number,
  tickInterval: number
): number {
  const metricValue = stats.metrics.get(formula.metricId) ?? 0
  const rawPerSecond = Math.fround(formula.coefficient / numberOfTicks / tickInterval)
  const perTickCoeff = rawPerSecond * tickInterval
  return badTruncate(Math.floor(perTickCoeff * metricValue))
}

function evaluatePeriodicPercentBase(
  formula: CompanionValueFormula,
  stats: CompanionFormulaStats
): number {
  switch (formula.type) {
    case "metric-percent": {
      const metricValue = stats.metrics.get(formula.metricId) ?? 0
      const coeff = badTruncate(formula.percent / 100)
      return badTruncate(coeff * (metricValue / 100)) * 100
    }
    case "player-health-percent": {
      const playerHealth = stats.playerMaxHealth ?? 25000
      const coeff = badTruncate(formula.percent / 100)
      return badTruncate(coeff * (playerHealth / 100)) * 100
    }
    case "fixed":
      return formula.value
    case "metric-scaling":
      return 0
    default:
      assertNever(formula)
  }
}

export function calculatePeriodicTooltipValue(
  formula: CompanionValueFormula,
  stats: CompanionFormulaStats,
  effectType: "damage" | "heal",
  duration: number,
  tickInterval: number,
  initialTick: boolean,
  displayMode: "per-tick" | "total",
  channeled?: boolean,
  hdApplication?: "per-tick" | "total"
): number {
  const rawTicks = Math.floor(duration / tickInterval) + (initialTick ? 1 : 0)
  const baseTicks = channeled ? rawTicks - 1 : rawTicks
  if (baseTicks <= 0) return 0

  const augmentedDuration = duration * (1 + stats.buffDuration)
  const rawAugmentedTicks = Math.floor(augmentedDuration / tickInterval) + (initialTick ? 1 : 0)
  const numberOfTicks = channeled ? rawAugmentedTicks - 1 : rawAugmentedTicks

  const coeffType = getFormulaCoefficientType(formula)

  let roundedPerTick: number

  if (effectType === "heal") {
    if (coeffType === "per-tick") {
      const rawBase = evaluateSkillFormula(formula, stats)
      const base = Math.floor(rawBase)
      roundedPerTick = applyHealingDone(base, stats)
    } else if (formula.type === "metric-scaling") {
      if (hdApplication === "total" && displayMode === "total") {
        const base = evaluatePeriodicTotalPerTickBase(formula, stats, baseTicks, tickInterval)
        const totalBase = base * numberOfTicks
        return applyHealingDone(totalBase, stats)
      }
      roundedPerTick = evaluatePeriodicTotalPerTick(
        formula,
        stats,
        effectType,
        baseTicks,
        tickInterval
      )
    } else {
      const baseValue = evaluatePeriodicPercentBase(formula, stats)
      if (displayMode === "total") {
        return applyHealingDone(Math.round(baseValue), stats)
      }
      const perTickBase = Math.floor(baseValue / baseTicks)
      roundedPerTick = applyHealingDone(perTickBase, stats)
    }
  } else {
    const multiplier = stats.tooltipDamageMultiplier

    if (coeffType === "per-tick") {
      const rawBase = evaluateSkillFormula(formula, stats)
      const base = Math.floor(rawBase)
      const bonus = Math.round(base * stats.damageDone)
      roundedPerTick = base + bonus
    } else if (formula.type === "metric-scaling") {
      roundedPerTick = evaluatePeriodicTotalPerTick(
        formula,
        stats,
        effectType,
        baseTicks,
        tickInterval
      )
    } else {
      const baseValue = evaluatePeriodicPercentBase(formula, stats)
      if (displayMode === "total") {
        return Math.floor(baseValue * multiplier)
      }
      roundedPerTick = Math.floor((baseValue * multiplier) / baseTicks)
    }
  }

  return displayMode === "per-tick" ? roundedPerTick : roundedPerTick * numberOfTicks
}
