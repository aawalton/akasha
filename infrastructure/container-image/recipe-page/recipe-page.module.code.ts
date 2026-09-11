import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt, valuesByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import { textAt, type Value } from "akasha/pages/value/page-value.module.code.ts"

export type Held = {
  readonly path: string
  readonly value: Value
}

export function pageOf(given: string | Reading, pageTypeSlug: string, slug: string): Held {
  const listed = listedAt(given, pageTypeSlug, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${pageTypeSlug}\` page carries the slug \`${slug}\`, so this recipe copies nothing`
    )
  }
  const value = valuesByPath(given, pageTypeSlug).get(listed.path)
  if (value === undefined) {
    throw new Error(`\`${listed.path}\` is filed under \`${pageTypeSlug}\` and carries no value`)
  }
  return { path: listed.path, value }
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
