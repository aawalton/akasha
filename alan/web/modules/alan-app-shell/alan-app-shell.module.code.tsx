import {
  ALANWALTON_APP,
  ALANWALTON_APP_ID,
} from "akasha/alan/web/modules/alan-app-id/alan-app-id.module.code.ts"
import { EdgeSwipeNav } from "akasha/alan/web/modules/edge-swipe-nav/edge-swipe-nav.module.code.tsx"

import { DynamicNavCommands } from "akasha/alan/web/modules/nav-command/nav-command.module.code.tsx"
import { PullToRefresh } from "akasha/alan/web/modules/pull-to-refresh/pull-to-refresh.module.code.tsx"
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
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { NEVER_MATCH_SLUG } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { CreatePageDialog } from "akasha/page/ui/component/modules/create-page-dialog/create-page-dialog.module.code.tsx"
import { SortableNavs } from "akasha/page/ui/component/modules/sortable-navs/sortable-navs.module.code.tsx"
import { useAppNavItems } from "akasha/page/ui/component/modules/use-app-nav-items/use-app-nav-items.module.code.tsx"
import { useActiveQuickAddPageType } from "akasha/page/ui/component/quick-add/modules/use-active-quick-add-page-type/use-active-quick-add-page-type.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { useOptimisticCreatePage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-create-page/use-optimistic-create-page.module.code.ts"
import { useCallback, useEffect, useMemo, useState } from "react"

interface AppShellProps {
  children: React.ReactNode
  signedIn: boolean
  accountId: string | null
  ssrNavItems: ReadonlyArray<Record<string, unknown>> | null
}

const NO_CODED_ITEMS: readonly AppNavItem[] = []

function withinTheApp(sections: readonly AppNavItem[]): readonly AppNavItem[] {
  return sections.flatMap((section) => section.children ?? []).filter((one) => !one.external)
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

function AppShellInner({ children, signedIn, accountId, ssrNavItems }: AppShellProps) {
  const {
    items: dynamicPrimaryItems,
    bottomSections,
    onReorder,
    onSetParent,
    dynamicItemIds,
    rootItemIds,
    childItemIds,
    childrenByParentId,
    navReady,
  } = useAppNavItems({
    appId: ALANWALTON_APP_ID,
    app: ALANWALTON_APP,
    primaryItems: NO_CODED_ITEMS,
    initialRows: ssrNavItems ?? undefined,
  })

  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: dynamicPrimaryItems,
      bottomSections,
      brandLabel: "ALAN",
      bottomNavMaxItems: 5,
      navReady,
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
      bottomSections,
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
      <DynamicNavCommands entries={[...dynamicPrimaryItems, ...withinTheApp(bottomSections)]} />
      {children}
      {accountId !== null && <AdminDialogs />}
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
