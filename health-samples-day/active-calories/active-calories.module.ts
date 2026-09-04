import type { Module } from "../../code-system/modules/module.page-type.ts"

export const activeCalories = {
  id: "01a05bc7-9129-7009-bcbc-7874a1897c8b",
  pageTypeSlug: "module",
  slug: "active-calories",
  definition: "the calories Alan burned over a day counted from when he woke",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day's reading is the largest total any one source accounts for.",
    },
    {
      invariantKind: "departure",
      statement: "Totals are never summed across sources.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day no reading falls in keeps whatever reading was already stored for that day.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day with no recorded wake keeps its stored reading and is named back as uncounted.",
    },
    {
      invariantKind: "departure",
      statement: "A reading whose value is no finite number is passed over.",
    },
    {
      invariantKind: "constraint",
      statement: "Four days are read at once at the most.",
    },
  ],
} as const satisfies Module
