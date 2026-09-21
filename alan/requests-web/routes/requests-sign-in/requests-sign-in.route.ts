import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsSignIn = {
  id: "01a0c537-baf7-7ce7-ae20-c8fed529c44d",
  type: "page-type/route",
  slug: "requests-sign-in",
  definition: "where a reader is sent off to alanwalton.com to be signed in",
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
} as const satisfies Route
