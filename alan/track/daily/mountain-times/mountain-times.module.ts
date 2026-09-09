import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const mountainTimes = {
  id: "01a069d3-579d-7c16-b749-7e41971feadc",
  pageTypeSlug: "module",
  type: "module",
  slug: "mountain-times",
  definition: "mountain wall time, and the instant a wall reading names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An offset guessed from a wall reading is asked again at the instant that guess named.",
    },
    {
      invariantKind: "departure",
      statement: "The second answer is taken where the two answers disagree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wall time that spring skipped answers as the hour before rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time autumn has twice answers at the first of the two.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stretch of sleep begun in the evening belongs to the day that sleep is woken into.",
    },
    {
      invariantKind: "gap",
      statement: "A day string that is no date is refused.",
    },
    {
      invariantKind: "gap",
      statement: "A month or a day past the end of the calendar is refused.",
    },
  ],
} as const satisfies Module
