import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldPageDetail = {
  id: "01a0c5fc-4c0e-7756-9104-11a51a19a2e4",
  type: "page-type/route",
  slug: "innworld-page-detail",
  definition: "a page of the world, drawn with its properties",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
} as const satisfies Route
