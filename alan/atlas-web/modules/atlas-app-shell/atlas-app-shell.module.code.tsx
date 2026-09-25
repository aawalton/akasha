import {
  ATLAS_APP,
  ATLAS_APP_ID,
} from "akasha/alan/atlas-web/modules/atlas-app-id/atlas-app-id.module.code.ts"
import { NavCommands } from "akasha/alan/atlas-web/modules/atlas-nav-command/atlas-nav-command.module.code.tsx"
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
import { useMemo } from "react"

interface AppShellProps {
  children: React.ReactNode
  signedIn: boolean
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

const NO_CODED_ITEMS: readonly AppNavItem[] = []

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
    appId: ATLAS_APP_ID,
    app: ATLAS_APP,
    primaryItems: NO_CODED_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: [],
      brandLabel: "ATLAS",
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

  return (
    <SharedAppShell config={config}>
      <NavCommands entries={dynamicPrimaryItems} />
      {children}
    </SharedAppShell>
  )
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
