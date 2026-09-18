import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const spotifyAccountCallsInWindow = {
  id: "01a0b6db-cfa6-782a-a188-313cb90ea238",
  type: "page-type/number-property",
  slug: "spotify-account-calls-in-window",
  propertySlug: "calls-in-window",
  definition: "how many calls the open window has spent",
  max: 100000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is counted before that call is made rather than after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that threw is counted as a call that answered.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
