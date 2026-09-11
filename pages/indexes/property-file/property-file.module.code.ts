import { dirname, join } from "node:path"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filePropertiesAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type Held = {
  readonly path: string
  readonly value: Value
}

export function fileOf(
  given: string | Reading,
  page: Held,
  pageTypeSlug: string,
  propertySlug: string
): string {
  const fileName = filePropertiesAt(given).get(pageTypeSlug)?.get(propertySlug)
  if (fileName === undefined) {
    throw new Error(`a \`${pageTypeSlug}\` page holds no \`${propertySlug}\` in a file of its own`)
  }
  if (fileName !== null) return join(dirname(page.path), fileName)
  const held = textAt(page.value, exportedAs(propertySlug))
  if (held === null) {
    throw new Error(`\`${page.path}\` states no \`${propertySlug}\`, so nothing sits beside it`)
  }
  const at = besideAt(page.path, propertySlug, held)
  if (at === null) throw new Error(`\`${page.path}\` is no TypeScript file, and a page is one`)
  return at
}
