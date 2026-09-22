import {
  type ListingConfig,
  listingConfigToViewData,
} from "akasha/page/core/schema/modules/listing-config/listing-config.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { viewDataOfPage } from "akasha/page/ui/supabase/modules/view-data-of-page/view-data-of-page.module.code.ts"

export function listingConfigOfView(
  properties: Readonly<Record<string, unknown>> | undefined
): ListingConfig | undefined {
  const data = viewDataOfPage(properties)
  if (data === undefined) return undefined
  return {
    layout: data.layout,
    gallery_cover_source: data.gallery_cover_source,
    gallery_card_size: data.gallery_card_size,
    sorts: data.sorts === undefined ? undefined : [...data.sorts],
    visible_properties:
      data.visible_properties === undefined ? undefined : [...data.visible_properties],
    always_show_properties:
      data.always_show_properties === undefined ? undefined : [...data.always_show_properties],
    filters: data.filters === undefined ? undefined : [...data.filters],
  }
}

export function resolveListingViewData(
  listingConfig: ListingConfig | undefined,
  syntheticConfig: ViewDataJSON
): ViewDataJSON {
  if (listingConfig == null) return syntheticConfig
  const base = listingConfigToViewData(listingConfig)
  return {
    ...base,
    ...syntheticConfig,
    version: 1,
    layout: syntheticConfig.layout ?? base.layout,
    sorts:
      syntheticConfig.sorts != null && syntheticConfig.sorts.length > 0
        ? syntheticConfig.sorts
        : base.sorts,
    filters:
      syntheticConfig.filters != null && syntheticConfig.filters.length > 0
        ? syntheticConfig.filters
        : base.filters,
    gallery_cover_source: syntheticConfig.gallery_cover_source ?? base.gallery_cover_source,
    gallery_card_size: syntheticConfig.gallery_card_size ?? base.gallery_card_size,
    visible_properties: syntheticConfig.visible_properties ?? base.visible_properties,
    always_show_properties: syntheticConfig.always_show_properties ?? base.always_show_properties,
  }
}
