import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { akashaSeatIdForName } from "../../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { pageFromHistory } from "../../seat-page-history/seat-page-history.module.code.ts"

const ID_KEY = "id"

export interface SeatIdentity {
  readonly id: string
}

export function seatIdentityIn(frontmatter: Record<string, unknown>): SeatIdentity | null {
  const id = frontmatter[ID_KEY]
  if (typeof id !== "string" || id === "") return null
  return { id }
}

// `roots` is the history's now, akasha resolving its own.
export function seatIdentityForName(name: string, roots: Roots): SeatIdentity | null {
  const standing = akashaSeatIdForName(name)
  if (standing !== null) return { id: standing }
  const held = pageFromHistory(name, roots)?.frontmatter ?? null
  return held === null ? null : seatIdentityIn(held)
}
