import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const smilingJenny = {
  id: "01a0d8fd-ef83-7c9f-90bc-95082dc1a4b9",
  type: "page-type/nav",
  slug: "smiling-jenny",
  title: "Smiling Jenny",
  icon: "Smile",
  navPlace: 4,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://smilingjenny.me",
} as const satisfies Nav
