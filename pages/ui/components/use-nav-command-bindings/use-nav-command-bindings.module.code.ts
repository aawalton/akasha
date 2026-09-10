"use client"

import type { AppNavItem } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import type { KeyLayer } from "akasha/design/primitives/keyboard-registry/keyboard-registry.module.code.ts"
import { useKeyboardBindings } from "akasha/design/primitives/use-keyboard-registry/use-keyboard-registry.module.code.ts"
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
