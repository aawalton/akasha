"use client"

import { useMemo, useRef } from "react"
import { AppShellBottomNav } from "../app-shell-bottom-nav/app-shell-bottom-nav.module.code.tsx"
import {
  AppShellContext,
  type AppShellContextValue,
} from "../app-shell-context/app-shell-context.module.code.tsx"
import { AppShellSidebar } from "../app-shell-sidebar/app-shell-sidebar.module.code.tsx"
import { LayoutProvider } from "../layout-context/layout-context.module.code.tsx"
import type { AppNavConfig } from "../nav-types/nav-types.module.code.ts"
import { useLayoutPathname } from "../router-context/router-context.module.code.tsx"
import {
  SidebarStateContext,
  useSidebarState,
  useSidebarStateProvider,
} from "../use-sidebar-state/use-sidebar-state.module.code.ts"

interface AppShellProps {
  config: AppNavConfig
  children: React.ReactNode
}

function AppShell({ config, children }: AppShellProps) {
  const sidebarState = useSidebarStateProvider()
  const pathname = useLayoutPathname()

  if (config.skipRoutes?.(pathname)) {
    return <>{children}</>
  }

  return (
    <SidebarStateContext value={sidebarState}>
      <AppShellContent config={config}>{children}</AppShellContent>
    </SidebarStateContext>
  )
}

function AppShellContent({
  config,
  children,
}: {
  config: AppNavConfig
  children: React.ReactNode
}) {
  const { isHydrated, isHidden } = useSidebarState()
  const mainRef = useRef<HTMLElement>(null)

  const shellContextValue = useMemo<AppShellContextValue>(
    () => ({ hasBottomNav: isHidden, config }),
    [isHidden, config]
  )

  return (
    <AppShellContext value={shellContextValue}>
      <AppShellSidebar config={config} />
      <main ref={mainRef} className="@container min-h-screen pt-(--safe-area-top)">
        <LayoutProvider containerRef={mainRef} ready={isHydrated}>
          {children}
        </LayoutProvider>
      </main>
      <AppShellBottomNav config={config} />
    </AppShellContext>
  )
}

export type { AppShellProps }
export { AppShell }
