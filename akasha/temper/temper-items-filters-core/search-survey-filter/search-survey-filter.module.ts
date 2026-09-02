import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchSurveyFilter = {
  id: "01a0613a-e0b0-7b63-86a0-4e084089702c",
  pageTypeSlug: "module",
  slug: "search-survey-filter",
  definition: "whether an item is a survey report, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A survey report is client specialized item type 101.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item with no specialized item type fails the toggle whichever setting the player chose.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
