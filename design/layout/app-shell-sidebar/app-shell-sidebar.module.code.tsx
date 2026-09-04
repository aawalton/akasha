"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { isNavItemActive } from "../nav-active/nav-active.module.code.ts"
import type { AppNavConfig, AppNavItem } from "../nav-types/nav-types.module.code.ts"
import { LayoutLink, useLayoutPathname } from "../router-context/router-context.module.code.tsx"
import { SidebarNavGroup } from "../sidebar-nav-group/sidebar-nav-group.module.code.tsx"
import { useSidebarState } from "../use-sidebar-state/use-sidebar-state.module.code.ts"

interface AppShellSidebarProps {
  config: AppNavConfig
}

function AppShellSidebar({ config }: AppShellSidebarProps) {
  const pathname = useLayoutPathname()
  const { effectiveIsCollapsed, isForcedCollapsed, isCollapsed, toggleCollapsed } =
    useSidebarState()

  const { primaryItems, bottomSections, brandLabel, footerSlot } = config

  const navLinkClassName = (active: boolean) =>
    cn(
      "group flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
      active
        ? `font-semibold text-accent ${surfaceClass(2)}`
        : "text-secondary hover:bg-surface-2 hover:text-primary",
      effectiveIsCollapsed && "justify-center px-0"
    )

  function RenderNavItem(item: AppNavItem) {
    const isActive = isNavItemActive(pathname, item)
    const content = (
      <>
        {item.iconSlot ?? (item.icon && <item.icon className="h-5 w-5 shrink-0" />)}
        {!effectiveIsCollapsed && <span className="flex-1">{item.label}</span>}
        {!effectiveIsCollapsed && item.trailing}
      </>
    )

    if (item.external) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClassName(isActive)}
          title={effectiveIsCollapsed ? item.shortLabel : undefined}
        >
          {content}
        </a>
      )
    }

    if (item.onClick != null && item.href == null) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className={navLinkClassName(isActive)}
          title={effectiveIsCollapsed ? item.shortLabel : undefined}
        >
          {content}
        </button>
      )
    }

    if (item.href == null) {
      return (
        <span
          key={item.id}
          className={navLinkClassName(isActive)}
          title={effectiveIsCollapsed ? item.shortLabel : undefined}
        >
          {content}
        </span>
      )
    }

    return (
      <LayoutLink
        key={item.id}
        href={item.href}
        className={navLinkClassName(isActive)}
        aria-current={isActive ? "page" : undefined}
        title={effectiveIsCollapsed ? item.shortLabel : undefined}
      >
        {content}
      </LayoutLink>
    )
  }

  function RenderPopoverLink(item: AppNavItem, forceInactive = false) {
    const isActive = !forceInactive && isNavItemActive(pathname, item)
    const linkClassName = cn(
      "flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      isActive
        ? `font-semibold text-accent ${surfaceClass(2)}`
        : "text-secondary hover:bg-surface-2 hover:text-primary"
    )

    if (item.external) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          <span>{item.label}</span>
        </a>
      )
    }

    if (item.href == null) {
      return (
        <span key={item.id} className={linkClassName}>
          <span>{item.label}</span>
        </span>
      )
    }

    return (
      <LayoutLink
        key={item.id}
        href={item.href}
        className={linkClassName}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{item.label}</span>
      </LayoutLink>
    )
  }

  function RenderNavItemWithChildren(item: AppNavItem) {
    if (item.children == null || item.children.length === 0) {
      return RenderNavItem(item)
    }

    const anyChildActive = item.children.some((child) => isNavItemActive(pathname, child))
    const isParentActive = isNavItemActive(pathname, item)
    const isActive = !anyChildActive && isParentActive

    if (effectiveIsCollapsed) {
      return (
        <Popover key={item.id}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(navLinkClassName(isActive || anyChildActive), "w-full")}
              title={item.shortLabel}
            >
              {item.iconStatic ??
                item.iconSlot ??
                (item.icon && <item.icon className="h-5 w-5 shrink-0" />)}
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-56 p-1">
            <nav className="space-y-0.5">
              {item.href != null && RenderPopoverLink(item, anyChildActive)}
              {item.children.map((child) => RenderPopoverLink(child))}
            </nav>
          </PopoverContent>
        </Popover>
      )
    }

    const triggerClassName = cn(
      "flex cursor-pointer select-none items-center gap-3 px-3 py-2 text-sm transition-colors",
      isActive ? "font-semibold text-accent" : "text-secondary hover:text-primary"
    )
    const triggerContent = (
      <>
        {item.iconSlot ?? (item.icon && <item.icon className="h-5 w-5 shrink-0" />)}
        <span>{item.label}</span>
        {item.trailing}
      </>
    )
    const triggerElement =
      item.href == null ? (
        <button type="button" className={cn(triggerClassName, "w-full text-left")}>
          {triggerContent}
        </button>
      ) : (
        <LayoutLink
          href={item.href}
          className={triggerClassName}
          aria-current={isActive ? "page" : undefined}
        >
          {triggerContent}
        </LayoutLink>
      )

    return (
      <SidebarNavGroup
        key={item.id}
        headerClassName={cn(
          "rounded-md pr-2 transition-colors",
          isActive ? surfaceClass(2) : "hover:bg-surface-2"
        )}
        trigger={triggerElement}
        triggerToggles={item.href == null}
        defaultOpen={anyChildActive}
      >
        <nav className="space-y-1">
          {item.children.map((child) => {
            const childIsActive = isNavItemActive(pathname, child)
            const childClassName = cn(navLinkClassName(childIsActive), "pl-6")

            if (child.external) {
              return (
                <a
                  key={child.id}
                  href={child.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={childClassName}
                >
                  <span>{child.label}</span>
                </a>
              )
            }

            if (child.href == null) {
              return (
                <span key={child.id} className={childClassName}>
                  <span>{child.label}</span>
                </span>
              )
            }

            return (
              <LayoutLink
                key={child.id}
                href={child.href}
                className={childClassName}
                aria-current={childIsActive ? "page" : undefined}
              >
                <span>{child.label}</span>
              </LayoutLink>
            )
          })}
        </nav>
      </SidebarNavGroup>
    )
  }

  return (
    <aside
      data-slot="app-shell-sidebar"
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col min-[584px]:flex",
        surfaceClass(1)
      )}
    >
      {}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-surface-2 border-b px-4",
          effectiveIsCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!effectiveIsCollapsed && (
          <span className="select-none font-extrabold text-accent text-lg">{brandLabel}</span>
        )}
        <Button
          variant="tertiary"
          size="icon-sm"
          onClick={toggleCollapsed}
          disabled={isForcedCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {effectiveIsCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {}
        <nav className="space-y-1 p-2">
          {config.renderPrimaryItems
            ? config.renderPrimaryItems(primaryItems, RenderNavItemWithChildren)
            : primaryItems.flatMap(RenderNavItemWithChildren)}
        </nav>
      </div>

      {}
      {bottomSections && bottomSections.length > 0 && (
        <div className="shrink-0 border-surface-2 border-t p-2">
          <nav className="space-y-1">{bottomSections.flatMap(RenderNavItemWithChildren)}</nav>
        </div>
      )}

      {}
      {footerSlot != null && (
        <div className="shrink-0 border-surface-2 border-t p-2">{footerSlot}</div>
      )}
    </aside>
  )
}

export { AppShellSidebar }
