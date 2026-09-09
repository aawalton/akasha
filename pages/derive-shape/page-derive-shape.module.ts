import type { Module } from "@akasha/code/module"

export const pageDeriveShape = {
  id: "01a0686e-6807-7001-adf6-955fe0ed5e7b",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-derive-shape",
  definition: "the shapes a deriver answers a page type's rows, relations and backing in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is where that row is and the values that row has.",
    },
    {
      invariantKind: "departure",
      statement: "How far a derivation may walk is stated here rather than where the walk runs.",
    },
    {
      invariantKind: "departure",
      statement: "A deriver answers its faults alongside its rows rather than throwing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has a value.",
    },
    {
      invariantKind: "departure",
      statement: "These types are the shapes a deriver answers in.",
    },
  ],
} as const satisfies Module
