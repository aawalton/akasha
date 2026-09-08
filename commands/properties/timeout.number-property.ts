import type { NumberProperty } from "@akasha/pages/number-property"

export type Timeout = number

export const timeout = {
  id: "01a0820f-feb2-79e4-8435-06a161f3c6ab",
  pageTypeSlug: "number-property",
  slug: "timeout",
  propertySlug: "timeout",
  definition: "how many seconds a command may run before the call is stopped",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command stating no seconds here is allowed thirty.",
    },
    {
      invariantKind: "departure",
      statement: "A call stopped answers as an operational fault rather than as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A command reaching for a slow thing states the seconds that thing takes.",
    },
  ],
} as const satisfies NumberProperty
