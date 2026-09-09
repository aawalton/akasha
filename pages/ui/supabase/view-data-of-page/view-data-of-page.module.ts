import type { Module } from "@akasha/code/module"

export const viewDataOfPage = {
  id: "01a05cce-25ec-7756-a742-f0d31cf07f6e",
  pageTypeSlug: "module",
  type: "module",
  slug: "view-data-of-page",
  definition: "the view a page describes, read from the page or from the file it names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A narrow comparison other than `in` and `not-in` is given the first value of that narrow's list.",
    },
  ],
} as const satisfies Module
