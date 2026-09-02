import type { BuyRule } from "../buy-rule-types/buy-rule-types.module.code.ts"

export interface BuyRuleEvaluation {
  rule: BuyRule
  currentTotal: number
  shortfall: number
}

export function computeBuyShortfall(targetQuantity: number, currentTotal: number): number {
  return Math.max(0, targetQuantity - currentTotal)
}

export function evaluateBuyRules(
  buyRules: readonly BuyRule[],
  totals: ReadonlyMap<number, number>
): readonly BuyRuleEvaluation[] {
  const evaluations: BuyRuleEvaluation[] = []
  for (const rule of buyRules) {
    if (rule.active === false) continue
    const currentTotal = totals.get(rule.itemId) ?? 0
    const shortfall = computeBuyShortfall(rule.targetQuantity, currentTotal)
    evaluations.push({ rule, currentTotal, shortfall })
  }
  return evaluations
}
