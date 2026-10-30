import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const archiveOfWorldsSignIn = {
  id: "01a08281-abd1-7cef-b003-c8e010071b28",
  type: "page-type/route",
  slug: "archive-of-worlds-sign-in",
  definition: "how a person signs in at alanwalton.com",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The archive draws no sign-in form, and asks no provider who a reader is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking for a page is brought back to that page after signing in.",
    },
  ],
  createdAt: "2026-09-08T19:32:11.345Z",
  updatedAt: "2026-10-30T15:56:12.007Z",
} as const satisfies Route
