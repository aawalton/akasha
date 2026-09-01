import { cn } from "@akasha/design-primitives/cn"
import type { ElementType, ReactNode } from "react"

interface StatRowProps {
  label: ReactNode
  value?: ReactNode
  onClick?: () => void
  depth?: number
  useAccentColor?: boolean
  muted?: boolean
  emphasized?: boolean
  subdued?: boolean
}

export function StatRow({
  label,
  value,
  onClick,
  depth = 0,
  useAccentColor = false,
  muted = false,
  emphasized = false,
  subdued = false,
}: StatRowProps) {
  const tag: { element: ElementType } = { element: onClick ? "button" : "div" }
  return (
    <tag.element
      type={onClick ? "button" : undefined}
      className={cn(
        "-mx-2 flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-surface-3",
        onClick && "cursor-pointer",
        depth === 1 && "pl-6",
        depth === 2 && "pl-10",
        depth === 3 && "pl-14",
        depth === 4 && "pl-18",
        depth >= 5 && "pl-22"
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "max-w-[50%] text-sm",
          useAccentColor
            ? "font-semibold text-accent"
            : muted
              ? "text-tertiary"
              : subdued
                ? "text-secondary"
                : !emphasized && depth > 1 && "text-secondary"
        )}
      >
        {label}
      </span>
      {value !== undefined && (
        <span
          className={cn(
            "max-w-[50%] text-right font-mono text-sm",
            useAccentColor
              ? "font-semibold text-accent"
              : cn(
                  "font-medium",
                  muted
                    ? "text-tertiary"
                    : subdued
                      ? "text-secondary"
                      : !emphasized && depth > 1 && "text-secondary"
                )
          )}
        >
          {value}
        </span>
      )}
    </tag.element>
  )
}
