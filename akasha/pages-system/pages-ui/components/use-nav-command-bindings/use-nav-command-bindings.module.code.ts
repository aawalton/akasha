"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import type { KeyLayer } from "@akasha/design-primitives/keyboard-registry"
import { useKeyboardBindings } from "@akasha/design-primitives/use-keyboard-registry"
import { navItemsToCommandBindings } from "../nav-command-bindings/nav-command-bindings.module.code.ts"

export function useNavCommandBindings(args: {
  entries: readonly AppNavItem[]
  navigate: (href: string) => void
  group?: string
  layer?: KeyLayer
  idPrefix?: string
}): undefined {
  const { entries, navigate, group, layer, idPrefix } = args
  useKeyboardBindings(navItemsToCommandBindings(entries, { navigate, group, layer, idPrefix }))
}
