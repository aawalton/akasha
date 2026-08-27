"use client"

import { type Json } from "../../../supabase-database/src/generated/database"
import { createPage } from "@shared/pages-access/create"
import { softDeletePage } from "@shared/pages-access/delete"
import type { IconName } from "@shared/pages-core/icon"
import { buildPageHref, type PageTypeSlug } from "@shared/pages-url"
import { useCallback } from "react"
import type { PagesUIRouter } from "../router-context"
import { useOptimisticCreatePage } from "../supabase/mutations/use-optimistic-create-page"
import { useOptimisticSoftDeletePage } from "../supabase/mutations/use-optimistic-soft-delete-page"
import { type PageWithProperties } from "../supabase/types"
import { useSetPropertyOptimistic } from "../supabase/use-set-property-optimistic"

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
  const runSoftDelete = useOptimisticSoftDeletePage((deleteArgs) => softDeletePage(deleteArgs))

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
      void runSoftDelete({ pageTypeSlug, where: [{ key: "id", eq: pageId }] })
    },
    [runSoftDelete, pageTypeSlug]
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
