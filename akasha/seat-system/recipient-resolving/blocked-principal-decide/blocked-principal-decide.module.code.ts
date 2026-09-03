export interface BlockedPrincipalInput {
  readonly agentName: string | null
}

export type BlockedPrincipal = { readonly kind: "unresolved"; readonly reason: string }

const UNNAMED = "(unnamed)"

export function decideBlockedPrincipal(input: BlockedPrincipalInput): BlockedPrincipal {
  return {
    kind: "unresolved",
    reason:
      `nothing binds '${input.agentName ?? UNNAMED}' to work another party waits on, so no ` +
      "principal is derivable. An initiative states an aim rather than a party stopped on it, " +
      "and a branch carries a change rather than a seat.",
  }
}
