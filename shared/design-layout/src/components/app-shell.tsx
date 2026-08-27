"use client"

import { useMemo, useRef } from "react"
import {
  SidebarStateContext,
  useSidebarState,
  useSidebarStateProvider,
} from "../hooks/use-sidebar-state"
import { useLayoutPathname } from "../router-context"
import type { AppNavConfig } from "../types/nav-types"
import { AppShellBottomNav } from "./app-shell-bottom-nav"
import { AppShellContext, type AppShellContextValue } from "./app-shell-context"
import { AppShellSidebar } from "./app-shell-sidebar"
import { LayoutProvider } from "./layout-context"

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
