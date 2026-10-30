import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveSeams = {
  id: "01a06871-3115-7007-ad27-cd0693dae709",
  type: "page-type/module",
  slug: "supervisor-interactive-seams",
  definition: "the type of the calls given to the code that runs a seat's agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has behaviour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seam is a type alone.",
    },
  ],
  createdAt: "2026-09-03T18:04:03.733Z",
  updatedAt: "2026-10-30T14:52:17.287Z",
} as const satisfies Module
