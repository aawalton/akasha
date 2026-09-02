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
import type {
  MoveToDestination,
  StockScope,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"
import type { ActionVariant } from "../action-options/action-options.module.code.ts"
import { useInventory } from "../hooks-inventory/hooks-inventory.module.code.ts"

interface StockScopeSelectProps {
  stockScope: StockScope | undefined
  destination: MoveToDestination | undefined
  onChange: (patch: { stockScope: StockScope; destination: MoveToDestination }) => void
  variant?: ActionVariant
}

interface CharacterOption {
  value: `character:${string}`
  label: string
}

export function StockScopeSelect({
  stockScope,
  destination,
  onChange,
  variant = "green",
}: StockScopeSelectProps) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const scope = stockScope === "current-character" ? "bank" : "character"

  const characterOptions = useMemo((): readonly CharacterOption[] => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return Object.entries(characters).map(([charId, charData]) => ({
      value: `character:${charId}`,
      label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
    }))
  }, [inventory])

  const subscopeValue =
    destination === "character:by-priority"
      ? "character:by-priority"
      : destination?.startsWith("character:")
        ? destination
        : "all"

  const subscopeLabel =
    subscopeValue === "all"
      ? "All Characters"
      : subscopeValue === "character:by-priority"
        ? "By Priority"
        : (characterOptions.find((o) => o.value === subscopeValue)?.label ?? "All Characters")

  return (
    <>
      <div className="flex items-center gap-1">
        <ChevronRight className="size-3 text-tertiary" />
        <Select
          value={scope}
          onValueChange={(v) => {
            if (v === "character") {
              onChange({ stockScope: "any-character", destination: "bank" })
            } else {
              onChange({ stockScope: "current-character", destination: "bank" })
            }
          }}
        >
          <SelectTrigger hideChevron>
            <Badge variant={variant} className="shrink-0">
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="character">Character</SelectItem>
            <SelectItem value="bank">Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scope === "character" && (
        <div className="flex items-center gap-1">
          <ChevronRight className="size-3 text-tertiary" />
          <Select
            value={subscopeValue}
            onValueChange={(v) => {
              if (v === "all") {
                onChange({ stockScope: "any-character", destination: "bank" })
                return
              }
              if (v === "character:by-priority") {
                onChange({ stockScope: "any-character", destination: "character:by-priority" })
                return
              }
              const opt = characterOptions.find((o) => o.value === v)
              if (!opt) return
              onChange({ stockScope: "any-character", destination: opt.value })
            }}
          >
            <SelectTrigger hideChevron>
              <Badge variant={variant} className="shrink-0">
                <SelectValue>{subscopeLabel}</SelectValue>
              </Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Characters</SelectItem>
              <SelectItem value="character:by-priority">By Priority</SelectItem>
              {characterOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
}
