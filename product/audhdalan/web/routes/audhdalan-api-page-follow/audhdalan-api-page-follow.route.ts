import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const audhdalanApiPageFollow = {
  id: "01a0d5bb-243d-7b0b-ab35-0f61ef3bbe5a",
  type: "page-type/route",
  slug: "audhdalan-api-page-follow",
  definition: "the pages and lists a browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reader here is read as a visitor who is not signed in.",
    },
  ],
} as const satisfies Route
