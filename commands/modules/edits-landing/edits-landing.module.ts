import type { Module } from "@akasha/code/module"

export const editsLanding = {
  id: "01a08132-ea7c-7ba6-972a-e1a6c95b5b76",
  pageTypeSlug: "module",
  type: "module",
  slug: "edits-landing",
  definition: "the bodies a landing takes, worked out from the answer a change gave",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is worked out by replaying the answer onto the tree rather than read off the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A body is formatted before that body is handed on.",
    },
    {
      invariantKind: "departure",
      statement: "What the formatter left for each path is handed on beside the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer carries away is handed on as no body.",
    },
    {
      invariantKind: "departure",
      statement: "A move no other edit names is handed on as a path moved rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement: "Neither path of a move is read for a body or handed on as one.",
    },
    {
      invariantKind: "departure",
      statement: "A path an edit names carries whether its readers owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A move has that owing at both the path it left and the path it reached.",
    },
    {
      invariantKind: "departure",
      statement: "An edit saying nothing of its readers has no owing for that path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the tree.",
    },
  ],
} as const satisfies Module
