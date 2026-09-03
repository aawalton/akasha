import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayOfWeek = {
  id: "01a0683a-6e1b-7bfc-8ad4-397e38f69054",
  pageTypeSlug: "module",
  slug: "day-of-week",
  definition: "which day of the week a dashed date falls on, and the seven days in either order",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dashed date is read in UTC whatever zone settled the dashed date.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read from noon rather than from midnight.",
    },
    {
      invariantKind: "departure",
      statement: "A dashed date of any other spelling is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "The seven days counted from Sunday are what a UTC day number indexes.",
    },
    {
      invariantKind: "departure",
      statement: "The seven days counted from Monday are what a schedule is read in.",
    },
    {
      invariantKind: "departure",
      statement: "A day shown to a reader is capitalised by its first letter alone.",
    },
    {
      invariantKind: "absence",
      statement: "No list of the seven days is written here.",
    },
  ],
} as const satisfies Module
