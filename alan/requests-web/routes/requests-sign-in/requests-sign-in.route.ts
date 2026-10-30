import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignIn = {
  id: "01a0c537-baf7-7ce7-ae20-c8fed529c44d",
  type: "page-type/route",
  slug: "requests-sign-in",
  definition: "how a person signs in at alanwalton.com",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Requests site draws no sign-in form, and asks no provider who a reader is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking for a page is brought back to that page after signing in.",
    },
  ],
  createdAt: "2026-09-21T18:25:59.031Z",
  updatedAt: "2026-10-30T15:55:12.316Z",
} as const satisfies Route
