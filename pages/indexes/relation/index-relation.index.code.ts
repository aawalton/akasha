import { join } from "node:path"
import { textAt, type Value } from "@akasha/pages-system/page-value"
import { type Entry, under } from "../index-entries/index-entries.module.code.ts"
import { namesIn, namingsIn, reaches, type Shaped } from "../reaching/reaching.module.code.ts"
import { indexRelation } from "./index-relation.index.ts"

const RELATION = indexRelation.name

const ENDING = ".jsonl"

export type Filed = {
  readonly entries: readonly Entry[]
  readonly refused: readonly string[]
}

export const NOTHING_FILED: Filed = { entries: [], refused: [] }

export function relationIn(value: Value, path: string, known: Shaped, repo: string): Filed {
  const id = textAt(value, "id")
  if (id === null) return NOTHING_FILED
  const line = JSON.stringify({ path: under(repo, path) })
  const entries: Entry[] = []
  const refused: string[] = []
  const already = new Set<string>()
  for (const one of namingsIn(value, known)) {
    if (one.own) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        refused.push(`${path}: \`${one.said}\` — ${reached.refused}`)
        continue
      }
      const at = join(RELATION, "page", "id", reached.id, one.propertySlug, `${id}${ENDING}`)
      if (already.has(at)) continue
      already.add(at)
      entries.push({ at, line })
    }
  }
  return { entries, refused }
}
