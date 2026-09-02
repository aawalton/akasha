import type { Module } from "../../code-system/modules/module.page-type.ts"

export const canonicalImageClassify = {
  id: "01a05b70-a58c-7353-ae85-0ff1987721d8",
  pageTypeSlug: "module",
  slug: "canonical-image-classify",
  definition: "the bucket and category and grade read off an image's path under a named root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no named root is classified as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A grade is read off the end of the filename where no folder gives a grade.",
    },
  ],
} as const satisfies Module
