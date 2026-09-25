import { domain } from "akasha/domain/domain.page-type.ts"
import { term } from "akasha/domain/plain-language/standard-agent-english/term/term.page-type.ts"
import { generatorKind } from "akasha/page/generator-kind/generator-kind.page-type.ts"
import { uuidV7 } from "akasha/page/generator-kind/pages/uuid-v7.generator-kind.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { id as idPage } from "akasha/page/properties/id.text-property.ts"
import { slug as slugPage } from "akasha/page/properties/slug.text-property.ts"
import { textProperty } from "akasha/page/text-property/text-property.page-type.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Named = {
  readonly slug: string
  readonly type: string
}

function pagesUnder(folder: string, values: readonly Named[]): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const value of values) {
    found[`${folder}/${value.slug}.${slugOf(value.type)}.ts`] =
      `export const it = ${JSON.stringify(value)} as const\n`
  }
  return found
}

export function declaringUnder(folder: string): Readonly<Record<string, string>> {
  return pagesUnder(folder, [textProperty, idPage, slugPage, generatorKind, uuidV7])
}

export function typingUnder(folder: string): Readonly<Record<string, string>> {
  return pagesUnder(folder, [page, term, domain, pageProperty, pageType])
}
