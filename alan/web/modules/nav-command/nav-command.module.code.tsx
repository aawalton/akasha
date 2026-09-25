"use client"

import type { AppNavItem } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { PALETTE_ONLY } from "akasha/design/interface/primitive/modules/keyboard-registry/keyboard-registry.module.code.ts"
import { useKeyboardBinding } from "akasha/design/interface/primitive/modules/use-keyboard-registry/use-keyboard-registry.module.code.ts"
import { useNavCommandBindings } from "akasha/page/ui/component/modules/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { useNavigate } from "react-router"

const NAV_GROUP = "Navigation"

const DYNAMIC_ID_PREFIX = "alanwalton.nav.dynamic"

interface NavCommand {
  id: string
  label: string
  href: string
}

const HOME: NavCommand = { id: "home", label: "Home", href: "/home" }

function NavCommandBinding({ command }: { command: NavCommand }) {
  const navigate = useNavigate()
  useKeyboardBinding({
    id: `alanwalton.nav.${command.id}`,
    chord: PALETTE_ONLY,
    label: command.label,
    layer: "house",
    group: NAV_GROUP,
    onTrigger: () => navigate(command.href),
  })
  return null
}

export function NavCommands() {
  return <NavCommandBinding command={HOME} />
}

export function DynamicNavCommands({ entries }: { entries: readonly AppNavItem[] }) {
  const navigate = useNavigate()
  useNavCommandBindings({
    entries,
    navigate: (href) => navigate(href),
    group: NAV_GROUP,
    layer: "house",
    idPrefix: DYNAMIC_ID_PREFIX,
  })
  return null
}
