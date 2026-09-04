import type { Module } from "@akasha/code-system/module"

export const supervisorAgentCreate = {
  id: "01a0683e-3dbe-7009-b4d5-f3784313307e",
  pageTypeSlug: "module",
  slug: "supervisor-agent-create",
  definition: "the identity a newly seated agent is minted with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's identity is a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A spawned agent with no parent is refused rather than seated.",
    },
  ],
} as const satisfies Module
