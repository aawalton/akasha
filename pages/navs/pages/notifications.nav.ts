import type { Nav } from "../nav.page-type.ts"

export const notifications = {
  id: "01a06577-2613-7012-b863-d1b5d0c9c33f",
  pageTypeSlug: "nav",
  slug: "notifications",
  title: "Notifications",
  icon: "bell",
  navPlace: 1,
  appSlug: "alanwalton",
  showCountBadge: true,
} as const satisfies Nav
