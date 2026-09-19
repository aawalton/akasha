import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverRevive = {
  id: "01a0657d-a75e-7004-be2b-c82d305902a9",
  type: "page-type/module",
  slug: "recipient-resolver-revive",
  definition: "a seat resumed under verification, read back as a revive signal",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A revive outrunning the timeout is left running and read as benign.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The resume is called as a function rather than spawned as a command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revive that outran the timeout is tried again at the next tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A revive that did not verify is a seat that was not revived.",
    },
  ],
} as const satisfies Module
