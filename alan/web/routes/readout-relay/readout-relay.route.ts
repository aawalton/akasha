import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const readoutRelay = {
  id: "01a08260-1dd1-790e-88fa-55c606f58578",
  type: "route",
  slug: "readout-relay",
  definition: "the reading a workstation carries in for a readout",
  code: "ts",
  urlPath: "api/readout-relay",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is carried in by POST.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request by any other method is refused rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carrier presenting no relay secret is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The secret is read off the environment rather than off a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not a whole reading is refused rather than held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading carried in is held for the routes that serve the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer names the readout and the moment the reading was taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing between the carrier and this route keeps an answer.",
    },
  ],
} as const satisfies Route
