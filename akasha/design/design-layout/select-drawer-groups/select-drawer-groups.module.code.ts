import type { AppNavItem, MoreDrawerGroup } from "../nav-types/nav-types.module.code.ts"

export function selectDrawerGroups(
  primaryItems: readonly AppNavItem[],
  visibleIds: ReadonlySet<string>
): readonly MoreDrawerGroup[] {
  const nestedChildIds = new Set<string>()
  for (const item of primaryItems) {
    for (const child of item.children ?? []) nestedChildIds.add(child.id)
  }

  const overflowItems: AppNavItem[] = []
  const pinnedParentGroups: MoreDrawerGroup[] = []

  for (const item of primaryItems) {
    if (nestedChildIds.has(item.id)) continue

    if (visibleIds.has(item.id)) {
      const children = item.children ?? []
      if (children.length > 0) {
        pinnedParentGroups.push({ label: item.label, items: children })
      }
      continue
    }

    overflowItems.push(item)
  }

  const groups: MoreDrawerGroup[] = []
  if (overflowItems.length > 0) groups.push({ items: overflowItems })
  groups.push(...pinnedParentGroups)
  return groups
}
