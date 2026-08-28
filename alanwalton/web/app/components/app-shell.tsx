import { LayoutLinkProvider, type LayoutRouter, LayoutRouterProvider } from "@shared/design-layout/router-context"
import { AppShell as SharedAppShell } from "@shared/design-layout/components/app-shell"
import { useSidebarState } from "@shared/design-layout/hooks/use-sidebar-state"
import { type AppNavConfig } from "@shared/design-layout/types/nav-types"
import { createPage } from "@shared/pages-access/create"
import { NEVER_MATCH_SLUG } from "@shared/pages-access/sentinels"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { CreatePageDialog } from "@shared/pages-ui/components/quick-add/create-page-dialog"
import { SortableNavs } from "@shared/pages-ui/components/sortable-navs"
import { useAppNavItems } from "@shared/pages-ui/components/use-app-nav-items"
import {
  type CreateSelectOptionEffect,
  PagesUIOptionCreateProvider,
} from "@shared/pages-ui/option-create-context"
import { useUserId } from "@shared/pages-ui/use-user-id"
import { useActiveQuickAddPageType } from "@shared/pages-ui/components/quick-add/use-active-quick-add-page-type"
import { PagesUILinkProvider, PagesUIRouterProvider } from "@shared/pages-ui/router-context"
import { useAllPages } from "@shared/pages-ui/supabase/hooks"
import { useOptimisticCreatePage } from "@shared/pages-ui/supabase/mutations/use-optimistic-create-page"
import { LogIn, LogOut } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"
import { z } from "zod"
import { EdgeSwipeNav } from "~/components/edge-swipe-nav"
import { MiniPlayerBar } from "~/components/mini-player-bar"
import { DynamicNavCommands } from "~/components/nav-commands"
import {
  getNavItemProducts,
  navItemContent,
  navItemTech,
  primaryNavItems,
} from "~/components/nav-items"
import { PullToRefresh } from "~/components/pull-to-refresh"
import { ALANWALTON_APP_ID, ALANWALTON_APP_SLUG } from "~/lib/app-id"

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

const staticBottomSections = [navItemContent, navItemTech] as const

const optionCreateSuccessSchema = z.object({
  ok: z.literal(true),
  option: z.object({ id: z.string(), label: z.string() }),
  created: z.boolean(),
})
const optionCreateErrorSchema = z.object({ ok: z.literal(false), error: z.string() })

const createSelectOption: CreateSelectOptionEffect = async ({ definitionId, label }) => {
  const res = await fetch("/api/property-option", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ definitionId, label }),
  })
  if (!res.ok) {
    const parsed = optionCreateErrorSchema.safeParse(await res.json().catch(() => null))
    throw new Error(parsed.success ? parsed.data.error : "Failed to add option.")
  }
  return optionCreateSuccessSchema.parse(await res.json()).option
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
      <PagesUILinkProvider component={PagesUILinkAdapter}>
        <PagesUIOptionCreateProvider value={createSelectOption}>
          {children}
        </PagesUIOptionCreateProvider>
      </PagesUILinkProvider>
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

function AdminDialogs() {
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const active = useActiveQuickAddPageType()

  const { pages: existingPages } = useAllPages({
    pageTypeSlug: active?.pageTypeSlug ?? NEVER_MATCH_SLUG,
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (quickAddOpen) return
      const target = e.target instanceof HTMLElement ? e.target : null
      const tag = target?.tagName
      const editable = target?.isContentEditable
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || editable) return
      if (active === null) return
      if (e.key.toLowerCase() === "q" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setQuickAddOpen(true)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [quickAddOpen, active])
  const userId = useUserId()
  const runCreate = useOptimisticCreatePage((args) => createPage(args))

  const onCreate = useCallback(
    async (properties: Readonly<Record<string, ReadonlyJSONValue>>) => {
      if (userId == null) throw new Error("create requires an authenticated user")
      if (active === null) throw new Error("no active page-type")
      return runCreate({
        pageTypeSlug: active.pageTypeSlug,
        properties: { ...properties, userId },
      })
    },
    [active, runCreate, userId]
  )

  if (active === null) return null

  return (
    <CreatePageDialog
      open={quickAddOpen}
      onOpenChange={setQuickAddOpen}
      displayName={active.displayName}
      quickAdd={active.quickAdd}
      propertyDefinitions={active.propertyDefinitions}
      existingPages={existingPages}
      onCreate={onCreate}
    />
  )
}

function AppShellInner({ children, user, ssrNavItems }: AppShellProps) {
  const isAdmin = user?.email === "aawalton@gmail.com"

  const {
    items: dynamicPrimaryItems,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
    navReady,
  } = useAppNavItems({
    appId: ALANWALTON_APP_ID,
    appSlug: ALANWALTON_APP_SLUG,
    primaryItems: primaryNavItems,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections: [getNavItemProducts(), ...staticBottomSections],
      brandLabel: "ALAN",
      bottomNavMaxItems: 5,
      navReady,
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
      navReady,
    ]
  )

  return (
    <SharedAppShell config={config}>
      <PullToRefresh />
      <EdgeSwipeNav />
      {}
      <DynamicNavCommands entries={dynamicPrimaryItems} />
      <MiniPlayerBar />
      {children}
      {isAdmin && user && <AdminDialogs />}
    </SharedAppShell>
  )
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
