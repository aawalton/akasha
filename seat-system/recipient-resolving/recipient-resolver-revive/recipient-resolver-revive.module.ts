import type { Module } from "@akasha/code-system/module"

export const recipientResolverRevive = {
  id: "01a0657d-a75e-7004-be2b-c82d305902a9",
  pageTypeSlug: "module",
  slug: "recipient-resolver-revive",
  definition: "a seat resumed by spawning `ops seat resume --verify`, read back as a revive signal",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A revive outrunning the timeout is killed and read as benign.",
    },
    {
      invariantKind: "departure",
      statement: "A revive killed for outrunning the timeout is tried again at the next tick.",
    },
    {
      invariantKind: "departure",
      statement: "A revive that did not verify is a seat that was not revived.",
    },
    {
      invariantKind: "absence",
      statement: "A dry run spawns nothing.",
    },
  ],
} as const satisfies Module
