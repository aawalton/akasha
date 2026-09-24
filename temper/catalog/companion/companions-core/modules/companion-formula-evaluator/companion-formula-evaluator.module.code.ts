import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionEffectSource } from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionFormulaNode } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"
import { companionMetrics } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import { evaluateArithmeticNode } from "akasha/temper/player/character/formula-framework/modules/arithmetic-evaluate/arithmetic-evaluate.module.code.ts"
import { convertRatingToChance } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"

interface CompanionFormulaContext {
  computing: CompanionMetricId
  metricValues: Map<CompanionMetricId, number>
  sources: readonly CompanionEffectSource[]
  roles: readonly CompanionBaseRoleId[]
}

function readMetricValue(context: CompanionFormulaContext, metricId: CompanionMetricId): number {
  const value = context.metricValues.get(metricId)
  if (value === undefined) {
    throw new Error(
      `Companion formula for ${context.computing} names ${metricId}, which has no value`
    )
  }
  return value
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
      const value = readMetricValue(context, node.metricId)

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
          let value = readMetricValue(context, operand.metricRef)
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
  computing: CompanionMetricId,
  formula: CompanionFormulaNode,
  metricValues: Map<CompanionMetricId, number>,
  sources: readonly CompanionEffectSource[],
  roles: readonly CompanionBaseRoleId[] = []
): number {
  const context: CompanionFormulaContext = { computing, metricValues, sources, roles }
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
