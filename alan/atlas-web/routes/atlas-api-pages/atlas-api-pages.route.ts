import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPages = {
  id: "01a08298-e950-747c-a370-3573c51ca7ee",
  type: "page-type/route",
  slug: "atlas-api-pages",
  definition: "the pages of a type a browser asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
} as const satisfies Route
