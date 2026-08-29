import { schemaAt, textAt, valueAt } from "./index-entries.module.code.ts"
import { indexIn, standingAt } from "./index-reading.module.code.ts"

const GENERATOR = "generator"

export function generatedProperties(root: string): ReadonlySet<string> {
  const found: string[] = []
  for (const [slug, held] of schemaAt(indexIn(root))) {
    for (const one of standingAt(root, held.pageTypeSlug, slug)) {
      const value = valueAt(one.path, root)
      if (value !== null && textAt(value, GENERATOR) !== null) found.push(slug)
    }
  }
  return new Set(found.sort())
}
