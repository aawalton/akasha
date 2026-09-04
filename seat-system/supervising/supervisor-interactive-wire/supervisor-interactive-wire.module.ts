import type { Module } from "@akasha/code-system/module"

export const supervisorInteractiveWire = {
  id: "01a06871-3115-7009-a94c-1cccc05f925d",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-wire",
  definition:
    "the per-iteration wiring of agent actions, the pre-cliff monitor and the rotation watch",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pre-cliff monitor is not started where the cliff age could not be read.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy swap clears the requested action before the swap is triggered.",
    },
    {
      invariantKind: "departure",
      statement: "A swap does nothing at all where the agent id handle stands empty.",
    },
    {
      invariantKind: "departure",
      statement: "Settling clears the action handler and cancels the deferred restart.",
    },
    {
      invariantKind: "departure",
      statement:
        "An exit the rule could not classify is recorded as unexamined rather than guessed.",
    },
  ],
} as const satisfies Module
