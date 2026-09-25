import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperCompletion = {
  id: "01a0d910-e122-7a4a-a63c-4fab57779fee",
  type: "page-type/nav",
  slug: "temper-completion",
  title: "Completion",
  icon: "list-checks",
  navPlace: 5,
  app: "web-app/temper-web",
  navHref: "/completion",
} as const satisfies Nav
