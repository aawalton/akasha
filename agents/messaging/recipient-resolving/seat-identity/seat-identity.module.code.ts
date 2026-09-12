import { pageFromHistory } from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import type { Roots } from "akasha/pages/markdown-page-at/markdown-page-at.module.code.ts"
import { akashaSeatIdForName } from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"

const ID_KEY = "id"

export interface SeatIdentity {
  readonly id: string
}

function seatIdentityIn(frontmatter: Record<string, unknown>): SeatIdentity | null {
  const id = frontmatter[ID_KEY]
  if (typeof id !== "string" || id === "") return null
  return { id }
}

export function seatIdentityForName(name: string, roots: Roots): SeatIdentity | null {
  const live = akashaSeatIdForName(name)
  if (live !== null) return { id: live }
  const held = pageFromHistory(name, roots)?.frontmatter ?? null
  return held === null ? null : seatIdentityIn(held)
}
