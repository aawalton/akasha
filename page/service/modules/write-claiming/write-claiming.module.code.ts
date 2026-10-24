import {
  claimUncommitted,
  dropUncommitted,
  removeUncommitted,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

export type Claim = { readonly path: string; readonly key: string }

const UNSTATED = "a claim states its `path` and its `key` as strings"

export function claimsIn(given: unknown): readonly Claim[] | string {
  if (!Array.isArray(given)) return "`claims` is a list"
  const claims: Claim[] = []
  for (const one of given) {
    if (typeof one !== "object" || one === null) return UNSTATED
    const held = one as Readonly<Record<string, unknown>>
    if (typeof held.path !== "string" || typeof held.key !== "string" || held.key === "") {
      return UNSTATED
    }
    claims.push({ path: held.path, key: held.key })
  }
  return claims
}

export function releasedAll(root: string, claims: readonly Claim[]): undefined {
  for (const one of claims) dropUncommitted(root, one.path, [one.key])
  return undefined
}

export function claimedAll(root: string, claims: readonly Claim[], at: string): string | null {
  const taken: Claim[] = []
  for (const one of claims) {
    if (claimUncommitted(root, one.path, one.key, at)) {
      taken.push(one)
      continue
    }
    releasedAll(root, taken)
    return (
      `\`${one.path}\` is claimed under \`${one.key}\` already, or is no page, ` +
      "so the write claiming it lands nothing"
    )
  }
  return null
}

export function claimsGone(
  root: string,
  claims: readonly Claim[],
  took: readonly string[]
): undefined {
  const gone = new Set(took)
  for (const one of claims) if (gone.has(one.path)) removeUncommitted(root, one.path)
  return undefined
}
