import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const viewDataOfPage = {
  id: "01a05cce-25ec-7756-a742-f0d31cf07f6e",
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
    {
      invariantKind: "departure",
      statement:
        "A narrow key holding a dot is spelled one segment at a time, and its dots remain.",
    },
  ],
} as const satisfies Module
