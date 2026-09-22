import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVariablesAccessor = {
  id: "01a06071-0c79-73ce-a434-c3b18ac668a1",
  type: "page-type/module",
  slug: "saved-variables-accessor",
  definition: "the way code inside the catalog add-on reaches the saved catalog table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on's own start-up sets the accessor before any collector runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reaching the saved table before start-up throws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
