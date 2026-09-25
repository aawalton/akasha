import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const audhdAlan = {
  id: "01a0d8fd-ef83-7f8b-8ee7-e53153c8de07",
  type: "page-type/nav",
  slug: "audhd-alan",
  title: "AuDHD Alan",
  icon: "Brain",
  navPlace: 1,
  app: "web-app/alanwalton-web",
  navParent: "nav/products",
  navHref: "https://audhdalan.com",
} as const satisfies Nav
