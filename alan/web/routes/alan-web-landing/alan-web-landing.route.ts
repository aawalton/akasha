import type { Route } from "@akasha/code/route"

export const alanWebLanding = {
  id: "01a08831-2175-75aa-959c-c43105b54c5a",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-landing",
  definition: "what a reader who is not signed in is shown",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A signed-in reader is sent to the home route.",
    },
  ],
} as const satisfies Route
