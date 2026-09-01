import type { SupervisorAction } from "../supervisor-action.page-type.ts"

export const restart = {
  id: "01a05edb-0c01-7f85-8584-5aee4a6704cb",
  pageTypeSlug: "supervisor-action",
  slug: "restart",
  definition: "a seat's agent started again in the same session between turns",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This action waits for the end of the agent's turn.",
    },
  ],
} as const satisfies SupervisorAction
