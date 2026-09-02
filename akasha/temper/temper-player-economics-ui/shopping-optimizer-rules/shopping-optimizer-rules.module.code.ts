import type { PurchaseRecommendation } from "@akasha/temper-shopping/ttc-shopping-types"
import { kioskLocationName } from "@akasha/temper-trading-pricing/kiosk-location-name"

export function recomputeLocations(
  purchases: readonly PurchaseRecommendation[]
): readonly string[] {
  const counts = new Map<string, number>()
  for (const p of purchases) {
    const loc = String(p.listing.GuildKioskLocationID)
    counts.set(loc, (counts.get(loc) ?? 0) + 1)
  }
  return [...counts.keys()].sort((a, b) => {
    const diff = (counts.get(b) ?? 0) - (counts.get(a) ?? 0)
    if (diff !== 0) return diff
    return kioskLocationName(a).localeCompare(kioskLocationName(b))
  })
}

export function pinLocationIndex(
  pinnedLocation: string | undefined,
  locations: readonly string[]
): number {
  if (pinnedLocation == null || locations.length === 0) return 0
  const idx = locations.indexOf(pinnedLocation)
  return idx >= 0 ? idx : Math.min(locations.length - 1, 0)
}
