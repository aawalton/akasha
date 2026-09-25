import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const innworldWiki = {
  id: "01a0d8fd-ef83-76e1-a8c8-4c801b4e2a25",
  type: "page-type/nav",
  slug: "innworld-wiki",
  title: "Innworld Wiki",
  icon: "BookOpen",
  navPlace: 3,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://innworld.wiki",
} as const satisfies Nav
