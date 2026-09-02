"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { useCallback } from "react"

import { cn } from "../cn/cn.module.code.ts"
import {
  ListFilterInput,
  ListFilterProvider,
  useListFilterItem,
} from "../filterable-list/filterable-list.module.code.tsx"
import { POPOVER_COLLISION_PADDING } from "../popover-tokens/popover-tokens.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { SurfaceProvider } from "../surface-provider/surface-provider.module.code.tsx"

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  collisionPadding = POPOVER_COLLISION_PADDING,
  children,
  filterThreshold = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  filterThreshold?: number
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 max-w-(--radix-dropdown-menu-content-available-width) origin-(--radix-dropdown-menu-content-transform-origin) cursor-default overflow-y-auto overflow-x-hidden rounded-md p-3 text-primary shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          surfaceClass(3),
          className
        )}
        {...props}
      >
        <SurfaceProvider level={3} background={false}>
          <ListFilterProvider filterThreshold={filterThreshold}>
            <ListFilterInput
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation()
                }
              }}
            />
            {children}
          </ListFilterProvider>
        </SurfaceProvider>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ref: consumerRef,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  const { ref: filterRef, hidden } = useListFilterItem()
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      filterRef(node)
      if (typeof consumerRef === "function") consumerRef(node)
      else if (consumerRef) consumerRef.current = node
    },
    [filterRef, consumerRef]
  )
  return (
    <DropdownMenuPrimitive.Item
      ref={mergedRef}
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-primary/12 data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-secondary data-disabled:opacity-[0.38] data-[variant=destructive]:focus:bg-primary/12 data-[variant=destructive]:focus:text-secondary [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-secondary!",
        className
      )}
      {...(hidden ? { style: { display: "none" }, "aria-hidden": true } : {})}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref: consumerRef,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  const { ref: filterRef, hidden } = useListFilterItem()
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      filterRef(node)
      if (typeof consumerRef === "function") consumerRef(node)
      else if (consumerRef) consumerRef.current = node
    },
    [filterRef, consumerRef]
  )
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={mergedRef}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-primary/12 data-disabled:pointer-events-none data-disabled:opacity-[0.38] [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...(hidden ? { style: { display: "none" }, "aria-hidden": true } : {})}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  ref: consumerRef,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  const { ref: filterRef, hidden } = useListFilterItem()
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      filterRef(node)
      if (typeof consumerRef === "function") consumerRef(node)
      else if (consumerRef) consumerRef.current = node
    },
    [filterRef, consumerRef]
  )
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={mergedRef}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-primary/12 data-disabled:pointer-events-none data-disabled:opacity-[0.38] [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...(hidden ? { style: { display: "none" }, "aria-hidden": true } : {})}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 font-medium text-sm data-inset:pl-8", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 h-px", surfaceClass(4), className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-tertiary text-xs tracking-widest", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-primary/12 data-[state=open]:bg-primary/12 data-inset:pl-8 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md p-3 text-primary shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
        surfaceClass(3),
        className
      )}
      {...props}
    >
      <SurfaceProvider level={3} background={false}>
        {children}
      </SurfaceProvider>
    </DropdownMenuPrimitive.SubContent>
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
