import type { Module } from "../../code-system/modules/module.page-type.ts"

export const imageName = {
  id: "01a05b70-a58c-76a6-8112-f59171b84e64",
  pageTypeSlug: "module",
  slug: "image-name",
  definition: "the filename a persona's image is written under and read back from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level is spelled with at least 2 digits.",
    },
    {
      invariantKind: "departure",
      statement: "A moment is spelled in UTC with its separators and milliseconds taken out.",
    },
    {
      invariantKind: "departure",
      statement: "A name the shape does not fit is read as nothing.",
    },
  ],
} as const satisfies Module
