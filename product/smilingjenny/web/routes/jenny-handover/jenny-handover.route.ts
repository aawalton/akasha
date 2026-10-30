import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyHandover = {
  id: "01a0c1e5-8b13-7d44-9e26-51f0a7c3d69b",
  type: "page-type/route",
  slug: "jenny-handover",
  definition: "the path a browser opens with a code from alanwalton.com",
  code: "ts",
  urlPath: "handover",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and answers with a redirect either way.",
    },
  ],
  createdAt: "2026-09-21T00:06:05.000Z",
  updatedAt: "2026-10-30T15:54:02.919Z",
} as const satisfies Route
