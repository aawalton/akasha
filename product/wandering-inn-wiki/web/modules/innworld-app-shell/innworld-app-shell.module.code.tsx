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
  INNWORLD_APP,
  INNWORLD_APP_ID,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-id/innworld-app-id.module.code.ts"
import { useMemo } from "react"

const BRAND = "INNWORLD"

const NO_CODED_ITEMS: readonly AppNavItem[] = []

interface AppShellProps {
  children: React.ReactNode
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, ssrNavItems }: AppShellProps) {
  const {
    items,
    bottomSections,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
    navReady,
  } = useAppNavItems({
    appId: INNWORLD_APP_ID,
    app: INNWORLD_APP,
    primaryItems: NO_CODED_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: items,
      bottomSections,
      brandLabel: BRAND,
      bottomNavMaxItems: 5,
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
      items,
      bottomSections,
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
