import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyHandover = {
  id: "01a0c1e5-8b13-7d44-9e26-51f0a7c3d69b",
  type: "page-type/route",
  slug: "jenny-handover",
  definition: "where a reader arrives from alanwalton.com carrying a code",
  code: "ts",
  urlPath: "handover",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and answers with a redirect either way.",
    },
  ],
} as const satisfies Route
