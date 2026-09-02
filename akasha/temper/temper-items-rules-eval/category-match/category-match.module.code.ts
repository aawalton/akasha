import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export type CategoryMatch =
  | { readonly kind: "match" }
  | { readonly kind: "mismatch" }
  | { readonly kind: "unknown" }

export function categoryMatchesItem(ruleCategoryId: string, facts: ItemFacts): CategoryMatch {
  const chain = facts.categoryNodeIds
  if (chain === undefined) {
    return { kind: "unknown" }
  }
  for (const nodeId of chain) {
    if (nodeId === ruleCategoryId) {
      return { kind: "match" }
    }
  }
  return { kind: "mismatch" }
}
