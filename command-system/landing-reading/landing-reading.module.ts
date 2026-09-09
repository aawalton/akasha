import type { Module } from "@akasha/code/module"

export const landingReading = {
  id: "01a06dc1-7f50-78ab-b4c7-e9d9290ad691",
  pageTypeSlug: "module",
  slug: "landing-reading",
  definition:
    "what a landing leaves in the read record, recorded for its writer or carried for the rest",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body the caller asked for is recorded as read by the agent that landed that body.",
    },
    {
      invariantKind: "departure",
      statement: "A landing naming no agent records nothing as read.",
    },
    {
      invariantKind: "departure",
      statement: "A body going away is recorded as read by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A body is recorded as that body landed rather than as that body was handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A landing is held to a reading the caller already has.",
    },
    {
      invariantKind: "departure",
      statement: "A path the caller has no reading of is left out rather than made up.",
    },
    {
      invariantKind: "departure",
      statement: "Each path a landing has says on its own whether its readers owe the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A path saying nothing takes the answer the landing as a whole gives.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path whose readers owe no reading carries their readings onto the body that landing left.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose readers owe reading has their readings of that path dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The readings of one path are dropped rather than the readings of the whole set.",
    },
    {
      invariantKind: "departure",
      statement: "A landing whose readers owe reading as a whole carries no rename handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried at the landing rather than by the command that asked.",
    },
    {
      invariantKind: "departure",
      statement: "An apply carries by the rule a landing carries by.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the readers owe reading is handed in rather than read off the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the landing renamed is carried only where the command hands in the path that body came from.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path a landing changed is worked out here from the base commit.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried and dropped before the writer's own reading is recorded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing leaves the agent that landed with a reading of every body that landing wrote.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing.",
    },
  ],
} as const satisfies Module
