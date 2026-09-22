import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keeperUnrevivablePush = {
  id: "01a0657d-a75e-7007-be2c-6d3c6f633470",
  type: "page-type/module",
  slug: "keeper-unrevivable-push",
  definition: "the notification and the message saying a seat is down and did not come back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A keeper the message is refused for is raised rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The notification and the message state that nothing was restarted and the work is still waiting.",
    },
  ],
} as const satisfies Module
