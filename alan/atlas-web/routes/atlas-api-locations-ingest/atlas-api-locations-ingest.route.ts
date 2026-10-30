import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiLocationsIngest = {
  id: "01a0883c-14d1-7a1c-a698-90f866ce6b06",
  type: "page-type/route",
  slug: "atlas-api-locations-ingest",
  definition: "the locations a device sends to the website",
  code: "ts",
  urlPath: "api/locations/ingest",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch with a malformed point files every other point and answers 200.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each refused point is logged whole with why it was refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a body that is no batch at all is answered 400.",
    },
  ],
  createdAt: "2026-09-09T22:13:54.001Z",
  updatedAt: "2026-10-30T14:42:17.374Z",
} as const satisfies Route
