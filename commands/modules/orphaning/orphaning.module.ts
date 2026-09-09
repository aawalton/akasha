import type { Module } from "@akasha/code/module"

export const orphaning = {
  id: "01a0726f-357a-7a8d-a206-67afe4197ddb",
  pageTypeSlug: "module",
  slug: "orphaning",
  definition: "the importers a change would leave reaching a path that change takes away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path taken away is weighed by the importers of that path as the change leaves the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved away is weighed as a path taken away is.",
    },
    {
      invariantKind: "departure",
      statement: "A path written again in the same change is taken away by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away that something still imports is answered as an orphaning.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path taken away in the same change as the edits dropping its imports is no orphaning.",
    },
    {
      invariantKind: "departure",
      statement: "The importers are read through the shadow rather than off the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking no path away is weighed without a shadow being worked out.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names the first few importers and counts the rest.",
    },
    {
      invariantKind: "gap",
      statement: "A change whose shadow could not be worked out is answered as no orphaning.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a change.",
    },
  ],
} as const satisfies Module
