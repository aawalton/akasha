import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkFlags(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (
    rule.stolen === undefined &&
    rule.bound === undefined &&
    rule.bopTradeable === undefined &&
    rule.questRelevant === undefined &&
    rule.locked === undefined &&
    rule.reconstructed === undefined &&
    rule.transmuted === undefined &&
    rule.crafted === undefined
  ) {
    return { kind: "skip" }
  }

  if (rule.stolen !== undefined) {
    if (facts.isStolen === undefined) {
      return { kind: "indeterminate", conditionKind: "stolen", missingSignal: "isStolen" }
    }
    if (rule.stolen === "stolen" && !facts.isStolen) {
      return { kind: "fail", conditionKind: "stolen" }
    }
    if (rule.stolen === "not-stolen" && facts.isStolen) {
      return { kind: "fail", conditionKind: "stolen" }
    }
  }

  if (rule.bound !== undefined) {
    if (facts.isBound === undefined) {
      return { kind: "indeterminate", conditionKind: "bound", missingSignal: "isBound" }
    }
    if (rule.bound === "bound" && !facts.isBound) {
      return { kind: "fail", conditionKind: "bound" }
    }
    if (rule.bound === "not-bound" && facts.isBound) {
      return { kind: "fail", conditionKind: "bound" }
    }
  }

  if (rule.bopTradeable !== undefined) {
    if (facts.isBoPTradeable === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "bopTradeable",
        missingSignal: "isBoPTradeable",
      }
    }
    if (rule.bopTradeable === "bop-tradeable" && !facts.isBoPTradeable) {
      return { kind: "fail", conditionKind: "bopTradeable" }
    }
    if (rule.bopTradeable === "not-bop-tradeable" && facts.isBoPTradeable) {
      return { kind: "fail", conditionKind: "bopTradeable" }
    }
  }

  if (rule.questRelevant !== undefined) {
    if (facts.isQuestRelevant === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "questRelevant",
        missingSignal: "isQuestRelevant",
      }
    }
    if (rule.questRelevant === "quest-relevant" && !facts.isQuestRelevant) {
      return { kind: "fail", conditionKind: "questRelevant" }
    }
    if (rule.questRelevant === "not-quest-relevant" && facts.isQuestRelevant) {
      return { kind: "fail", conditionKind: "questRelevant" }
    }
  }

  if (rule.locked !== undefined) {
    if (facts.isLocked === undefined) {
      return { kind: "indeterminate", conditionKind: "locked", missingSignal: "isLocked" }
    }
    if (rule.locked === "locked" && !facts.isLocked) {
      return { kind: "fail", conditionKind: "locked" }
    }
    if (rule.locked === "not-locked" && facts.isLocked) {
      return { kind: "fail", conditionKind: "locked" }
    }
  }

  if (rule.reconstructed !== undefined) {
    if (facts.isReconstructed === undefined) {
      return {
        kind: "indeterminate",
        conditionKind: "reconstructed",
        missingSignal: "isReconstructed",
      }
    }
    if (rule.reconstructed === "reconstructed" && !facts.isReconstructed) {
      return { kind: "fail", conditionKind: "reconstructed" }
    }
    if (rule.reconstructed === "not-reconstructed" && facts.isReconstructed) {
      return { kind: "fail", conditionKind: "reconstructed" }
    }
  }

  if (rule.transmuted !== undefined) {
    if (facts.isTransmuted === undefined) {
      return { kind: "indeterminate", conditionKind: "transmuted", missingSignal: "isTransmuted" }
    }
    if (rule.transmuted === "transmuted" && !facts.isTransmuted) {
      return { kind: "fail", conditionKind: "transmuted" }
    }
    if (rule.transmuted === "not-transmuted" && facts.isTransmuted) {
      return { kind: "fail", conditionKind: "transmuted" }
    }
  }

  if (rule.crafted !== undefined) {
    if (facts.isCrafted === undefined) {
      return { kind: "indeterminate", conditionKind: "crafted", missingSignal: "isCrafted" }
    }
    if (rule.crafted === "crafted" && !facts.isCrafted) {
      return { kind: "fail", conditionKind: "crafted" }
    }
    if (rule.crafted === "not-crafted" && facts.isCrafted) {
      return { kind: "fail", conditionKind: "crafted" }
    }
  }

  return { kind: "pass" }
}
