import { evaluateArithmeticNode } from "@akasha/temper-formula-framework/arithmetic-evaluate"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { sourceCategories } from "@akasha/temper-formula-framework/source-category"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import {
  getAttributeEffects,
  getConditionalChanceEffects,
  getIndividualIntegerEffects,
  getIndividualPercentageEffects,
  getIntegerEffects,
  getNumberPerSecondsEffects,
  getPercentageEffects,
} from "../extractors/extractors.module.code.ts"
import type { FormulaNode } from "../formula-types/formula-types.module.code.ts"
import { getAggregateMetricIds } from "../metric-tree-queries/metric-tree-queries.module.code.ts"
import type { Metric } from "../metrics/metrics.module.code.ts"
import { hasFormula, metrics } from "../metrics/metrics.module.code.ts"

interface PlayerFormulaContext {
  metric: Metric
  sources: readonly EffectSource[]
  metricValues: Map<MetricId, number>
}

export function evaluateFormula(
  metric: Metric,
  sources: readonly EffectSource[],
  metricValues: Map<MetricId, number> = new Map()
): number {
  if (!hasFormula(metric)) {
    throw new Error(`Metric "${metric.id}" does not have a formula defined`)
  }

  const context: PlayerFormulaContext = { metric, sources, metricValues }
  return evaluateArithmeticNode(metric.formula, context, evaluatePlayerLeaf)
}

export function roundMetricValue(metric: Metric, value: number): number {
  return metric.valueType === "integer" || metric.valueType === "rating" ? Math.round(value) : value
}

function evaluatePlayerLeaf(node: FormulaNode, context: PlayerFormulaContext): number {
  const { metric, sources, metricValues } = context

  switch (node.type) {
    case "sum": {
      const metricIds = getAggregateMetricIds(metric.id)

      let total = 0

      const categories = node.categories ?? sourceCategories.ids
      for (const category of categories) {
        switch (node.effectType) {
          case "integer":
            if (category === "attributes") {
              total += getAttributeEffects(metricIds, sources)
            } else {
              total += getIntegerEffects(category, metricIds, sources)
            }
            break

          case "fractional-change":
            total += getPercentageEffects(category, metricIds, sources)
            break

          case "number-per-seconds":
            total += getNumberPerSecondsEffects(category, metricIds, sources)
            break

          case "conditional-chance":
            total += getConditionalChanceEffects(category, metricIds, sources)
            break

          case "number":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
            throw new Error(`Effect type "${node.effectType}" is not yet supported in formulas`)

          default:
            throw new Error(`Unknown effect type: ${node.effectType}`)
        }
      }

      return total
    }

    case "sum-for-metric": {
      const metricIds = getAggregateMetricIds(node.metricId)

      let total = 0

      const categories = node.categories ?? sourceCategories.ids
      for (const category of categories) {
        switch (node.effectType) {
          case "integer":
            if (category === "attributes") {
              total += getAttributeEffects(metricIds, sources)
            } else {
              total += getIntegerEffects(category, metricIds, sources)
            }
            break

          case "fractional-change":
            total += getPercentageEffects(category, metricIds, sources)
            break

          case "number-per-seconds":
            total += getNumberPerSecondsEffects(category, metricIds, sources)
            break

          case "conditional-chance":
            total += getConditionalChanceEffects(category, metricIds, sources)
            break

          case "number":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
            throw new Error(`Effect type "${node.effectType}" is not yet supported in formulas`)

          default:
            throw new Error(`Unknown effect type: ${node.effectType}`)
        }
      }

      return total
    }

    case "metric-refs": {
      if (node.metricIds.length === 0) {
        return 0
      }

      let total = 0

      for (const metricId of node.metricIds) {
        const value = metricValues.get(metricId)
        if (value === undefined) {
          throw new Error(
            `Metric "${metric.id}" references "${metricId}" which hasn't been calculated yet. Check dependency order.`
          )
        }

        if (node.convertRatingToChance) {
          if (metrics.has(metricId)) {
            const referencedMetric = metrics.data[metricId]
            if (referencedMetric.valueType === "rating" && "divisor" in referencedMetric) {
              total += convertRatingToChance(value, referencedMetric.divisor, referencedMetric.cap)
              continue
            }
          }
        }
        total += value
      }

      return total
    }

    case "product": {
      const metricIds = getAggregateMetricIds(metric.id)

      const effectValues: number[] = []
      const categories = node.categories ?? sourceCategories.ids

      for (const category of categories) {
        switch (node.effectType) {
          case "integer":
            effectValues.push(...getIndividualIntegerEffects(category, metricIds, sources))
            break

          case "fractional-change":
            effectValues.push(...getIndividualPercentageEffects(category, metricIds, sources))
            break

          case "number":
          case "number-per-seconds":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
          case "conditional-chance":
            throw new Error(
              `Effect type "${node.effectType}" is not yet supported in product nodes`
            )

          default:
            throw new Error(`Unknown effect type: ${node.effectType}`)
        }
      }

      return effectValues.reduce((product, value) => product * (1 + value), 1)
    }

    case "floor-product": {
      let result = evaluateArithmeticNode(node.operand, context, evaluatePlayerLeaf)

      const metricIds = getAggregateMetricIds(metric.id)

      const effectValues: number[] = []
      const categories = node.categories ?? sourceCategories.ids

      for (const category of categories) {
        switch (node.effectType) {
          case "integer":
            effectValues.push(...getIndividualIntegerEffects(category, metricIds, sources))
            break

          case "fractional-change":
            effectValues.push(...getIndividualPercentageEffects(category, metricIds, sources))
            break

          case "number":
          case "number-per-seconds":
          case "number-for-seconds":
          case "fraction-change-for-seconds":
          case "conditional-chance":
            throw new Error(
              `Effect type "${node.effectType}" is not yet supported in floor-product nodes`
            )

          default:
            throw new Error(`Unknown effect type: ${node.effectType}`)
        }
      }

      for (const value of effectValues) {
        result = Math.floor(result * (1 + value))
      }

      return result
    }

    case "floor-multiply": {
      if (node.operands.length === 0) {
        return 1
      }

      let result = evaluateArithmeticNode(requireFirst(node.operands), context, evaluatePlayerLeaf)

      for (const operand of node.operands.slice(1)) {
        const operandValue = evaluateArithmeticNode(operand, context, evaluatePlayerLeaf)
        result = Math.floor(result * operandValue)
      }

      return result
    }

    case "constant":
    case "add":
    case "multiply":
    case "divide":
    case "floor":
    case "max":
    case "min": {
      throw new Error(`Arithmetic node "${node.type}" reached player leaf callback`)
    }
    default:
      assertNever(node)
  }
}
