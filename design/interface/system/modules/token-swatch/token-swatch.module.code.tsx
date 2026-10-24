import type { Color } from "akasha/design/interface/color/color.page-type.types.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"

const SCHEMES = ["dark", "light"] as const

type Scheme = (typeof SCHEMES)[number]

interface TokenSwatchProps {
  name: string
  color: Color
  description?: string
  className: string
  showBorder?: boolean
}

function hexIn(color: Color, scheme: Scheme): string | undefined {
  return scheme === "light" ? (color.lightHex ?? color.hex) : color.hex
}

export function TokenSwatch({
  name,
  color,
  description,
  className,
  showBorder = false,
}: TokenSwatchProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-2 gap-2">
        {SCHEMES.map((scheme) => (
          <div
            key={scheme}
            data-scheme={scheme}
            className={cn("flex items-center gap-3 rounded-lg p-3 text-primary", surfaceClass(2))}
          >
            <div
              className={cn(
                "size-10 shrink-0 rounded",
                showBorder && "border border-primary/10",
                className
              )}
            />
            <div className="flex min-w-0 flex-col">
              <span className="font-medium text-sm">{name}</span>
              <span className="font-mono text-tertiary text-xs">
                {scheme} {hexIn(color, scheme)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {description != null && <div className="text-secondary text-xs">{description}</div>}
    </div>
  )
}
