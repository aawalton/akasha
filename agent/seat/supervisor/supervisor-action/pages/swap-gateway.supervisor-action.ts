import type { SupervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.types.ts"

export const swapGateway = {
  id: "01a05ede-80cc-7266-b628-6fc355977249",
  type: "page-type/supervisor-action",
  slug: "swap-gateway",
  definition: "a seat's model gateway restarted on current code",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This action leaves the agent running.",
    },
  ],
  createdAt: "2026-09-01T21:27:15.404Z",
  updatedAt: "2026-10-30T14:37:16.336Z",
} as const satisfies SupervisorAction
