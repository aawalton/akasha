import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldEnchantments = {
  id: "01a0d926-50ef-755f-a1d9-10cfcd673ed1",
  type: "page-type/nav",
  slug: "innworld-enchantments",
  title: "Enchantments",
  icon: "sparkle",
  navPlace: 2,
  app: "web-app/innworld-web",
  navParent: "nav/innworld-things",
  navHref: "/world-enchantment",
} as const satisfies Nav
