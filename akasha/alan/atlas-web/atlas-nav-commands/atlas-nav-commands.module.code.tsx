"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import { PALETTE_ONLY } from "@akasha/design-primitives/keyboard-registry"
import { useKeyboardBinding } from "@akasha/design-primitives/use-keyboard-registry"
import { useNavigate } from "react-router"
import { primaryNavItems } from "../atlas-nav-items/atlas-nav-items.module.code.ts"

export interface NavCommand {
  id: string
  label: string
  href: string
}

export function internalNavCommands(): readonly NavCommand[] {
  return primaryNavItems
    .filter(
      (item): item is AppNavItem & { href: string } => item.href != null && item.external !== true
    )
    .map((item) => ({ id: item.id, label: item.label, href: item.href }))
}

function NavCommandBinding({ command }: { command: NavCommand }) {
  const navigate = useNavigate()
  useKeyboardBinding({
    id: `atlas.nav.${command.id}`,
    chord: PALETTE_ONLY,
    label: command.label,
    layer: "house",
    group: "Navigation",
    onTrigger: () => navigate(command.href),
  })
  return null
}

export function NavCommands() {
  return (
    <>
      {internalNavCommands().map((command) => (
        <NavCommandBinding key={command.id} command={command} />
      ))}
    </>
  )
}
