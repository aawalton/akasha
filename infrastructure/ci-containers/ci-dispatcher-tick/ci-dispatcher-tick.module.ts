import type { Module } from "@akasha/code-system/module"

export const ciDispatcherTick = {
  id: "01a06861-24c9-700c-a0ce-f76b20291be1",
  pageTypeSlug: "module",
  slug: "ci-dispatcher-tick",
  definition: "one pass of the dispatcher over the steps standing at dispatching",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A tick that has not answered inside its ceiling ends rather than starting a second beside it.",
    },
  ],
} as const satisfies Module
