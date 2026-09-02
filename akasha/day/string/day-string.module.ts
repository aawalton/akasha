import type { Module } from "../../code-system/modules/module.page-type.ts"

export const dayString = {
  id: "01a05c77-31e6-7984-b078-7e97cacbeefb",
  pageTypeSlug: "module",
  slug: "day-string",
  definition: "a day written as a dashed date, read back off one, and stepped by one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dashed date is read in UTC whatever zone settled the dashed date.",
    },
    {
      invariantKind: "departure",
      statement: "A day is stepped from noon rather than from midnight.",
    },
    {
      invariantKind: "departure",
      statement: "A day that will not parse is handed back unchanged rather than refused.",
    },
  ],
} as const satisfies Module
