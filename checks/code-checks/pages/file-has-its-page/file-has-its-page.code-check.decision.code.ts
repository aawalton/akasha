import type { Shadow } from "@akasha/pages/shadow"

export const UNCLAIMED =
  "no page claims this file — a move repoints nothing to it and its page's deletion leaves it behind"

export type Claiming = (path: string) => boolean

export function claimingIn(shadow: Shadow): Claiming {
  return (path) => shadow.index.listedByPath(path).length > 0
}

export function unclaimedAt(path: string, claimed: Claiming): readonly string[] {
  if (claimed(path)) return []
  return [UNCLAIMED]
}
