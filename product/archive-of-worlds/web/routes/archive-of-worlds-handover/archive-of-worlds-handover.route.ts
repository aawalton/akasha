import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsHandover = {
  id: "01a0bb92-75ea-7d80-91b1-1a70858aeb5b",
  type: "page-type/route",
  slug: "archive-of-worlds-handover",
  definition: "where a reader arrives from alanwalton.com carrying a code",
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
} as const satisfies Route
