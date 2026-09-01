import { generatorKind } from "@akasha/pages-system/generator-kind"
import { uuidV7 } from "@akasha/pages-system/generator-kind/uuid-v7"
import { id as idPage } from "@akasha/pages-system/page/id"
import { slug as slugPage } from "@akasha/pages-system/page/slug"
import { textProperty } from "@akasha/pages-system/text-property"

export function declaringUnder(folder: string): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const value of [textProperty, idPage, slugPage, generatorKind, uuidV7]) {
    found[`${folder}/${value.slug}.${value.pageTypeSlug}.ts`] =
      `export const it = ${JSON.stringify(value)} as const\n`
  }
  return found
}
