import type { AppNavItem } from "@akasha/design-layout/nav-types"
import { Home, Map as MapIcon, Search } from "lucide-react"

export const primaryNavItems: AppNavItem[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    href: "/",
    icon: Home,
  },
  {
    id: "search",
    label: "Search",
    shortLabel: "Search",
    href: "/search",
    icon: Search,
  },
  {
    id: "map",
    label: "Map",
    shortLabel: "Map",
    href: "/map",
    icon: MapIcon,
  },
]
