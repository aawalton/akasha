import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasSignIn = {
  id: "01a08839-e4a2-7fb1-bc8d-19574cec390b",
  type: "page-type/route",
  slug: "atlas-sign-in",
  definition: "how a person signs in at alanwalton.com",
  code: "ts",
  urlPath: "sign-in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Atlas draws no sign-in form, and asks no provider who a reader is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader asking for a page is brought back to that page after signing in.",
    },
  ],
  createdAt: "2026-09-09T22:11:30.594Z",
  updatedAt: "2026-10-30T14:35:53.428Z",
} as const satisfies Route
