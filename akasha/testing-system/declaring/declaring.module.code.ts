import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { schemaIn } from "../../pages-system/indexes/index/index-schema/index-schema.index.code.ts"
import type { Value } from "../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { id as idPage } from "../../pages-system/page/properties/id.text-property.ts"
import { slug as slugPage } from "../../pages-system/page/properties/slug.text-property.ts"
import { textProperty } from "../../pages-system/text-property/text-property.page-type.ts"

export function declaring(root: string): void {
  const pages: readonly Value[] = [idPage, slugPage]
  for (const page of pages) {
    for (const one of schemaIn(page)) {
      const at = join(indexIn(root), one.at)
      mkdirSync(join(at, ".."), { recursive: true })
      writeFileSync(at, `${one.line}\n`)
    }
  }
}

export function declaringUnder(folder: string): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const value of [textProperty, idPage, slugPage]) {
    found[`${folder}/${value.slug}.${value.pageTypeSlug}.ts`] =
      `export const it = ${JSON.stringify(value)} as const\n`
  }
  return found
}
