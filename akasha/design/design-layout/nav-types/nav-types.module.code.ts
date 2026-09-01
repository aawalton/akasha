import type { TriggerSafeNode } from "@akasha/design-primitives/trigger-safe-node"
import type { LucideIcon } from "lucide-react"

export interface AppNavItem {
  id: string
  label: string
  shortLabel: string
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  iconSlot?: React.ReactNode
  iconStatic?: TriggerSafeNode
  external?: boolean
  activePrefix?: string
  children?: readonly AppNavItem[]
  trailing?: React.ReactNode
  mobilePinOrder?: number
}

export interface MoreDrawerGroup {
  label?: string
  items: readonly AppNavItem[]
}

export interface AppNavConfig {
  primaryItems: readonly AppNavItem[]
  bottomSections?: readonly AppNavItem[]
  brandLabel: string
  bottomNavMaxItems?: number
  pinnedItems?: readonly string[]
  footerSlot?: React.ReactNode
  skipRoutes?: (pathname: string) => boolean
  navReady?: boolean
  renderPrimaryItems?: (
    items: readonly AppNavItem[],
    renderItem: (item: AppNavItem) => React.ReactNode
  ) => React.ReactNode
}
