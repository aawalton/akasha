import type { Module } from "../../code-system/modules/module.page-type.ts"

export const syncSource = {
  id: "01a05c22-7bc9-7004-b731-91ee1035d0ba",
  pageTypeSlug: "module",
  slug: "sync-source",
  definition: "one calendar source synced, event by event",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event that will not map is counted as failed and the rest carry on.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run counts what the run would have written and writes nothing.",
    },
  ],
} as const satisfies Module
