"use client"

import { softDeletePage } from "@shared/pages-access/delete"
import type { PageTypeSlug } from "@shared/pages-url"
import { usePagesUIRouter } from "../router-context"
import { useOptimisticSoftDeletePage } from "../supabase/mutations/use-optimistic-soft-delete-page"
import { useSetPropertyOptimistic } from "../supabase/use-set-property-optimistic"
import { PageActionsMenu } from "./page-actions-menu"

interface PageDetailHeaderMenuProps {
  pageTypeSlug: PageTypeSlug
  pageId: string
  isFavorite: boolean
}

export function PageDetailHeaderMenu({
  pageTypeSlug,
  pageId,
  isFavorite,
}: PageDetailHeaderMenuProps) {
  const setProperty = useSetPropertyOptimistic()
  const runSoftDelete = useOptimisticSoftDeletePage((args) => softDeletePage(args))
  const { push } = usePagesUIRouter()

  return (
    <PageActionsMenu
      isFavorite={isFavorite}
      onToggleFavorite={() =>
        setProperty({
          pageTypeSlug,
          pageId,
          propertyId: "favoritedAt",
          value: isFavorite ? null : Date.now(),
        })
      }
      onDelete={() => {
        void (async () => {
          await runSoftDelete({ pageTypeSlug, where: [{ key: "id", eq: pageId }] })
          push("/")
        })()
      }}
    />
  )
}
