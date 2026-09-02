import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const activityCategories = {
  id: "01a06108-2fe7-758c-947c-5275babdadb5",
  pageTypeSlug: "module",
  slug: "activity-categories",
  definition: "the kinds of thing there is to do in The Elder Scrolls Online",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the activity-category pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "Where a category falls in this table is the order the identifiers are read in.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing proves the order of this table against the activity-category pages.",
    },
  ],
} as const satisfies Module
