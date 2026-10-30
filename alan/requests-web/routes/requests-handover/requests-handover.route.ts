import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsHandover = {
  id: "01a0c537-bb25-71f7-bcbe-06ea872cea83",
  type: "page-type/route",
  slug: "requests-handover",
  definition: "the path a browser opens with a code from alanwalton.com",
  code: "ts",
  urlPath: "handover",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and answers with a redirect either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This route is reached without a session, because the code is what signs a reader in.",
    },
  ],
  createdAt: "2026-09-21T18:25:59.077Z",
  updatedAt: "2026-10-30T15:53:02.668Z",
} as const satisfies Route
