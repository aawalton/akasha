import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { type Valued, valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type Held = Valued

export function pageOf(given: string | Reading, pageTypeSlug: string, slug: string): Held {
  return valuedAt(given, pageTypeSlug, slug)
}

export function besideOf(page: Held, propertySlug: string): string {
  const held = textAt(page.value, exportedAs(propertySlug))
  if (held === null) {
    throw new Error(`\`${page.path}\` states no \`${propertySlug}\`, so nothing sits beside it`)
  }
  const at = besideAt(page.path, propertySlug, held)
  if (at === null) throw new Error(`\`${page.path}\` is no TypeScript file, and a page is one`)
  return at
}
