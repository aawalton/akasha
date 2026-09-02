"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { StatRow } from "@akasha/design-patterns/stat-row"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { resolveBadgeVariant } from "@akasha/pages-core/color-rules"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { useState } from "react"

interface NarrowedEntry {
  key: string
  current: number
  total: number
  sortOrder: number
  label?: string
  href?: string
}

interface NarrowedProgress {
  current: number
  total: number
  activeEntryKey?: string
  entries?: readonly NarrowedEntry[]
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function narrowProgress(value: PropertyValue): NarrowedProgress | null {
  if (!isPlainObject(value)) return null
  const { current, total } = value
  if (typeof current !== "number" || typeof total !== "number") return null

  const activeEntryKey = typeof value.activeEntryKey === "string" ? value.activeEntryKey : undefined

  const rawEntries = value.entries
  if (!isPlainObject(rawEntries)) {
    return { current, total, activeEntryKey }
  }

  const entries: NarrowedEntry[] = []
  for (const [key, entry] of Object.entries(rawEntries)) {
    if (!isPlainObject(entry)) continue
    const c = entry.current
    const t = entry.total
    const so = entry.sortOrder
    if (typeof c !== "number" || typeof t !== "number" || typeof so !== "number") continue
    const label = typeof entry.label === "string" ? entry.label : undefined
    const href = typeof entry.href === "string" && entry.href !== "" ? entry.href : undefined
    entries.push({ key, current: c, total: t, sortOrder: so, label, href })
  }
  entries.sort((a, b) => {
    const so = a.sortOrder - b.sortOrder
    return so !== 0 ? so : a.key.localeCompare(b.key)
  })

  return { current, total, activeEntryKey, entries }
}

function variantFor(
  property: PropertyDefinition,
  pageData: PageDataJSON | undefined,
  value: PropertyValue
): BadgeVariant {
  const accentVariant: BadgeVariant = property.accent ? "accent" : "elevation-muted"
  return resolveBadgeVariant(property, pageData ?? {}, value) ?? accentVariant
}

function ProgressValue(current: number, total: number) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <span className="tabular-nums">
      ({current}/{total}) <span className="inline-block w-[6ch] text-right">{percent}%</span>
    </span>
  )
}

function ProgressEntriesBody({
  narrowed,
  onBeforeNavigate,
}: {
  narrowed: NarrowedProgress
  onBeforeNavigate?: () => void
}) {
  const router = usePagesUIRouter()
  return (
    <div className="flex flex-col gap-1.5">
      <StatRow
        label="Total"
        value={ProgressValue(narrowed.current, narrowed.total)}
        useAccentColor
      />
      {narrowed.entries?.map((entry) => {
        const href = entry.href
        const onClick =
          href != null
            ? () => {
                onBeforeNavigate?.()
                router.push(href)
              }
            : undefined
        return (
          <div key={entry.key} data-progress-entry={entry.key}>
            <StatRow
              label={entry.label ?? entry.key}
              value={ProgressValue(entry.current, entry.total)}
              useAccentColor={entry.key === narrowed.activeEntryKey}
              muted={entry.current >= entry.total}
              onClick={onClick}
            />
          </div>
        )
      })}
    </div>
  )
}

function ProgressEntriesDialog({
  open,
  onOpenChange,
  property,
  pageData,
  narrowed,
}: {
  open: boolean
  onOpenChange: (next: boolean) => void
  property: PropertyDefinition
  pageData: PageDataJSON | undefined
  narrowed: NarrowedProgress
}) {
  const rawTitle = pageData?.title
  const title = typeof rawTitle === "string" && rawTitle !== "" ? rawTitle : property.title
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ProgressEntriesBody narrowed={narrowed} onBeforeNavigate={() => onOpenChange(false)} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export function ProgressPropertyBadge({ property, value, context, pageData }: PropertyBadgeProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const v = narrowProgress(value)
  if (v === null) return null
  const variant = variantFor(property, pageData, value)
  const scalarText = `${v.current}/${v.total}`

  if (context === "card") {
    if (v.entries !== undefined && v.entries.length > 0) {
      return (
        <>
          <ButtonBadge variant={variant} onClick={() => setDialogOpen(true)}>
            <span className="tabular-nums">{scalarText}</span>
          </ButtonBadge>
          <ProgressEntriesDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            property={property}
            pageData={pageData}
            narrowed={v}
          />
        </>
      )
    }
    return (
      <Badge variant={variant}>
        <span className="tabular-nums">{scalarText}</span>
      </Badge>
    )
  }

  if (v.entries === undefined) {
    return (
      <Badge variant={variant}>
        <span className="tabular-nums">{scalarText}</span>
      </Badge>
    )
  }

  return <ProgressEntriesBody narrowed={v} />
}
