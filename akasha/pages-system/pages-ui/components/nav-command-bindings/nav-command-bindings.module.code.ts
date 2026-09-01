import type { AppNavItem } from "@akasha/design-layout/nav-types"
import type { KeyBinding, KeyLayer } from "@akasha/design-primitives/keyboard-registry"
import { PALETTE_ONLY } from "@akasha/design-primitives/keyboard-registry"

export function navItemsToCommandBindings(
  entries: readonly AppNavItem[],
  opts: {
    navigate: (href: string) => void
    group?: string
    layer?: KeyLayer
    idPrefix?: string
  }
): readonly KeyBinding[] {
  const { navigate, group, layer, idPrefix = "nav" } = opts
  const bindings: KeyBinding[] = []
  for (const entry of entries) {
    const { href, onClick } = entry
    const onTrigger = href != null ? () => navigate(href) : onClick
    if (onTrigger == null) continue
    bindings.push({
      id: `${idPrefix}.${entry.id}`,
      chord: PALETTE_ONLY,
      label: entry.label,
      onTrigger,
      ...(group != null ? { group } : {}),
      ...(layer != null ? { layer } : {}),
    })
  }
  return bindings
}
