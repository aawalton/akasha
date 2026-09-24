import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldApiPageFollow = {
  id: "01a0d583-dc69-78df-9202-343d7a7587b3",
  type: "page-type/route",
  slug: "innworld-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
} as const satisfies Route
