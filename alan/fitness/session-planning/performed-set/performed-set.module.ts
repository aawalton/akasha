import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const performedSet = {
  id: "01a0685e-89d5-7139-8826-24cae16f3ac6",
  pageTypeSlug: "module",
  slug: "performed-set",
  definition: "one set as it was performed, carrying the day the set fell on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each field is the set log property that recorded it.",
    },
    {
      invariantKind: "departure",
      statement: "A set log states no day, so the day comes from the session the set belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "A value the log left out stands as null rather than as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A set nothing recorded a load for was performed at bodyweight.",
    },
  ],
} as const satisfies Module
