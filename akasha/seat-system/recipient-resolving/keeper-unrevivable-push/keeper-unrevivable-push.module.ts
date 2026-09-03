import type { Module } from "@akasha/code-system/module"

export const keeperUnrevivablePush = {
  id: "01a0657d-a75e-7007-be2c-6d3c6f633470",
  pageTypeSlug: "module",
  slug: "keeper-unrevivable-push",
  definition: "the notification and the message saying a seat is down and did not come back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A keeper the message is refused for is raised rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "What is said states that nothing was restarted and the work is still waiting.",
    },
  ],
} as const satisfies Module
