"use client"

import { StatRow } from "akasha/design/interface/pattern/modules/stat-row/stat-row.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Collapsible,
  CollapsibleContent,
} from "akasha/design/interface/primitive/modules/collapsible/collapsible.module.code.tsx"
import { ChevronDown } from "lucide-react"
import { type ReactNode, useState } from "react"

interface CollapsibleStatSectionProps {
  label: ReactNode
  value?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  chevron?: boolean
  depth?: number
  useAccentColor?: boolean
  muted?: boolean
  emphasized?: boolean
  subdued?: boolean
  children?: ReactNode
}

export function CollapsibleStatSection({
  label,
  value,
  open,
  defaultOpen = false,
  onOpenChange,
  chevron = true,
  depth,
  useAccentColor,
  muted,
  emphasized,
  subdued,
  children,
}: CollapsibleStatSectionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open ?? internalOpen

  function setOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen}>
      <div className="flex flex-col gap-1">
        <StatRow
          label={label}
          value={
            <span className="flex items-center justify-end gap-2">
              {value}
              {chevron ? (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-tertiary transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              ) : null}
            </span>
          }
          onClick={() => setOpen(!isOpen)}
          expanded={isOpen}
          depth={depth}
          useAccentColor={useAccentColor}
          muted={muted}
          emphasized={emphasized}
          subdued={subdued}
        />
        <CollapsibleContent>
          <div className="flex flex-col gap-1">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
