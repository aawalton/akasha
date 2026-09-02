"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import type { KeyBinding, KeyLayer } from "@akasha/design-primitives/keyboard-registry"
import { useKeyboardBinding } from "@akasha/design-primitives/use-keyboard-registry"
import type { ReactNode } from "react"
import { navItemsToCommandBindings } from "@akasha/pages-ui-components/nav-command-bindings"

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
