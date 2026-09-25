"use client"

import type { AppNavItem } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { useNavCommandBindings } from "akasha/page/ui/component/modules/use-nav-command-bindings/use-nav-command-bindings.module.code.ts"
import { useNavigate } from "react-router"

export function NavCommands({ entries }: { entries: readonly AppNavItem[] }) {
  const navigate = useNavigate()
  useNavCommandBindings({
    entries: entries.filter((item) => item.href != null && item.external !== true),
    navigate,
    group: "Navigation",
    layer: "house",
    idPrefix: "atlas.nav",
  })
  return null
}
