"use client"

import type { AppNavConfig } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { createContext, useContext } from "react"

export interface AppShellContextValue {
  hasBottomNav: boolean
  config: AppNavConfig
}

export const AppShellContext = createContext<AppShellContextValue | null>(null)

export function useAppShell(): AppShellContextValue {
  const context = useContext(AppShellContext)
  if (!context) {
    throw new Error("useAppShell must be used within an AppShell")
  }
  return context
}

export function useAppShellOptional(): AppShellContextValue | null {
  return useContext(AppShellContext)
}
