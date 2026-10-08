import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasHandover = {
  id: "01a0bb46-6945-7bae-a6c8-2735a79228a2",
  type: "page-type/route",
  slug: "atlas-handover",
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
  createdAt: "2026-09-19T20:05:48.997Z",
  updatedAt: "2026-09-19T20:40:08.000Z",
} as const satisfies Route
