import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPages = {
  id: "01a0c537-bb6f-70ef-a83a-6d6b6173ce03",
  type: "page-type/route",
  slug: "requests-api-pages",
  definition: "the pages of a page type a browser asks for",
  code: "ts",
  urlPath: "api/pages/:pageTypeSlug",
  createdAt: "2026-09-21T18:25:59.151Z",
  updatedAt: "2026-10-30T16:22:20.879Z",
} as const satisfies Route
