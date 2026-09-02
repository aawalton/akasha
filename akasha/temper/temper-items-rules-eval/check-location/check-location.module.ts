import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkLocation = {
  id: "01a06137-f966-775e-b470-aec9815be083",
  pageTypeSlug: "module",
  slug: "check-location",
  definition:
    "the condition check over an item's inventory location against a rule's allowed locations",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty location list on the rule skips the location check.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no known location makes the condition indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "The failing item's location is reported as the failure detail.",
    },
  ],
} as const satisfies Module
