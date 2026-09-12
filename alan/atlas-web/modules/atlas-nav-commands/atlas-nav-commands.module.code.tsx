"use client"

import { primaryNavItems } from "akasha/alan/atlas-web/modules/atlas-nav-items/atlas-nav-items.module.code.ts"
import { useNavCommandBindings } from "akasha/pages/ui/components/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { useNavigate } from "react-router"

export function NavCommands() {
  const navigate = useNavigate()
  useNavCommandBindings({
    entries: primaryNavItems.filter((item) => item.href != null && item.external !== true),
    navigate,
    group: "Navigation",
    layer: "house",
    idPrefix: "atlas.nav",
  })
  return null
}
