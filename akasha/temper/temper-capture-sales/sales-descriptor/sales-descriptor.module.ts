import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const salesDescriptor = {
  id: "01a0608a-15b3-7c39-bcf3-50e4681cd98f",
  pageTypeSlug: "module",
  slug: "sales-descriptor",
  definition: "the name, version and defaults the sales add-on hands the game to save under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game saves the add-on under the name `TemperSales_SavedVariables`.",
    },
    {
      invariantKind: "departure",
      statement: "The defaults carry no sale.",
    },
    {
      invariantKind: "absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
