import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayActiveCalories = {
  id: "01a06972-ba96-7000-9539-60cc6079f306",
  type: "page-type/module",
  slug: "day-active-calories",
  definition:
    "one day's active calories, recomputed from the health samples and written onto the day",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file writes the four days ending today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's samples arrive after the day does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is filled in over several arrivals rather than at once.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The calorie reader takes four days in one run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day already written is written again on a later run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no sample keeps the calories that day already carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day that throws leaves the other days to land.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that landed nothing exits 2.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when the calories are due.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file writes nothing.",
    },
  ],
} as const satisfies Module
