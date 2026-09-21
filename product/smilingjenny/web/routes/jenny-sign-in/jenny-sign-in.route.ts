import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySignIn = {
  id: "01a08823-9dc2-7243-8e1c-b4c0979fbb10",
  type: "page-type/route",
  slug: "jenny-sign-in",
  definition: "the send-off to alanwalton.com, where Jenny is signed in",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and asks Jenny for nothing.",
    },
  ],
} as const satisfies Route
