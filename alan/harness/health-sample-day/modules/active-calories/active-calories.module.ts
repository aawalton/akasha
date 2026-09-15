import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const activeCalories = {
  id: "01a05bc7-9129-7009-bcbc-7874a1897c8b",
  type: "page-type/module",
  slug: "active-calories",
  definition: "the calories Alan burned over a day counted from when that day opened",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day's reading is the largest total any one source accounts for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Totals are never summed across sources.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A day no reading falls in keeps whatever reading was already stored for that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no recorded opening is counted over the ESO day instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day being lived is counted as far as the readings taken so far reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading whose value is no finite number is passed over.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Four days are read at once at the most.",
    },
  ],
} as const satisfies Module
