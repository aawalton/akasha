import { evaluateArithmeticNode } from "@akasha/temper-formula-framework/arithmetic-evaluate"
import { convertRatingToChance } from "@akasha/temper-formula-framework/rating-chance"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CompanionBaseRoleId } from "../companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionEffectSource } from "../companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionFormulaNode } from "../companion-metric-template/companion-metric-template.module.code.ts"
import { companionMetrics } from "../companion-metrics/companion-metrics.module.code.ts"

interface CompanionFormulaContext {
  metricValues: Map<CompanionMetricId, number>
  sources: readonly CompanionEffectSource[]
  roles: readonly CompanionBaseRoleId[]
}

export function sumEffects(
  sources: readonly CompanionEffectSource[],
  metricId: CompanionMetricId,
  effectType: "fractional-change" | "integer"
): number {
  let total = 0

  for (const source of sources) {
    for (const effect of source.effects) {
      if (
        effect.metricId === metricId &&
        effect.effectType === effectType &&
        typeof effect.effectValue === "number"
      ) {
        total += effect.effectValue
      }
    }
  }

  return total
}

function evaluateCompanionLeaf(
  node: CompanionFormulaNode,
  context: CompanionFormulaContext
): number {
  switch (node.type) {
    case "metric-ref": {
      const value = context.metricValues.get(node.metricId) ?? 0

      if (node.convertRatingToChance) {
        const metric = companionMetrics.data[node.metricId]
        if (metric.valueType === "rating" && metric.divisor !== undefined) {
          return convertRatingToChance(
            value,
            metric.divisor,
            metric.cap,
            metric.ratingFloorIncrement
          )
        }
      }

      return value
    }

    case "sum": {
      return sumEffects(context.sources, node.metricId, node.effectType)
    }

    case "role-sum": {
      let total = 0
      for (const operand of node.operands) {
        if (context.roles.includes(operand.role)) {
          let value = context.metricValues.get(operand.metricRef) ?? 0
          if (operand.scale !== undefined) value *= operand.scale
          total += value
        }
      }
      return total
    }

    case "product": {
      let product = 1
      for (const source of context.sources) {
        for (const effect of source.effects) {
          if (
            effect.metricId === node.metricId &&
            effect.effectType === node.effectType &&
            typeof effect.effectValue === "number"
          ) {
            product *= 1 + effect.effectValue
          }
        }
      }
      return product
    }

    case "constant":
    case "add":
    case "multiply":
    case "divide":
    case "floor":
    case "max":
    case "min":
      throw new Error(`Arithmetic node leaked to companion leaf evaluator: ${node.type}`)

    default:
      return assertNever(node)
  }
}

export function evaluateFormula(
  formula: CompanionFormulaNode,
  metricValues: Map<CompanionMetricId, number>,
  sources: readonly CompanionEffectSource[],
  roles: readonly CompanionBaseRoleId[] = []
): number {
  const context: CompanionFormulaContext = { metricValues, sources, roles }
  return evaluateArithmeticNode(formula, context, evaluateCompanionLeaf)
}

export function extractMetricReferences(node: CompanionFormulaNode): Set<CompanionMetricId> {
  const refs = new Set<CompanionMetricId>()

  switch (node.type) {
    case "constant":
      break
    case "metric-ref":
      refs.add(node.metricId)
      break
    case "sum":
    case "product":
      break
    case "role-sum":
      for (const operand of node.operands) {
        refs.add(operand.metricRef)
      }
      break
    case "add":
    case "multiply":
    case "divide":
    case "max":
    case "min":
      for (const operand of node.operands) {
        for (const ref of extractMetricReferences(operand)) {
          refs.add(ref)
        }
      }
      break
    case "floor":
      for (const ref of extractMetricReferences(node.operand)) {
        refs.add(ref)
      }
      break
    default:
      assertNever(node)
  }

  return refs
}
