"use client"

import { type PatchPageArgs, patchPage } from "@akasha/pages/access/patch"
import {
  type CompletionShape,
  completionValues,
  uncompletionValues,
} from "@akasha/pages/core/task-lifecycle"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { useCallback, useMemo } from "react"

interface CompletePageArgs {
  pageTypeSlug: string
  pageId: string
  shape: CompletionShape
  values: Readonly<Record<string, unknown>>
  atMs: number | null
}

export function useCompletePageOptimistic() {
  const boundPatch = useCallback((args: PatchPageArgs) => patchPage(args), [])
  const optimisticPatch = useOptimisticPatchPage(boundPatch)
  return useMemo(
    () => (args: CompletePageArgs) =>
      optimisticPatch({
        pageTypeSlug: args.pageTypeSlug,
        where: [{ key: "id", eq: args.pageId }],
        set:
          args.atMs === null
            ? uncompletionValues(args.shape)
            : completionValues(args.shape, args.values, args.atMs),
      }),
    [optimisticPatch]
  )
}
