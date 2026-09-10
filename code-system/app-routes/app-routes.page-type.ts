import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export type AppRoutes = Domain & {}

export const appRoutes = {
  id: "01a08bde-996d-7a1b-9c3e-1dba85f9060d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "app-routes",
  definition: "the routes one router app serves",
  pluralSlug: "app-routes",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app's routes are declared here rather than on the router app.",
    },
    {
      invariantKind: "departure",
      statement: "A page here is slugged the router app's slug followed by `routes`.",
    },
    {
      invariantKind: "departure",
      statement: "A router app names the page here as a part rather than naming each route.",
    },
  ],
} as const satisfies PageType
