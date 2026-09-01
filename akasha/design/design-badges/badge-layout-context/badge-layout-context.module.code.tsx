"use client"

import * as React from "react"

export interface BadgeLayoutContextValue {
  truncate?: "fixed" | "fluid"
  popoverAlign?: "start" | "end"
  display?: "badge" | "inline"
  icon?: React.ReactNode
}

const BadgeLayoutContext = React.createContext<BadgeLayoutContextValue | null>(null)

export function useBadgeLayoutContext(): BadgeLayoutContextValue {
  return React.useContext(BadgeLayoutContext) ?? {}
}

interface BadgeLayoutProviderProps extends BadgeLayoutContextValue {
  children: React.ReactNode
}

export function BadgeLayoutProvider({
  truncate,
  popoverAlign,
  display,
  icon,
  children,
}: BadgeLayoutProviderProps) {
  const value = React.useMemo<BadgeLayoutContextValue>(
    () => ({ truncate, popoverAlign, display, icon }),
    [truncate, popoverAlign, display, icon]
  )
  return <BadgeLayoutContext.Provider value={value}>{children}</BadgeLayoutContext.Provider>
}

export { BadgeLayoutContext }
