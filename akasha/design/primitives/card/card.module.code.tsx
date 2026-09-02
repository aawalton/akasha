"use client"

import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { SurfaceProvider } from "../surface-provider/surface-provider.module.code.tsx"

function Card({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex cursor-default select-none flex-col gap-2 rounded-xl px-6 py-6 text-primary shadow-sm",
        surfaceClass(1),
        className
      )}
      {...props}
    >
      <SurfaceProvider background={false}>{children}</SurfaceProvider>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-header" className={cn("flex items-center gap-2", className)} {...props} />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "flex select-none flex-wrap items-center gap-3 font-semibold leading-none",
        className
      )}
      {...props}
    />
  )
}

function CardTitleBadges({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title-badges"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-secondary text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn("ml-auto", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center", className)} {...props} />
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardTitleBadges,
}
