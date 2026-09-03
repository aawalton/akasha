import type { Module } from "@akasha/code-system/module"

export const ciDispatchPlacement = {
  id: "01a06861-24c9-7008-9b3f-bcda3df4bab5",
  pageTypeSlug: "module",
  slug: "ci-dispatch-placement",
  definition: "which node each dispatching step's container is placed on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A step under a pipeline or workflow that has reached its verdict is placed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A step on main is placed on the reserved ci node.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where sticky pinning is on, a branch pipeline's steps all take the node its first step took.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step that fits on no node holds dispatching until it has never fitted for long enough.",
    },
    {
      invariantKind: "departure",
      statement: "The oldest step of the highest tier is admitted first.",
    },
  ],
} as const satisfies Module
