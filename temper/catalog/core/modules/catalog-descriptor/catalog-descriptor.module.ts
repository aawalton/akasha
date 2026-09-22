import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogDescriptor = {
  id: "01a06071-0c77-71fa-866d-8ddbd099aa5c",
  type: "page-type/module",
  slug: "catalog-descriptor",
  definition: "the name, version and empty defaults the catalog add-on hands the game to save",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The defaults name every field the payload has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game saves the add-on under the name `TemperCatalog_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load time is kept.",
    },
  ],
} as const satisfies Module
