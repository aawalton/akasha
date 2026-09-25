import { ESO_BAG_WORN } from "akasha/temper/items/core/modules/eso-bag-constants/eso-bag-constants.module.code.ts"
import type {
  ItemCentricEntry,
  ItemLocationEntry,
} from "akasha/temper/items/core/modules/item-centric-inventory/item-centric-inventory.module.code.ts"
import type { LocationTypeId } from "akasha/temper/items/core/modules/location-type-data/location-type-data.module.code.ts"
import type { TooltipLine } from "akasha/temper/window/modules/tooltip-lines/tooltip-lines.module.code.ts"

const LOCATION_TYPE_COLOR: Record<LocationTypeId, string> = {
  character: "ffffff",
  bank: "6fb7e8",
  craftbag: "e8a96f",
  "housing-storage": "9ad98f",
  house: "8fd9b5",
  companion: "c98fe8",
  guild: "e8d96f",
}

function isWornSlot(loc: ItemLocationEntry): boolean {
  if (loc.locationType === "companion") return true
  return loc.locationType === "character" && loc.bagId === ESO_BAG_WORN
}

interface LocationGroup {
  displayName: string
  locationType: LocationTypeId
  count: number
  worn: boolean
}

export function buildLocationTooltipLines(
  entry: ItemCentricEntry | undefined
): readonly TooltipLine[] {
  if (entry === undefined) return []

  const order: string[] = []
  const groups = new Map<string, LocationGroup>()
  for (const loc of entry.locations) {
    let group = groups.get(loc.locationKey)
    if (group === undefined) {
      group = {
        displayName: loc.displayName,
        locationType: loc.locationType,
        count: 0,
        worn: false,
      }
      groups.set(loc.locationKey, group)
      order.push(loc.locationKey)
    }
    group.count += loc.stackCount
    if (isWornSlot(loc)) group.worn = true
  }

  const lines: TooltipLine[] = []
  for (const key of order) {
    const group = groups.get(key)
    if (group === undefined) continue
    const marker = group.worn ? " *" : ""
    lines.push({
      text: `${group.displayName} x ${group.count}${marker}`,
      color: LOCATION_TYPE_COLOR[group.locationType],
    })
  }
  return lines
}
