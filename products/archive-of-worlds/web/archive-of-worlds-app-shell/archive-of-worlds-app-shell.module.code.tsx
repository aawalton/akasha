import { AuthFooter } from "akasha/code-system/router-apps/auth-footer/auth-footer.module.code.tsx"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code-system/router-apps/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interfaces/layout/app-shell/app-shell.module.code.tsx"
import type { AppNavConfig } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { SortableNavs } from "akasha/pages/ui/components/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/pages/ui/components/use-app-nav-items/use-app-nav-items.module.code.tsx"
import {
  ARCHIVE_OF_WORLDS_APP_ID,
  ARCHIVE_OF_WORLDS_APP_SLUG,
} from "akasha/products/archive-of-worlds/web/archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { primaryNavItems } from "akasha/products/archive-of-worlds/web/archive-of-worlds-nav-items/archive-of-worlds-nav-items.module.code.ts"
import { useMemo } from "react"

interface AppShellProps {
  children: React.ReactNode
  user: { id: string; email?: string } | null
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, user, ssrNavItems }: AppShellProps) {
  const {
    items: dynamicPrimaryItems,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
  } = useAppNavItems({
    appId: ARCHIVE_OF_WORLDS_APP_ID,
    appSlug: ARCHIVE_OF_WORLDS_APP_SLUG,
    primaryItems: primaryNavItems,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: [],
      brandLabel: "ARCHIVE OF WORLDS",
      bottomNavMaxItems: 5,
      footerSlot: <AuthFooter user={user} />,
      skipRoutes: (p) => p === "/sign-in" || p === "/sign-up",
      renderPrimaryItems: (items, renderItem) => (
        <SortableNavs
          items={items}
          dynamicItemIds={dynamicItemIds}
          onReorder={onReorder}
          onSetParent={onSetParent}
          rootItemIds={rootItemIds}
          childItemIds={childItemIds}
          childrenByParentId={childrenByParentId}
          renderItem={renderItem}
        />
      ),
    }),
    [
      user,
      dynamicPrimaryItems,
      dynamicItemIds,
      onReorder,
      onSetParent,
      rootItemIds,
      childItemIds,
      childrenByParentId,
    ]
  )

  return <SharedAppShell config={config}>{children}</SharedAppShell>
}

export function AppShell(props: AppShellProps) {
  return (
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <AppShellInner {...props} />
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
