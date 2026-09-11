import {
  ATLAS_APP_ID,
  ATLAS_APP_SLUG,
} from "akasha/alan/atlas-web/atlas-app-id/atlas-app-id.module.code.ts"
import { primaryNavItems } from "akasha/alan/atlas-web/atlas-nav-items/atlas-nav-items.module.code.ts"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code-system/router-apps/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interfaces/layout/app-shell/app-shell.module.code.tsx"
import type { AppNavConfig } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { useSidebarState } from "akasha/design/interfaces/layout/use-sidebar-state/use-sidebar-state.module.code.ts"
import { SortableNavs } from "akasha/pages/ui/components/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/pages/ui/components/use-app-nav-items/use-app-nav-items.module.code.tsx"
import { LogIn, LogOut } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router"

interface AppShellProps {
  children: React.ReactNode
  user: { id: string; email?: string } | null
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

function AuthFooter({ user }: { user: { id: string } | null }) {
  const { effectiveIsCollapsed } = useSidebarState()

  if (user) {
    return (
      <form method="POST" action="/sign-out">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!effectiveIsCollapsed && <span>Sign Out</span>}
        </button>
      </form>
    )
  }

  return (
    <Link
      to="/sign-in"
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
    >
      <LogIn className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Sign In</span>}
    </Link>
  )
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
