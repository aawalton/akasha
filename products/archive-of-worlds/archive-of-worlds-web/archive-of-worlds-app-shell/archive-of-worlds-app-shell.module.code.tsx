import { AppShell as SharedAppShell } from "@akasha/design-layout/app-shell"
import type { AppNavConfig } from "@akasha/design-layout/nav-types"
import {
  LayoutLinkProvider,
  type LayoutRouter,
  LayoutRouterProvider,
} from "@akasha/design-layout/router-context"
import { useSidebarState } from "@akasha/design-layout/use-sidebar-state"
import { PagesUILinkProvider, PagesUIRouterProvider } from "@akasha/pages-ui/navigation-context"
import { SortableNavs } from "@akasha/pages-ui-components/sortable-navs"
import { useAppNavItems } from "@akasha/pages-ui-components/use-app-nav-items"
import { LogIn, LogOut } from "lucide-react"
import { type ReactNode, useMemo } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"
import {
  ARCHIVE_OF_WORLDS_APP_ID,
  ARCHIVE_OF_WORLDS_APP_SLUG,
} from "../archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { primaryNavItems } from "../archive-of-worlds-nav-items/archive-of-worlds-nav-items.module.code.ts"

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

function PagesUIRRAdapter({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const value = useMemo(
    () => ({
      pathname,
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [pathname, navigate]
  )
  return (
    <PagesUIRouterProvider value={value}>
      <PagesUILinkProvider component={PagesUILinkAdapter}>{children}</PagesUILinkProvider>
    </PagesUIRouterProvider>
  )
}

function PagesUILinkAdapter({
  href,
  className,
  children,
  ...rest
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  return (
    <Link to={href} className={className} {...rest}>
      {children}
    </Link>
  )
}

function LayoutRRAdapter({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const value = useMemo<LayoutRouter>(
    () => ({
      pathname,
      searchParams: {
        get: (name: string) => searchParams.get(name),
        toString: () => searchParams.toString(),
      },
    }),
    [pathname, searchParams]
  )
  return (
    <LayoutRouterProvider value={value}>
      <LayoutLinkProvider component={LayoutLinkAdapter}>{children}</LayoutLinkProvider>
    </LayoutRouterProvider>
  )
}

function LayoutLinkAdapter({
  href,
  className,
  children,
  title,
  onClick,
  "aria-current": ariaCurrent,
}: {
  href: string
  className?: string
  children: ReactNode
  title?: string
  onClick?: () => void
  "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"
}) {
  return (
    <Link
      to={href}
      className={className}
      title={title}
      onClick={onClick}
      aria-current={ariaCurrent}
    >
      {children}
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
    <LayoutRRAdapter>
      <PagesUIRRAdapter>
        <AppShellInner {...props} />
      </PagesUIRRAdapter>
    </LayoutRRAdapter>
  )
}
