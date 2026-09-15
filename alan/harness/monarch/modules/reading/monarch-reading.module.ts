import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchReading = {
  id: "01a057fa-c464-7f2b-9f87-031b5dbedaa9",
  type: "page-type/module",
  slug: "monarch-reading",
  definition: "the unreviewed count taken from Monarch and kept on its readout",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken where Alan's cookie is rather than where the site runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the count the tile shows is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment kept is the moment the reading was asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A taking that refuses keeps nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cookie is read from the environment by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A cookie that is not set refuses by that name and says only Alan can produce a cookie.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal is said as one line rather than thrown as a stack.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cookie that is not set and a taking that refuses leave on different codes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root read is the root the environment states or the folder the call was made in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
