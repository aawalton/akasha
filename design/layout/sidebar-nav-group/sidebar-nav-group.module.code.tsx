"use client"

import { cn } from "@akasha/design-primitives/cn"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronRightIcon } from "lucide-react"
import type * as React from "react"

interface SidebarNavGroupProps
  extends Omit<React.ComponentProps<typeof CollapsiblePrimitive.Root>, "children"> {
  trigger: React.ReactNode
  triggerToggles?: boolean
  collapsed?: boolean
  headerClassName?: string
  contentClassName?: string
  children?: React.ReactNode
}

function SidebarNavGroup({
  trigger,
  triggerToggles,
  collapsed,
  className,
  headerClassName,
  contentClassName,
  defaultOpen = true,
  children,
  ...props
}: SidebarNavGroupProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="sidebar-nav-group"
      defaultOpen={defaultOpen}
      className={cn("space-y-1", className)}
      {...props}
    >
      <div
        data-slot="sidebar-nav-group-header"
        className={cn("flex items-center", headerClassName)}
      >
        <div className="min-w-0 flex-1">
          {triggerToggles === true ? (
            <CollapsiblePrimitive.Trigger asChild>{trigger}</CollapsiblePrimitive.Trigger>
          ) : (
            trigger
          )}
        </div>
        {!collapsed && (
          <CollapsiblePrimitive.Trigger
            data-slot="sidebar-nav-group-toggle"
            className="inline-flex shrink-0 cursor-pointer items-center rounded-md p-1 text-tertiary outline-none transition-colors hover:text-secondary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] [&[data-state=open]>svg]:rotate-90"
          >
            <ChevronRightIcon className="size-4 transition-transform duration-200" />
          </CollapsiblePrimitive.Trigger>
        )}
      </div>
      <CollapsiblePrimitive.Content
        data-slot="sidebar-nav-group-content"
        className={cn(
          "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
          contentClassName
        )}
      >
        {children}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

export type { SidebarNavGroupProps }
export { SidebarNavGroup }
