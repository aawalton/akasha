"use client"

import { deletePage } from "@akasha/pages-access/delete"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { useOptimisticDeletePage } from "../supabase/mutations/use-optimistic-delete-page"
import { useSetPropertyOptimistic } from "../supabase/use-set-property-optimistic"
import { PageActionsMenu } from "@akasha/pages-ui-components/page-actions-menu"

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
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
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
          await runDelete({ pageTypeSlug, where: [{ key: "id", eq: pageId }] })
          push("/")
        })()
      }}
    />
  )
}
