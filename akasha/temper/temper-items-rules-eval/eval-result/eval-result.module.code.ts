import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"

export type RejectionReason =
  | { readonly kind: "category-mismatch"; readonly ruleCategoryId: string }
  | { readonly kind: "condition-fail"; readonly conditionKind: string; readonly detail?: string }
  | { readonly kind: "destination-resolve-fail"; readonly detail?: string }
  | { readonly kind: "container-skip"; readonly detail?: string }

export type IndeterminateReason =
  | { readonly kind: "category-unknown"; readonly missingSignal: string }
  | {
      readonly kind: "condition-unknown"
      readonly conditionKind: string
      readonly missingSignal: string
    }
  | { readonly kind: "destination-unknown"; readonly detail?: string }

export type RuleVerdict =
  | { readonly kind: "matched" }
  | { readonly kind: "rejected"; readonly reason: RejectionReason }
  | { readonly kind: "indeterminate"; readonly reason: IndeterminateReason }

export interface RuleEvalResult {
  readonly index: number
  readonly ruleId?: string
  readonly categoryId: string
  readonly action: ItemAction
  readonly destination?: string
  readonly verdict: RuleVerdict
  readonly resolvedDestination?: string
}

export type WalkOutcome =
  | {
      readonly kind: "matched"
      readonly rule: RuleEvalResult
      readonly action: ItemAction
      readonly destination?: string
      readonly label: string
    }
  | {
      readonly kind: "implicit-terminal"
      readonly action: "nothing"
      readonly label: string
    }
  | {
      readonly kind: "indeterminate"
      readonly indeterminateRules: ReadonlyArray<RuleEvalResult>
      readonly provisionalMatch?: {
        readonly rule: RuleEvalResult
        readonly action: ItemAction
        readonly destination?: string
        readonly label: string
      }
    }

export interface WalkTrace {
  readonly perRule: ReadonlyArray<RuleEvalResult>
  readonly outcome: WalkOutcome
}
