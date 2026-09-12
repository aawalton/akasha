import {
  ATLAS_APP_ID,
  ATLAS_APP_SLUG,
} from "akasha/alan/atlas-web/atlas-app-id/atlas-app-id.module.code.ts"
import { primaryNavItems } from "akasha/alan/atlas-web/atlas-nav-items/atlas-nav-items.module.code.ts"
import { AuthFooter } from "akasha/code/router-apps/auth-footer/auth-footer.module.code.tsx"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-apps/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interfaces/layout/modules/app-shell/app-shell.module.code.tsx"
import type { AppNavConfig } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { SortableNavs } from "akasha/pages/ui/components/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/pages/ui/components/use-app-nav-items/use-app-nav-items.module.code.tsx"
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
    appId: ATLAS_APP_ID,
    appSlug: ATLAS_APP_SLUG,
    primaryItems: primaryNavItems,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: [],
      brandLabel: "ATLAS",
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
