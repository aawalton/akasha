import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkStackFullness(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (rule.stackFullness === undefined) {
    return { kind: "skip" }
  }
  if (facts.stackCount === undefined) {
    return { kind: "indeterminate", conditionKind: "stack-fullness", missingSignal: "stackCount" }
  }
  if (facts.maxStackSize === undefined) {
    return { kind: "indeterminate", conditionKind: "stack-fullness", missingSignal: "maxStackSize" }
  }
  const isFull = facts.stackCount >= facts.maxStackSize
  if (rule.stackFullness === "full" && !isFull) {
    return { kind: "fail", conditionKind: "stack-fullness" }
  }
  if (rule.stackFullness === "partial" && isFull) {
    return { kind: "fail", conditionKind: "stack-fullness" }
  }
  return { kind: "pass" }
}
