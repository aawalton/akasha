"use client"

import * as React from "react"

export interface BadgeLayoutContextValue {
  truncate?: "fixed" | "fluid"
  popoverAlign?: "start" | "end"
  display?: "badge" | "inline"
  icon?: React.ReactNode
  bare?: boolean
}

const BadgeLayoutContext = React.createContext<BadgeLayoutContextValue | null>(null)

export function stackedBadgesClass(align: "start" | "end"): string {
  return align === "start" ? "flex flex-col items-start gap-1" : "flex flex-col items-end gap-1"
}

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
  bare,
  children,
}: BadgeLayoutProviderProps) {
  const value = React.useMemo<BadgeLayoutContextValue>(
    () => ({ truncate, popoverAlign, display, icon, bare }),
    [truncate, popoverAlign, display, icon, bare]
  )
  return <BadgeLayoutContext.Provider value={value}>{children}</BadgeLayoutContext.Provider>
}

export { BadgeLayoutContext }
