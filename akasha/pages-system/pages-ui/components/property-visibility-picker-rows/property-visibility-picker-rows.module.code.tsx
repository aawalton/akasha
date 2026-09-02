"use client"

import { cn } from "@akasha/design-primitives/cn"
import type { PropertyVisibilityOption } from "@akasha/pages-ui-components/property-visibility-picker-helpers"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react"
import type { CSSProperties, HTMLAttributes } from "react"

interface PropertyRowProps {
  option: PropertyVisibilityOption
}

const DROP_INDICATOR_CLASS = {
  before:
    "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-accent",
  after:
    "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-accent",
} as const

interface PropertyRowLayoutProps extends PropertyRowProps {
  rowRef?: (node: HTMLElement | null) => void
  rowStyle?: CSSProperties
  rowAttrs?: HTMLAttributes<HTMLDivElement>
  gripListeners?: SyntheticListenerMap
  gripActive: boolean
  dropIndicator?: "before" | "after"
}

function PropertyRowLayout({
  option,
  rowRef,
  rowStyle,
  rowAttrs,
  gripListeners,
  gripActive,
  dropIndicator,
}: PropertyRowLayoutProps) {
  return (
    <div
      ref={rowRef}
      style={rowStyle}
      {...rowAttrs}
      data-row-id={option.id}
      className={cn(
        "relative flex items-center gap-1.5 rounded text-secondary text-sm",
        dropIndicator !== undefined && DROP_INDICATOR_CLASS[dropIndicator]
      )}
    >
      <button
        type="button"
        aria-label={gripActive ? `Reorder ${option.label}` : undefined}
        aria-hidden={gripActive ? undefined : true}
        tabIndex={gripActive ? undefined : -1}
        disabled={!gripActive}
        className={cn(
          "touch-none text-tertiary",
          gripActive ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
        {...gripListeners}
      >
        <GripVertical className="size-3.5" />
      </button>
      <span className="flex-1 text-left">{option.label}</span>
    </div>
  )
}

interface SortableRowProps extends PropertyRowProps {
  sortable: boolean
  dropIndicator?: "before" | "after"
}

export function SortablePropertyRow({ option, sortable, dropIndicator }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: option.id,
    disabled: !sortable,
  })
  return (
    <PropertyRowLayout
      option={option}
      rowRef={sortable ? setNodeRef : undefined}
      rowStyle={sortable && isDragging ? { opacity: 0.3 } : undefined}
      rowAttrs={sortable ? attributes : undefined}
      gripListeners={sortable ? listeners : undefined}
      gripActive={sortable}
      dropIndicator={dropIndicator}
    />
  )
}

export function PropertyRowGhost({ option }: PropertyRowProps) {
  return (
    <div className="flex items-center gap-1.5 rounded text-secondary text-sm">
      <GripVertical className="size-3.5 text-tertiary" />
      <span className="flex-1 text-left">{option.label}</span>
    </div>
  )
}
