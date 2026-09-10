import type { AppNavItem } from "akasha/design/interfaces/layout/nav-types/nav-types.module.code.ts"
import { Home } from "lucide-react"

export const primaryNavItems: AppNavItem[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    href: "/",
    icon: Home,
  },
]
