"use client"

import type { PageWhere } from "@akasha/pages-core/page-types"
import type { ListingConfig } from "@akasha/pages-core/schema/listing-config"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { resolveListingViewData } from "@akasha/pages-ui-components/resolve-listing-config"
import { useDescendantListing } from "@akasha/pages-ui-components/use-descendant-pages"
import { useMemo } from "react"

export interface EffectiveListing {
  effectiveConfig: ViewDataJSON
  spanDescendants: boolean
  descendantPages: readonly PageWithProperties[]
  descendantIsLoading: boolean
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
  }
}
