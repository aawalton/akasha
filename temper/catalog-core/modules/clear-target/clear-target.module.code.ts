export type ClearTargetDecision =
  | { readonly kind: "all" }
  | { readonly kind: "one"; readonly domainKey: string }
  | { readonly kind: "unknown"; readonly requested: string }
  | { readonly kind: "noTarget" }

export function decideClearTarget(
  this: void,
  requested: string | undefined,
  knownDomainKeys: readonly string[]
): ClearTargetDecision {
  if (requested === undefined || requested === "") return { kind: "noTarget" }
  if (requested === "all") return { kind: "all" }
  for (const key of knownDomainKeys) {
    if (key === requested) return { kind: "one", domainKey: key }
  }
  return { kind: "unknown", requested }
}
