"use client"

import { startInteraction } from "@akasha/pages-ui/perf/page-card-perf"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useCallback } from "react"

type SetProperty = (args: {
  pageTypeSlug: PageTypeSlug
  pageId: string
  propertyId: string
  value: unknown
  perfToken?: ReturnType<typeof startInteraction>
}) => unknown

type PropertyChangeHandler = (
  pageId: string,
  propertyId: string,
  value: unknown,
  eventTimeStamp?: number
) => void

export function usePropertyChangePerfHandler(
  setProperty: SetProperty,
  rowPageTypeSlug: PageTypeSlug | undefined
): PropertyChangeHandler {
  return useCallback(
    (pageId, propertyId, value, eventTimeStamp) => {
      if (rowPageTypeSlug == null) return
      const perfToken =
        eventTimeStamp != null
          ? startInteraction({ pageId, propertyId, eventTimeStamp })
          : undefined
      setProperty({ pageTypeSlug: rowPageTypeSlug, pageId, propertyId, value, perfToken })
    },
    [setProperty, rowPageTypeSlug]
  )
}
