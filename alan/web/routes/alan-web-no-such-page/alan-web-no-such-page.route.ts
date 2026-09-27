import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebNoSuchPage = {
  id: "01a0e383-ebe0-7024-8b91-16f341f5404c",
  type: "page-type/route",
  slug: "alan-web-no-such-page",
  definition: "that no page of alanwalton.com is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address alanwalton.com has no route for is drawn not found by the root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root's guard runs first, so an address closed to a visitor asks for sign-in.",
    },
  ],
} as const satisfies Route
