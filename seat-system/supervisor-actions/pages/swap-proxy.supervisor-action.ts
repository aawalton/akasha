import type { SupervisorAction } from "akasha/seat-system/supervisor-actions/supervisor-action.page-type.types.ts"

export const swapProxy = {
  id: "01a05ede-80cc-7266-b628-6fc355977249",
  type: "supervisor-action",
  slug: "swap-proxy",
  definition: "a seat's proxy replaced with one built from current code",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This action leaves the agent running.",
    },
  ],
} as const satisfies SupervisorAction
