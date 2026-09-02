import type { ConditionResult } from "../rule-condition-eval/rule-condition-eval.module.code.ts"

export type ConditionCheckResult = { readonly kind: "skip" } | ConditionResult
