import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPageEvents = {
  id: "01a0d4bf-c2a3-75bb-8c8f-0741343e0fa4",
  type: "page-type/route",
  slug: "alan-web-api-page-events",
  definition: "the one stream of page changes a signed-in browser opens",
  code: "ts",
  urlPath: "api/page-events",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and opens no stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stream the pages service opens is passed through as it arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser leaving closes the stream at the pages service too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pages service opening no stream is answered 503.",
    },
  ],
} as const satisfies Route
