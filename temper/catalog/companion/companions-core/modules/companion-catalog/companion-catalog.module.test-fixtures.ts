import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  type CompanionCatalog,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  CATALOG_READS,
  companionCatalogFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-reading/companion-catalog-reading.module.code.ts"

type Row = Readonly<Record<string, unknown>>

function rowsOf(pageTypeSlug: string, keys: readonly string[]): readonly Row[] {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return asked.rows as readonly Row[]
}

export function holdCompanionCatalogFromCheckout(): CompanionCatalog {
  const byType = new Map(CATALOG_READS.map(([slug, keys]) => [slug, rowsOf(slug, keys)]))
  return holdCompanionCatalog(companionCatalogFrom((slug) => byType.get(slug) ?? []))
}
