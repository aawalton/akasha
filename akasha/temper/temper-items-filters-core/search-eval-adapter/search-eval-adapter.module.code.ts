import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "@akasha/temper-items-rules-eval/check-result"
import type { EvalContext, EvalEnv } from "@akasha/temper-items-rules-eval/eval-env"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"

export type PureFactsChecker = (
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
) => ConditionCheckResult

const SYNTHETIC_RULE_BASE = { action: "stock", categoryId: "all" } as const satisfies Pick<
  CompiledOrderedRule,
  "action" | "categoryId"
>

const PURE_FACTS_VIOLATION =
  "TemperFilter matcher routed an env-coupled checker through runChecker; " +
  "filter matchers must be pure over ItemFacts"

const fail = (): never => {
  throw new Error(PURE_FACTS_VIOLATION)
}

const PURE_FACTS_ENV: EvalEnv = {
  isKnownByCharacter: fail,
  isKnownByAnyCharacter: fail,
  isTraitResearched: fail,
  isCraftingRankBelowCap: fail,
  matchesWantedEquipment: fail,
  matchesWantedCompanionEquipment: fail,
  isCompanionWornSlotFilled: fail,
  findCharacterForWantedEquipment: fail,
  findCompanionForWantedEquipment: fail,
  getConsumableStock: fail,
  getConsumableWanters: fail,
  getBankStock: fail,
  getCooldownGroup: fail,
  isCooldownExpired: fail,
  getTransmuteCrystalAmount: fail,
  getTransmuteCrystalCap: fail,
  getKnownScripts: fail,
  getTotalScriptCount: fail,
  getCharacterPriority: fail,
  getCurrentCharacter: fail,
  getAllCharacters: fail,
}

const PURE_FACTS_CTX: EvalContext = { env: PURE_FACTS_ENV }

export function runChecker(
  checker: PureFactsChecker,
  facts: ItemFacts,
  patch: Partial<CompiledOrderedRule>
): boolean {
  const rule: CompiledOrderedRule = { ...SYNTHETIC_RULE_BASE, ...patch }
  return checker(rule, facts, PURE_FACTS_CTX).kind === "pass"
}
