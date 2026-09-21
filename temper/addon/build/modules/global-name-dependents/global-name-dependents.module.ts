import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const globalNameDependents = {
  id: "01a06038-2cc1-77dd-90fd-2e476aa73f6c",
  type: "page-type/module",
  slug: "global-name-dependents",
  definition: "everything reading an addon global, and whether the global may be renamed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A global written to and never read is safe to rename.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is found in TypeScript by parsing rather than by matching text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read in XML is found by matching text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name handed to a control registration binds the game to that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A registration argument is followed back through module constants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant bound to two different strings is followed nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment in XML has no read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dependents are answered in a settled order.",
    },
  ],
} as const satisfies Module
