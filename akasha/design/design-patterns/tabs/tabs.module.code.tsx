"use client"

import { useLayoutRouter } from "@akasha/design-layout/router-context"
import { cn } from "@akasha/design-primitives/cn"
import { DropdownMenu, DropdownMenuTrigger } from "@akasha/design-primitives/dropdown-menu"
import { clampSurfaceLevel, surfaceClass } from "@akasha/design-primitives/surface-class"
import { SurfaceProvider, useSurface } from "@akasha/design-primitives/surface-provider"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { z } from "zod"

function Tabs({
  value,
  onValueChange,
  defaultValue,
  syncUrl,
  syncStorage,
  urlParam = "tab",
  className,
  ...props
}: {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  syncUrl?: boolean
  syncStorage?: string
  urlParam?: string
  className?: string
} & Omit<
  React.ComponentProps<typeof TabsPrimitive.Root>,
  "value" | "onValueChange" | "defaultValue"
>) {
  const { pathname, searchParams } = useLayoutRouter()

  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  useEffect(() => {
    const setValue = isControlled
      ? (v: string) => onValueChange?.(v)
      : (v: string) => setInternalValue(v)
    const currentVal = isControlled ? value : internalValue

    if (syncUrl) {
      const urlValue = searchParams.get(urlParam)
      if (urlValue != null) {
        if (urlValue !== currentVal) {
          setValue(urlValue)
        }
        return
      }
    }

    if (syncStorage != null) {
      try {
        const stored = localStorage.getItem(syncStorage)
        if (stored != null) {
          const storedValue: unknown = z.unknown().parse(JSON.parse(stored))
          if (typeof storedValue === "string" && storedValue !== currentVal) {
            setValue(storedValue)

            if (syncUrl) {
              const params = new URLSearchParams(searchParams.toString())
              params.set(urlParam, storedValue)
              window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
            }
          }
        }
      } catch {}
    }
  }, [])

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }

      onValueChange?.(newValue)

      if (syncUrl) {
        const params = new URLSearchParams(searchParams.toString())
        params.set(urlParam, newValue)
        window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
      }

      if (syncStorage != null) {
        try {
          localStorage.setItem(syncStorage, JSON.stringify(newValue))
        } catch {}
      }
    },
    [isControlled, onValueChange, syncUrl, syncStorage, urlParam, pathname, searchParams]
  )

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      value={currentValue}
      onValueChange={handleValueChange}
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function handleHomeEndScroll(event: React.KeyboardEvent) {
  if (event.key === "Home") {
    window.scrollTo({ top: 0 })
  } else if (event.key === "End") {
    window.scrollTo({ top: document.documentElement.scrollHeight })
  }
}

function TabsList({
  className,
  children,
  onKeyDown,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const surface = useSurface()
  const listLevel = surface + 1
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        `inline-flex h-9 w-full items-center justify-center rounded-lg ${surfaceClass(listLevel)} p-[3px] text-tertiary`,
        className
      )}
      onKeyDown={(e) => {
        handleHomeEndScroll(e)
        onKeyDown?.(e)
      }}
      {...props}
    >
      <SurfaceProvider level={clampSurfaceLevel(listLevel)} background={false}>
        {children}
      </SurfaceProvider>
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 font-medium text-sm transition-colors",
        "text-tertiary hover:bg-primary/8 hover:text-primary",
        "data-[state=active]:font-bold data-[state=active]:text-accent",
        "focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
        "disabled:pointer-events-none disabled:opacity-[0.38]",
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function PageTabsTrigger({
  icon,
  label,
  className,
  ...props
}: {
  icon: React.ReactNode
  label: string
} & Omit<React.ComponentProps<typeof TabsTrigger>, "children">) {
  return (
    <TabsTrigger
      className={cn("group @[1016px]:gap-2 gap-0 overflow-hidden", className)}
      {...props}
    >
      {icon}
      <span className="@[1016px]:inline-block hidden">{label}</span>
    </TabsTrigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      forceMount
      className={cn("flex-1 outline-none data-[state=inactive]:hidden", className)}
      {...props}
    />
  )
}

function MenuTabsTrigger({
  value,
  children,
  menuContent,
  className,
  ...props
}: {
  menuContent: React.ReactNode
} & Omit<React.ComponentProps<typeof TabsTrigger>, "onClick" | "onMouseDown">) {
  const [open, setOpen] = useState(false)
  const wasActiveRef = useRef(false)

  return (
    <div className="relative inline-flex flex-1" role="presentation">
      <TabsTrigger
        value={value}
        className={className}
        onMouseDown={(e) => {
          wasActiveRef.current = e.currentTarget.dataset.state === "active"
        }}
        onClick={() => {
          if (wasActiveRef.current) {
            setOpen(true)
          }
        }}
        {...props}
      >
        {children}
      </TabsTrigger>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <span
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-0"
            aria-hidden="true"
            tabIndex={-1}
          />
        </DropdownMenuTrigger>
        {menuContent}
      </DropdownMenu>
    </div>
  )
}

export { MenuTabsTrigger, PageTabsTrigger, Tabs, TabsContent, TabsList, TabsTrigger }
