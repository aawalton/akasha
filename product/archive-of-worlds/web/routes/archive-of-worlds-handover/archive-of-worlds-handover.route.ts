import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsHandover = {
  id: "01a0bb92-75ea-7d80-91b1-1a70858aeb5b",
  type: "page-type/route",
  slug: "archive-of-worlds-handover",
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
  createdAt: "2026-09-19T21:28:52.970Z",
  updatedAt: "2026-10-30T15:53:34.292Z",
} as const satisfies Route
