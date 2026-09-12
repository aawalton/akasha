"use client"

import {
  getNavItemProducts,
  navItemContent,
  navItemTech,
} from "akasha/alan/web/modules/alan-nav-items/alan-nav-items.module.code.ts"
import type { AppNavItem } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { PALETTE_ONLY } from "akasha/design/interfaces/primitives/keyboard-registry/keyboard-registry.module.code.ts"
import { useKeyboardBinding } from "akasha/design/interfaces/primitives/use-keyboard-registry/use-keyboard-registry.module.code.ts"
import { useNavCommandBindings } from "akasha/pages/ui/components/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { useNavigate } from "react-router"

const NAV_GROUP = "Navigation"

const DYNAMIC_ID_PREFIX = "alanwalton.nav.dynamic"

export interface NavCommand {
  id: string
  label: string
  href: string
}

function internalNavCommands(): readonly NavCommand[] {
  const sections = [getNavItemProducts(), navItemContent, navItemTech]
  const fromSidebar = sections
    .flatMap((section) => section.children ?? [])
    .filter(
      (child): child is AppNavItem & { href: string } =>
        child.href != null && child.external !== true
    )
    .map((child) => ({ id: child.id, label: child.label, href: child.href }))
  return [{ id: "home", label: "Home", href: "/home" }, ...fromSidebar]
}

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
  return (
    <>
      {internalNavCommands().map((command) => (
        <NavCommandBinding key={command.id} command={command} />
      ))}
    </>
  )
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
