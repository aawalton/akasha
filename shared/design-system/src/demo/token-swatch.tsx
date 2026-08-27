import type { CSSProperties } from "react"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

interface TokenSwatchProps {
  name: string
  value: string
  rgba?: string
  description?: string
  className?: string
  style?: CSSProperties
  showBorder?: boolean
}

export function TokenSwatch({
  name,
  value,
  rgba,
  description,
  className,
  style,
  showBorder = false,
}: TokenSwatchProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg p-3", surfaceClass(2))}>
      {}
      <div
        className={cn(
          "size-10 shrink-0 rounded",
          showBorder && "border border-white/10",
          className
        )}
        style={style}
      />

      {}
      <div className="min-w-0 flex-1">
        {}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-medium text-sm">{name}</span>
          <span className="font-mono text-tertiary text-xs">{value}</span>
          {rgba != null && <span className="font-mono text-tertiary text-xs">{rgba}</span>}
        </div>

        {}
        {description != null && <div className="text-secondary text-xs">{description}</div>}
      </div>
    </div>
  )
}
