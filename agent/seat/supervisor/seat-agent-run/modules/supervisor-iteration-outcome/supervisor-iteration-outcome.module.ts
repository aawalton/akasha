import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIterationOutcome = {
  id: "01a06871-3115-700c-bb97-5d8f1d4b1d6d",
  type: "page-type/module",
  slug: "supervisor-iteration-outcome",
  definition: "whether a supervisor starts another process for a seat's agent when a process ends",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A null pending action is a break.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "restart-now and regret are the only actions handled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other action breaks the loop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The maintenance flag is read off the pending record rather than off the event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A directive is either continue or break.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here touches a process or a seat page or a database.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The directive union is spelled out here and again in the handlers module.",
    },
  ],
  createdAt: "2026-09-03T18:04:03.733Z",
  updatedAt: "2026-10-30T14:52:57.600Z",
} as const satisfies Module
