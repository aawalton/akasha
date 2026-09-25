"use client"

import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ListingConfig } from "akasha/page/core/schema/modules/listing-config/listing-config.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { resolveListingViewData } from "akasha/page/ui/component/modules/resolve-listing-config/resolve-listing-config.module.code.ts"
import { useDescendantListing } from "akasha/page/ui/component/modules/use-descendant-pages/use-descendant-pages.module.code.ts"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useMemo } from "react"

interface EffectiveListing {
  effectiveConfig: ViewDataJSON
  spanDescendants: boolean
  descendantPages: readonly PageWithProperties[]
  descendantIsLoading: boolean
  descendantUnasked: string | null
}

export function useEffectiveListing(args: {
  listingConfig: ListingConfig | undefined
  syntheticConfig: ViewDataJSON
  pageTypes: readonly PageWithProperties[]
  targetPageTypeId: string
  where: PageWhere | undefined
}): EffectiveListing {
  const { listingConfig, syntheticConfig, pageTypes, targetPageTypeId, where } = args

  const effectiveConfig = useMemo(
    () => resolveListingViewData(listingConfig, syntheticConfig),
    [listingConfig, syntheticConfig]
  )

  const descendantListing = useDescendantListing({
    pageTypes,
    targetPageTypeId,
    listingConfig,
    sorts: effectiveConfig.sorts,
    where,
  })

  return {
    effectiveConfig,
    spanDescendants: descendantListing.spanDescendants,
    descendantPages: descendantListing.pages,
    descendantIsLoading: descendantListing.isLoading,
    descendantUnasked: descendantListing.unasked,
  }
}
