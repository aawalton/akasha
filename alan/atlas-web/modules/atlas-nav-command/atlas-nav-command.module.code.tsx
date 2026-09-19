"use client"

import { PRIMARY_NAV_ITEMS } from "akasha/alan/atlas-web/modules/atlas-nav-items/atlas-nav-items.module.code.ts"
import { useNavCommandBindings } from "akasha/page/ui/component/modules/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { useNavigate } from "react-router"

export function NavCommands() {
  const navigate = useNavigate()
  useNavCommandBindings({
    entries: PRIMARY_NAV_ITEMS.filter((item) => item.href != null && item.external !== true),
    navigate,
    group: "Navigation",
    layer: "house",
    idPrefix: "atlas.nav",
  })
  return null
}
