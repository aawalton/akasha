"use client"

import { patchPage } from "@akasha/pages-access/patch"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useEffect, useRef } from "react"

const NOTIFICATION_PAGE_TYPE_SLUG = "notification"
const READ_AT_PROPERTY_ID = "readAt"

export function useMarkNotificationReadOnView(args: {
  pageTypeSlug: PageTypeSlug
  id: string
}): undefined {
  const { pageTypeSlug, id } = args
  const patch = useOptimisticPatchPage((patchArgs) => patchPage(patchArgs))
  const isNotification = pageTypeSlug === NOTIFICATION_PAGE_TYPE_SLUG
  const { page } = usePage({ pageTypeSlug, id })
  const alreadyRead = page?.properties?.[READ_AT_PROPERTY_ID] != null
  const markedRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isNotification) return
    if (page == null) return
    if (alreadyRead) return
    if (markedRef.current === id) return
    markedRef.current = id
    void patch({
      pageTypeSlug,
      where: [{ key: "id", eq: id }],
      set: { [READ_AT_PROPERTY_ID]: new Date(Date.now()).toISOString() },
    })
  }, [isNotification, page, alreadyRead, id, pageTypeSlug, patch])
}
