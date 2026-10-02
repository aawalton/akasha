"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { CheckCircle2, Circle } from "lucide-react"

const RADIUS = 10

const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function CompletionMark({
  isCompleted,
  fraction,
  className,
}: {
  readonly isCompleted: boolean
  readonly fraction: number | null
  readonly className: string
}) {
  if (isCompleted) return <CheckCircle2 className={cn(className, "text-success")} />
  if (fraction === null || fraction <= 0) return <Circle className={className} />
  const shown = Math.min(1, fraction)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      role="img"
      aria-label={`${String(Math.round(shown * 100))}% read`}
    >
      <circle cx={12} cy={12} r={RADIUS} />
      <circle
        cx={12}
        cy={12}
        r={RADIUS}
        className="text-success"
        strokeWidth={3}
        strokeDasharray={`${String(shown * CIRCUMFERENCE)} ${String(CIRCUMFERENCE)}`}
        transform="rotate(-90 12 12)"
      />
    </svg>
  )
}
