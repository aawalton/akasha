"use client"

import { Heading } from "@akasha/design-primitives/heading"
import { Lock, X } from "lucide-react"
import type * as React from "react"

interface FilterGroupProps {
  label: string
  onRemove?: () => void
  children: React.ReactNode
  locked?: boolean
}

export function FilterGroup({ label, onRemove, children, locked = false }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Heading variant="label">{label}</Heading>
        {locked ? (
          <span aria-disabled="true" className="text-tertiary">
            <Lock className="size-3.5" />
          </span>
        ) : onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label} filter`}
            className="cursor-pointer text-tertiary transition-colors hover:text-primary"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>
      {children}
    </div>
  )
}
