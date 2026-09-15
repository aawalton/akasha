import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebLanding = {
  id: "01a08831-2175-75aa-959c-c43105b54c5a",
  type: "page-type/route",
  slug: "alan-web-landing",
  definition: "what a reader who is not signed in is shown",
  code: "tsx",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A signed-in reader is sent to the home route.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The messaging page is reached from here rather than by knowing its address.",
    },
  ],
} as const satisfies Route
