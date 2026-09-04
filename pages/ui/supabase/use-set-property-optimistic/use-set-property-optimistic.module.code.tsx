"use client"

import { type PatchPageArgs, patchPage } from "@akasha/pages-access/patch"
import type { InteractionToken } from "@akasha/pages-ui/perf/page-card-perf"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { isJson } from "@akasha/utils-narrow/is-json"
import { useCallback, useMemo } from "react"

interface SetPropertyArgs {
  pageTypeSlug: string
  pageId: string
  propertyId: string
  value: unknown
  perfToken?: InteractionToken
}

export function useSetPropertyOptimistic() {
  const boundPatch = useCallback((args: PatchPageArgs) => patchPage(args), [])
  const optimisticPatch = useOptimisticPatchPage(boundPatch)
  return useMemo(
    () => (args: SetPropertyArgs) => {
      if (!isJson(args.value)) {
        throw new Error(
          `useSetPropertyOptimistic: value for ${args.propertyId} is not JSON-shaped (${typeof args.value})`
        )
      }
      return optimisticPatch(
        {
          pageTypeSlug: args.pageTypeSlug,
          where: [{ key: "id", eq: args.pageId }],
          set: { [args.propertyId]: args.value },
        },
        args.perfToken
      )
    },
    [optimisticPatch]
  )
}
