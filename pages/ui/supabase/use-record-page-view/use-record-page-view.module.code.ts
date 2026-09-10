"use client"

import {
  shouldRecordView,
  VIEW_RECORD_STALENESS_MS,
} from "@akasha/pages-ui/supabase/record-view-staleness"
import { recordPageView } from "akasha/pages/access/patch/patch.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useRef } from "react"

export function useRecordPageView(args: {
  pageTypeSlug: PageTypeSlug
  id: string
  lastViewedAt: unknown
  enabled: boolean
}): undefined {
  const { pageTypeSlug, id, lastViewedAt, enabled } = args
  const firedForId = useRef<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    if (firedForId.current === id) return
    if (!shouldRecordView(lastViewedAt, Date.now(), VIEW_RECORD_STALENESS_MS)) return
    firedForId.current = id
    void recordPageView({ pageTypeSlug, id }).catch(() => undefined)
  }, [pageTypeSlug, id, lastViewedAt, enabled])
}
