import { readFileSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, lastSeenIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import {
  everyOfType,
  listedAt,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { withholdingFor } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const LORE_KINDS: readonly string[] = [lore.slug, place.slug]

function bodyIdAt(root: string, path: string): string | null {
  try {
    return blobIdOf(readFileSync(join(root, path)))
  } catch {
    return null
  }
}

export function changedLoreFor(root: string, agentId: string): readonly string[] {
  const seen = lastSeenIn(root, agentId)
  if (seen.size === 0) return []
  const holds = withholdingFor(root, agentId)
  const found: string[] = []
  for (const kind of LORE_KINDS) {
    for (const one of everyOfType(root, kind)) {
      const held = seen.get(one.path)
      if (held === undefined || holds?.(one.path) === true) continue
      const now = bodyIdAt(root, one.path)
      if (now !== null && now !== held.oid && now !== held.carriedOid) found.push(one.path)
    }
  }
  return found.sort()
}

export function changedLoreOfSeat(root: string, name: string): readonly string[] {
  const agentId = listedAt(root, seat.slug, name)[0]?.id
  return agentId === undefined ? [] : changedLoreFor(root, agentId)
}
