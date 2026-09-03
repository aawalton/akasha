"use client"

import { patchPage } from "@akasha/pages-access/patch"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useCallback } from "react"
import { isNativeShell } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import { enqueueChapterCompletion } from "../offline-text/offline-text.module.code.ts"
import {
  isCompletionAlreadySet,
  selectCompletionWriteMode,
} from "../read-completion/read-completion.module.code.ts"

const COMPLETED_AT_PROPERTY_ID = "completedAt"
const PAGE_TYPE_SLUG = "page-type"

function toFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

export function useMarkReadOnEnd(args: { pageTypeSlug: PageTypeSlug; id: string }): () => void {
  const { pageTypeSlug, id } = args
  const patch = useOptimisticPatchPage((patchArgs) => patchPage(patchArgs))
  const { page } = usePage({ pageTypeSlug, id })
  const currentCompletedAt = page?.properties?.[COMPLETED_AT_PROPERTY_ID]

  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const pageType = pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug)
  const detailConfig = parsePageTypeData(pageType?.properties).detailConfig
  const progressPropertyId = detailConfig?.progressPropertyId
  const lengthPropertyId = detailConfig?.lengthPropertyId
  const size = toFiniteNumber(
    lengthPropertyId != null ? page?.properties?.[lengthPropertyId] : undefined
  )

  return useCallback(() => {
    if (isCompletionAlreadySet(currentCompletedAt)) return
    if (size == null) return
    const iso = new Date(Date.now()).toISOString()
    if (selectCompletionWriteMode(isNativeShell()) === "offline") {
      void enqueueChapterCompletion(id, iso, size)
      return
    }
    if (progressPropertyId == null) return
    void patch({
      pageTypeSlug,
      where: [{ key: "id", eq: id }],
      set: { [COMPLETED_AT_PROPERTY_ID]: iso, [progressPropertyId]: size },
    })
  }, [pageTypeSlug, id, currentCompletedAt, size, progressPropertyId, patch])
}
