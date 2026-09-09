import type { Module } from "@akasha/code/module"

export const recipientResolverRevive = {
  id: "01a0657d-a75e-7004-be2b-c82d305902a9",
  pageTypeSlug: "module",
  type: "module",
  slug: "recipient-resolver-revive",
  definition: "a seat resumed under verification, read back as a revive signal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A revive outrunning the timeout is left running and read as benign.",
    },
    {
      invariantKind: "departure",
      statement: "The resume is called as a function rather than spawned as a command.",
    },
    {
      invariantKind: "departure",
      statement: "A revive that outran the timeout is tried again at the next tick.",
    },
    {
      invariantKind: "departure",
      statement: "A revive that did not verify is a seat that was not revived.",
    },
    {
      invariantKind: "absence",
      statement: "A dry run revives nothing.",
    },
  ],
} as const satisfies Module
