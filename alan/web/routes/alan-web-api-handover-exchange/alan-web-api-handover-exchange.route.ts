import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiHandoverExchange = {
  id: "01a0bc7e-8f2d-7d79-ae15-766dd0ad377c",
  type: "page-type/route",
  slug: "alan-web-api-handover-exchange",
  definition: "the sign-in session alanwalton.com gives the iOS app for a code",
  code: "ts",
  urlPath: "api/handover/exchange",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The code and the secret arrive in the body rather than in the address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming neither, or naming an empty one, is refused with 400.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code that trades for nobody is answered 401 with no cookie.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session goes back as this site's own cookie on a JSON answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything other than a POST is answered 405.",
    },
  ],
  createdAt: "2026-09-20T01:46:45.933Z",
  updatedAt: "2026-10-30T16:07:29.442Z",
} as const satisfies Route
