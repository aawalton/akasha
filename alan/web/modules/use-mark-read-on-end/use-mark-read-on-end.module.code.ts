"use client"

import { isCompletionAlreadySet } from "akasha/alan/web/modules/read-completion/read-completion.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import {
  COLLECTION_SHAPE,
  completionValues,
} from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useCallback } from "react"

export function useMarkReadOnEnd(args: { pageTypeSlug: PageTypeSlug; id: string }): () => void {
  const { pageTypeSlug, id } = args
  const patch = useOptimisticPatchPage((patchArgs) => patchPage(patchArgs))
  const { page } = usePage({ pageTypeSlug, id })
  const values = page?.properties

  return useCallback(() => {
    if (values == null) return
    if (isCompletionAlreadySet(values[COLLECTION_SHAPE.doneKey])) return
    void patch({
      pageTypeSlug,
      where: [{ key: "id", eq: id }],
      set: completionValues(COLLECTION_SHAPE, values, Date.now()),
    })
  }, [pageTypeSlug, id, values, patch])
}
