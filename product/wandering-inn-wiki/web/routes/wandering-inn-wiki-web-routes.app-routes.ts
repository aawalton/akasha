import type { AppRoutes } from "akasha/code/app-routes/app-routes.page-type.types.ts"

export const wanderingInnWikiWebRoutes = {
  id: "01a0c5ea-f061-7ff4-b922-0adaabd36afe",
  type: "page-type/app-routes",
  slug: "wandering-inn-wiki-web-routes",
  definition: "the routes innworld.wiki serves",
  appLayout: "tsx",
  parts: [
    "route/innworld-api-health",
    "route/innworld-api-live-version",
    "route/innworld-api-page-events",
    "route/innworld-api-page-follow",
    "route/innworld-api-page-types",
    "route/innworld-api-pages",
    "route/innworld-home",
    "route/innworld-page-detail",
    "route/innworld-page-listing",
  ],
} as const satisfies AppRoutes
