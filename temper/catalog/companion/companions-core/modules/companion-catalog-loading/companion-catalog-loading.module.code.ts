import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type CompanionCatalog,
  heldCompanionCatalog,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  CATALOG_READS,
  companionCatalogFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-reading/companion-catalog-reading.module.code.ts"

const EVERY = 500

type Row = Readonly<Record<string, unknown>>

async function rowsOf(pageTypeSlug: string, select: readonly string[]): Promise<readonly Row[]> {
  const { rows } = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
  return rows
}

export async function loadCompanionCatalog(): Promise<CompanionCatalog> {
  const already = heldCompanionCatalog()
  if (already !== null) return already
  const read = await Promise.all(
    CATALOG_READS.map(
      async ([pageTypeSlug, keys]) => [pageTypeSlug, await rowsOf(pageTypeSlug, keys)] as const
    )
  )
  const byType = new Map<string, readonly Row[]>(read)
  return holdCompanionCatalog(
    companionCatalogFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
  )
}
