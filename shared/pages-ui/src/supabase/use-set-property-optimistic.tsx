"use client"

import { type PatchPageArgs, patchPage } from "@shared/pages-access/patch"
import { useSupabase } from "@shared/supabase-rr/provider"
import { isJson } from "@shared/utils-narrow/is-json"
import { useCallback, useMemo } from "react"
import type { InteractionToken } from "../perf/page-card-perf"
import { useOptimisticPatchPage } from "./mutations/use-optimistic-patch-page"

interface SetPropertyArgs {
  pageTypeSlug: string
  pageId: string
  propertyId: string
  value: unknown
  perfToken?: InteractionToken
}

export function useSetPropertyOptimistic() {
  const client = useSupabase()
  const boundPatch = useCallback((args: PatchPageArgs) => patchPage(args), [client])
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
