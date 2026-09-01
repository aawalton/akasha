"use client"

import { recordPageView } from "@akasha/pages-access/patch"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useSupabase } from "@shared/supabase-rr/provider"
import { useEffect, useRef } from "react"
import { shouldRecordView, VIEW_RECORD_STALENESS_MS } from "@akasha/pages-ui/supabase/record-view-staleness"

export function useRecordPageView(args: {
  pageTypeSlug: PageTypeSlug
  id: string
  lastViewedAt: unknown
  enabled: boolean
}): undefined {
  const { pageTypeSlug, id, lastViewedAt, enabled } = args
  const client = useSupabase()
  const firedForId = useRef<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    if (firedForId.current === id) return
    if (!shouldRecordView(lastViewedAt, Date.now(), VIEW_RECORD_STALENESS_MS)) return
    firedForId.current = id
    void recordPageView({ pageTypeSlug, id }).catch(() => undefined)
  }, [client, pageTypeSlug, id, lastViewedAt, enabled])
}
