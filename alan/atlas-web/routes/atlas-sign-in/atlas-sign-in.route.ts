import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasSignIn = {
  id: "01a08839-e4a2-7fb1-bc8d-19574cec390b",
  type: "page-type/route",
  slug: "atlas-sign-in",
  definition: "where a reader is sent off to alanwalton.com to be signed in",
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
} as const satisfies Route
