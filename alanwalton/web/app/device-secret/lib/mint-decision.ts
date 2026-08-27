export type PeekProbe = { readonly ok: true; readonly present: boolean } | { readonly ok: false }

export type MintAction = "mint" | "skip"

export function decideMintAction(probe: PeekProbe): MintAction {
  if (!probe.ok) return "mint"
  return probe.present ? "skip" : "mint"
}
