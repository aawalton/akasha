import type { SupervisorAction } from "../supervisor-action.page-type.ts"

export const restartNow = {
  id: "01a05edb-0c02-70e7-95e4-6172d7896a80",
  pageTypeSlug: "supervisor-action",
  slug: "restart-now",
  definition:
    "a seat's agent started again in the same session without waiting for the turn to end",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This action interrupts the agent's turn.",
    },
  ],
} as const satisfies SupervisorAction
