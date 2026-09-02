"use client"

import { AppShell as SharedAppShell } from "@akasha/design-layout/app-shell"
import type { AppNavConfig } from "@akasha/design-layout/nav-types"
import { useSidebarState } from "@akasha/design-layout/use-sidebar-state"
import { useAppVersionCheck } from "@akasha/pages-ui/app-version/use-app-version-check"
import { SortableNavs } from "@akasha/pages-ui-components/sortable-navs"
import { useAppNavItems } from "@akasha/pages-ui-components/use-app-nav-items"
import { signOut } from "@akasha/supabase-rr/auth-client"
import { LogOut } from "lucide-react"
import { useMemo } from "react"
import {
  PRIMARY_NAV_ITEMS,
  RESOURCES_NAV_ITEM,
  SETTINGS_NAV_ITEM,
} from "../nav-items/nav-items.module.code.ts"
import {
  LayoutSeam,
  PagesUISeam,
} from "../router-seam-adapters/router-seam-adapters.module.code.tsx"
import { TEMPER_APP_ID, TEMPER_APP_SLUG } from "../temper-app-id/temper-app-id.module.code.ts"

function isAuthRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  )
}

function SignOutButton() {
  const { effectiveIsCollapsed } = useSidebarState()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <button
      onClick={handleSignOut}
      aria-label="Sign Out"
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary"
    >
      <LogOut className="h-5 w-5 shrink-0" />
      {!effectiveIsCollapsed && <span>Sign Out</span>}
    </button>
  )
}

const BOTTOM_SECTIONS = [RESOURCES_NAV_ITEM, SETTINGS_NAV_ITEM]

interface AppShellProps {
  children: React.ReactNode
  ssrNavItems?: ReadonlyArray<Record<string, unknown>> | null
}

function AppShellInner({ children, ssrNavItems }: AppShellProps) {
  useAppVersionCheck()

  const {
    items: dynamicPrimaryItems,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
  } = useAppNavItems({
    appId: TEMPER_APP_ID,
    appSlug: TEMPER_APP_SLUG,
    primaryItems: PRIMARY_NAV_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: BOTTOM_SECTIONS,
      brandLabel: "TEMPER",
      bottomNavMaxItems: 5,
      pinnedItems: ["home", "characters", "companions"],
      footerSlot: <SignOutButton />,
      skipRoutes: isAuthRoute,
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

export function AppShell({ children, ssrNavItems }: AppShellProps) {
  return (
    <LayoutSeam>
      <PagesUISeam>
        <AppShellInner ssrNavItems={ssrNavItems}>{children}</AppShellInner>
      </PagesUISeam>
    </LayoutSeam>
  )
}
