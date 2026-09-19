import { AuthFooter } from "akasha/code/router-app/modules/auth-footer/auth-footer.module.code.tsx"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type { AppNavConfig } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { SortableNavs } from "akasha/page/ui/component/modules/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/page/ui/component/modules/use-app-nav-items/use-app-nav-items.module.code.tsx"
import {
  ARCHIVE_OF_WORLDS_APP_ID,
  ARCHIVE_OF_WORLDS_APP_SLUG,
} from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { PRIMARY_NAV_ITEMS } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-nav-items/archive-of-worlds-nav-items.module.code.ts"
import { useMemo } from "react"

interface AppShellProps {
  children: React.ReactNode
  signedIn: boolean
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, signedIn, ssrNavItems }: AppShellProps) {
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
    primaryItems: PRIMARY_NAV_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: [],
      brandLabel: "ARCHIVE OF WORLDS",
      bottomNavMaxItems: 5,
      footerSlot: <AuthFooter signedIn={signedIn} />,
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
      signedIn,
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
