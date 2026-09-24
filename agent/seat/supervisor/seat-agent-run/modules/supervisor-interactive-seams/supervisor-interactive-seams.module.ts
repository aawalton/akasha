import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractiveSeams = {
  id: "01a06871-3115-7007-ad27-cd0693dae709",
  type: "page-type/module",
  slug: "supervisor-interactive-seams",
  definition:
    "the three collaborators handed to a seat's interactive run rather than fetched by it",
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
} as const satisfies Module
