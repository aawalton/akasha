import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const landingReading = {
  id: "01a06dc1-7f50-78ab-b4c7-e9d9290ad691",
  type: "module",
  slug: "landing-reading",
  definition:
    "what a landing carries in the read record onto the bodies that landing left, and what it drops",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each path a landing has says on its own whether its readers owe the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path saying nothing takes the answer the landing as a whole gives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path whose readers owe no reading carries their readings onto the body that landing left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path whose readers owe reading has their readings of that path dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readings of one path are dropped rather than the readings of the whole set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing whose readers owe reading as a whole carries no rename handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is carried at the landing rather than by the command that asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply carries by the rule a landing carries by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the readers owe reading is handed in rather than read off the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path the landing renamed is carried only where the command hands in the path that body came from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a rename row names is neither carried nor dropped here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other path a landing changed is worked out here from the base commit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here refuses a landing.",
    },
  ],
} as const satisfies Module
