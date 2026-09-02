"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import type { MoveToDestination } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"
import type { ActionVariant } from "../action-options/action-options.module.code.ts"
import { useInventory } from "../hooks-inventory/hooks-inventory.module.code.ts"

interface CompanionTargetSelectProps {
  destination: MoveToDestination | undefined
  onChange: (dest: MoveToDestination) => void
  variant?: ActionVariant
}

interface CompanionOption {
  value: MoveToDestination
  label: string
}

export function CompanionTargetSelect({
  destination,
  onChange,
  variant = "green",
}: CompanionTargetSelectProps) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const options = useMemo((): readonly CompanionOption[] => {
    const byPriority: CompanionOption = {
      value: `companion-worn:by-priority` satisfies MoveToDestination,
      label: "By Priority",
    }

    const locations = inventory?.locations
    if (!locations) return [byPriority]
    const items: CompanionOption[] = [byPriority]
    for (const [key, loc] of Object.entries(locations)) {
      if (!key.startsWith("Companion:")) continue
      const name = key.slice("Companion:".length)
      items.push({
        value: `companion-worn:${name}` satisfies MoveToDestination,
        label: loc.displayName !== "" ? loc.displayName : name,
      })
    }
    return items
  }, [inventory])

  const currentLabel = options.find((o) => o.value === destination)?.label

  return (
    <div className="flex items-center gap-1">
      <ChevronRight className="size-3 text-tertiary" />
      <Select
        value={destination ?? "no-target"}
        onValueChange={(v) => {
          const match = options.find((o) => o.value === v)
          if (match) onChange(match.value)
        }}
      >
        <SelectTrigger hideChevron>
          <Badge variant={variant} className="shrink-0">
            <SelectValue>{currentLabel ?? "Select target"}</SelectValue>
          </Badge>
        </SelectTrigger>
        <SelectContent nullSentinel={{ value: "no-target", label: "No Target" }} sorted>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
