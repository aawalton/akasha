"use client"

import {
  LAST_VIEWED_AT_KEY,
  recordPageView,
} from "akasha/page/access/modules/patch/patch.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { propertyCarried } from "akasha/page/core/schema/modules/property-carried/property-carried.module.code.ts"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import {
  shouldRecordView,
  VIEW_RECORD_STALENESS_MS,
} from "akasha/page/ui/supabase/modules/record-view-staleness/record-view-staleness.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useRef } from "react"

const PAGE_TYPE_SLUG = "page-type"

export function useRecordPageView(args: {
  pageTypeSlug: PageTypeSlug
  id: string
  lastViewedAt: unknown
  enabled: boolean
}): undefined {
  const { pageTypeSlug, id, lastViewedAt, enabled } = args
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const pageType = pageTypes.find((one) => one.properties?.slug === pageTypeSlug)
  const carried = propertyCarried(
    parsePageTypeData(pageType?.properties).propertyDefinitions,
    LAST_VIEWED_AT_KEY
  )
  const firedForId = useRef<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    if (!carried) return
    if (firedForId.current === id) return
    if (!shouldRecordView(lastViewedAt, Date.now(), VIEW_RECORD_STALENESS_MS)) return
    firedForId.current = id
    void recordPageView({ pageTypeSlug, id }).catch(() => undefined)
  }, [pageTypeSlug, id, lastViewedAt, enabled, carried])
}
