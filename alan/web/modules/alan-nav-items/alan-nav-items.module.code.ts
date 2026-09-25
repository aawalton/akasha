import type { AppNavItem } from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import {
  BarChart3,
  BookOpen,
  Brain,
  Compass,
  ExternalLink,
  FileText,
  Globe,
  Hammer,
  Package,
  Smile,
  SwatchBook,
} from "lucide-react"
import { z } from "zod"

const NODE_ENV_SCHEMA = z.string().optional()

export const PRIMARY_NAV_ITEMS: AppNavItem[] = []

export const NAV_ITEM_CONTENT: AppNavItem = {
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

export const NAV_ITEM_TECH: AppNavItem = {
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
        id: "audhd-alan",
        label: "AuDHD Alan",
        shortLabel: "AuDHD",
        href: "https://audhdalan.com",
        external: true,
        icon: Brain,
      },
      {
        id: "archive-of-worlds",
        label: "Archive of Worlds",
        shortLabel: "Archive",
        href: "https://archiveofworlds.app",
        external: true,
        icon: Globe,
      },
      {
        id: "innworld-wiki",
        label: "Innworld Wiki",
        shortLabel: "Innworld",
        href: "https://innworld.wiki",
        external: true,
        icon: BookOpen,
      },
      {
        id: "smiling-jenny",
        label: "Smiling Jenny",
        shortLabel: "Jenny",
        href: "https://smilingjenny.me",
        external: true,
        icon: Smile,
      },
      {
        id: "temper",
        label: "Temper",
        shortLabel: "Temper",
        href: getProductUrl(3001, "dev.tempereso.com", "tempereso.com"),
        external: true,
        icon: Hammer,
      },
    ],
  }
}
