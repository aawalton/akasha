"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import type { KeyLayer } from "@akasha/design-primitives/keyboard-registry"
import { useKeyboardBindings } from "@akasha/design-primitives/use-keyboard-registry"
import { navItemsToCommandBindings } from "@akasha/pages-ui-components/nav-command-bindings"

export function NavCommandBindings(props: {
  entries: readonly AppNavItem[]
  navigate: (href: string) => void
  group?: string
  layer?: KeyLayer
  idPrefix?: string
}): null {
  const { entries, navigate, group, layer, idPrefix } = props
  useKeyboardBindings(navItemsToCommandBindings(entries, { navigate, group, layer, idPrefix }))
  return null
}
