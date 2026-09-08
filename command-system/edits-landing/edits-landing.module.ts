import type { Module } from "@akasha/code/module"

export const editsLanding = {
  id: "01a08132-ea7c-7ba6-972a-e1a6c95b5b76",
  pageTypeSlug: "module",
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
      statement: "A path the answer carries away is handed on as no body.",
    },
    {
      invariantKind: "departure",
      statement: "A path an edit names carries whether its readers owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A move carries that owing at both the path it left and the path it reached.",
    },
    {
      invariantKind: "departure",
      statement: "An edit saying nothing of its readers carries no owing for that path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the tree.",
    },
  ],
} as const satisfies Module
