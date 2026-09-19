import type { AppNavItem } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { Home } from "lucide-react"

export const PRIMARY_NAV_ITEMS: AppNavItem[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    href: "/",
    icon: Home,
  },
]
