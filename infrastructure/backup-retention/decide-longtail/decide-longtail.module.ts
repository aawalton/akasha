import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const decideLongtail = {
  id: "01a06863-74e4-72ed-9169-700d492e6ad5",
  pageTypeSlug: "module",
  slug: "decide-longtail",
  definition: "what the slower store is to hold and what it is to let go of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit is one monthly anchor with the write-ahead log its own range covers.",
    },
    {
      invariantKind: "departure",
      statement: "The month a run falls in has a provisional unit until that month is over.",
    },
    {
      invariantKind: "departure",
      statement: "A partial write-ahead log segment is never part of a unit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here touches either store.",
    },
  ],
} as const satisfies Module
