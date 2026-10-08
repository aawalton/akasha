import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebLanding = {
  id: "01a08831-2175-75aa-959c-c43105b54c5a",
  type: "page-type/route",
  slug: "alan-web-landing",
  definition: "what a reader who is not signed in is shown",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader is sent to the home route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The messaging page is reached from here rather than by knowing its address.",
    },
  ],
  createdAt: "2026-09-09T22:01:56.341Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Route
