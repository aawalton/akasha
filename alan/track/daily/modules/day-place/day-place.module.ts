import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayPlace = {
  id: "01a069d3-579d-715a-9504-7309c60e2eba",
  type: "module",
  slug: "day-place",
  definition: "where one of Alan's days is kept, and the one road every reader takes to reach it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming where a day is kept is a caller that asked this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every write of a day asks here where that day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No writer reaches the file layer around this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a day is kept is answered outright rather than from a set of days named by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is handed in whether or not the answer depends on that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day's page is named `day-` and the date rather than the bare date.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Nothing writes under `akasha/` but akasha's own command.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "`mock.module` replaces a module for the whole test process rather than for one file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A stub spreads a module's real exports before naming the exports that stub replaces.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A markdown day folder that is gone gives the same answer as an empty folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The day these tests guard is a day nobody has named rather than a day already moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The calls a write reaches are named rather than counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The days these name tests use are sampled rather than read from the day pages.",
    },
  ],
} as const satisfies Module
