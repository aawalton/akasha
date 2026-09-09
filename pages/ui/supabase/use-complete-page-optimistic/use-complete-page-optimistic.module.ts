import type { Module } from "@akasha/code/module"

export const useCompletePageOptimistic = {
  id: "01a07973-368c-72b7-ae79-826c332e348c",
  pageTypeSlug: "module",
  type: "module",
  slug: "use-complete-page-optimistic",
  definition:
    "Marks one task done in the local store, then sends every key that marking touches as one patch.",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The stamp and the next due date land in one commit.",
    },
    {
      invariantKind: "departure",
      statement: "Taking a completion back clears the key that said the task was done.",
    },
  ],
} as const satisfies Module
