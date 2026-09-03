import type { Module } from "@akasha/code-system/module"

export const supervisorIterationOutcome = {
  id: "01a06871-3115-700c-bb97-5d8f1d4b1d6d",
  pageTypeSlug: "module",
  slug: "supervisor-iteration-outcome",
  definition: "which directive the loop takes from whatever action was pending at the child's exit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A null pending action is a break.",
    },
    {
      invariantKind: "departure",
      statement: "restart-now is the only action handled, and every other action breaks the loop.",
    },
    {
      invariantKind: "departure",
      statement: "The maintenance flag is read off the pending record, not off the event.",
    },
    {
      invariantKind: "departure",
      statement: "A directive is one of two words, continue or break.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here touches a process, a seat page or a database.",
    },
    {
      invariantKind: "upkeep",
      statement: "The directive union is spelled out here and again in the handlers module.",
    },
  ],
} as const satisfies Module
