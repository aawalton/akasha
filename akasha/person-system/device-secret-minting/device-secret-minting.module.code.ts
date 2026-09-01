export type KeychainDomain = "pinned" | "default" | "unsaid"

export type PeekProbe =
  | { readonly ok: true; readonly present: boolean; readonly domain: KeychainDomain }
  | { readonly ok: false }

export type MintAction = "mint" | "skip"

export function domainSaid(said: string | undefined): KeychainDomain {
  if (said === "pinned") return "pinned"
  if (said === "default") return "default"
  return "unsaid"
}

export function decideMintAction(probe: PeekProbe): MintAction {
  if (!probe.ok) return "mint"
  if (!probe.present) return "mint"
  return probe.domain === "pinned" ? "skip" : "mint"
}
