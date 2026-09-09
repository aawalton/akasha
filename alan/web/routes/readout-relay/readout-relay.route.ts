import type { Route } from "@akasha/code/route"

export const readoutRelay = {
  id: "01a08260-1dd1-790e-88fa-55c606f58578",
  pageTypeSlug: "route",
  type: "route",
  slug: "readout-relay",
  definition: "the reading a workstation carries in for a readout",
  code: "ts",
  urlPath: "api/readout-relay",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is carried in by POST.",
    },
    {
      invariantKind: "departure",
      statement: "A request by any other method is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier presenting no relay secret is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The secret is read off the environment rather than off a page.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not a whole reading is refused rather than held.",
    },
    {
      invariantKind: "departure",
      statement: "The reading carried in is held for the routes that serve it.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names the readout and the moment the reading was taken.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing between the carrier and this route keeps an answer.",
    },
  ],
} as const satisfies Route
