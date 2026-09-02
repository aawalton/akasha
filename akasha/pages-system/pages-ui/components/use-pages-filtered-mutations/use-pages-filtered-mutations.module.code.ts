"use client"

import { createPage } from "@akasha/pages-access/create"
import { deletePage } from "@akasha/pages-access/delete"
import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import type { PagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useOptimisticDeletePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-delete-page"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { buildPageHref } from "@akasha/pages-url/page-href"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { Json } from "@akasha/utils-narrow/json-value"
import { useCallback } from "react"

export interface PagesFilteredMutations {
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
