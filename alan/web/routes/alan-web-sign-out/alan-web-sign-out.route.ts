import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebSignOut = {
  id: "01a0882d-0225-7139-b8b8-9470ea19ccb6",
  type: "page-type/route",
  slug: "alan-web-sign-out",
  definition: "the end of a reader's session",
  code: "ts",
  urlPath: "sign-out",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader signs out by posting, and the Google cookies are taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sign-out asked for by other means sends the reader to the sign-in.",
    },
  ],
} as const satisfies Route
