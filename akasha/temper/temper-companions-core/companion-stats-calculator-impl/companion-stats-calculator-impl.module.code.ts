import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import { calculateRatingSurplus } from "@akasha/temper-formula-framework/rating-chance"
import { topologicalSort } from "@akasha/temper-formula-framework/topological-sort"
import {
  type CompanionEffectSource,
  extractArmorSources,
  extractJewelrySources,
  extractSkillSources,
  extractTargetSource,
  extractWeaponSources,
} from "../companion-effect-sources/companion-effect-sources.module.code.ts"
import {
  evaluateFormula,
  extractMetricReferences,
  sumEffects,
} from "../companion-formula-evaluator/companion-formula-evaluator.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  type CompanionMetricValue,
  companionMetrics,
} from "../companion-metrics/companion-metrics.module.code.ts"
import {
  computeDpsMetrics,
  computeTpsMetrics,
  mergeRotationMetrics,
} from "../companion-rotation-metrics/companion-rotation-metrics.module.code.ts"
import { simulateCompanionRotation } from "../companion-rotation-simulator/companion-rotation-simulator.module.code.ts"
import type { CompanionStatsResult } from "../companion-stats-result/companion-stats-result.module.code.ts"
import { computeSupportMetrics } from "../companion-support-evaluator/companion-support-evaluator.module.code.ts"
import type { ReferenceBaseline } from "../companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { DEFAULT_COMPANION_ROTATION_CONFIG } from "../companion-types/companion-types.module.code.ts"
import { companionBase } from "../companions-base-source/companions-base-source.module.code.ts"

export function calculateCompanionStatsWithBaseline(
  build: CompanionState,
  baseline: ReferenceBaseline
): CompanionStatsResult {
  const sources: CompanionEffectSource[] = [
    companionBase.data["companion-base-stats"],
    ...extractArmorSources(build),
    ...extractJewelrySources(build),
    ...extractWeaponSources(build),
    ...extractSkillSources(build),
    extractTargetSource(build),
  ]

  const metrics: Partial<Record<CompanionMetricId, CompanionMetricValue>> = {}
  const metricValues = new Map<CompanionMetricId, number>()

  for (const metric of companionMetrics.list) {
    if (metric.formula) continue

    if (metric.effectType == null) continue

    const value = sumEffects(sources, metric.id, metric.effectType)

    metricValues.set(metric.id, value)

    if (value !== 0) {
      const roundedValue = metric.valueType === "integer" ? Math.round(value) : value

      const surplus =
        metric.valueType === "rating" && metric.ratingFloorIncrement !== undefined
          ? calculateRatingSurplus(value, metric.divisor, metric.cap, metric.ratingFloorIncrement)
          : undefined

      metrics[metric.id] = {
        ...metric,
        value: roundedValue,
        surplus,
      }
    }
  }

  const formulaMetrics = companionMetrics.list.flatMap((m) =>
    m.formula !== undefined ? [{ ...m, formula: m.formula }] : []
  )
  const sortedFormulaMetrics = topologicalSort(
    formulaMetrics,
    (metric) => metric.id,
    (metric) => extractMetricReferences(metric.formula)
  )

  for (const metric of sortedFormulaMetrics) {
    const value = evaluateFormula(metric.formula, metricValues, sources)
    metricValues.set(metric.id, value)
  }

  const rotationMetricIds = new Set<CompanionMetricId>([
    "companion-dps-total",
    "companion-hps-total",
    "companion-sps-total",
    "companion-tps-total",
    "companion-support-score",
    "companion-score",
  ])

  for (const metric of sortedFormulaMetrics) {
    if (rotationMetricIds.has(metric.id)) continue

    const value = metricValues.get(metric.id) ?? 0

    const isBaselineValue =
      metric.valueType === "integer" ? value === 0 : Math.abs(value - 1) < 0.0001

    if (!isBaselineValue) {
      const displayValue =
        metric.valueType === "integer"
          ? Math.round(value)
          : metric.valueType === "fractional-change"
            ? value - 1
            : value
      metrics[metric.id] = {
        ...metric,
        value: displayValue,
      }
    }
  }

  const skillIds = Object.values(build.skills["skill-bar"])
  const rotationConfig = DEFAULT_COMPANION_ROTATION_CONFIG
  const metricsForRotation = Object.values(metrics).filter(
    (m): m is CompanionMetricValue => m !== undefined
  )

  const rotation = simulateCompanionRotation(skillIds, metricsForRotation, {
    cycleDuration: rotationConfig.cycleDuration,
    ultimateThreshold: rotationConfig.ultimateThreshold,
    ultimateGenerationRate: 1.25,
    includePassiveUltimate: true,
    targetCount: build.target.targetCount ?? 1,
    targetArmor: targetArmor.data[build.target.armor].armor,
    damageTakenFrequency: 0.5,
    playerDamageFrequency: 1.0,
    synergyActivationRate: 0.5,
    enemyHealthStart: build.target.targetHealth === "execute" ? 25 : 100,
  })

  const dpsEntries = computeDpsMetrics(rotation, metricValues, build, rotationConfig.cycleDuration)
  mergeRotationMetrics(dpsEntries, metrics, metricValues)

  const tpsEntries = computeTpsMetrics(rotation, metricValues)
  mergeRotationMetrics(tpsEntries, metrics, metricValues)

  {
    const currentResult: CompanionStatsResult = { sources, metrics, rotation }
    const supportEntries = computeSupportMetrics(currentResult, baseline)
    mergeRotationMetrics(supportEntries, metrics, metricValues)
  }

  const targetCount = build.target.targetCount ?? 1
  if (build.companion.baseRoles.includes("dps") && targetCount > 1) {
    metricValues.set("companion-dps-total", metricValues.get("companion-dps-aoe") ?? 0)
  }

  const scoreMetric = companionMetrics.data["companion-score"]
  if (scoreMetric.formula) {
    const scoreValue = evaluateFormula(
      scoreMetric.formula,
      metricValues,
      sources,
      build.companion.baseRoles
    )
    metricValues.set("companion-score", scoreValue)
    const rounded = Math.round(scoreValue)
    if (rounded !== 0) {
      metrics["companion-score"] = { ...scoreMetric, value: rounded }
    }
  }

  return { sources, metrics, rotation }
}
