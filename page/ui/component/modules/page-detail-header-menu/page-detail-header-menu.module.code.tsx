"use client"

import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { PageActionsMenu } from "akasha/page/ui/component/modules/page-actions-menu/page-actions-menu.module.code.tsx"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

interface PageDetailHeaderMenuProps {
  pageTypeSlug: PageTypeSlug
  pageId: string
  isFavorite: boolean
  size?: "row" | "icon"
}

export function PageDetailHeaderMenu({
  pageTypeSlug,
  pageId,
  isFavorite,
  size,
}: PageDetailHeaderMenuProps) {
  const setProperty = useSetPropertyOptimistic()
  const runDelete = useOptimisticDeletePage((args) => deletePage(args))
  const { push } = usePagesUIRouter()

  return (
    <PageActionsMenu
      size={size}
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
