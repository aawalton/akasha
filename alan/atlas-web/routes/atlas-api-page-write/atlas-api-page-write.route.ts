import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPageWrite = {
  id: "01a08838-c84b-70c9-ae34-60620a677571",
  type: "page-type/route",
  slug: "atlas-api-page-write",
  definition: "the page a browser asks the website to write",
  code: "ts",
  urlPath: "api/page-write",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route's action is the only thing this route's code exports.",
    },
  ],
  createdAt: "2026-09-09T22:10:17.803Z",
  updatedAt: "2026-10-30T14:45:04.075Z",
} as const satisfies Route
