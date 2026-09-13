"use client"

import type { AppNavConfig } from "akasha/design/interfaces/layout/modules/nav-types/nav-types.module.code.ts"
import { createContext, useContext } from "react"

export interface AppShellContextValue {
  hasBottomNav: boolean
  config: AppNavConfig
}

export const AppShellContext = createContext<AppShellContextValue | null>(null)

export function useAppShellOptional(): AppShellContextValue | null {
  return useContext(AppShellContext)
}
