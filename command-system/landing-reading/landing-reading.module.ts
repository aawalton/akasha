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
      statement: "A landing is held to a reading the caller already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path the caller holds no reading of is left out rather than made up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing whose readers owe no reading carries their readings onto the bodies that landing left.",
    },
    {
      invariantKind: "departure",
      statement: "A landing whose readers owe reading carries no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried at the landing rather than by the command that asked.",
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
      statement: "A reading is carried after the writer's own reading is recorded.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a landing.",
    },
  ],
} as const satisfies Module
