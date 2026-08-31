import { join } from "node:path"
import {
  type Entry,
  textAt,
  under,
  type Value,
} from "../../index-entries/index-entries.module.code.ts"
import { namesIn, reaches, recordsIn, type Shaped } from "../../reaching/reaching.module.code.ts"
import { indexRelation } from "./index-relation.index.ts"

const RELATION = indexRelation.indexName

const ENDING = ".jsonl"

export const NOT_A_RELATION = new Set(["id", "slug", "pageTypeSlug"])

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
  const file = (propertySlug: string, held: unknown, said: string): undefined => {
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) return
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached) {
        refused.push(`${path}: \`${said}\` — ${reached.refused}`)
        continue
      }
      const at = join(RELATION, "page", "id", reached.id, propertySlug, `${id}${ENDING}`)
      if (already.has(at)) continue
      already.add(at)
      entries.push({ at, line })
    }
  }
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = known.slugOfKey(key)
    if (propertySlug === null) continue
    if (known.targetOf(propertySlug) !== null) {
      file(propertySlug, held, propertySlug)
      continue
    }
    const fields = known.fieldsOf(propertySlug)
    if (fields.length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [inner, said] of Object.entries(entry)) {
        const field = known.slugOfKey(inner)
        if (field !== null && fields.includes(field)) file(field, said, `${propertySlug} ${field}`)
      }
    }
  }
  return { entries, refused }
}
