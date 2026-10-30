import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPages = {
  id: "01a08298-e950-747c-a370-3573c51ca7ee",
  type: "page-type/route",
  slug: "atlas-api-pages",
  definition: "the pages of a page type a browser asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
  createdAt: "2026-09-08T19:57:34.416Z",
  updatedAt: "2026-10-30T14:45:33.646Z",
} as const satisfies Route
