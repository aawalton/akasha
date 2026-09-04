"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { POPOVER_COLLISION_PADDING } from "../popover-tokens/popover-tokens.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { SurfaceProvider } from "../surface-provider/surface-provider.module.code.tsx"

function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  collisionPadding = POPOVER_COLLISION_PADDING,
  children,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-hover-card-content-available-height)] w-64 max-w-[var(--radix-hover-card-content-available-width)] origin-(--radix-hover-card-content-transform-origin) rounded-md p-3 text-primary shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
          surfaceClass(3),
          className
        )}
        {...props}
      >
        <SurfaceProvider level={3} background={false}>
          {children}
        </SurfaceProvider>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
