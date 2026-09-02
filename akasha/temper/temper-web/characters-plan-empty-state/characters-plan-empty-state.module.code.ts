export type PlanEmptyState =
  | { readonly kind: "unconfirmed" }
  | { readonly kind: "no-characters" }
  | { readonly kind: "no-builds"; readonly importedCharacterCount: number }

export interface PlanEmptyStateInput {
  readonly charactersUnconfirmed: boolean
  readonly importedCharacterCount: number
}

export function decidePlanEmptyState({
  charactersUnconfirmed,
  importedCharacterCount,
}: PlanEmptyStateInput): PlanEmptyState {
  if (importedCharacterCount > 0) return { kind: "no-builds", importedCharacterCount }
  if (charactersUnconfirmed) return { kind: "unconfirmed" }
  return { kind: "no-characters" }
}
