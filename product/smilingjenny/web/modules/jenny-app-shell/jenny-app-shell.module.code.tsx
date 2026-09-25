import { AuthFooter } from "akasha/code/router-app/modules/auth-footer/auth-footer.module.code.tsx"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type {
  AppNavConfig,
  AppNavItem,
} from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { SortableNavs } from "akasha/page/ui/component/modules/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/page/ui/component/modules/use-app-nav-items/use-app-nav-items.module.code.tsx"
import {
  JENNY_APP,
  JENNY_APP_ID,
} from "akasha/product/smilingjenny/web/modules/jenny-app-id/jenny-app-id.module.code.ts"
import type React from "react"
import { useMemo } from "react"

interface AppShellProps {
  children: React.ReactNode
  signedIn: boolean
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

const NO_CODED_ITEMS: readonly AppNavItem[] = []

function AppShellInner({ children, signedIn, ssrNavItems }: AppShellProps) {
  const {
    items,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
    navReady,
  } = useAppNavItems({
    appId: JENNY_APP_ID,
    app: JENNY_APP,
    primaryItems: NO_CODED_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: items,
      bottomSections: [],
      brandLabel: "SMILING JENNY",
      bottomNavMaxItems: 5,
      footerSlot: <AuthFooter signedIn={signedIn} />,
      skipRoutes: (p) => p === "/sign-in",
      navReady,
      renderPrimaryItems: (primary, renderItem) => (
        <SortableNavs
          items={primary}
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
      items,
      navReady,
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
