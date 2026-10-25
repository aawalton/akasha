import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyApiPageWrite = {
  id: "01a174ac-f906-7510-b54f-38c9dc71af57",
  type: "page-type/route",
  slug: "jenny-api-page-write",
  definition: "the page a reader's browser asks to have written",
  code: "ts",
  urlPath: "api/page-write",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route's action is the only thing this route's code exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route is reached by a signed-in reader alone.",
    },
  ],
  createdAt: "2026-10-25T20:07:35.430Z",
  updatedAt: "2026-10-25T20:07:35.430Z",
} as const satisfies Route
