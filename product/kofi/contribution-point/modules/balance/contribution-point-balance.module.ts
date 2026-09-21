import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contributionPointBalance = {
  id: "01a0c506-47e8-7bbe-b848-c927bac306a3",
  type: "page-type/module",
  slug: "contribution-point-balance",
  definition: "the points a contributor holds, added up again from every transaction that one has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance is the whole transaction list added up rather than a balance moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction carrying no whole number of points adds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which lines a page holds is read by `page-value-reading` rather than read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a contributor's page, the caller handing the lines in.",
    },
  ],
} as const satisfies Module
