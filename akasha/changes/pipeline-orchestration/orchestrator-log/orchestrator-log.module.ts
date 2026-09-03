import type { Module } from "@akasha/code-system/module"

export const orchestratorLog = {
  id: "01a0685e-023f-700c-9bd6-8cf06b30faf0",
  pageTypeSlug: "module",
  slug: "orchestrator-log",
  definition: "the prefix every line the orchestrator says opens with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every line the orchestrator says, and every error it throws, opens with this one prefix.",
    },
    {
      invariantKind: "departure",
      statement: "The prefix names the service rather than the module the line came from.",
    },
  ],
} as const satisfies Module
