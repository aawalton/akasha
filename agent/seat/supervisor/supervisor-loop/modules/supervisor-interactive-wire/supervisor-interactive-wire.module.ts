import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveWire = {
  id: "01a06871-3115-7009-a94c-1cccc05f925d",
  type: "module",
  slug: "supervisor-interactive-wire",
  definition:
    "the per-iteration wiring of agent actions, the pre-cliff monitor and the rotation watch",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pre-cliff monitor is not started where the cliff age could not be read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A proxy swap clears the requested action before the swap is triggered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A swap does nothing where the agent id handle is empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settling clears the action handler and cancels the deferred restart.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settling stops the rotation watch that iteration wired.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A watch is wired once an iteration and stopped once that iteration settles.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An exit the rule could not classify is recorded as unexamined rather than guessed.",
    },
  ],
} as const satisfies Module
