import { AppShell as SharedAppShell } from "@akasha/design-layout/app-shell"
import type { AppNavConfig } from "@akasha/design-layout/nav-types"
import {
  LayoutLinkProvider,
  type LayoutRouter,
  LayoutRouterProvider,
} from "@akasha/design-layout/router-context"
import { useSidebarState } from "@akasha/design-layout/use-sidebar-state"
import { createPage } from "@akasha/pages-access/create"
import { NEVER_MATCH_SLUG } from "@akasha/pages-access/sentinels"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import { PagesUILinkProvider, PagesUIRouterProvider } from "@akasha/pages-ui/navigation-context"
import {
  type CreateSelectOptionEffect,
  PagesUIOptionCreateProvider,
} from "@akasha/pages-ui/option-create-context"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { useOptimisticCreatePage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-create-page"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { CreatePageDialog } from "@akasha/pages-ui-components/create-page-dialog"
import { useActiveQuickAddPageType } from "@akasha/pages-ui-components/quick-add/use-active-quick-add-page-type"
import { SortableNavs } from "@akasha/pages-ui-components/sortable-navs"
import { useAppNavItems } from "@akasha/pages-ui-components/use-app-nav-items"
import { signOut } from "@akasha/supabase-rr/auth-client"
import { LogIn, LogOut } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"
import { z } from "zod"
import { ALANWALTON_APP_ID, ALANWALTON_APP_SLUG } from "../alan-app-id/alan-app-id.module.code.ts"
import {
  getNavItemProducts,
  navItemContent,
  navItemTech,
  primaryNavItems,
} from "../alan-nav-items/alan-nav-items.module.code.ts"
import { EdgeSwipeNav } from "../edge-swipe-nav/edge-swipe-nav.module.code.tsx"
import { MiniPlayerBar } from "../mini-player-bar/mini-player-bar.module.code.tsx"
import { DynamicNavCommands } from "../nav-commands/nav-commands.module.code.tsx"
import { PullToRefresh } from "../pull-to-refresh/pull-to-refresh.module.code.tsx"

interface AppShellProps {
  children: React.ReactNode
  user: { id: string; email?: string } | null
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

/**
 * Signing out happens in the browser, never as a form POST to `/sign-out`.
 *
 * This shell is shared: `@akasha/alanwalton-web-capacitor` reaches it through this package's
 * manifest and ships this same footer inside the native WebView. That build is `ssr: false`
 * and its route table (`akasha/alan/web-capacitor/routes.ts`) has no `/sign-out` entry, so a
 * native `<form method="POST" action="/sign-out">` had no action to reach and no server
 * behind it either — Capacitor answers
 * `capacitor://localhost` from bundled static files. The tap became a whole-document navigation
 * to `capacitor://localhost/sign-out` (recorded from a real device in
 * `pages/error/34940cc43ed78824.error.md`), which left the session sitting in localStorage and
 * re-booted the app signed in. That is why the menu kept offering "Sign Out".
 *
 * The client call works in both auth modes: `capacitor-local` keeps the session in
 * localStorage, `cookie-ssr` in cookies, and `signOut()` clears whichever is in play. It also
 * mirrors how sign-in already works (`routes/sign-in.tsx` calls `signInWithPassword`).
 *
 * Where the person lands is decided by `AuthProvider`'s `onAuthStateChange`, which is the one
 * place that reacts to a session ending — token expiry reaches it too, not just this button.
 */
function AuthFooter({ user }: { user: { id: string } | null }) {
  const { effectiveIsCollapsed } = useSidebarState()
  const [signingOut, setSigningOut] = useState(false)

  const onSignOut = useCallback(async () => {
    setSigningOut(true)
    const { error } = await signOut()
    if (error !== null) {
      console.error("[app-shell] sign out failed", error)
      setSigningOut(false)
    }
  }, [])

  if (user) {
    return (
      <button
        type="button"
        disabled={signingOut}
        onClick={() => {
          void onSignOut()
        }}
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary disabled:cursor-default disabled:opacity-60"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!effectiveIsCollapsed && <span>Sign Out</span>}
      </button>
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
