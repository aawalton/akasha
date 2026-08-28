"use client"

import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import { useKeyboardBinding } from "@shared/design-primitives/hooks/use-keyboard-registry"
import { PALETTE_ONLY } from "@shared/design-primitives/utils/keyboard-registry"
import { NavCommandBindings } from "@shared/pages-ui/components/nav-command-bindings-registrar"
import { useNavigate } from "react-router"
import { getNavItemProducts, navItemContent, navItemTech } from "./nav-items"

const NAV_GROUP = "Navigation"

const DYNAMIC_ID_PREFIX = "alanwalton.nav.dynamic"

export interface NavCommand {
  id: string
  label: string
  href: string
}

export function internalNavCommands(): readonly NavCommand[] {
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
  return (
    <NavCommandBindings
      entries={entries}
      navigate={(href) => navigate(href)}
      group={NAV_GROUP}
      layer="house"
      idPrefix={DYNAMIC_ID_PREFIX}
    />
  )
}
