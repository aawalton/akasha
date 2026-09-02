import type { Module } from "@akasha/code-system/module"

export const asyncConstants = {
  id: "01a0606a-1c54-7a06-8b76-419e5170ac50",
  pageTypeSlug: "module",
  slug: "async-constants",
  definition: "the frame budget, the stall bounds and the delays the scheduler is tuned by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A frame time is written in seconds.",
    },
    {
      invariantKind: "departure",
      statement: "The stall threshold is written in frames per second.",
    },
    {
      invariantKind: "departure",
      statement: "A delay is written in milliseconds.",
    },
  ],
} as const satisfies Module
