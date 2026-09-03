export const CLAIM = /^[a-z][a-z0-9-]*:\S/

const BARE_REPO = "instructions"

export function fileIn(stated: string): { readonly repo: string; readonly path: string } {
  if (!CLAIM.test(stated)) return { repo: BARE_REPO, path: stated }
  const at = stated.indexOf(":")
  return { repo: stated.slice(0, at), path: stated.slice(at + 1) }
}
