import type { SupervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.types.ts"

export const swapGateway = {
  id: "01a05ede-80cc-7266-b628-6fc355977249",
  type: "page-type/supervisor-action",
  slug: "swap-gateway",
  definition: "a seat's proxy replaced with one built from current code",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This action leaves the agent running.",
    },
  ],
} as const satisfies SupervisorAction
