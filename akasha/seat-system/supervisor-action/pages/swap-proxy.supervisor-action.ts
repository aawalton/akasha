import type { SupervisorAction } from "../supervisor-action.page-type.ts"

export const swapProxy = {
  id: "01a05ede-80cc-7266-b628-6fc355977249",
  pageTypeSlug: "supervisor-action",
  slug: "swap-proxy",
  definition: "a seat's proxy replaced with one built from current code",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This action leaves the agent running.",
    },
  ],
} as const satisfies SupervisorAction
