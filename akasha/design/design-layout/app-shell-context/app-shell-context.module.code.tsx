"use client"

import { createContext, useContext } from "react"
import type { AppNavConfig } from "../nav-types/nav-types.module.code.ts"

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
