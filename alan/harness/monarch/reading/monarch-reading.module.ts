import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchReading = {
  id: "01a057fa-c464-7f2b-9f87-031b5dbedaa9",
  pageTypeSlug: "module",
  slug: "monarch-reading",
  definition: "the unreviewed count taken from Monarch and kept on its readout",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken where Alan's cookie is rather than where the site runs.",
    },
    {
      invariantKind: "departure",
      statement: "Only the count the tile shows is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The moment kept is the moment the reading was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A taking that refuses keeps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes a reading.",
    },
    {
      invariantKind: "departure",
      statement: "The cookie is read from the environment by name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cookie that is not set refuses by that name and says only Alan can produce a cookie.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is said as one line rather than thrown as a stack.",
    },
    {
      invariantKind: "departure",
      statement: "A cookie that is not set and a taking that refuses leave on different codes.",
    },
    {
      invariantKind: "departure",
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "The readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
