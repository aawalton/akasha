"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@akasha/design-primitives/collapsible"
import { ChevronDownIcon } from "lucide-react"
import type { ReactNode } from "react"

interface CollapsibleGroupSectionProps {
  groupKey: string
  label: string
  count: number
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function CollapsibleGroupSection({
  groupKey,
  label,
  count,
  defaultOpen,
  open,
  onOpenChange,
  children,
}: CollapsibleGroupSectionProps) {
  return (
    <Collapsible
      data-group-key={groupKey}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger asChild>
        <button type="button" className="flex w-full cursor-pointer items-center gap-2">
          <ChevronDownIcon className="size-4 shrink-0 text-tertiary transition-transform duration-200 [[data-state=closed]_&]:-rotate-90" />
          <h3 className="min-w-0 select-none truncate font-semibold text-lg text-primary">
            {label}
          </h3>
          <Badge variant="elevation-muted">{count}</Badge>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pt-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
