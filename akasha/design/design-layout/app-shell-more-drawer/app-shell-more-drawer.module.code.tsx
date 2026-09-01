"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Drawer, DrawerContent, DrawerTitle } from "@akasha/design-primitives/drawer"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronRightIcon } from "lucide-react"
import { isNavItemActive } from "../nav-active/nav-active.module.code.ts"
import type { AppNavItem, MoreDrawerGroup } from "../nav-types/nav-types.module.code.ts"
import { LayoutLink, useLayoutPathname } from "../router-context/router-context.module.code.tsx"

interface AppShellMoreDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: readonly MoreDrawerGroup[]
  footerSlot?: React.ReactNode
}

function MoreDrawerLink({
  item,
  onClose,
  pathname,
  className,
  asToggle,
}: {
  item: AppNavItem
  onClose: () => void
  pathname: string
  className?: string
  asToggle?: boolean
}) {
  const isActive = isNavItemActive(pathname, item)
  const linkClassName = cn(
    "flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors",
    isActive ? "font-semibold text-accent" : "text-secondary hover:bg-surface-2 hover:text-primary",
    className
  )

  const icon =
    item.iconStatic ?? (item.icon != null ? <item.icon className="h-5 w-5 shrink-0" /> : null)
  const content = (
    <>
      {icon}
      <span className="flex-1">{item.label}</span>
      {item.trailing}
    </>
  )

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
        onClick={onClose}
      >
        {content}
      </a>
    )
  }

  if (item.onClick != null && item.href == null) {
    const handleClick = () => {
      item.onClick?.()
      onClose()
    }
    return (
      <button type="button" onClick={handleClick} className={linkClassName}>
        {content}
      </button>
    )
  }

  if (item.href == null) {
    if (asToggle === true) {
      return (
        <CollapsiblePrimitive.Trigger className={cn(linkClassName, "w-full text-left")}>
          {content}
        </CollapsiblePrimitive.Trigger>
      )
    }
    return <span className={linkClassName}>{content}</span>
  }

  return (
    <LayoutLink href={item.href} className={linkClassName} onClick={onClose}>
      {content}
    </LayoutLink>
  )
}

function MoreDrawerCollapsibleItem({
  item,
  onClose,
  pathname,
}: {
  item: AppNavItem
  onClose: () => void
  pathname: string
}) {
  return (
    <CollapsiblePrimitive.Root defaultOpen={false}>
      <div className="flex items-center">
        <div className="min-w-0 flex-1">
          <MoreDrawerLink
            item={item}
            onClose={onClose}
            pathname={pathname}
            asToggle={item.href == null}
          />
        </div>
        <CollapsiblePrimitive.Trigger className="inline-flex shrink-0 cursor-pointer items-center rounded-md p-2 text-tertiary outline-none transition-colors hover:text-secondary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] [&[data-state=open]>svg]:rotate-90">
          <ChevronRightIcon className="size-4 transition-transform duration-200" />
        </CollapsiblePrimitive.Trigger>
      </div>
      <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        {item.children?.map((child) => (
          <MoreDrawerLink
            key={child.id}
            item={child}
            onClose={onClose}
            pathname={pathname}
            className="pr-3 pl-11"
          />
        ))}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

function MoreDrawerCollapsibleGroup({
  group,
  onClose,
  pathname,
}: {
  group: MoreDrawerGroup
  onClose: () => void
  pathname: string
}) {
  return (
    <CollapsiblePrimitive.Root defaultOpen={false}>
      <CollapsiblePrimitive.Trigger className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-3 text-secondary text-sm transition-colors hover:bg-surface-2 hover:text-primary [&[data-state=open]>[data-slot=chevron]>svg]:rotate-90">
        <span className="font-medium">{group.label}</span>
        <span data-slot="chevron" className="inline-flex shrink-0 items-center text-tertiary">
          <ChevronRightIcon className="size-4 transition-transform duration-200" />
        </span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        {group.items.map((item) => (
          <MoreDrawerLink
            key={item.id}
            item={item}
            onClose={onClose}
            pathname={pathname}
            className="pl-8"
          />
        ))}
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  )
}

function AppShellMoreDrawer({ open, onOpenChange, groups, footerSlot }: AppShellMoreDrawerProps) {
  const pathname = useLayoutPathname()
  const onClose = () => onOpenChange(false)

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent>
        <DrawerTitle className="sr-only">More</DrawerTitle>
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
          {groups.map((group, gi) => {
            const isLabeledGroup = group.label != null
            const showSeparator = gi > 0

            return (
              <div key={group.label ?? gi} className="flex flex-col">
                {showSeparator && (
                  <div className="py-2">
                    <div className="border-surface-2 border-t" />
                  </div>
                )}
                {isLabeledGroup ? (
                  <MoreDrawerCollapsibleGroup group={group} onClose={onClose} pathname={pathname} />
                ) : (
                  (() => {
                    const nestedIds = new Set<string>()
                    for (const item of group.items) {
                      if (item.children != null && item.children.length > 0) {
                        for (const child of item.children) nestedIds.add(child.id)
                      }
                    }
                    return group.items.map((item) => {
                      if (nestedIds.has(item.id)) return null
                      if (item.children != null && item.children.length > 0) {
                        return (
                          <MoreDrawerCollapsibleItem
                            key={item.id}
                            item={item}
                            onClose={onClose}
                            pathname={pathname}
                          />
                        )
                      }
                      return (
                        <MoreDrawerLink
                          key={item.id}
                          item={item}
                          onClose={onClose}
                          pathname={pathname}
                        />
                      )
                    })
                  })()
                )}
              </div>
            )
          })}
        </nav>
        {footerSlot != null && <div className="border-surface-2 border-t p-4">{footerSlot}</div>}
      </DrawerContent>
    </Drawer>
  )
}

export { AppShellMoreDrawer }
