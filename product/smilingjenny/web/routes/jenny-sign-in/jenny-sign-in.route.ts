import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySignIn = {
  id: "01a08823-9dc2-7243-8e1c-b4c0979fbb10",
  type: "page-type/route",
  slug: "jenny-sign-in",
  definition: "how a person signs in at alanwalton.com",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and asks Jenny for nothing.",
    },
  ],
  createdAt: "2026-09-09T21:47:10.658Z",
  updatedAt: "2026-10-30T15:56:33.423Z",
} as const satisfies Route
