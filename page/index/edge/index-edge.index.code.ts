import { join } from "node:path"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  namesIn,
  namesMortal,
  namingsIn,
  namingsInRows,
  reaches,
  type Shaped,
} from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { indexEdge } from "akasha/page/index/edge/index-edge.index.ts"
import type { Rowing } from "akasha/page/modules/entries/page-entries.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const EDGE = indexEdge.name

const ENDING = ".jsonl"

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

export const NOTHING_FILED: Filed = { entries: [], refused: [] }

export function edgeIn(
  value: Value,
  path: string,
  known: Shaped,
  repo: string,
  rowing: readonly Rowing[]
): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const own = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  const dies = own !== null && known.mortal(slugOf(own))
  const line = JSON.stringify({ path: under(repo, path) })
  const entries: Entry[] = []
  const refused: string[] = []
  const already = new Set<string>()
  for (const one of [...namingsIn(value, known), ...namingsInRows(rowing, known)]) {
    if (one.identity) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        if (!dies && !namesMortal(named, wanted, known)) {
          refused.push(`${path}: \`${one.said}\` — ${reached.refused}`)
        }
        continue
      }
      const at = join(EDGE, "page", "id", reached.id, one.propertySlug, `${id}${ENDING}`)
      if (already.has(at)) continue
      already.add(at)
      entries.push({ at, line })
    }
  }
  return { entries, refused }
}
