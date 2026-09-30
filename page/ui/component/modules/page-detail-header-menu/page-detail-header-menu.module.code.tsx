"use client"

import { deletePage } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { PageActionsMenu } from "akasha/page/ui/component/modules/page-actions-menu/page-actions-menu.module.code.tsx"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useSetPropertyOptimistic } from "akasha/page/ui/supabase/modules/use-set-property-optimistic/use-set-property-optimistic.module.code.tsx"
import { useOptimisticDeletePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-delete-page/use-optimistic-delete-page.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type MenuExtra = {
  readonly items: ReactNode
  readonly setItems: (items: ReactNode) => undefined
}

const MenuExtraContext = createContext<MenuExtra>({ items: null, setItems: () => undefined })

export function PageMenuExtraProvider({ children }: { readonly children: ReactNode }) {
  const [items, setHeld] = useState<ReactNode>(null)
  const setItems = useCallback((next: ReactNode) => {
    setHeld(next)
    return undefined
  }, [])
  const held = useMemo(() => ({ items, setItems }), [items, setItems])
  return <MenuExtraContext.Provider value={held}>{children}</MenuExtraContext.Provider>
}

export function usePageMenuExtra(items: ReactNode): undefined {
  const { setItems } = useContext(MenuExtraContext)
  useEffect(() => {
    setItems(items)
    return () => {
      setItems(null)
    }
  }, [items, setItems])
  return undefined
}

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
  const { items } = useContext(MenuExtraContext)

  return (
    <PageActionsMenu
      extra={items}
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
