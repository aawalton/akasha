import type { Module } from "../../code-system/modules/module.page-type.ts"

export const trackSyncRun = {
  id: "01a05c22-7bc9-7005-9bb7-3dc974d43422",
  pageTypeSlug: "module",
  slug: "track-sync-run",
  definition: "a sync run written down as it starts and settled once it ends",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is recorded before the run starts.",
    },
    {
      invariantKind: "departure",
      statement: "A run that throws is settled as failed and the throw carries on.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote nothing failing is still a failed run.",
    },
  ],
} as const satisfies Module
