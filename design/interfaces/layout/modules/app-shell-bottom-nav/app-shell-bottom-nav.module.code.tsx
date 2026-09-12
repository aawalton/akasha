"use client"

import { AppShellMoreDrawer } from "akasha/design/interfaces/layout/modules/app-shell-more-drawer/app-shell-more-drawer.module.code.tsx"
import { isNavItemActive } from "akasha/design/interfaces/layout/nav-active/nav-active.module.code.ts"
import type {
  AppNavConfig,
  AppNavItem,
  MoreDrawerGroup,
} from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import {
  LayoutLink,
  useLayoutPathname,
} from "akasha/design/interfaces/layout/router-context/router-context.module.code.tsx"
import { selectBottomNavItems } from "akasha/design/interfaces/layout/select-bottom-nav-items/select-bottom-nav-items.module.code.ts"
import { selectDrawerGroups } from "akasha/design/interfaces/layout/select-drawer-groups/select-drawer-groups.module.code.ts"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import { Skeleton } from "akasha/design/interfaces/primitives/skeleton/skeleton.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { Ellipsis } from "lucide-react"
import { useState } from "react"

interface AppShellBottomNavProps {
  config: AppNavConfig
}

function NavIconSlot({ item }: { item: AppNavItem }) {
  const icon = item.iconStatic ?? (item.icon != null ? <item.icon className="h-5 w-5" /> : null)
  if (icon == null && item.trailing == null) return null
  return (
    <span className="relative">
      {icon}
      {item.trailing != null && <span className="absolute -top-1 -right-1">{item.trailing}</span>}
    </span>
  )
}

const BOTTOM_NAV_SKELETON_SLOTS = ["s1", "s2", "s3", "s4", "s5"] as const

function BottomNavSkeleton() {
  return (
    <nav
      data-slot="app-shell-bottom-nav"
      aria-hidden
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 pb-(--safe-area-bottom) min-[584px]:hidden",
        surfaceClass(0)
      )}
    >
      <div className="flex h-[var(--bottom-nav-height)] items-end">
        {BOTTOM_NAV_SKELETON_SLOTS.map((slot) => (
          <div
            key={slot}
            className="flex flex-1 flex-col items-center justify-center gap-1 px-1 pt-2 pb-0"
          >
            <Skeleton className="h-5 w-5 rounded-full before:hidden" />
            <Skeleton className="h-2 w-8 before:hidden" />
          </div>
        ))}
      </div>
    </nav>
  )
}

function AppShellBottomNav({ config }: AppShellBottomNavProps) {
  const pathname = useLayoutPathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const { primaryItems, bottomSections, footerSlot, pinnedItems } = config
  const maxVisible = config.bottomNavMaxItems ?? 5

  if (config.navReady === false) {
    return <BottomNavSkeleton />
  }

  const visibleItems = selectBottomNavItems(primaryItems, pinnedItems, maxVisible)
  const visibleIds = new Set(visibleItems.map((item) => item.id))

  const drawerGroups: MoreDrawerGroup[] = [...selectDrawerGroups(primaryItems, visibleIds)]
  if (bottomSections && bottomSections.length > 0) {
    drawerGroups.push({ items: bottomSections })
  }

  const allDrawerItems = drawerGroups.flatMap((group) =>
    group.items.flatMap((item) => [item, ...(item.children ?? [])])
  )
  const moreIsActive = moreOpen || allDrawerItems.some((item) => isNavItemActive(pathname, item))

  return (
    <>
      <nav
        data-slot="app-shell-bottom-nav"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 pb-(--safe-area-bottom) min-[584px]:hidden",
          surfaceClass(0)
        )}
      >
        <div className="flex h-[var(--bottom-nav-height)] items-end">
          {visibleItems.map((item) => {
            const isActive = isNavItemActive(pathname, item)
            const itemClassName = cn(
              "flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-1 pt-2 pb-0 text-xs transition-colors",
              isActive ? "text-accent" : "text-tertiary hover:text-secondary"
            )

            if (item.external) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClassName}
                >
                  <NavIconSlot item={item} />
                  <span>{item.shortLabel}</span>
                </a>
              )
            }
            if (item.onClick != null && item.href == null) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={itemClassName}
                >
                  <NavIconSlot item={item} />
                  <span>{item.shortLabel}</span>
                </button>
              )
            }
            return (
              <LayoutLink key={item.id} href={item.href ?? "/"} className={itemClassName}>
                <NavIconSlot item={item} />
                <span>{item.shortLabel}</span>
              </LayoutLink>
            )
          })}

          {drawerGroups.length > 0 && (
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 px-1 pt-2 pb-0 text-xs transition-colors",
                moreIsActive ? "text-accent" : "text-tertiary hover:text-secondary"
              )}
            >
              <Ellipsis className="h-5 w-5" />
              <span>More</span>
            </button>
          )}
        </div>
      </nav>

      <AppShellMoreDrawer
        open={moreOpen}
        onOpenChange={(next) => {
          setMoreOpen(next)
        }}
        groups={drawerGroups}
        footerSlot={footerSlot}
      />
    </>
  )
}

export { AppShellBottomNav }
