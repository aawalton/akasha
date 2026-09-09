import type { NumberProperty } from "@akasha/pages/number-property"

export type Timeout = number

export const timeout = {
  id: "01a0820f-feb2-79e4-8435-06a161f3c6ab",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "timeout",
  propertySlug: "timeout",
  definition: "how many seconds a command may run before the call is stopped",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command stating no seconds here is allowed the seconds the wrapper names.",
    },
    {
      invariantKind: "departure",
      statement: "These seconds are counted on the wall clock.",
    },
    {
      invariantKind: "departure",
      statement: "A call stopped is ended rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A command reaching for a slow thing states the seconds that thing takes.",
    },
    {
      invariantKind: "departure",
      statement: "Alan settles a raise rather than the agent the ceiling stopped.",
    },
  ],
} as const satisfies NumberProperty
