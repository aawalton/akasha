import { schemaAt, textAt } from "../index-entries/index-entries.module.code.ts"
import { standingAt } from "../index-reading/index-reading.module.code.ts"
import type { Shadow } from "../index-shadow/index-shadow.module.code.ts"

const GENERATOR = "generator"

export function generatedProperties(shadow: Shadow): ReadonlySet<string> {
  const found: string[] = []
  for (const [slug, held] of schemaAt(shadow.reading)) {
    for (const one of standingAt(shadow.reading, held.pageTypeSlug, slug)) {
      const value = shadow.pageOf(one.path)
      if (value !== null && textAt(value, GENERATOR) !== null) found.push(slug)
    }
  }
  return new Set(found.sort())
}
