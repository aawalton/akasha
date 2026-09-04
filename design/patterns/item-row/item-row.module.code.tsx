import { cn } from "@akasha/design-primitives/cn"
import { Slot } from "@radix-ui/react-slot"
import { Check, ChevronDown, X } from "lucide-react"
import { Children, cloneElement, type ElementType, isValidElement, type ReactNode } from "react"

interface ItemRowProps {
  label: ReactNode
  leading?: ReactNode
  subtitle?: ReactNode
  quantity?: number
  slotCount?: number
  bagCapacity?: number
  value?: string
  onValueClick?: () => void
  depth?: number
  accent?: boolean
  subdued?: boolean
  onToggle?: () => void
  onAccept?: () => void
  onRemove?: () => void
  actionButtonCount?: number
  expanded?: boolean
  onClick?: () => void
  actionSlot?: ReactNode
  asChild?: boolean
  children?: ReactNode
}

export function ItemRow({
  label,
  leading,
  subtitle,
  quantity,
  slotCount,
  bagCapacity,
  value,
  onValueClick,
  depth = 0,
  accent = false,
  subdued = false,
  onToggle,
  onAccept,
  onRemove,
  actionButtonCount,
  expanded,
  onClick,
  actionSlot,
  asChild = false,
  children,
}: ItemRowProps) {
  const depthClass =
    depth === 1
      ? "pl-6"
      : depth === 2
        ? "pl-10"
        : depth === 3
          ? "pl-14"
          : depth === 4
            ? "pl-18"
            : depth >= 5
              ? "pl-22"
              : undefined

  const labelContent = (
    <div
      data-slot="item-row-label"
      className={subtitle != null ? "flex min-w-0 flex-col" : undefined}
    >
      <div className="flex items-center gap-2">
        {label}
        {quantity !== undefined && (
          <span className="font-mono text-tertiary text-xs">
            &times;{quantity.toLocaleString()}
            {slotCount !== undefined &&
              (bagCapacity !== undefined
                ? ` (${slotCount.toLocaleString()} / ${bagCapacity.toLocaleString()})`
                : ` (${slotCount.toLocaleString()})`)}
          </span>
        )}
      </div>
      {subtitle != null && (
        <div data-slot="item-row-subtitle" className="text-secondary text-xs">
          {subtitle}
        </div>
      )}
    </div>
  )

  const content = (
    <div className="flex min-w-0 flex-1 items-center gap-2 py-1.5">
      {leading != null && (
        <div data-slot="item-row-leading" className="shrink-0">
          {leading}
        </div>
      )}
      {labelContent}
      <span className="flex-1" />
      {value != null &&
        (onValueClick != null ? (
          <button
            type="button"
            data-slot="item-row-value"
            className={cn(
              "cursor-pointer font-mono text-xs",
              accent ? undefined : subdued ? "text-secondary" : "text-tertiary"
            )}
            onClick={(e) => {
              e.stopPropagation()
              onValueClick()
            }}
          >
            {value}
          </button>
        ) : (
          <span
            data-slot="item-row-value"
            className={cn(
              "font-mono text-xs",
              accent ? undefined : subdued ? "text-secondary" : "text-tertiary"
            )}
          >
            {value}
          </span>
        ))}
    </div>
  )

  const actionSlotCount = actionSlot != null ? 1 : 0
  const actualButtons =
    (expanded !== undefined ? 1 : 0) + (onAccept ? 1 : 0) + (onRemove ? 1 : 0) + actionSlotCount
  const spacerCount = Math.max(0, (actionButtonCount ?? 0) - actualButtons)
  const spacers = Array.from({ length: spacerCount }, (_, i) => (
    <span key={`spacer-${i}`} className="w-8 shrink-0" />
  ))

  const removeButton = onRemove && (
    <button
      type="button"
      aria-label="Remove"
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-secondary hover:bg-secondary/8"
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
    >
      <X className="h-3.5 w-3.5" />
    </button>
  )

  const acceptButton = onAccept && (
    <button
      type="button"
      aria-label="Accept"
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary hover:bg-primary/8"
      onClick={(e) => {
        e.stopPropagation()
        onAccept()
      }}
    >
      <Check className="h-3.5 w-3.5" />
    </button>
  )

  const chevron =
    expanded !== undefined &&
    (onToggle ? (
      <button
        type="button"
        aria-label={expanded ? "Collapse" : "Expand"}
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary hover:bg-primary/8"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      >
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
      </button>
    ) : (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
      </span>
    ))

  const hasActionButtons = onToggle || onAccept || onRemove
  const hasNestedButtons = hasActionButtons || onValueClick || actionSlot != null
  const hasActions =
    hasActionButtons || expanded !== undefined || spacerCount > 0 || actionSlot != null

  const actions = hasActions && (
    <div data-slot="item-row-actions" className="flex shrink-0 items-center gap-4">
      {actionSlot != null && <div>{actionSlot}</div>}
      <div className="flex items-center">
        {removeButton}
        {acceptButton}
        {chevron}
        {spacers}
      </div>
    </div>
  )

  if (asChild) {
    const child = Children.only(children)
    if (!isValidElement(child)) {
      throw new Error("ItemRow: asChild requires a single React element child")
    }
    return (
      <Slot
        data-slot="item-row"
        className={cn(
          "flex w-full items-center gap-2 rounded-md text-left text-sm transition-colors",
          accent ? "font-semibold text-accent" : subdued ? "text-secondary" : "text-primary",
          onClick && "cursor-pointer hover:bg-primary/8",
          depthClass
        )}
        onClick={onClick}
      >
        {cloneElement(child, {}, content, actions)}
      </Slot>
    )
  }

  if (onClick && hasNestedButtons) {
    return (
      <div
        data-slot="item-row"
        role="button"
        tabIndex={0}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md text-left text-sm transition-colors hover:bg-primary/8",
          accent ? "font-semibold text-accent" : subdued ? "text-secondary" : "text-primary",
          depthClass
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {content}
        {actions}
      </div>
    )
  }

  const tag: { element: ElementType } = { element: onClick ? "button" : "div" }
  return (
    <tag.element
      data-slot="item-row"
      type={onClick ? "button" : undefined}
      className={cn(
        "flex w-full items-center gap-2 rounded-md text-left text-sm transition-colors",
        accent ? "font-semibold text-accent" : subdued ? "text-secondary" : "text-primary",
        onClick && "cursor-pointer hover:bg-primary/8",
        depthClass
      )}
      onClick={onClick}
    >
      {content}
      {actions}
    </tag.element>
  )
}
