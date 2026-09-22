import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesDescriptor = {
  id: "01a0608a-15b3-7c39-bcf3-50e4681cd98f",
  type: "page-type/module",
  slug: "sales-descriptor",
  definition: "the name, version and defaults the sales add-on hands the game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game saves the add-on under the name `TemperSales_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The defaults have no sale.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
