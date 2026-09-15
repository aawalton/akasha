import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIterationOutcome = {
  id: "01a06871-3115-700c-bb97-5d8f1d4b1d6d",
  type: "page-type/module",
  slug: "supervisor-iteration-outcome",
  definition: "which directive the loop takes from whatever action was pending at the child's exit",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A null pending action is a break.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "restart-now is the only action handled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other action breaks the loop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The maintenance flag is read off the pending record rather than off the event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directive is either continue or break.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here touches a process or a seat page or a database.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "The directive union is spelled out here and again in the handlers module.",
    },
  ],
} as const satisfies Module
