import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPageFollow = {
  id: "01a0d4bf-e376-77a8-a8cb-1f6754f8cda0",
  type: "page-type/route",
  slug: "alan-web-api-page-follow",
  definition: "the pages and lists a signed-in browser's stream follows",
  code: "ts",
  urlPath: "api/page-follow",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request no signed-in person made is answered 401 and follows nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a browser follows is handed to the pages service as the browser said it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages service's answer is handed back with its status.",
    },
  ],
} as const satisfies Route
