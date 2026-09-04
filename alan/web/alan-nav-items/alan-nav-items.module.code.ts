import type { AppNavItem } from "@akasha/design-layout/nav-types"
import {
  BarChart3,
  Compass,
  Database,
  ExternalLink,
  FileText,
  Gamepad2,
  Hammer,
  Package,
  SwatchBook,
} from "lucide-react"
import { z } from "zod"

const NODE_ENV_SCHEMA = z.string().optional()

export const primaryNavItems: AppNavItem[] = []

export const navItemContent: AppNavItem = {
  id: "content",
  label: "Content",
  shortLabel: "Content",
  icon: FileText,
  children: [
    {
      id: "principles",
      label: "Principles",
      shortLabel: "Principles",
      href: "/principles",
      icon: Compass,
    },
    {
      id: "design-system",
      label: "Design System",
      shortLabel: "Design",
      href: "/design",
      icon: SwatchBook,
    },
  ],
}

export const navItemTech: AppNavItem = {
  id: "tech",
  label: "Tech",
  shortLabel: "Tech",
  icon: ExternalLink,
  children: [
    {
      id: "grafana",
      label: "Grafana",
      shortLabel: "Grafana",
      href: "https://grafana.alanwalton.com",
      icon: BarChart3,
      external: true,
    },
    {
      id: "supabase",
      label: "Supabase",
      shortLabel: "Supabase",
      href: "https://supabase.alanwalton.com",
      icon: Database,
      external: true,
    },
  ],
}

function getProductUrl(localhostPort: number, devDomain: string, prodDomain: string): string {
  if (NODE_ENV_SCHEMA.parse(process.env.NODE_ENV) === "development")
    return `http://localhost:${localhostPort}`
  if (typeof window !== "undefined" && window.location.hostname.startsWith("dev."))
    return `https://${devDomain}`
  return `https://${prodDomain}`
}

export function getNavItemProducts(): AppNavItem {
  return {
    id: "products",
    label: "Products",
    shortLabel: "Products",
    icon: Package,
    children: [
      {
        id: "temper",
        label: "Temper",
        shortLabel: "Temper",
        href: getProductUrl(3001, "dev.tempereso.com", "tempereso.com"),
        external: true,
        icon: Hammer,
      },
      {
        id: "idle",
        label: "Idle",
        shortLabel: "Idle",
        href: "/idle",
        external: false,
        icon: Gamepad2,
      },
    ],
  }
}
