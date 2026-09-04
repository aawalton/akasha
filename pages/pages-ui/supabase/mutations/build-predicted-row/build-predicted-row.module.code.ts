import { PROMOTED_COLUMN_KEYS } from "@akasha/pages-access/routing-core"
import type { PageRow } from "@akasha/pages-ui-store/collection/page-row"
import { stringAt } from "@akasha/utils-narrow/string-at"

export function buildPredictedRow(
  id: string,
  pageTypeId: string,
  args: { readonly pageTypeSlug: string; readonly properties: Record<string, unknown> }
): PageRow {
  const props = args.properties
  const attributes: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(props)) {
    if (PROMOTED_COLUMN_KEYS.has(k)) continue
    attributes[k] = v
  }
  return {
    id,
    page_type_id: pageTypeId,
    page_type_slug: args.pageTypeSlug,
    seq: 0,
    title: stringAt(props, "title"),
    icon: stringAt(props, "icon"),
    slug: stringAt(props, "slug"),
    attributes,
    unique_key: null,
    status: null,
    completed_at: null,
    favorited_at: null,
    last_viewed_at: null,
  }
}
