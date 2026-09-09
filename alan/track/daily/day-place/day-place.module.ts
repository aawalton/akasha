import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayPlace = {
  id: "01a069d3-579d-715a-9504-7309c60e2eba",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-place",
  definition: "where one of Alan's days is kept, and the one road every reader takes to reach it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller naming where a day is kept is a caller that asked this module.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every write of a day, and of a session beside a day, asks here where that day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "No writer reaches the file layer around this module.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a day is kept is answered outright rather than from a set of days named by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A day is handed in whether or not the answer depends on that day.",
    },
    {
      invariantKind: "departure",
      statement: "A day's page is named `day-` and the date rather than the bare date.",
    },
    {
      invariantKind: "departure",
      statement: "Spelling a day's name and taking the day back out of that name are one rule.",
    },
    {
      invariantKind: "constraint",
      statement: "The page query engine calls a derived read of a day from inside itself.",
    },
    {
      invariantKind: "departure",
      statement: "A derived read of a day awaits nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A derived read of a day is let through rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A day's rows are derived where that day is.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing writes under `akasha/` but akasha's own command.",
    },
    {
      invariantKind: "constraint",
      statement:
        "`mock.module` replaces a module for the whole test process rather than for one file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stub over a module spreads that module's real exports before naming what it replaces.",
    },
    {
      invariantKind: "departure",
      statement: "A markdown day folder that is gone is the same answer as one that is empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The day these tests guard is a day nobody has named rather than a day already moved.",
    },
    {
      invariantKind: "departure",
      statement: "The calls a write reaches are named rather than counted.",
    },
    {
      invariantKind: "constraint",
      statement: "A query naming a day no page answers to comes back empty rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "The days these name tests use are sampled rather than read from the day pages.",
    },
  ],
} as const satisfies Module
