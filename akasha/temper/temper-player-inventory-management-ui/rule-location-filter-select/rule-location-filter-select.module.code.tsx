"use client"

import { Badge } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import { type LocationTypeId, locationTypes } from "@akasha/temper-items-core/location-type-data"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"

const LOCATION_TYPE_SET = new Set<string>(locationTypes.ids)
function isLocationTypeId(value: string): value is LocationTypeId {
  return LOCATION_TYPE_SET.has(value)
}

const SINGLE_VALUE_LOCATION_TYPES: ReadonlySet<LocationTypeId> = new Set(["bank", "craftbag"])

const SINGLE_VALUE_LOCATION_KEYS: Partial<Record<LocationTypeId, string>> = {
  bank: "Bank",
  craftbag: "CraftBag",
}

export function RuleLocationFilterSelect({
  ruleLocation,
  inventory,
  onRuleLocationChange,
}: {
  ruleLocation: string | null
  inventory: import("@akasha/temper-items-core/inventory-types").InventoryDatabase | null
  onRuleLocationChange: (location: string | null) => void
}) {
  const selectedType: LocationTypeId | null = useMemo(() => {
    if (ruleLocation == null) return null
    if (isLocationTypeId(ruleLocation)) return ruleLocation
    return classifyLocation(ruleLocation)
  }, [ruleLocation])

  const selectedKey: string | null = useMemo(() => {
    if (ruleLocation == null) return null
    if (isLocationTypeId(ruleLocation)) return null
    return ruleLocation
  }, [ruleLocation])

  const specificOptions = useMemo(() => {
    if (selectedType == null || SINGLE_VALUE_LOCATION_TYPES.has(selectedType) || !inventory)
      return []
    return Object.entries(inventory.locations)
      .filter(([key]) => classifyLocation(key) === selectedType)
      .map(([key, loc]) => ({ key, displayName: loc.displayName ?? key }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [selectedType, inventory])

  const typeOptions = locationTypes.ids
    .map((t) => ({
      value: t,
      label: locationTypes.data[t]?.name ?? t,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  function handleTypeSelect(type: LocationTypeId) {
    if (SINGLE_VALUE_LOCATION_TYPES.has(type)) {
      const fixedKey = SINGLE_VALUE_LOCATION_KEYS[type]
      onRuleLocationChange(fixedKey ?? type)
    } else {
      onRuleLocationChange(type)
    }
  }

  function handleSpecificSelect(key: string) {
    onRuleLocationChange(key)
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {}
      <div className="flex items-center gap-1">
        <Select
          value={selectedType ?? ""}
          onValueChange={(v) => {
            if (v === "") {
              onRuleLocationChange(null)
            } else if (isLocationTypeId(v)) {
              handleTypeSelect(v)
            }
          }}
        >
          <SelectTrigger hideChevron>
            <Badge variant="elevation-muted" className="shrink-0">
              <SelectValue placeholder="Select Location Type" />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {}
      {selectedType != null &&
        !SINGLE_VALUE_LOCATION_TYPES.has(selectedType) &&
        specificOptions.length > 0 && (
          <div className="flex items-center gap-1">
            <ChevronRight className="size-3 text-tertiary" />
            <Select
              value={selectedKey ?? selectedType}
              onValueChange={(v) => {
                if (v === selectedType) {
                  onRuleLocationChange(selectedType)
                } else {
                  handleSpecificSelect(v)
                }
              }}
            >
              <SelectTrigger hideChevron>
                <Badge variant="elevation-muted" className="shrink-0">
                  <SelectValue />
                </Badge>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={selectedType}>
                  All {locationTypes.data[selectedType]?.name ?? selectedType}
                </SelectItem>
                {specificOptions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  )
}
