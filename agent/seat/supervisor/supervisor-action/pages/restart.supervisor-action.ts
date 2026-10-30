import type { SupervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.types.ts"

export const restart = {
  id: "01a05edb-0c01-7f85-8584-5aee4a6704cb",
  type: "page-type/supervisor-action",
  slug: "restart",
  definition: "a seat's agent restarted with its transcript after its work ends",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This action waits for the end of the agent's turn.",
    },
  ],
  createdAt: "2026-09-01T21:23:28.897Z",
  updatedAt: "2026-10-30T14:38:54.067Z",
} as const satisfies SupervisorAction
