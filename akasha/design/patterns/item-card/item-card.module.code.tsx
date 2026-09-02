"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Info, Plus, X } from "lucide-react"
import type { ReactNode } from "react"

interface ItemCardProps {
  renderIcon?: () => ReactNode
  renderContent: () => ReactNode
  onRemove?: () => void
  removeLabel?: string
  onAdd?: () => void
  addLabel?: string
  onInfo?: () => void
  infoLabel?: string
  className?: string
  onClick?: () => void
}

export function ItemCard({
  renderIcon,
  renderContent,
  onRemove,
  removeLabel,
  onAdd,
  addLabel,
  onInfo,
  infoLabel,
  className,
  onClick,
}: ItemCardProps) {
  const surface = useSurface()
  const cardLevel = surface + 1
  const iconLevel = surface + 2
  const baseClassName = cn(
    "flex w-full items-start gap-3 rounded-md p-3",
    surfaceClass(cardLevel),
    onClick && "cursor-pointer transition-colors hover:bg-primary/8",
    className
  )

  const removeButton =
    onRemove &&
    (onClick ? (
      <div
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-primary/8"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRemove()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={removeLabel}
        aria-label={removeLabel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }
        }}
      >
        <X className="h-4 w-4 text-tertiary" />
      </div>
    ) : (
      <Button
        variant="tertiary"
        size="icon"
        className="h-9 w-9 shrink-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRemove()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={removeLabel}
        aria-label={removeLabel}
        type="button"
      >
        <X className="h-4 w-4 text-tertiary" />
      </Button>
    ))

  const infoButton =
    onInfo &&
    (onClick ? (
      <div
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-primary/8"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onInfo()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={infoLabel}
        aria-label={infoLabel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            e.stopPropagation()
            onInfo()
          }
        }}
      >
        <Info className="h-4 w-4 text-tertiary" />
      </div>
    ) : (
      <Button
        variant="tertiary"
        size="icon"
        className="h-9 w-9 shrink-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onInfo()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={infoLabel}
        aria-label={infoLabel}
        type="button"
      >
        <Info className="h-4 w-4 text-tertiary" />
      </Button>
    ))

  const addButton =
    onAdd &&
    (onClick ? (
      <div
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors hover:bg-primary/8"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onAdd()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={addLabel}
        aria-label={addLabel}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            e.stopPropagation()
            onAdd()
          }
        }}
      >
        <Plus className="h-4 w-4 text-tertiary" />
      </div>
    ) : (
      <Button
        variant="tertiary"
        size="icon"
        className="h-9 w-9 shrink-0"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onAdd()
        }}
        onPointerDown={(e) => e.stopPropagation()}
        title={addLabel}
        aria-label={addLabel}
        type="button"
      >
        <Plus className="h-4 w-4 text-tertiary" />
      </Button>
    ))

  const content = (
    <>
      {renderIcon && (
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded",
            surfaceClass(iconLevel)
          )}
        >
          {renderIcon()}
        </div>
      )}
      <div className="min-w-0 flex-1">{renderContent()}</div>
      {infoButton}
      {addButton}
      {removeButton}
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={baseClassName} onClick={onClick}>
        {content}
      </button>
    )
  }

  return <div className={baseClassName}>{content}</div>
}
