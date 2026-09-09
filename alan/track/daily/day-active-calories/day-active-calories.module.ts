import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayActiveCalories = {
  id: "01a06972-ba96-7000-9539-60cc6079f306",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-active-calories",
  definition:
    "one day's active calories, recomputed from the health samples and written onto the day",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of this file writes the four days ending today.",
    },
    {
      invariantKind: "departure",
      statement: "A day's samples arrive after the day does.",
    },
    {
      invariantKind: "departure",
      statement: "A day is filled in over several arrivals rather than at once.",
    },
    {
      invariantKind: "constraint",
      statement: "Four is what the calorie reader takes in one run.",
    },
    {
      invariantKind: "departure",
      statement: "A day already written is written again on a later run.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no sample keeps the calories that day already carried.",
    },
    {
      invariantKind: "departure",
      statement: "A day that throws leaves the other days to land.",
    },
    {
      invariantKind: "departure",
      statement: "A run that landed nothing exits 2.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when the calories are due.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file writes nothing.",
    },
  ],
} as const satisfies Module
