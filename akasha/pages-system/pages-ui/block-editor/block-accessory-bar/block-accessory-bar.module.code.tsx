"use client"

import { Button } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  ArrowDown,
  ArrowUp,
  Copy,
  IndentDecrease,
  IndentIncrease,
  type LucideIcon,
  Replace,
  Trash2,
} from "lucide-react"
import { createPortal } from "react-dom"

export interface BlockAccessoryBarProps {
  readonly inset: number
  readonly onIndent: () => void
  readonly onOutdent: () => void
  readonly onMoveUp: () => void
  readonly onMoveDown: () => void
  readonly onDelete: () => void
  readonly onDuplicate: () => void
  readonly onTurnInto: () => void
}

export function accessoryBarBottomPadding(inset: number): { paddingBottom?: string } {
  return inset > 0 ? {} : { paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }
}

interface BarAction {
  readonly key: string
  readonly label: string
  readonly Icon: LucideIcon
  readonly run: () => void
}

export function BlockAccessoryBar({
  inset,
  onIndent,
  onOutdent,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  onTurnInto,
}: BlockAccessoryBarProps) {
  if (typeof document === "undefined") return null

  const actions: readonly BarAction[] = [
    { key: "indent", label: "Indent", Icon: IndentIncrease, run: onIndent },
    { key: "outdent", label: "Outdent", Icon: IndentDecrease, run: onOutdent },
    { key: "move-up", label: "Move up", Icon: ArrowUp, run: onMoveUp },
    { key: "move-down", label: "Move down", Icon: ArrowDown, run: onMoveDown },
    { key: "turn-into", label: "Turn into", Icon: Replace, run: onTurnInto },
    { key: "duplicate", label: "Duplicate", Icon: Copy, run: onDuplicate },
    { key: "delete", label: "Delete block", Icon: Trash2, run: onDelete },
  ]

  return createPortal(
    <div
      role="toolbar"
      aria-label="Block actions"
      className={cn(
        surfaceClass(1),
        "fixed inset-x-0 bottom-0 z-50 flex items-center justify-around gap-1 border-primary/10 border-t px-2 py-1.5"
      )}
      style={{
        transform: `translateY(-${inset}px)`,
        ...accessoryBarBottomPadding(inset),
      }}
    >
      {actions.map(({ key, label, Icon, run }) => (
        <Button
          key={key}
          type="button"
          variant="tertiary"
          size="icon-sm"
          aria-label={label}
          onPointerDown={(e) => {
            e.preventDefault()
            run()
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Icon />
        </Button>
      ))}
    </div>,
    document.body
  )
}
