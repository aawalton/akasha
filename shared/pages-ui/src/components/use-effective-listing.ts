"use client"

import type { PageWhere } from "@shared/pages-core/page-types"
import type { ListingConfig } from "@shared/pages-core/schema/listing-config"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import { useMemo } from "react"
import type { PageWithProperties } from "../supabase/types"
import { resolveListingViewData } from "./resolve-listing-config"
import { useDescendantListing } from "./use-descendant-pages"

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
