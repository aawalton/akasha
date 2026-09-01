import type { AppNavItem } from "../nav-types/nav-types.module.code.ts"

export function selectBottomNavItems(
  primaryItems: readonly AppNavItem[],
  pinnedItems: readonly string[] | undefined,
  maxVisible: number
): readonly AppNavItem[] {
  const allItems = primaryItems.flatMap((item) => [item, ...(item.children ?? [])])

  const itemMap = new Map(allItems.map((item) => [item.id, item]))
  const configPinned = (pinnedItems ?? [])
    .map((id) => itemMap.get(id))
    .filter((item): item is AppNavItem => item !== undefined)

  const propertyPinned = allItems
    .filter((item): item is AppNavItem & { mobilePinOrder: number } => item.mobilePinOrder != null)
    .sort((a, b) => a.mobilePinOrder - b.mobilePinOrder)

  if (configPinned.length === 0 && propertyPinned.length === 0) {
    const needsOverflow = primaryItems.length > maxVisible
    const visibleCount = needsOverflow ? maxVisible - 1 : primaryItems.length
    return primaryItems.slice(0, visibleCount)
  }

  const seen = new Set<string>()
  const combined: AppNavItem[] = []
  for (const item of [...configPinned, ...propertyPinned]) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    combined.push(item)
  }

  return combined.slice(0, maxVisible - 1)
}
