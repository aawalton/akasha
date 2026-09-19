import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebHandoverMint = {
  id: "01a0bb45-8674-7d4f-86d6-38a518fd593b",
  type: "page-type/route",
  slug: "alan-web-handover-mint",
  definition: "the code a peripheral's reader is handed to sign in with at that peripheral",
  code: "ts",
  urlPath: "handover/mint",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A peripheral this route does not name is refused before anybody signs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader signed in nowhere is sent to the sign-in page and comes back here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code is handed over in the address rather than in a cookie or a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The return path is carried as a path and read as the peripheral's own.",
    },
  ],
} as const satisfies Route
