import type { Carries } from "../page-derive-shape/page-derive-shape.module.code.ts"
import type { PageQuery } from "../page-query-shape/page-query-shape.module.code.ts"
import { BODY } from "../page-value-key/page-value-key.module.code.ts"

export function askedKeys(query: PageQuery): readonly string[] {
  const wanted = new Set<string>(query.keys ?? [])
  if (query.sortBy !== undefined) wanted.add(query.sortBy)
  if (query.target !== undefined) wanted.add(query.target)
  for (const key of query.countBy ?? []) wanted.add(key)
  for (const test of query.where ?? []) wanted.add(test.key)
  return [...wanted].sort()
}

export function carriesFor(query: PageQuery): Carries {
  const keys = query.keys ?? []
  const reduces = query.countBy !== undefined || query.function !== undefined
  const whole = query.keys === undefined && !reduces
  const asked = askedKeys(query)
  return {
    body: asked.includes(BODY) || whole,
    attachment: keys,
    rows: keys,
    ...(whole ? {} : { only: asked }),
  }
}
