"use client"

import { deletePage } from "akasha/pages/access/deleting/deleting.module.code.ts"
import { PageActionsMenu } from "akasha/pages/ui/components/page-actions-menu/page-actions-menu.module.code.tsx"
import { usePagesUIRouter } from "akasha/pages/ui/navigation-context/navigation-context.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/pages/ui/supabase/mutations/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import { useSetPropertyOptimistic } from "akasha/pages/ui/supabase/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

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
