import { formatActionLabel } from "@akasha/temper-items-rules-core/inventory-rule-action-labels"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { categoryMatchesItem } from "../category-match/category-match.module.code.ts"
import { resolveDestination } from "../destination-resolve/destination-resolve.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type {
  RuleEvalResult,
  RuleVerdict,
  WalkOutcome,
  WalkTrace,
} from "../eval-result/eval-result.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"
import { evaluateConditions } from "../rule-condition-eval/rule-condition-eval.module.code.ts"

export function evaluateRule(
  rule: CompiledOrderedRule,
  index: number,
  facts: ItemFacts,
  ctx: EvalContext
): RuleEvalResult {
  const baseResult = {
    index,
    categoryId: rule.categoryId,
    action: rule.action,
    destination: rule.destination,
  } as const

  const category = categoryMatchesItem(rule.categoryId, facts)
  if (category.kind === "mismatch") {
    return {
      ...baseResult,
      verdict: {
        kind: "rejected",
        reason: { kind: "category-mismatch", ruleCategoryId: rule.categoryId },
      },
    }
  }
  if (category.kind === "unknown") {
    return {
      ...baseResult,
      verdict: {
        kind: "indeterminate",
        reason: { kind: "category-unknown", missingSignal: "categoryNodeIds" },
      },
    }
  }

  const conditions = evaluateConditions(rule, facts, ctx)
  if (conditions.kind === "fail") {
    return {
      ...baseResult,
      verdict: {
        kind: "rejected",
        reason: {
          kind: "condition-fail",
          conditionKind: conditions.conditionKind,
          detail: conditions.detail,
        },
      },
    }
  }
  if (conditions.kind === "indeterminate") {
    return {
      ...baseResult,
      verdict: {
        kind: "indeterminate",
        reason: {
          kind: "condition-unknown",
          conditionKind: conditions.conditionKind,
          missingSignal: conditions.missingSignal,
        },
      },
    }
  }

  const platformBlock = checkPlatformBlock(rule, facts)
  if (platformBlock !== undefined) {
    return {
      ...baseResult,
      verdict: {
        kind: "rejected",
        reason: { kind: "container-skip", detail: platformBlock },
      },
    }
  }

  const dest = resolveDestination(rule, facts, ctx)
  if (dest.kind === "no-eligible-target") {
    return {
      ...baseResult,
      verdict: {
        kind: "rejected",
        reason: { kind: "destination-resolve-fail", detail: dest.detail },
      },
    }
  }
  if (dest.kind === "indeterminate") {
    return {
      ...baseResult,
      verdict: {
        kind: "indeterminate",
        reason: { kind: "destination-unknown", detail: dest.detail },
      },
    }
  }

  const verdict: RuleVerdict = { kind: "matched" }
  return {
    ...baseResult,
    resolvedDestination: dest.concrete === "" ? undefined : dest.concrete,
    verdict,
  }
}

export function walkRules(
  rules: ReadonlyArray<CompiledOrderedRule>,
  facts: ItemFacts,
  ctx: EvalContext
): WalkTrace {
  const perRule: RuleEvalResult[] = []
  const indeterminateBeforeMatch: RuleEvalResult[] = []
  let firstMatch: RuleEvalResult | undefined

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    if (rule === undefined) continue
    const result = evaluateRule(rule, i, facts, ctx)
    perRule.push(result)

    if (firstMatch !== undefined) continue
    if (result.verdict.kind === "matched") {
      firstMatch = result
      continue
    }
    if (result.verdict.kind === "indeterminate") {
      indeterminateBeforeMatch.push(result)
    }
  }

  const outcome = buildOutcome(firstMatch, indeterminateBeforeMatch)
  return { perRule, outcome }
}

function checkPlatformBlock(rule: CompiledOrderedRule, facts: ItemFacts): string | undefined {
  if (facts.isContainer !== true) return undefined
  if (rule.action === "fence-launder" || rule.action === "fence-sell") {
    return "containers cannot be fenced or laundered"
  }
  if (rule.action === "sell" && facts.isStolen === true) {
    return "stolen containers redirect to fence-sell which rejects containers"
  }
  return undefined
}

function buildOutcome(
  firstMatch: RuleEvalResult | undefined,
  indeterminateBeforeMatch: ReadonlyArray<RuleEvalResult>
): WalkOutcome {
  if (firstMatch !== undefined && indeterminateBeforeMatch.length === 0) {
    return {
      kind: "matched",
      rule: firstMatch,
      action: firstMatch.action,
      destination: firstMatch.resolvedDestination ?? firstMatch.destination,
      label: formatActionLabel({
        action: firstMatch.action,
        destinationLabel: firstMatch.resolvedDestination ?? firstMatch.destination,
      }),
    }
  }
  if (firstMatch !== undefined) {
    return {
      kind: "indeterminate",
      indeterminateRules: indeterminateBeforeMatch,
      provisionalMatch: {
        rule: firstMatch,
        action: firstMatch.action,
        destination: firstMatch.resolvedDestination ?? firstMatch.destination,
        label: formatActionLabel({
          action: firstMatch.action,
          destinationLabel: firstMatch.resolvedDestination ?? firstMatch.destination,
        }),
      },
    }
  }
  if (indeterminateBeforeMatch.length > 0) {
    return {
      kind: "indeterminate",
      indeterminateRules: indeterminateBeforeMatch,
    }
  }
  return {
    kind: "implicit-terminal",
    action: "nothing",
    label: formatActionLabel({ action: "nothing" }),
  }
}
