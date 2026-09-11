"use client"

import { useNavCommandBindings } from "akasha/pages/ui/components/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { primaryNavItems } from "akasha/products/archive-of-worlds/web/archive-of-worlds-nav-items/archive-of-worlds-nav-items.module.code.ts"
import { useNavigate } from "react-router"

export function NavCommands() {
  const navigate = useNavigate()
  useNavCommandBindings({
    entries: primaryNavItems.filter((item) => item.href != null && item.external !== true),
    navigate,
    group: "Navigation",
    layer: "house",
    idPrefix: "archive-of-worlds.nav",
  })
  return null
}
