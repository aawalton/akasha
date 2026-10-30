import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const activeCalories = {
  id: "01a05bc7-9129-7009-bcbc-7874a1897c8b",
  type: "page-type/module",
  slug: "active-calories",
  definition: "the calories Alan spends over a day from when that day opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The day's reading is the largest total any one source accounts for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Totals are never summed across sources.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day no reading falls in keeps whatever reading was already stored for that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no recorded opening is counted over the ESO day instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day being lived is counted as far as the readings taken so far reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading whose value is no finite number is passed over.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Four days are read at once at the most.",
    },
  ],
  createdAt: "2026-09-01T07:03:20.617Z",
  updatedAt: "2026-10-30T15:33:27.374Z",
} as const satisfies Module
