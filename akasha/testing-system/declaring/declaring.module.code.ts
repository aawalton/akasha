import { id as idPage } from "../../pages-system/page/properties/id.text-property.ts"
import { slug as slugPage } from "../../pages-system/page/properties/slug.text-property.ts"
import { textProperty } from "../../pages-system/text-property/text-property.page-type.ts"

export function declaringUnder(folder: string): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const value of [textProperty, idPage, slugPage]) {
    found[`${folder}/${value.slug}.${value.pageTypeSlug}.ts`] =
      `export const it = ${JSON.stringify(value)} as const\n`
  }
  return found
}
