"use client"

import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import type { KeyBinding, KeyLayer } from "@shared/design-primitives/utils/keyboard-registry"
import { useKeyboardBinding } from "@shared/design-primitives/hooks/use-keyboard-registry"
import type { ReactNode } from "react"
import { navItemsToCommandBindings } from "./nav-command-bindings"

function RegisterKeyBinding({ binding }: { binding: KeyBinding }): null {
  useKeyboardBinding(binding)
  return null
}

export function NavCommandBindings(props: {
  entries: readonly AppNavItem[]
  navigate: (href: string) => void
  group?: string
  layer?: KeyLayer
  idPrefix?: string
}): ReactNode {
  const { entries, navigate, group, layer, idPrefix } = props
  const bindings = navItemsToCommandBindings(entries, { navigate, group, layer, idPrefix })
  return bindings.map((binding) => <RegisterKeyBinding key={binding.id} binding={binding} />)
}
