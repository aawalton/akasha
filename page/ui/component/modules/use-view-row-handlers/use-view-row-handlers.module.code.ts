import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import type { IconName } from "akasha/page/core/generated/modules/icon-search-index/icon-search-index.module.code.ts"

import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useCallback } from "react"

interface UseViewRowHandlersArgs {
  rowPageTypeSlug?: PageTypeSlug
  resolveRowSlug?: (pageId: string) => PageTypeSlug | undefined
  effectivePageTypeId?: string
  userId?: string | null
  setProperty: ReturnType<typeof useSetPropertyOptimistic>
}

export function useViewRowHandlers({
  rowPageTypeSlug,
  resolveRowSlug,
  effectivePageTypeId,
  userId,
  setProperty,
}: UseViewRowHandlersArgs) {
  const runCreate = useOptimisticCreatePage((args) => createPage(args))
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
  const router = usePagesUIRouter()

  const handleCreatePage = useCallback(
    async (seed?: Record<string, string | number | boolean | null>) => {
      if (effectivePageTypeId == null || userId == null || rowPageTypeSlug == null) return
      const createProps: Record<string, Json> = { userId, ...seed }
      const row = await runCreate({ pageTypeSlug: rowPageTypeSlug, properties: createProps })
      const newId = typeof row.id === "string" ? row.id : undefined
      if (newId != null) {
        router.push(
          buildPageHref({
            pageTypeSlug: rowPageTypeSlug,
            slug: null,
            fallbackSlugSource: null,
            id: newId,
          })
        )
      }
    },
    [runCreate, effectivePageTypeId, rowPageTypeSlug, userId, router]
  )

  const handleIconChange = useCallback(
    (pageId: string, icon: IconName) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      setProperty({ pageTypeSlug: slug, pageId, propertyId: "icon", value: icon })
    },
    [setProperty, rowPageTypeSlug, resolveRowSlug]
  )

  const handleDeletePage = useCallback(
    (pageId: string) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      void runDelete({ pageTypeSlug: slug, where: [{ key: "id", eq: pageId }] })
    },
    [runDelete, rowPageTypeSlug, resolveRowSlug]
  )

  const handleToggleFavorite = useCallback(
    (pageId: string, value: number | null) => {
      const slug = resolveRowSlug?.(pageId) ?? rowPageTypeSlug
      if (slug == null) return
      setProperty({ pageTypeSlug: slug, pageId, propertyId: "favoritedAt", value })
    },
    [setProperty, rowPageTypeSlug, resolveRowSlug]
  )

  return {
    handleCreatePage,
    handleIconChange,
    handleDeletePage,
    handleToggleFavorite,
  }
}
