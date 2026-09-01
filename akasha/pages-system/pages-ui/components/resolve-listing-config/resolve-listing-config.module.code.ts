import {
  type ListingConfig,
  listingConfigToViewData,
} from "@akasha/pages-core/schema/listing-config"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"

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
