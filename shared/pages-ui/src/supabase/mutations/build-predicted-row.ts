import { PROMOTED_COLUMN_KEYS } from "@shared/pages-access/routing-core"
import type { PageRow } from "@shared/pages-ui-store/collection/page-row"

export function buildPredictedRow(
  id: string,
  pageTypeId: string,
  args: { readonly pageTypeSlug: string; readonly properties: Record<string, unknown> }
): PageRow {
  const now = new Date().toISOString()
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
    title: readStringProp(props, "title"),
    icon: readStringProp(props, "icon"),
    slug: readStringProp(props, "slug"),
    attributes,
    unique_key: null,
    status: null,
    completed_at: null,
    favorited_at: null,
    last_viewed_at: null,
  }
}

function readStringProp(props: Record<string, unknown>, key: string): string | null {
  const value = props[key]
  return typeof value === "string" ? value : null
}
