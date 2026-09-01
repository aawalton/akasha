"use client"

import type * as React from "react"
import { cn } from "../cn/cn.module.code.ts"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover.module.code.tsx"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  const surface = useSurface()

  return (
    <tfoot
      data-slot="table-footer"
      className={cn(`${surfaceClass(surface + 1)} font-medium`, className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("data-[state=selected]:bg-primary/12", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 whitespace-nowrap px-2 text-right align-middle text-secondary text-xs uppercase tracking-wide [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap p-2 text-right align-middle font-mono text-secondary text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-sm text-tertiary", className)}
      {...props}
    />
  )
}

function TableTotalCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap p-2 text-right align-middle font-mono font-semibold text-secondary text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

interface TableLabelProps {
  label: string
  fullName: string
  description: string
  className?: string
}

function TableLabel({ label, fullName, description, className }: TableLabelProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer font-medium text-secondary text-xs uppercase tracking-wide",
            className
          )}
        >
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[calc(min(12rem,var(--radix-popover-content-available-width)))] px-2 py-1.5 text-xs">
        <div className="font-medium">{fullName}</div>
        <div className="text-secondary">{description}</div>
      </PopoverContent>
    </Popover>
  )
}

interface TableRowLabelProps {
  label: string
  fullName: string
  description: string
  className?: string
}

function TableRowLabel({ label, fullName, description, className }: TableRowLabelProps) {
  return (
    <TableCell className={cn("text-left", className)}>
      <TableLabel label={label} fullName={fullName} description={description} />
    </TableCell>
  )
}

interface TableColumnLabelProps {
  label: string
  fullName: string
  description: string
  className?: string
}

function TableColumnLabel({ label, fullName, description, className }: TableColumnLabelProps) {
  return (
    <TableHead className={className}>
      <TableLabel label={label} fullName={fullName} description={description} />
    </TableHead>
  )
}

interface TableValueProps {
  compact: string
  full: string
  className?: string
}

function TableValue({ compact, full, className }: TableValueProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={cn("cursor-pointer", className)}>
          {compact}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto px-2 py-1 text-xs">{full}</PopoverContent>
    </Popover>
  )
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}

function formatCompact(value: number): string {
  if (value < 1000) return Math.round(value).toString()
  if (value < 10000) return `${(value / 1000).toFixed(1)}K`
  if (value < 1000000) return `${Math.round(value / 1000)}K`
  if (value < 10000000) return `${(value / 1000000).toFixed(1)}M`
  return `${Math.round(value / 1000000)}M`
}

function formatFull(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
}

function formatPercentFull(value: number): string {
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`
}

export {
  formatCompact,
  formatFull,
  formatPercent,
  formatPercentFull,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnLabel,
  TableFooter,
  TableHead,
  TableHeader,
  TableLabel,
  TableRow,
  TableRowLabel,
  TableTotalCell,
  TableValue,
}
