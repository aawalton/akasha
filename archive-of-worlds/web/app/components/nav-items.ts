import type { AppNavItem } from "@shared/design-layout/types/nav-types"
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
