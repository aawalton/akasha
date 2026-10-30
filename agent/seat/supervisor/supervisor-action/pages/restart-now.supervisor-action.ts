import type { SupervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.types.ts"

export const restartNow = {
  id: "01a05edb-0c02-70e7-95e4-6172d7896a80",
  type: "page-type/supervisor-action",
  slug: "restart-now",
  definition: "a seat's agent restarted with its transcript at any time",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This action interrupts the agent's turn.",
    },
  ],
  createdAt: "2026-09-01T21:23:28.898Z",
  updatedAt: "2026-10-30T14:39:17.753Z",
} as const satisfies SupervisorAction
