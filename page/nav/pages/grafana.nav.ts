import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const grafana = {
  id: "01a0d8fd-ef83-7e46-b38e-d2a429d120de",
  type: "page-type/nav",
  slug: "grafana",
  title: "Grafana",
  icon: "ChartColumn",
  navPlace: 1,
  app: "web-app/alanwalton-web",
  navParent: "nav/tech",
  navHref: "https://grafana.alanwalton.com",
} as const satisfies Nav
