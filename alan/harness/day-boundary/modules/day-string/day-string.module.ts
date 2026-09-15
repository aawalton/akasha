import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayString = {
  id: "01a05c77-31e6-7984-b078-7e97cacbeefb",
  type: "page-type/module",
  slug: "day-string",
  definition: "a day written as a dashed date, read back off one, and stepped by one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dashed date is read in UTC whatever zone settled the dashed date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is stepped from noon rather than from midnight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that will not parse is handed back unchanged rather than refused.",
    },
  ],
} as const satisfies Module
