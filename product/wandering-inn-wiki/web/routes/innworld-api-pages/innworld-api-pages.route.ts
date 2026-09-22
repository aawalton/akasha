import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldApiPages = {
  id: "01a0c5fc-62f4-76c1-9075-0647b5a17523",
  type: "page-type/route",
  slug: "innworld-api-pages",
  definition: "the pages of a page type the visitor may read, as rows",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
