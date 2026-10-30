import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const spotifyAccountCallsInWindow = {
  id: "01a0b6db-cfa6-782a-a188-313cb90ea238",
  type: "page-type/number-property",
  slug: "spotify-account-calls-in-window",
  propertySlug: "calls-in-window",
  definition: "how many calls are counted against the account in the current span of time",
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
  createdAt: "2026-09-18T23:30:53.990Z",
  updatedAt: "2026-10-30T16:30:24.655Z",
} as const satisfies NumberProperty
