"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import type * as React from "react"
import { Children, isValidElement, type ReactNode, useMemo } from "react"

import { cn } from "../cn/cn.module.code.ts"
import { POPOVER_COLLISION_PADDING } from "../popover-tokens/popover-tokens.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { SurfaceProvider, useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function Select<T extends string = string>({
  value,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Root>, "value" | "onValueChange"> & {
  value?: T
  onValueChange?: (value: T) => void
}) {
  return (
    <SelectPrimitive.Root data-slot="select" value={value} {...props}>
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  placeholder,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & {
  placeholder?: string
}) {
  if (children != null) {
    return (
      <span data-slot="select-value" {...props}>
        {children}
      </span>
    )
  }

  return <SelectPrimitive.Value data-slot="select-value" placeholder={placeholder} {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  hideChevron = false,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  hideChevron?: boolean
}) {
  const surface = useSurface()

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        hideChevron
          ? "inline-flex text-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:ring-secondary/30 focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
          : `flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-md ${surfaceClass(surface + 1)} px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:ring-secondary/30 data-[size=default]:h-9 data-[size=sm]:h-8 data-[placeholder]:text-tertiary *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0`,
        className
      )}
      {...props}
    >
      {children}
      {!hideChevron && !props.disabled && (
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

function getChildText(node: ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  return ""
}

function processSelectChildren(
  children: ReactNode,
  nullSentinel: { value: string; label: string; className?: string } | undefined,
  sorted: boolean
): ReactNode {
  const childArray = Children.toArray(children)

  const items: React.ReactElement<{ children?: ReactNode }>[] = []
  const nonItems: React.ReactNode[] = []

  for (const child of childArray) {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === SelectItem) {
      items.push(child)
    } else {
      nonItems.push(child)
    }
  }

  if (sorted) {
    items.sort((a, b) => {
      const textA = getChildText(a.props.children)
      const textB = getChildText(b.props.children)
      return textA.localeCompare(textB)
    })
  }

  const result: ReactNode[] = []
  if (nullSentinel) {
    result.push(
      <SelectItem key="__sentinel__" value={nullSentinel.value} className={nullSentinel.className}>
        {nullSentinel.label}
      </SelectItem>
    )
  }
  result.push(...items, ...nonItems)
  return result
}

function SelectContent({
  className,
  children,
  position = "popper",
  collisionPadding = POPOVER_COLLISION_PADDING,
  nullSentinel,
  sorted = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  nullSentinel?: { value: string; label: string; className?: string }
  sorted?: boolean
}) {
  const processedChildren = useMemo(
    () =>
      nullSentinel || sorted ? processSelectChildren(children, nullSentinel, sorted) : children,
    [children, nullSentinel, sorted]
  )

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] max-w-(--radix-select-content-available-width) origin-(--radix-select-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md text-primary shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          surfaceClass(3),
          position === "popper" &&
            "data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        collisionPadding={collisionPadding}
        {...props}
      >
        <SelectScrollUpButton />
        <SurfaceProvider level={3} background={false}>
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            )}
          >
            {processedChildren}
          </SelectPrimitive.Viewport>
        </SurfaceProvider>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-secondary text-xs", className)}
      {...props}
    />
  )
}

function SelectItem<T extends string = string>({
  className,
  children,
  value,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "value"> & {
  value: T
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-primary/12 data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.38] [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-tertiary [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      value={value}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 h-px", surfaceClass(4), className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
