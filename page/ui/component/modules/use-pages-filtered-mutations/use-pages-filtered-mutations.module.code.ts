"use client"

import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import type { IconName } from "akasha/page/core/generated/modules/icon-search-index/icon-search-index.module.code.ts"
import type { PagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { PageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useCallback } from "react"

interface PagesFilteredMutations {
  handleCreatePage: () => Promise<void>
  handlePropertyChange: (pageId: string, propId: string, value: unknown) => void
  handleIconChange: (pageId: string, icon: IconName) => void
  handleDeletePage: (pageId: string) => void
  handleToggleFavorite: (pageId: string, value: number | null) => void
  pageTypeIconName: string | null
}

export function usePagesFilteredMutations(args: {
  pageTypeSlug: PageTypeSlug
  targetPageTypeId: string
  userId: string | null
  targetPageType: PageWithProperties | undefined
  router: PagesUIRouter
}): PagesFilteredMutations {
  const { pageTypeSlug, targetPageTypeId, userId, targetPageType, router } = args
  const setProperty = useSetPropertyOptimistic()
  const runCreate = useOptimisticCreatePage((createArgs) => createPage(createArgs))
  const runDelete = useOptimisticDeletePage((deleteArgs) => deletePage(deleteArgs))

  const handleCreatePage = useCallback(async () => {
    if (pageTypeSlug.length === 0 || targetPageTypeId.length === 0 || userId == null) return
    const props: Record<string, Json> = {
      userId,
      title: "",
    }
    const created = await runCreate({
      pageTypeSlug,
      properties: props,
    })
    const newPageId = typeof created?.id === "string" ? created.id : undefined
    if (newPageId != null) {
      router.push(
        buildPageHref({
          pageTypeSlug,
          slug: null,
          fallbackSlugSource: null,
          id: newPageId,
        })
      )
    }
  }, [runCreate, pageTypeSlug, targetPageTypeId, userId, router])

  const handlePropertyChange = useCallback(
    (pageId: string, propId: string, value: unknown) =>
      setProperty({ pageTypeSlug: pageTypeSlug, pageId, propertyId: propId, value }),
    [setProperty, pageTypeSlug]
  )

  const handleIconChange = useCallback(
    (pageId: string, icon: IconName) =>
      setProperty({ pageTypeSlug, pageId, propertyId: "icon", value: icon }),
    [setProperty, pageTypeSlug]
  )

  const pageTypeIconName =
    typeof targetPageType?.properties?.icon === "string" ? targetPageType.properties.icon : null

  const handleDeletePage = useCallback(
    (pageId: string) => {
      void runDelete({ pageTypeSlug, where: [{ key: "id", eq: pageId }] })
    },
    [runDelete, pageTypeSlug]
  )

  const handleToggleFavorite = useCallback(
    (pageId: string, value: number | null) =>
      setProperty({ pageTypeSlug, pageId, propertyId: "favoritedAt", value }),
    [setProperty, pageTypeSlug]
  )

  return {
    handleCreatePage,
    handlePropertyChange,
    handleIconChange,
    handleDeletePage,
    handleToggleFavorite,
    pageTypeIconName,
  }
}
