import type { Module } from "../../code-system/module/module.page-type.ts"

export const seatStated = {
  id: "01a0582a-d9ef-72d5-a4df-56bca58d3005",
  pageTypeSlug: "module",
  slug: "seat-stated",
  definition: "the slug a seat page states under one of its keys",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path that is no seat page states nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A slug is read from the value the seat page exports.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose body cannot be loaded states nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A key the seat does not state answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A slug stated under a page type is answered by its last part alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies Module
