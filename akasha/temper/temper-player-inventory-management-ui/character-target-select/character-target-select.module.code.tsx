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

interface CharacterTargetSelectProps {
  action: "character-equip" | "use" | "research" | "deconstruct"
  destination: MoveToDestination | undefined
  onChange: (dest: MoveToDestination) => void
  variant?: ActionVariant
}

interface CharacterOption {
  value: MoveToDestination
  label: string
}

export function CharacterTargetSelect({
  action,
  destination,
  onChange,
  variant = "green",
}: CharacterTargetSelectProps) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const options = useMemo((): readonly CharacterOption[] => {
    const byPriority: CharacterOption = {
      value:
        action === "character-equip"
          ? (`character-worn:by-priority` satisfies MoveToDestination)
          : (`character:by-priority` satisfies MoveToDestination),
      label: "By Priority",
    }

    const characters = inventory?.currencies?.characters
    if (!characters) return [byPriority]
    return [
      byPriority,
      ...Object.entries(characters).map(([charId, charData]) => ({
        value: `character:${charId}` satisfies MoveToDestination,
        label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
      })),
    ]
  }, [action, inventory])

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
